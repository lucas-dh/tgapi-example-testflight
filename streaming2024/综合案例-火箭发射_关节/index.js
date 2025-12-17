var updateTimer = undefined;
var currentTime = new Date('2009-07-14 18:15:00');
var timeKey = new Date(currentTime);
var timeStr = formatDate(currentTime, 'HHmm');
var percent = 0; // 播放时间占比，进度条使用
var airData = {}; // 正常飞机的数据
var startTime = new Date('2009-07-14 18:15:00');
var endTime = new Date('2009-07-14 18:35:0');
var setKeyFrameTime = new Date('2009-07-14 18:15:00');
var focusByLayerName = 'ModelTrailLayer';
var initializationPosition;
var speed = 1;

// 关键帧视角配置
var visualFieldLocation = [
  {
    modelId: 'spacecraftId',
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: 'world',
  },
  {
    modelId: 'spacecraftId',
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: 'world',
  },
  {
    modelId: 'spacecraftId',
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: 'world',
  },
  {
    modelId: 'spacecraftId',
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: 'world',
  },
  {
    modelId: 'spacecraftId',
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: 'world',
  },
  {
    modelId: 'spacecraftId',
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: 'world',
  },
];

// 关节数据
var articulations = {
  一级分离: {
    start: new Date('2009-07-14 18:17:48').getTime(), // 关节开始播放时间
    end: new Date('2009-07-14 18:17:51').getTime(), // 关节结束播放时间（开始加持续时间）
    state: 0, // 关节播放状态，0：未播放，1：已播放
    duration: 4, // 关节动画持续时间
    min: 0, // 关节最小值（开始状态值）
    max: 100, // 关节最大值（结束状态值）
  },
  整流罩脱离: {
    start: new Date('2009-07-14 18:18:18').getTime(),
    end: new Date('2009-07-14 18:18:21').getTime(),
    state: 0,
    duration: 4,
    min: 0,
    max: 100,
  },
  二级分离: {
    start: new Date('2009-07-14 18:25:00').getTime(),
    end: new Date('2009-07-14 18:25:03').getTime(),
    state: 0,
    duration: 4,
    min: 0,
    max: 100,
  },
  三级分离: {
    start: new Date('2009-07-14 18:26:00').getTime(),
    end: new Date('2009-07-14 18:26:03').getTime(),
    state: 0,
    duration: 4,
    min: 0,
    max: 100,
  },
};

var btnCameraSelf = undefined;
var btnCameraWorld = undefined;
var chkRotate = undefined;
var selectedTime = undefined;

// 初始化加载图观三维场景服务
function init() {
  // 初始化图观App
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: 'lnGb155f',
      url: 'https://172.16.1.225:9090',
    },
    (result) => {
      window.appInstance.uniCall(
        'addEventListener',
        {
          eventName: 'onServiceInit',
          callback: (res) => {
            let jsonData = {
              lightPower: 1, // 图层对象中如果带有发光特性的光的亮度，值域范围0.0 - 10.0，默认1.0
              isLayerTopMost: false, // 图层是否盖在所有模型的最前面，此选项作用于全部图层
              divTipMovingDelay: 200, // 使用HTML Div方法添加的Tip标牌和流画面同步延迟，默认200（单位毫秒）
              labelColorStyle: 'nonlinear',
            };

            appInstance.uniCall('setSceneEffect', jsonData, (result) => {
              // console.log(result);

              setBaseCenter();
              restrictCamera();
              //setCamera();
              setEnvTime();

              addModelTrailLayer();

              chkRotate = document.querySelector('#chkRotate');
              btnCameraSelf = document.querySelector('#btnCameraSelf');
              btnCameraWorld = document.querySelector('#btnCameraWorld');
              selectedTime = document.querySelector('#inputTime');
              document.getElementsByClassName('legends')[0].style.display = 'block';
              document.getElementsByClassName('time-panel')[0].style.display = 'block';

              // 注册跟随镜头改变事件
              window.appInstance.uniCall('addEventListener', {
                eventName: 'onFollowingCameraChanged',
                callback: (result) => {
                  console.log('onFollowingCameraChanged', result);
                  handleFollowingCameraChanged(result);
                },
              });
              //注册轨迹图层点击事件
              onModelTrailLayerClick();
            });
          },
        },
        (result) => {
          // console.log(result);
        }
      );
    }
  );
}

// 订阅模型轨迹图点击事件
function onModelTrailLayerClick() {
  appInstance.uniCall(
    'addEventListener',
    {
      eventName: 'onModelTrailLayerClick', // 事件名称 见图观官网统一API开发手册
      callback: function (event) {
        var lists = document.getElementsByClassName('list')[0].querySelectorAll('div');
        for (let i = 0; i < lists.length; i++) {
          if (event.idObj == lists[i].innerHTML) {
            lists[i].click();
          }
        }
      },
    },
    (result) => {
      // console.log(result);
    }
  );
}

function setWeather() {
  let jsonData = {
    envWeather: 'Sunny', //PartlyCloudy
  };

  appInstance.uniCall('setEnvWeather', jsonData, (result) => {
    //console.log(result);
  });
}

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
 * 添加模型轨迹图
 */
function addModelTrailLayer(show = true, callback) {
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
    visible: show,
    legends: [
      {
        name: 'red',
        modelType: 'Missile', // 新导弹 MissileNew    旧导弹AIM-120
        scale: 1,
        iconName: 'custom-icon_导弹_红方',
        trackColor: '#960248',
        trackBottomColor: '#FFB1B8',
        labelColor: '#ffB973',
        labelScale: 1,
        labelOffset: [0, 0, 0],
        labelBackgroundColor: '#000000',
      },
    ],
    data: [],
  };

  let startData = this.airData[formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss')];
  if (startData) {
    startData.forEach((data) => {
      jsonData.data.push({
        id: 'spacecraftId',
        label: 'rocket',
        coord: [data.Lon, data.Lat],
        coordZ: data.Alt * 1000.0 + 130,
        rotation: [180 - data.Yaw, -data.Pitch, 180 - data.Roll],
        type: 'red',
      });
    });
  }

  initializationPosition = jsonData.data;

  appInstance.uniCall('addModelTrailLayer', jsonData, (result) => {
    console.log(result);

    // 执行回调及如果图层隐藏设置图层显示
    callback && callback();

    if (!show) {
      // 跳转关键帧，添加对象时隐藏，添加后设置为显示
      setOverlayVisibility();
    }

    setFollowing(getFollowingCameraRelative(), 'spacecraftId');

    setTimelineTime();
  });
}

/**
 * 更新模型轨迹图位置
 */
function updateModelTrailLayerCoord() {
  let current = formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss');
  let jsonData = {
    id: 'ModelTrailLayer',
    name: 'modelTrailLayer',
    coordType: 0,
    coordTypeZ: 0,
    isAppend: true,
    duration: 1,
    data: [],
  };
  // 飞机数据
  if (airData[current]) {
    airData[current].forEach((data) => {
      jsonData.data.push({
        id: 'spacecraftId',
        label: 'rocket',
        coord: [data.Lon, data.Lat],
        coordZ: data.Alt * 1000.0 + 130,
        rotation: [180 - data.Yaw, -data.Pitch, 180 - data.Roll],
        type: 'red',
      });
    });
  }

  initializationPosition = jsonData.data;
  setPropertyGridValue(initializationPosition);

  appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
    //console.log(result);
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
function setFollowing(relative, id = 'spacecraftId') {
  let jsonData = {
    modelId: id,
    distance: 50,
    distanceMin: -10,
    distanceMax: 50000,
    pitch: 20,
    heading: 0,
    relative: relative,
  };

  appInstance.uniCall('followingCamera', jsonData, (result) => {
    console.log('followingCamera:');
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

// 显示轨迹图
function setOverlayVisibility() {
  let jsonData = {
    id: 'ModelTrailLayer',
    overlayType: 'modelTrailLayer',
    visible: true,
  };

  appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
    console.log(result);
  });
}

// 设置基准点
function setBaseCenter() {
  let jsonData = {
    originLon: -120.61063, // 中心点经度
    originLat: 34.632031, // 中心点纬度
    originHeight: 0, // 单位m
  };
  appInstance.uniCall('setBaseCenter', jsonData, (result) => {
    // console.log(result);
  });
}

// 设置环境时间
function setEnvTime2(envT) {
  var newTime = new Date(currentTime.getTime());
  let envs = formatDate(newTime).split(' ');
  let jsonData = {
    envTime: selectedTime.value + ':00',
    envDate: envs[0],
    fixedTime: false,
    alwaysForward: false,
    duration: 1 / speed,
  };

  appInstance.uniCall('setEnvTime', jsonData, (result) => {
    // console.log(result);
  });
}

// 设置环境时间
function setEnvTime() {
  // var newTime = new Date(currentTime.getTime() + 5 * 60 * 60 * 1000);

  var newTime = new Date(currentTime.getTime());
  let envs = formatDate(newTime).split(' ');
  let jsonData = {
    envTime: envs[1], // 设置时间，结合 envDate 属性和 setBaseCenter 接口，可以显示正确的日照角度
    envDate: envs[0], // 设置日期，结合 envTime 属性和 setBaseCenter 接口，可以显示正确的日照角度，暂时只支持流渲染
    fixedTime: false, // 时间是否固定，false：默认值，会从用户设置的时间，一秒一秒往后走，若走到晚上，则场景会变成黑夜效果，true：场景中的时间一直是用户设置的时间，暂时只支持流渲染
    alwaysForward: false, // 时间是否总是向前，false：如果新时间小于当前时间，时间会倒回去，true：如果新时间小于当前时间，会经历 23:59 分再到新时间
    duration: 1 / speed, // 切换时间，秒
  };

  appInstance.uniCall('setEnvTime', jsonData, (result) => {
    // console.log(result);
  });
}

// 设置时间参数
function setTimelineTime() {
  var startTimeDiv = document.getElementsByClassName('start-time')[0];
  var currentTimeDiv = document.getElementsByClassName('current-time')[0];
  var endTimeDiv = document.getElementsByClassName('end-time')[0];
  var mark = document.getElementsByClassName('mark')[0];
  var imageId = document.getElementById('imageId');
  var pause = document.getElementsByClassName('pause')[0];
  var playBack = document.getElementsByClassName('playBack')[0];

  startTimeDiv.innerHTML = `${formatDate(startTime, 'HH:mm:ss')}`;
  currentTimeDiv.innerHTML = `${formatDate(currentTime, 'HH:mm:ss')}`;
  endTimeDiv.innerHTML = `${formatDate(endTime, 'HH:mm:ss')}`;
  mark.style.width = `${percent}%`;
  if (updateTimer) {
    pause.style.display = 'block';
    playBack.style.display = 'none';
  } else {
    pause.style.display = 'none';
    playBack.style.display = 'block';
  }
}

// 开启/停止环绕
function changeRotate() {
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

// 设置关键帧
function setKeyFrame(e, index) {
  setKeyFrameTime = currentTime;
  currentTime = new Date(e);
  setProgressBar();

  clearInterval(updateTimer);
  updateTimer = '';
  setRotate(false);

  appInstance.uniCall('clearOverlayType', { overlayType: 'modelTrailLayer' }, (result) => {
    // console.log(result);

    addModelTrailLayer(false, initArticulation);

    setTimeout(() => {
      play();
    }, 1000);
    setTimeout(() => {
      setPropertyGridValue(initializationPosition);

      freeCamera();
      let jsonData2 = {
        state: 'stop',
      };

      appInstance.uniCall('setCameraFollowingState', jsonData2, (result) => {
        // console.log(result);
        appInstance.uniCall('followingCamera', visualFieldLocation[index], (result) => {
          // console.log(result);
        });
      });
    }, 2000);
  });

  setTimelineTime();
}

// 恢复关节相应状态
function initArticulation() {
  for (const key in articulations) {
    if (currentTime.getTime() < articulations[key].start) {
      // 统一瞬间设置（未播放状态）【逆向调整】
      let jsonData = {
        id: 'spacecraftId',
        layerId: 'ModelTrailLayer',
        duration: 0,
        data: [
          {
            articulation: key,
            type: 'float',
            value: articulations[key].min,
          },
        ],
      };
      appInstance.uniCall('setModelArticulation', jsonData, (result) => {
        console.log(result);
      });
    } else if (currentTime.getTime() > articulations[key].start) {
      // 统一瞬间设置（播放完毕状态）【正向跳帧】
      let jsonData = {
        id: 'spacecraftId',
        layerId: 'ModelTrailLayer',
        duration: 0,
        data: [
          {
            articulation: key,
            type: 'float',
            value: articulations[key].max,
          },
        ],
      };
      appInstance.uniCall('setModelArticulation', jsonData, (result) => {
        console.log(result);
      });
    }
  }
}

// 设置关节
function setArticulation() {
  for (const key in articulations) {
    // 开始时间小于等于当前时间的，正常设置（播放）
    if (currentTime.getTime() >= articulations[key].start) {
      let jsonData = {
        id: 'spacecraftId',
        layerId: 'ModelTrailLayer',
        duration: articulations[key].duration / speed,
        data: [
          {
            articulation: key,
            type: 'float',
            value: articulations[key].max,
          },
        ],
      };
      appInstance.uniCall('setModelArticulation', jsonData, (result) => {
        // console.log(result);
      });
    }
  }
}

// 速度点击事件
function speedClick(index) {
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

// 复位 (停止)
function reset() {
  restrictCamera();
  //setCamera();

  // 移除图层及定时器
  clearInterval(updateTimer);
  updateTimer = '';

  // 移除模型轨迹图
  removeModelTrailLayer();

  // 初始化时间进度条
  currentTime = new Date('2009-07-14 18:15:00');
  percent = 0;

  // 隐藏右侧属性面板
  document.querySelector('.attribute-list').style.display = 'none';

  // 重置轨迹图初始值
  addModelTrailLayer();

  setTimelineTime();

  // 重置环境时间
  setEnvTime();
}

// 播放暂停
function play() {
  if (updateTimer) {
    clearInterval(updateTimer);
    updateTimer = '';
  } else {
    // 添加结束位置再次开始逻辑
    if (currentTime.getTime() >= endTime.getTime()) {
      reset();

      setTimeout(() => {
        updateModelTrailInterval();
        return;
      }, 1000);
    }
    updateModelTrailInterval();

    setEnvTime();
  }
  setTimelineTime();
}

// 更新模型轨迹图数据 每秒执行一次
function updateModelTrailInterval() {
  updateModelTrailLayerCoord();
  setArticulation();

  updateTimer = setInterval(() => {
    currentTime = new Date(currentTime.getTime() + speed * 1000);

    // 添加时间结束点逻辑
    if (currentTime.getTime() >= endTime.getTime()) {
      clearInterval(updateTimer);
      updateTimer = '';
    }
    // setEnvTime();
    updateModelTrailLayerCoord();
    setArticulation();
    setProgressBar();
    setTimelineTime();
  }, 1000);
}

// 设置进度条
function setProgressBar() {
  // 获取开始时间、结束时间和当前时间
  let startTimes = startTime.getTime(); // 开始时间戳
  let endTimes = endTime.getTime(); // 结束时间戳
  let currentTimes = currentTime.getTime(); // 当前时间戳

  // 计算时间差和当前时间点的秒数
  let timeDifference = endTimes - startTimes;
  let currentTimeDiff = currentTimes - startTimes;

  // 计算当前时间在时间范围内的百分比
  percent = (currentTimeDiff / timeDifference) * 100;
  setTimelineTime();
}

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

//展示属性列表
function setPropertyGridValue(data) {
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
      var distance = calculateDistance(val.coord[0], val.coord[1], this.lastTime.coord[0], this.lastTime.coord[1]); // 计算两个经纬度之间的距离（单位：米）
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

// 拖动滚动条
function startDragProgressBar() {
  // 当前时间 - 开始时间        实际移动距离
  // 结束时间 - 开始时间        总距离
  let isDragging = true;
  const drag = (e) => {
    if (isDragging) {
      const timeline = document.querySelector('.time-line');
      const timelineRect = timeline.getBoundingClientRect();

      let newPosition = e.clientX - timelineRect.left;
      percent = (newPosition / timeline.clientWidth) * 100;
      // 根据滚动条比例换算当前时间
      let currentTimes = ((endTime.getTime() - startTime.getTime()) * newPosition) / timeline.clientWidth + startTime.getTime();
      currentTime = new Date(currentTimes);

      if (percent >= 100) {
        currentTime = endTime;
        percent = 100;
      }
      if (percent <= 0) {
        currentTime = startTime;
        percent = 0;
      }
      setTimelineTime();
    }
  };

  const stopDrag = () => {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

// 计算两点之间的距离
function calculateDistance(lon1, lat1, lon2, lat2) {
  const R = 6371e3; // 地球半径，单位米
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

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
    let category = 'air';
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

var lastEvent = null; // 上次面板操作事件

// 切换面板显隐
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

window.onload = function () {
  getTrailData();
  init();
  setTimelineTime();
  speedClick(1);
};
