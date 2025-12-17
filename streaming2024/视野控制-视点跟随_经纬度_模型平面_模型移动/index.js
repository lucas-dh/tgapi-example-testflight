let isShowCloud = true;
let legendsBtnListDom = null;
let showCloudCheckboxDom = null;

var updateTimer;

window.onload = function () {
  init();

  // // 获取显示云层复选框 dom 初始化默认值
  // showCloudCheckboxDom = document.querySelector('.show-cloud-btn input');
  // showCloudCheckboxDom.checked = isShowCloud;

  // // 获取飞入到社区及返回到地球两个按钮的 dom
  // legendsBtnListDom = document.querySelectorAll('.legends .div');
};

// 初始化场景
function init() {
  //初始化流场景
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: streaming2024Config.flatCamera, //StreamingServer服务器获取token
      url: streaming2024Config.url, //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
    },
    (result) => {
      window.appInstance.uniCall(
        'addEventListener',
        {
          eventName: 'onServiceInit',
          callback: (res) => {
            visualLimitation()
            window.appInstance.uniCall('addEventListener', {
                eventName: 'onFollowingCameraChanged',
                callback: (result) => {
                    // console.log('onFollowingCameraChanged', result);
                    document.getElementById('surround').checked = false;
                },
            });
          },
        },
        (result) => {
          console.log(result);
        }
      );
    }
  );
}

//视野限制 添加模型
function visualLimitation() {
  let jsonData = { state: 'free' }; //restricted：受限；free：不受限制
  appInstance.uniCall('setCameraRestrictionState', jsonData, result => {
    console.log(result);
  });
  let rowData = {
    id: "car01-1",
    coordType: 0,
    coordTypeZ: 0,
    coord: [116.4074, 39.9042],
    coordZ: 0,
    rotation: [0, 0, 0],
    alpha: 1,
    scale: 10,
    titleText: "标题",
    titleColor: "#ffffff",
    titleBackgroundColor: "#333333",
    titleFontSize: 10,
    titileAutoScale: false,
    visible: true,
    isReferenceType: false,
    modelType: "car01"
  }

  appInstance.uniCall('addModel', rowData, (result) => {
    console.log(result);
  });
}

// 聚焦模型
function focusingModel() {
  let jsonData = {
    id: 'car01-1',
    modelType: 'model',
    pitch: 30,
    heading: 0,
    distance: 5000000,
  };

  appInstance.uniCall('focusModel', jsonData, (result) => {
    console.log(result);
  });
}

function timeParameter(){
  var int = 3;
  updateTimer = setInterval(() => {
    document.getElementsByClassName('mark')[0].style.width = `${int}%`;
    if(int > 100){
      clearInterval(updateTimer);
    }
    int = int+0.1
  }, ((1000*10)/93)/10);
}

//移动到伦敦
function mobileLondon() {
  let jsonData = {
    id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    coord: [116.4074, 39.9042], // XY 轴坐标，X：经度；Y：纬度
    coordZ: 0, // Z 轴高度（单位：米）
    rotation: [278, 0, 0], // XYZ 三轴旋转度数（单位：度）
    scale: [10, 10, 10], // XYZ 三轴放缩倍数（单位：倍），对应场景发布时模型原始大小的缩放，将会覆盖addModel和其他setModelTransform等中的scale数值。
  };
  appInstance.uniCall('setModelTransform', jsonData, (result) => {
    console.log(result);
    clearInterval(updateTimer);
    timeParameter();
    let jsonData = {
      id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      coordX: -0.1278, // X 轴坐标  // 如果coordType: 0，表示经度，如果coordType: 1，表示 X 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordY: 51.5074, // Y 轴坐标  // 如果coordType: 0，表示纬度，如果coordType: 1，表示 Y 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordZ: 0, // Z 轴高度（单位：米）  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      duration: 10, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
    };
    appInstance.uniCall('setModelTransform2', jsonData, (result) => {
      console.log(result);
    });

  });
}

//移动到南非
function mobileSouthAfrica() {
  let jsonData = {
    id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    coord: [116.4074, 39.9042], // XY 轴坐标，X：经度；Y：纬度
    coordZ: 0, // Z 轴高度（单位：米）
    rotation: [230, 0, 0], // XYZ 三轴旋转度数（单位：度）
    scale: [10, 10, 10], // XYZ 三轴放缩倍数（单位：倍），对应场景发布时模型原始大小的缩放，将会覆盖addModel和其他setModelTransform等中的scale数值。
  };
  appInstance.uniCall('setModelTransform', jsonData, (result) => {
    console.log(result);
    clearInterval(updateTimer);
    timeParameter();
    let jsonData = {
      id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      coordX: 22.79216654, // X 轴坐标  // 如果coordType: 0，表示经度，如果coordType: 1，表示 X 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordY: -30.89872482, // Y 轴坐标  // 如果coordType: 0，表示纬度，如果coordType: 1，表示 Y 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordZ: 0, // Z 轴高度（单位：米）  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      duration: 10, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
    };
    appInstance.uniCall('setModelTransform2', jsonData, (result) => {
      console.log(result);
    });

  });
}

//移动到巴西圣保罗
function mobileBrazil() {
  let jsonData = {
    id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    coord: [116.4074, 39.9042], // XY 轴坐标，X：经度；Y：纬度
    coordZ: 0, // Z 轴高度（单位：米）
    rotation: [247, 0, 0], // XYZ 三轴旋转度数（单位：度）
    scale: [10, 10, 10], // XYZ 三轴放缩倍数（单位：倍），对应场景发布时模型原始大小的缩放，将会覆盖addModel和其他setModelTransform等中的scale数值。
  };
  appInstance.uniCall('setModelTransform', jsonData, (result) => {
    console.log(result);
    clearInterval(updateTimer);
    timeParameter();
    let jsonData = {
      id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      coordX: -46.6333, // X 轴坐标  // 如果coordType: 0，表示经度，如果coordType: 1，表示 X 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordY: -23.5505, // Y 轴坐标  // 如果coordType: 0，表示纬度，如果coordType: 1，表示 Y 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordZ: 0, // Z 轴高度（单位：米）  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      duration: 10, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
    };
    appInstance.uniCall('setModelTransform2', jsonData, (result) => {
      console.log(result);
    });

  });
}

//移动到悉尼
function mobileSydney() {
  let jsonData = {
    id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    coord: [116.4074, 39.9042], // XY 轴坐标，X：经度；Y：纬度
    coordZ: 0, // Z 轴高度（单位：米）
    rotation: [150, 0, 0], // XYZ 三轴旋转度数（单位：度）
    scale: [10, 10, 10], // XYZ 三轴放缩倍数（单位：倍），对应场景发布时模型原始大小的缩放，将会覆盖addModel和其他setModelTransform等中的scale数值。
  };
  appInstance.uniCall('setModelTransform', jsonData, (result) => {
    console.log(result);
    clearInterval(updateTimer);
    timeParameter();
    let jsonData = {
      id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      coordX: 151.2093, // X 轴坐标  // 如果coordType: 0，表示经度，如果coordType: 1，表示 X 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordY: -33.8688, // Y 轴坐标  // 如果coordType: 0，表示纬度，如果coordType: 1，表示 Y 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordZ: 0, // Z 轴高度（单位：米）  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      duration: 10, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
    };
    appInstance.uniCall('setModelTransform2', jsonData, (result) => {
      console.log(result);
    });
  });
}

//移动到纽约
function mobileNewYork() {
  let jsonData = {
    id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    coord: [116.4074, 39.9042], // XY 轴坐标，X：经度；Y：纬度
    coordZ: 0, // Z 轴高度（单位：米）
    rotation: [-90, 0, 0], // XYZ 三轴旋转度数（单位：度）
    scale: [10, 10, 10], // XYZ 三轴放缩倍数（单位：倍），对应场景发布时模型原始大小的缩放，将会覆盖addModel和其他setModelTransform等中的scale数值。
  };
  appInstance.uniCall('setModelTransform', jsonData, (result) => {
    console.log(result);
    clearInterval(updateTimer);
    timeParameter();
    let jsonData2 = {
      id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      coordX: -74.0060, // X 轴坐标  // 如果coordType: 0，表示经度，如果coordType: 1，表示 X 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordY: 40.7128, // Y 轴坐标  // 如果coordType: 0，表示纬度，如果coordType: 1，表示 Y 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      coordZ: 0, // Z 轴高度（单位：米）  // 如果值为null，或者没有传递这个属性，则表示不发生改变
      duration: 10, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
    };
    appInstance.uniCall('setModelTransform2', jsonData2, (result2) => {
      console.log(result2);
    });

  });
}

//移动到北京
function mobileBeijing() {
  let jsonData = {
    id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    coord: [116.4074, 39.9042], // XY 轴坐标，X：经度；Y：纬度
    coordZ: 0, // Z 轴高度（单位：米）
    rotation: [0, 0, 0], // XYZ 三轴旋转度数（单位：度）
    scale: [10, 10, 10], // XYZ 三轴放缩倍数（单位：倍），对应场景发布时模型原始大小的缩放，将会覆盖addModel和其他setModelTransform等中的scale数值。
  };
  appInstance.uniCall('setModelTransform', jsonData, (result) => {
    console.log(result);
  });
}

//模型跟随镜头self
function followShotSelf() {
  let jsonData = {
    modelId: 'car01-1', // 镜头跟踪的模型Id，镜头和模型之前保持相对静止关系，支持运动的模型
    distance: 16000000, // 镜头与被跟踪物体的距离(单位:米)
    distanceMin: 1,	// 镜头与被跟踪物体的最近距离(单位:米)
    distanceMax: 20000000, // 镜头与被跟踪物体的最远距离(单位:米)
    pitch: 5, //镜头俯仰角(5~89)
    heading: 0, //镜头偏航角(0正北, 0~359)
    relative: "self", // 视角的相对位置，"self"，视角相对模型固定，"world"，视角相对世界固定。鼠标可以支持环绕模型旋转和缩放。如果在self模式下，鼠标旋转了，会自动变为world模式，直到用户重新调用followingCamera设置为self模式。
  };

  appInstance.uniCall('followingCamera', jsonData, result => {
    console.log(result);
  });
}


//模型跟随镜头world
function followShotWorld() {
  let jsonData = {
    modelId: 'car01-1', // 镜头跟踪的模型Id，镜头和模型之前保持相对静止关系，支持运动的模型
    distance: 16000000, // 镜头与被跟踪物体的距离(单位:米)
    distanceMin: 1,	// 镜头与被跟踪物体的最近距离(单位:米)
    distanceMax: 20000000, // 镜头与被跟踪物体的最远距离(单位:米)
    pitch: 5, //镜头俯仰角(5~89)
    heading: 0, //镜头偏航角(0正北, 0~359)
    relative: "world", // 视角的相对位置，"self"，视角相对模型固定，"world"，视角相对世界固定。鼠标可以支持环绕模型旋转和缩放。如果在self模式下，鼠标旋转了，会自动变为world模式，直到用户重新调用followingCamera设置为self模式。
  };

  appInstance.uniCall('followingCamera', jsonData, result => {
    console.log(result);
  });
}


function resetting() {
  let jsonData = {
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    centerCoord: [104.29655145981, 37.94116396052], // 中心点的坐标 lng,lat
    coordZ: 0, // Z 轴高度（单位：米）
    distance: 18000000, // 镜头距中心点距离(单位:米)
    pitch: 60, // 镜头俯仰角(-89~89)
    heading: 0, // 镜头偏航角(0正北, 0~359)
    fly: false, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
    // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
    duration: 0.5, // 飞行时间，秒
  };
  document.getElementById('surround').checked = false;
  document.getElementsByClassName('mark')[0].style.width = '3%'
  appInstance.uniCall('setCamera', jsonData, (result) => {
    console.log(result);
  });
  // window.appInstance.uniCall('switchState', { name: '默认状态', sceneName: '默认场景' }, (result) => {
    // console.log(111,result)
    let jsonDatas = {
      id: 'car01-1', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    };

    appInstance.uniCall('removeModel', jsonDatas, (result) => {
      // console.log(result);
      visualLimitation()
    });
  // });
}

function surround() {
  var surround = document.getElementById('surround').checked;
  if (surround) {
    surroundLens();
  } else {
    stopRotate();
  }
}

//环绕镜头
function surroundLens() {
  let jsonData = {
    enabled: true, // 是否启用相机围绕目标飞行
    duration: 60, // 飞行一周所需要的秒数，数值越大飞行越慢
    interruptable: true, // 是否可以被打断，默认为true
    direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
  };

  appInstance.uniCall('rotateCamera', jsonData, result => {
    console.log(result);
  });
}

// 停止环绕
function stopRotate() {
  let jsonData = {
    enabled: false, // 是否启用相机围绕目标飞行
    duration: 30, // 飞行一周所需要的秒数，数值越大飞行越慢
    interruptable: true, // 是否可以被打断，默认为true
    direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
  };

  appInstance.uniCall('rotateCamera', jsonData, (result) => {
    console.log(result);
  });
}

