// #region ********** 变量 **********

var updateTimer = undefined;
var currentTime = new Date('2009-07-14 18:15:00');
var rocketData = {}; // 正常火箭的数据
var startTime = new Date('2009-07-14 18:15:00');
var endTime = new Date('2009-07-14 18:35:0');
var speed = 1;
let needClearTrail = false; // 需要清空尾迹，默认是false，在时间轴跳转时会设置为true
var lastEvent = null; // 上次面板操作事件 时间按钮面板
var animationDelayTime = 2000; // 动画播放时间晚多少毫秒

// 动画和关节数据
var animationDetailList = {
  一级分离动画: {
    useAnimation: true, // 是否需要执行动画，调姿时没动画不需要，其他需要
    start: new Date('2009-07-14 18:17:48').getTime(), // 动画开始播放时间
    state: 0, // 动画播放状态，0：未播放，1：已播放
    articulationItems: [
      // 当前状态其他关节数值集合
      // {
      //   startTime: 1247567100000, // 关节开始时间
      //   duration: 3, // 关节时长
      //   articulationName: '二级分离', // 关节名称
      //   startState: 0, // 关节起始值
      //   endState: 100, // 关节结束值
      // },
    ],
  },
  整流罩脱离动画: {
    useAnimation: true,
    start: new Date('2009-07-14 18:18:18').getTime(),
    state: 0,
    articulationItems: [],
  },
  调姿动画: {
    useAnimation: false,
    start: new Date('2009-07-14 18:20:15').getTime(),
    state: 0,
    articulationItems: [],
  },
  二级分离动画: {
    useAnimation: true,
    start: new Date('2009-07-14 18:25:00').getTime(),
    state: 0,
    articulationItems: [],
  },
  三级分离动画: {
    useAnimation: true,
    start: new Date('2009-07-14 18:26:00').getTime(),
    state: 0,
    articulationItems: [],
  },
};

// 动画名称和html关键帧按钮索引对应
var timelineAnimationList = ['一级分离动画', '整流罩脱离动画', '调姿动画', '二级分离动画', '三级分离动画'];

// 界面按钮
var btnCameraSelf = undefined;
var btnCameraWorld = undefined;
var chkRotate = undefined;

// #endregion ********** 变量 **********

// #region ********** TGAPI 初始化阶段 **********

// 初始化加载图观三维场景服务
function init() {
  // 初始化图观App
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: 'fDGOwp2X', //StreamingServer服务器获取token
      url: 'https://172.16.1.225:9090', //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
    },
    (result) => {
      window.appInstance.uniCall('addEventListener', {
        eventName: 'onServiceInit',
        callback: (res) => {
          getUIAndSet();
          initScene();
        },
      });
    }
  );
}

/**
 * 初始化场景设置，包括基准点、摄像机限制、环境时间等。
 *
 * @function initScene
 * @description 该函数设置场景的各种效果参数，并调用一系列函数来初始化场景中的模型、轨迹图层和事件处理。
 */
function initScene() {
  setDefaultBaseCenter();
  restrictCamera();
  setEnvTime();
  addModelTrailLayer();
  addEventHandler();
}

/**
 * 注册跟随镜头改变事件
 *
 * 当跟随镜头改变时触发，更新 `自身` 、 `世界` 和 `环绕`  状态。
 */
function addEventHandler() {
  //
  appInstance.uniCall('addEventListener', {
    eventName: 'onFollowingCameraChanged',
    callback: (result) => {
      handleFollowingCameraChanged(result);
    },
  });
}

// #endregion ********** TGAPI 初始化阶段 **********

// #region ********** TGAPI 图层相关操作 **********
/**
 * 添加模型轨迹图
 */
function addModelTrailLayer() {
  let jsonData = {
    id: 'ModelTrailLayer',
    name: 'modelTrailLayer',
    coordType: 0,
    coordTypeZ: 0,
    snapSurface: 0,
    duration: 1,
    modelMaxDistance: 1000,
    iconMaxDistance: 100000000000000000,
    isAutoRotation: false,
    trackStyle: 'vector',
    trackDuration: 300,
    trackWidth: 9,
    objLife: 0,
    isReferenceType: false,
    visible: true,
    legends: [
      {
        name: 'red',
        modelType: 'Missile_SingleAnimation',
        scale: 1,
        iconName: 'custom-icon_导弹_红方',
        trackColor: '#ff0000',
        labelColor: '#ffB973',
        labelScale: 1,
        labelOffset: [0, 0, 0],
        labelBackgroundColor: '#000000',
      },
    ],
    data: [],
  };

  let startData = this.rocketData[formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss')];
  if (startData) {
    startData.forEach((data) => {
      jsonData.data.push({
        id: 'spacecraftId',
        label: data.Id,
        coord: [data.Lon, data.Lat],
        coordZ: data.Alt * 1000.0 + 130,
        rotation: [180 - data.Yaw, -data.Pitch, 180 - data.Roll],
        type: 'red',
      });
    });
  }

  appInstance.uniCall('addModelTrailLayer', jsonData, (result) => {
    //console.log(result);

    getModelAnimationAndSetArticulation();

    setFollowing(getFollowingCameraRelative());
  });
}

/**
 * 更新模型轨迹图位置
 *
 * @param {number} updateDuration 从上一位置运动到新位置花费的时间（单位：秒）
 */
function updateModelTrailLayerCoord(updateDuration = 1) {
  let current = formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss');
  let jsonData = {
    id: 'ModelTrailLayer',
    name: 'modelTrailLayer',
    coordType: 0,
    coordTypeZ: 0,
    isAppend: true,
    duration: updateDuration,
    data: [],
  };
  if (rocketData[current]) {
    rocketData[current].forEach((data) => {
      jsonData.data.push({
        id: 'spacecraftId', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
        label: data.Id, // 标签文本
        coord: [data.Lon, data.Lat], // XY 轴坐标，X：经度；Y：纬度
        coordZ: data.Alt * 1000.0 + 130,
        rotation: [180 - data.Yaw, -data.Pitch, 180 - data.Roll],
        type: 'red', // 模型图例类别
      });
    });
  }

  updatePropertyPanel(jsonData.data);

  appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
    //console.log(result)
    if (needClearTrail) {
      clearOverlayTrail();
      needClearTrail = false;
    }
  });
}

// 更新模型轨迹图数据 每秒执行一次
function updateModelTrailInterval() {
  updateModelTrailLayerCoord(1);
  playAnimation();
  updateTimelineControl();

  updateTimer = setInterval(() => {
    currentTime = new Date(currentTime.getTime() + speed * 1000);

    // 添加时间结束点逻辑
    if (currentTime.getTime() >= endTime.getTime()) {
      clearInterval(updateTimer);
      updateTimer = '';
    }

    updateModelTrailLayerCoord(1);
    playAnimation();
    updateTimelineControl();
  }, 1000);
}
/**
 * 删除模型轨迹图层 复位用
 */
function removeModelTrailLayer() {
  let jsonData = {
    id: 'ModelTrailLayer', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    overlayType: 'modelTrailLayer', // 图层对象类别
  };

  appInstance.uniCall('removeOverlay', jsonData, (result) => {
    // console.log(result);
  });
}

/**
 * 移除图层尾迹 移除后更新模型轨迹图的移动时长
 */
function clearOverlayTrail() {
  // 移除尾迹
  let jsonData = {
    overlayType: 'modelTrailLayer',
  };

  appInstance.uniCall('clearOverlayTrail', jsonData, (result) => {
    // console.log(result);
  });
}

// #endregion ********** TGAPI 图层相关操作 **********

// #region ********** TGAPI 摄像机相关操作 **********

// 设置相机
function setCamera() {
  let jsonData = {
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    centerCoord: [-120.61063, 34.632031], // 中心点的坐标 lng,lat
    coordZ: 5054.1979389776, // Z 轴高度（单位：米）
    distance: 511807, // 镜头距中心点距离(单位:米)
    pitch: 73, // 镜头俯仰角(-89~89)
    heading: 3, // 镜头偏航角(0正北, 0~359)
    fly: false, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
    // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
    duration: 0, // 飞行时间，秒
  };

  appInstance.uniCall('setCamera', jsonData, (result) => {
    // console.log(result);
  });
}

// 模型跟随镜头
function followingCamera(relative) {
  if (relative === 'self') {
    setRotate(false);
  }
  setFollowing(relative);
}

// 获取当前是自身还是世界
function getFollowingCameraRelative() {
  if (btnCameraSelf.classList.contains('active')) {
    return 'self';
  }
  return 'world';
}

// 跟随
function setFollowing(relative) {
  let jsonData = {
    modelId: 'spacecraftId',
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: relative,
  };

  appInstance.uniCall('followingCamera', jsonData, (result) => {
    console.log(result);
  });
}

// 取消限制镜头
function freeCamera() {
  let jsonData = {
    state: 'free', //restricted：受限；free：不受限制
  };
  appInstance.uniCall('setCameraRestrictionState', jsonData, (result) => {
    // console.log(result);
  });
}

// 限制镜头世界
function restrictCamera() {
  let jsonData = {
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    limitPitch: [0, 89], //摄像机 镜头垂直俯仰角 限制 (-89~89)
    limitYaw: [0, 359], //摄像机 镜头水平摇摆角 限制 (0正北, 0~359)
    limitCoordZ: [0, 5055], //摄像机 坐标高度限制 (单位:米)
    limitDistance: [10, 611807], //摄像机 镜头距离限制 (单位:米)
    center: [-120.61063, 34.632031], //视点 限制区中心坐标
    radius: 30000000, //视点 限制区半径，会形成一个球体，并在所有条件中取交集
  };
  appInstance.uniCall('restrictCamera', jsonData, (result) => {
    // console.log(result);

    let jsonData2 = { state: 'restricted' }; //restricted：受限；free：不受限制
    appInstance.uniCall('setCameraRestrictionState', jsonData2, (result) => {
      // console.log(result);
    });
  });
}

// 开启/停止环绕
function onAutoRotationChange() {
  setRotate(chkRotate.checked);
}

// 设置环绕
function setRotate(enabled) {
  let jsonData = {
    enabled: enabled, // 是否启用相机围绕目标飞行
    duration: 60, // 飞行一周所需要的秒数，数值越大飞行越慢
    interruptable: true, // 是否可以被打断，默认为true
    direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
  };

  appInstance.uniCall('rotateCamera', jsonData, (result) => {
    // console.log(result);
  });
}

/**
 * 相机事件回调函数
 * @param {*} r 相机事件回调参数
 */
function handleFollowingCameraChanged(r) {
  if (r.relative === 'self') {
    btnCameraSelf.classList.add('active');
    btnCameraWorld.classList.remove('active');
  } else if (r.relative === 'world') {
    btnCameraSelf.classList.remove('active');
    btnCameraWorld.classList.add('active');
  }

  chkRotate.checked = r.enableRotate;
}

// #endregion ********** TGAPI 摄像机相关操作 **********

// #region ********** TGAPI 基准点和时间相关操作 **********

// 设置基准点
function setDefaultBaseCenter() {
  let jsonData = {
    originLon: -120.61063, // 中心点经度
    originLat: 34.632031, // 中心点纬度
    originHeight: 0, // 单位m
  };
  appInstance.uniCall('setBaseCenter', jsonData, (result) => {
    // console.log(result);
  });
}

/**
 * 设置环境时间
 *
 * @param {string} selectTime 为点击时间按钮时选择的时间来进行设置 不传为当前时间
 */
function setEnvTime(selectTime) {
  var newTime = new Date(currentTime.getTime());
  let envs = formatDate(newTime).split(' ');
  let jsonData = {
    envTime: selectTime ? `${selectTime}:00` : envs[1], // 设置时间，结合 envDate 属性和 setBaseCenter 接口，可以显示正确的日照角度
    envDate: envs[0], // 设置日期，结合 envTime 属性和 setBaseCenter 接口，可以显示正确的日照角度，暂时只支持流渲染
    fixedTime: false, // 时间是否固定，false：默认值，会从用户设置的时间，一秒一秒往后走，若走到晚上，则场景会变成黑夜效果，true：场景中的时间一直是用户设置的时间，暂时只支持流渲染
    alwaysForward: false, // 时间是否总是向前，false：如果新时间小于当前时间，时间会倒回去，true：如果新时间小于当前时间，会经历 23:59 分再到新时间
    duration: 1 / speed, // 切换时间，秒
  };

  appInstance.uniCall('setEnvTime', jsonData, (result) => {
    // console.log(result);
  });
}

// 设置天气 测试用
function setWeather() {
  let jsonData = {
    envWeather: 'Sunny', //PartlyCloudy
  };

  appInstance.uniCall('setEnvWeather', jsonData, (result) => {
    //console.log(result);
  });
}

// #endregion ********** TGAPI 基准点和时间相关操作 **********

// #region ********** HTML界面控件的事件处理函数 **********

/**
 * 处理时间轴上的点击事件。
 *
 * @param {Date} e - 表示关键帧对应的时间。
 * @param {number} index - 表示关键帧设置索引的整数。
 */
function onTimelineClick(e, index) {
  let preTime = currentTime; // 点击关键帧之前的时间
  currentTime = new Date(e);

  // 停止定时器，停止自动旋转
  clearInterval(updateTimer);
  updateTimer = '';
  setRotate(false);

  // 用 0s 更新到位置，并清空尾迹
  needClearTrail = true;
  updateModelTrailLayerCoord(0);

  // 确认动画是正向还是逆向 并设置相关动画的状态
  // Step2: 计算当前时间，模型所有关节的绝对值

  if (preTime.getTime() <= currentTime.getTime()) {
    // 正向时如果跳着点击关键帧，把跳过的动画状态设置为已完成
    for (const key in animationDetailList) {
      if (currentTime.getTime() > animationDetailList[key].start) {
        animationDetailList[key].state = 1;
      }
    }
  } else {
    // 逆向时恢复动画状态 播放过的设置为未播放 当前关键帧前面的动画设置为已完成
    for (const key in animationDetailList) {
      animationDetailList[key].state = 0;
      if (currentTime.getTime() > animationDetailList[key].start) {
        animationDetailList[key].state = 1;
      }
    }
  }

  // 设置关节数据
  setArticulation(index);

  onPlayClick();

  // 为防止跳转关键帧之前，视野被调整到不合适的位置，需要在这里重新用参数跟随一下
  setTimeout(() => {
    freeCamera();
    let jsonData2 = {
      state: 'stop',
    };

    appInstance.uniCall('setCameraFollowingState', jsonData2, (result) => {
      // console.log(result);
      setFollowing('world');
    });
  }, 1000);
}

/**
 * 设置模型的关节状态。
 *
 * @param {number} index - 动画数组的索引，用于获取当前的关节数据。
 *
 * 该函数根据当前时间与关节开始时间的比较，设置关节的状态。如果当前时间大于关节开始时间，
 * 则将关节状态设置为完成状态，否则将关节状态设置为初始状态。然后通过 `uniCall` 方法调用
 * `setModelArticulation` 接口来更新模型的关节状态。
 */
function setArticulation(index) {
  let currentKeyData = animationDetailList[timelineAnimationList[index]].articulationItems;

  // 当前时间大于关节开始时间 关节置为完成状态 否则关节开始时间置为初始状态
  let currentArticulationValue = [];
  currentKeyData.forEach((item) => {
    currentArticulationValue.push({
      articulation: item.articulationName,
      type: 'float',
      value: currentTime.getTime() > item.startTime ? item.endState : item.startState,
    });
  });
  let jsonData = {
    id: 'spacecraftId',
    layerId: 'ModelTrailLayer',
    duration: 0,
    data: currentArticulationValue,
  };
  console.log('setArticulation', jsonData);
  appInstance.uniCall('setModelArticulation', jsonData, (result) => {
    console.log(result);
  });
}

/**
 * 播放动画
 *
 */
function playAnimation() {
  for (const key in animationDetailList) {
    // 需要执行动画 开始时间小于等于当前时间的并且未播放，正常设置（播放）
    // 动画需要晚些执行，开始时间改为 开始时间 + 需要晚多久的时间
    if (
      animationDetailList[key].useAnimation &&
      currentTime.getTime() >= animationDetailList[key].start + animationDelayTime &&
      !animationDetailList[key].state
    ) {
      // 播放模型动画
      let jsonData = {
        id: 'spacecraftId',
        layerId: 'ModelTrailLayer',
        name: key,
        state: 'begin', // 状态是： "begin", "pause", "stop", "restart" 四种
      };

      appInstance.uniCall('playModelAnimation', jsonData, (result) => {
        console.log(result);
      });
      animationDetailList[key].state = 1;
    }
  }
}

/**
 * Step1: 获取模型动画并设置关节。
 *
 * 该函数调用 `getModelAnimation` 方法获取模型动画数据，并根据 `articulations` 对象设置每个关节的开始时间。
 * 然后，它会处理 `result.data` 以避免数据重复，并将处理后的关节项赋值给 `articulations` 对象。
 *
 */
function getModelAnimationAndSetArticulation() {
  let jsonData = {
    id: 'spacecraftId',
    layerId: 'ModelTrailLayer',
  };

  appInstance.uniCall('getModelAnimation', jsonData, (result) => {
    // 获取模型的全部动画数据，并且设置关节的开始时间
    result.data.forEach((item) => {
      item.articulationItems.forEach((t) => {
        // 设置关节的开始时间
        t.startTime = animationDetailList[item.name].start;
      });
    });

    // 缓存动画和关节项数据到全局变量：animationDetailList
    for (const key in animationDetailList) {
      // 复位时再次获取时底层有问题 result.data 会有多个，数据重复 前端处理下
      animationDetailList[key].articulationItems = result.data.slice(0, 4).map((e) => e.articulationItems[0]);
    }

    console.log('动画和关节项 data', animationDetailList);
  });
}

// 复位 (停止)
function onResetClick() {
  restrictCamera();

  // 重置环境时间
  setEnvTime();

  // 移除图层及定时器
  clearInterval(updateTimer);
  updateTimer = '';

  // 移除模型轨迹图
  removeModelTrailLayer();

  // 隐藏右侧属性面板
  document.querySelector('.attribute-list').style.display = 'none';
  // 初始化时间进度条
  currentTime = new Date('2009-07-14 18:15:00');
  // 更新时间轴控件
  updateTimelineControl();

  // 重置播放数据
  for (const key in animationDetailList) {
    animationDetailList[key].state = 0;
    animationDetailList[key].articulationItems = [];
  }

  // 重置轨迹图初始值
  addModelTrailLayer();
}

// 播放暂停
function onPlayClick() {
  if (updateTimer) {
    clearInterval(updateTimer);
    updateTimer = '';
  } else {
    // 添加结束位置再次开始逻辑
    if (currentTime.getTime() >= endTime.getTime()) {
      onResetClick();

      setTimeout(() => {
        updateModelTrailInterval();
        return;
      }, 1000);
    }
    updateModelTrailInterval();

    setEnvTime();
  }

  // 切换暂停和播放按钮的显示状态
  updatePlayPause();
}

// 获取界面元素，设置显示状态
function getUIAndSet() {
  chkRotate = document.querySelector('#chkRotate');
  btnCameraSelf = document.querySelector('#btnCameraSelf');
  btnCameraWorld = document.querySelector('#btnCameraWorld');
  document.getElementsByClassName('legends')[0].style.display = 'block';
  document.getElementsByClassName('time-panel')[0].style.display = 'block';
}

// 速度点击事件
function onSpeedClick(index) {
  var speeds = document.getElementsByClassName('zoomClass');
  for (let i = 0; i < speeds.length; i++) {
    speeds[i].classList.remove('active');
  }
  speeds[index - 1].classList.add('active');
  speed = index === 3 ? 4 : index;
  if (updateTimer) {
    clearInterval(updateTimer);
    updateModelTrailInterval();
  }
}

/**
 * 更新时间参数和界面元素的显示状态。
 *
 * 该函数会更新开始时间、当前时间和结束时间的显示内容，
 * 并根据进度百分比更新标记的宽度。同时，根据是否在更新计时器，
 * 切换暂停和播放按钮的显示状态。
 *
 * @function
 */
function updateTimelineControl() {
  // 获取开始时间、结束时间和当前时间
  let startTimes = startTime.getTime(); // 开始时间戳
  let endTimes = endTime.getTime(); // 结束时间戳
  let currentTimes = currentTime.getTime(); // 当前时间戳

  // 计算时间差和当前时间点的秒数
  let timeDifference = endTimes - startTimes;
  let currentTimeDiff = currentTimes - startTimes;

  // 计算当前时间在时间范围内的百分比
  percent = (currentTimeDiff / timeDifference) * 100;

  var startTimeDiv = document.getElementsByClassName('start-time')[0];
  var currentTimeDiv = document.getElementsByClassName('current-time')[0];
  var endTimeDiv = document.getElementsByClassName('end-time')[0];
  var mark = document.getElementsByClassName('mark')[0];

  startTimeDiv.innerHTML = `${formatDate(startTime, 'HH:mm:ss')}`;
  currentTimeDiv.innerHTML = `${formatDate(currentTime, 'HH:mm:ss')}`;
  endTimeDiv.innerHTML = `${formatDate(endTime, 'HH:mm:ss')}`;
  mark.style.width = `${percent}%`;

  // 切换暂停和播放按钮的显示状态
  updatePlayPause();
}

// 更新切换暂停和播放按钮的显示状态
function updatePlayPause() {
  var pause = document.getElementsByClassName('pause')[0];
  var playBack = document.getElementsByClassName('playBack')[0];
  pause.style.display = updateTimer ? 'block' : 'none';
  playBack.style.display = updateTimer ? 'none' : 'block';
}

// 展示属性列表
function updatePropertyPanel(data) {
  var listStats = document.getElementsByClassName('list-stats');
  var lastTime;
  data.forEach((val) => {
    listStats[0].parentElement.parentElement.style.display = 'block';
    lastTime = val;
    listStats[0].innerHTML = parseFloat(val.coord[0].toFixed(8));
    listStats[1].innerHTML = parseFloat(val.coord[1].toFixed(8));
    listStats[2].innerHTML = parseFloat(val.coordZ.toFixed(8));
    listStats[3].innerHTML = parseFloat(val.rotation[0].toFixed(8));
    listStats[4].innerHTML = parseFloat(val.rotation[1].toFixed(8));
    listStats[5].innerHTML = parseFloat(val.rotation[2].toFixed(8));
    if (val.coord[0] && val.coord[1] && this.lastTime) {
      var distance = calculateDistance(val.coord[0], val.coord[1], val.coordZ, this.lastTime.coord[0], this.lastTime.coord[1], this.lastTime.coordZ); // 计算两个经纬度之间的距离（单位：米）
      var timeInSeconds = 1; // 时间（单位：秒）
      var speedInMetersPerSecond = distance / timeInSeconds; // 计算速度（单位：米/秒）
      var speedInKmPerHour = ((speedInMetersPerSecond * 3.6) / speed).toFixed(2);
      listStats[6].innerHTML = speedInKmPerHour;
    } else {
      listStats[6].innerHTML = '0';
    }
  });
  this.lastTime = lastTime;
}

// 切换时间面板显隐
function showPanel(event) {
  if (lastEvent && lastEvent.target != event.target) {
    showPanel(lastEvent);
  }
  let target = event.target;

  if (target.classList.contains('disable')) {
    return;
  }

  let tag = target.getAttribute('data-tag');
  let show = Number(target.getAttribute('data-show'));
  let panel = document.querySelector(`.panel_${tag.toLowerCase()}`);
  if (show) {
    panel.classList.remove('active');
    target.classList.remove('active');
    target.setAttribute('data-show', 0);
    lastEvent = null;
  } else {
    panel.classList.add('active');
    target.classList.add('active');
    target.setAttribute('data-show', 1);
    let top = target.offsetTop + target.offsetParent.offsetTop - target.offsetParent.clientHeight / 2;
    let left = 290;
    panel.style.top = top + 'px';
    panel.style.left = left + 'px';
    lastEvent = event;
  }
}

// 关闭面板
function closePanel(tag) {
  let btn = document.querySelector(`#btn${tag}`);
  let panel = document.querySelector(`.panel_${tag.toLowerCase()}`);
  btn.classList.remove('active');
  btn.setAttribute('data-show', 0);
  panel.classList.remove('active');
  lastEvent = null;
}

// #endregion ********** HTML界面控件的事件处理函数 **********

// #region ********** 工具函数 **********

// 格式化日期时间
function formatDate(date, format = 'YYYY/MM/DD HH:mm:ss') {
  if (!date) return '';
  date = new Date(date);
  const year = date.getFullYear();
  let hour = date.getHours();
  const isMS = year == 1970;
  if (isMS) {
    hour -= 8;
  }
  var o = {
    'M+': date.getMonth() + 1, //月份
    'D+': date.getDate(), //日
    'H+': hour, //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
  };
  if (/(Y+)/.test(format)) format = format.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return format;
}

// 计算两点之间的距离
function calculateDistance(lon1, lat1, alt1, lon2, lat2, alt2) {
  let lat1Radians = (lat1 * Math.PI) / 180;
  let lon1Radians = (lon1 * Math.PI) / 180;
  let lat2Radians = (lat2 * Math.PI) / 180;
  let lon2Radians = (lon2 * Math.PI) / 180;

  let latDiff = lat2Radians - lat1Radians;
  let lonDiff = lon2Radians - lon1Radians;

  let a = Math.pow(Math.sin(latDiff / 2), 2) + Math.cos(lat1Radians) * Math.cos(lat2Radians) * Math.pow(Math.sin(lonDiff / 2), 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let R = 6371000; // 地球半径（单位：米）
  let distanceOnEarth = R * c;

  let altDiff = Math.abs(alt1 - alt2);
  let straightLineDist = Math.sqrt(Math.pow(distanceOnEarth, 2) + Math.pow(altDiff, 2));
  return straightLineDist;
}

// #endregion ********** 工具函数 **********

// #region ********** 从网络请求数据 **********

// 获取轨迹图数据
function getTrailData() {
  return new Promise((resolve) => {
    getJsonData(`./json/jsonData.json`, (res) => {
      res.forEach((item, index) => {
        item.Id = `${index + 1}`;
      });

      resolveTrailData(res);
      resolve();
    });
  });
}

// 处理轨迹图数据
function resolveTrailData(records, keyFrame) {
  if (!keyFrame) {
    let category = 'rocket';
    records.forEach((data) => {
      if (!this[category + 'Data'][data.Time]) {
        this[category + 'Data'][data.Time] = [];
      }
      this[category + 'Data'][data.Time].push(data);
    });
  }
}

// 获取json数据;
function getJsonData(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var res = JSON.parse(xhr.responseText);
      callback && callback(res);
    }
  };
  xhr.send();
}

// #endregion ********** 从网络请求数据 **********

window.onload = function () {
  // 初始化
  // 1. 获取数据
  // 2. 初始化图观场景
  // 3. 初始化时间轴
  getTrailData();
  init();
  updateTimelineControl();
};
