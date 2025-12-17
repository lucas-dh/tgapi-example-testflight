var updateTimer = undefined;
var currentTime = new Date('2016-6-24 10:00:00');
var timeKey = new Date(currentTime);
var timeStr = formatDate(currentTime, 'HHmm');
var percent = 0; // 播放时间占比，进度条使用
var idb = new Idb('dhCase', 'kz');
var timeData = {};
var airData = {}; // 正常飞机的数据
var destroyData = {}; // 销毁飞机的数据
var missileData = {}; // 导弹数据
var startTime = new Date('2016-6-24 10:00:00');
var endTime = new Date('2016-6-24 13:23:50');
var followingCameraId = ''; // 相机跟随对象Id，不需要默认值，默认值会导致开始就出现属性面板
var focusByLayerName = 'airModelTrailLayer';
var envTimer = undefined;
var initializationPosition;
var speed = 1;
var redArray = [];
var blueArray = [];
var redMissile = [];
var blueMissile = [];
var tabSelect;
var selectedAircraftId;
var addLandmark = false;
var missileRowData = [];
var categorys = {
  aircraftgps: 'air',
  missilecraftgps: 'missile',
  destroyplane: 'destroy',
};
// 红方飞机数组
var redAirArray = [
  '3000110',
  '3000108',
  '3000111',
  '3000112',
  '3000113',
  '3000114',
  '3000115',
  '3000116',
  '3000117',
  '3000118',
  '3000201',
  '3000205',
  '300010d',
  '300010f',
  '300020e',
  '3000105',
  '3000107',
  '300010e',
  '300401a',
  '3000616',
  '3009e05',
  '303b80d',
  '303bb14',
];
// 蓝方飞机数组
var blueAirArray = [
  '3003001',
  '3000102',
  '3000106',
  '300010c',
  '300010a',
  '3000104',
  '3000109',
  '300010b',
  '3000103',
  '3000208',
  '3000608',
  '3000119',
  '3004608',
  '3005302',
  '3000204',
];
// 蓝方导弹数组
var blueMissileArray = [
  '1c01',
  '2001',
  '2101',
  '1e01',
  '1f01',
  '1b01',
  '1d01',
  '1a01',
  '300dd02',
  '3015902',
  '301d419',
  '301d819',
  '303aa19',
  '303b719',
  '303f40f',
  '303fb03',
  '303d010',
  '3041712',
  '304780e',
  '304a50f',
  '304b416',
  '304b90e',
  '304df10',
  '306ed02',
  '306fe02',
  '306ee02',
  '306fd02',
  '306d116',
  '3071e02',
  '306db17',
  '306e516',
  '306e40e',
  '3071f02',
  '306e30e',
  '300a003',
  '300c504',
  // 以下为数据对比补充ID
  '3005303',
  '300a103',
  '3009f18',
  '300dd04',
  '300ef02',
  '3013902',
  '3013a02',
  '3013b02',
  '301330f',
  '3014802',
  '3015002',
  '3024216',
  '3027611',
  '3027e16',
  '3027911',
  '3027a11',
  '3034619',
  '303b615',
  '303b819',
  '303d10b',
  '303da15',
  '303f803',
  '303fb0b',
  '3040f0f',
  '3042b0f',
  '304d90e',
  '304e40e',
  '304e519',
  '3051f16',
  '3051b0f',
  '3054415',
  '3056e0b',
  '3067a10',
  '306be0b',
  '306cd0b',
  '306ce0b',
  '306d50b',
  '3069810',
  '3072002',
];
// 红方导弹数组
var redMissileArray = [
  '2401',
  '2301',
  '301a70e',
  '303ba16',
  '303bb16',
  '300df13',
  '300d911',
  '3005516',
  '3009c15',
  '300c816',
  '3026910',
  '302aa14',
  '302ab0d',
  '302ab14',
  '302b012',
  '3032012',
  '3032112',
  '3033d0d',
  '3033e0d',
  '3034815',
  '3035812',
  '303530f',
  '3035819',
  '3038f19',
  '3039612',
  '304bc0e',
  '3051a0f',
  '3051c12',
  '305450f',
  '3054315',
  '3055315',
  '305540e',
  '3055503',
  '3055603',
  '3056d0b',
  '305730e',
  '3056f0b',
  '302aa04',
  '3033c04',
  '306ec02',
  '3071316',
  '3074916',
  '3074e16',
  '3074f16',
  '3075c16',
  '3075d16',
  'c9c01',
  'ca001',
  '3077617',
  '3023c11',
  '302aa0d',
  '3009210',
  '3023e17',
  '3023f05',
];
// 关键帧视角配置
var visualFieldLocation = [
  {
    modelId: '3000109',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 10,
    heading: 251,
    relative: 'world',
  },
  {
    modelId: '3005302',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 15,
    heading: 334,
    relative: 'world',
  },
  {
    modelId: '300010d',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 5,
    heading: 109,
    relative: 'world',
  },
  {
    modelId: '3009e05',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 5,
    heading: 45,
    relative: 'world',
  },
  {
    modelId: '300010a',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 10,
    heading: 311,
    relative: 'world',
  },
];

var chkRotate = undefined;

// 初始化加载图观三维场景服务
function init() {
  // 初始化图观App
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: '4BUx1416', //StreamingServer服务器获取token  4BUx1416   LIBbZPIx
      url: 'https://172.16.1.225:9090', //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
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
              labelColorStyle: 'default',
            };

            appInstance.uniCall('setSceneEffect', jsonData, (result) => {
              // console.log(result);

              let jsonData2 = {
                width: window.innerWidth,
                height: window.innerHeight,
                qp: 40,
                fpsMax: 60,
              };
              appInstance.uniCall('setResolution', jsonData2, (result) => {
                // console.log(result);
              });

              setBaseCenter();
              restrictCamera();
              setCamera();
              setEnvTime();
              addBlackSea();

              connctServer();

              chkRotate = document.querySelector('#chkRotate');
              document.getElementsByClassName('legends')[0].style.display = 'block';
              document.getElementsByClassName('time-panel')[0].style.display = 'block';

              // 注册跟随镜头改变事件
              window.appInstance.uniCall('addEventListener', {
                eventName: 'onFollowingCameraChanged',
                callback: (result) => {
                  // console.log('onFollowingCameraChanged', result);
                  handleFollowingCameraChanged(result);
                },
              });
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

// 连接模型型号服务器
function connctServer() {
  let jsonData = {
    name: 'luanyi', // 中心点经度
    address: 'http://172.16.5.30:5009/v1/public/location/sw5tviscbjqb0gt2/twinEasyCategoryId/{iconModelId}', // 中心点纬度
    token: 'ABCDEFG', // 单位m
  };
  appInstance.uniCall('connectAssetServer', jsonData, (result) => {
    addModelTrailLayer('air');
    addModelTrailLayer('missile');
    //注册轨迹图层点击事件
    onModelTrailLayerClick();
  });
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

/** 添加地标图层
 * @param {Array} records - 地标图层数据
 */
function addLandmarkLayer(records) {
  let jsonData = {
    id: 'landmarkLayer', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    name: '地标图层', // 图层名称，支持为图层自定义名称
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    autoScale: false, // 默认false，如果开启true后，图标会按照是摄像机远近自动缩放大小
    visible: true, // 添加当前图层时默认是显示还是隐藏
    legends: [
      // 定义图层包含图例，支持为不同图例定义各自样式
      {
        name: 'city', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
        color: '#FFFFFF', // 颜色（HEX 颜色值）
        iconName: 'custom-icon_town', // 内置图标名称，见图观官网统一API开发手册
        iconScale: 0.7, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
        labelScale: 0.5, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
      },
      {
        name: 'town', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
        color: '#FFFFFF', // 颜色（HEX 颜色值）
        iconName: 'custom-icon_town', // 内置图标名称，见图观官网统一API开发手册
        iconScale: 0.7, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
        labelScale: 0.5, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
      },
    ],
    data: [
      // 定义图层可视化数据
    ],
  };

  records.forEach((record) => {
    jsonData.data.push({
      id: record.osm_id,
      type: record.type,
      label: record.name,
      coord: [record.X, record.Y],
      coordZ: 0,
    });
  });

  appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
    // console.log(result);
  });
}

// 设置相机
function setCamera() {
  let jsonData = {
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    centerCoord: [39.660310731151, 43.21953957886], // 中心点的坐标 lng,lat
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
 * @param {string} category - 两个参数 'air' 和 'missile' 飞机和导弹
 */
function removeModelTrailLayer(category) {
  let jsonData = {
    id: category + 'ModelTrailLayer', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    overlayType: 'modelTrailLayer', // 图层对象类别
  };

  appInstance.uniCall('removeOverlay', jsonData, (result) => {
    // console.log(result);
  });
}

/**
 * 添加模型轨迹图
 * @param {string} category - 两个参数 'air' 和 'missile' 飞机和导弹
 */
function addModelTrailLayer(category) {
  let jsonData = {
    id: category + 'ModelTrailLayer',
    serverName: 'luanyi',
    name: category + 'modelTrailLayer',
    coordType: 0,
    coordTypeZ: 0,
    snapSurface: 0,
    duration: 1,
    modelMaxDistance: 100,
    iconMaxDistance: 100000000000000000,
    isAutoRotation: category === 'missile',
    trackStyle: 'belt',
    trackDuration: 90,
    trackWidth: category === 'missile' ? 1 : 9,
    trackVisible: 'ShowAll',
    objLife: 0,
    // modelTrailDataId: '',
    // isReferenceType: false,
    visible: true,
    legends: [
      {
        name: 'red',
        iconModelId: 'je0fdjgj1rxxwotc',
        modelType: category === 'missile' ? 'AIM-120' : 'F-15',
        scale: 1,
        iconName: category === 'missile' ? 'custom-icon_导弹_红方' : 'custom-icon_飞机_红方',
        trackColor: '#FF3131',
        trackBottomColor: '#FFB086',
        labelColor: '#ffB973',
        labelScale: 1,
        labelOffset: [0, 0, 0],
        labelBackgroundColor: '#00004D',
      },
      {
        name: 'blue',
        iconModelId: 'je0fdjgj1rxxwotc',
        modelType: category === 'missile' ? 'AIM-120' : 'FA-18',
        scale: 1,
        iconName: category === 'missile' ? 'custom-icon_导弹_蓝方' : 'custom-icon_飞机_蓝方',
        trackColor: '#00A9FB',
        trackBottomColor: '#82FFE2',
        labelColor: '#4DFFFF',
        labelScale: 1,
        labelOffset: [0, 0, 0],
        labelBackgroundColor: '#00004D',
      },
    ],
    data: [],
  };

  let startData = this[category + 'Data'][formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss')];
  if (startData) {
    startData.forEach((data) => {
      let legendName;
      if (redAirArray.includes(data.Id)) {
        legendName = 'red';
      } else {
        legendName = 'blue';
      }
      jsonData.data.push({
        id: data.Id,
        label: data.Id,
        coord: [data.Longitude, data.Latitude],
        coordZ: data.Altitude,
        scale: [1, 1, 1],
        rotation: [-data.Yaw - 180, -data.Pitch, (180 - data.Roll) % 360],
        type: legendName,
      });
    });
  }
  if (category === 'air') {
    initializationPosition = jsonData.data;
  }
  appInstance.uniCall('addIconModelTrailLayer', jsonData, (result) => {
    jsonData.data.forEach((val) => {
      if (redAirArray.indexOf(val.id) >= 0) {
        if (!(redArray.indexOf(val.id) >= 0)) {
          redArray.push(val.id);
        }
      }
      if (blueAirArray.indexOf(val.id) >= 0) {
        if (!(blueArray.indexOf(val.id) >= 0)) {
          blueArray.push(val.id);
        }
      }
      if (blueMissileArray.indexOf(val.id) >= 0) {
        if (!(blueMissile.indexOf(val.id) >= 0)) {
          blueMissile.push(val.id);
        }
      }
      if (redMissileArray.indexOf(val.id) >= 0) {
        if (!(redMissile.indexOf(val.id) >= 0)) {
          redMissile.push(val.id);
        }
      }
    });
    aircraftTabClick(tabSelect);
    timeParameter();
  });
}

// 移除模型轨迹图数据
function removeModelTrailLayerCoord() {
  let current = formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss');
  var ids = [];
  // 销毁飞机
  if (!destroyData[current]) return;
  destroyData[current].forEach((data) => {
    ids.push(data.Id);
  });
  let jsonData = {
    overlayType: 'iconModelTrailLayer', // 图层对象类别
    idLayer: 'airModelTrailLayer', // 图层对象id，只支持带有子对象的图层
    id: '', // 需要删除的图层子对象id
    ids: ids, // 需要删除的图层子对象id数组，如果这个不为空，则会和id一起被删除
  };
  appInstance.uniCall('removeLayerObj', jsonData, (result) => {
    // console.log("removeLayerObj 飞机");
    // console.log(ids);
  });

  //添加销毁飞机
  if (!addLandmark) {
    let jsonDataLayer = {
      id: 'destroyAircraft', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      name: '销毁飞机', // 图层名称，支持为图层自定义名称
      coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      autoScale: false, // 默认false，如果开启true后，图标会按照是摄像机远近自动缩放大小
      visible: true, // 添加当前图层时默认是显示还是隐藏
      legends: [
        // 定义图层包含图例，支持为不同图例定义各自样式
        {
          name: 'redplane', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
          color: '#ffB973', // 颜色（HEX 颜色值）
          iconName: 'custom-icon_飞机_红方_destroy', // 内置图标名称，见图观官网统一API开发手册
          iconScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
          labelScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
        },
        {
          name: 'blueplane', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
          color: '#4DFFFF', // 颜色（HEX 颜色值）
          iconName: 'custom-icon_飞机_蓝方_destroy', // 内置图标名称，见图观官网统一API开发手册
          iconScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
          labelScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
        },
      ],
      data: [],
    };
    destroyData[current].forEach((record) => {
      jsonDataLayer.data.push({
        id: record.Id,
        type: redAirArray.includes(record.Id) ? 'redplane' : 'blueplane',
        label: record.Id,
        coord: [record.Longitude, record.Latitude],
        coordZ: record.Altitude,
      });
    });
    appInstance.uniCall('addLandmarkLayer', jsonDataLayer, (result) => {
      addLandmark = true;
    });
  } else {
    let jsonDataLayer = {
      id: 'destroyAircraft', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
      name: '销毁飞机', // 图层名称，支持为图层自定义名称
      coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      isAppend: true, // 是否追加数据（按顺序），true：按新数据 更新原有重复数据 & 追加新数据；false：清除原有数据 & 重建新数据
      data: [],
    };

    destroyData[current].forEach((record) => {
      jsonDataLayer.data.push({
        id: record.Id,
        type: redAirArray.includes(record.Id) ? 'redplane' : 'blueplane',
        label: record.Id,
        coord: [record.Longitude, record.Latitude],
        coordZ: record.Altitude,
      });
    });
    appInstance.uniCall('updateLandmarkLayerCoord', jsonDataLayer, (result) => {
      // console.log(result);
    });
  }
}

/**
 * 更新模型轨迹图位置
 * @param {string} category - 两个参数 'air' 和 'missile' 飞机和导弹
 */
function updateModelTrailLayerCoord(category) {
  let current = formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss');
  let jsonData = {
    id: category + 'ModelTrailLayer',
    name: category + 'modelTrailLayer',
    coordType: 0,
    coordTypeZ: 0,
    isAppend: true,
    duration: 1,
    data: [],
  };
  if (category == 'air') {
    // 飞机数据
    if (airData[current]) {
      // 正常飞机
      airData[current].forEach((data) => {
        var legendName = 'red';
        if (!redAirArray.includes(data.Id)) {
          legendName = 'blue';
        }

        jsonData.data.push({
          id: data.Id, // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          scale: [1, 1, 1],
          label: data.Id, // 标签文本
          coord: [data.Longitude, data.Latitude], // XY 轴坐标，X：经度；Y：纬度
          coordZ: data.Altitude, // Z 轴高度（单位：米）
          rotation: [-data.Yaw - 180, -data.Pitch, (180 - data.Roll) % 360],
          // rotation: [-data.Yaw, -data.Pitch, -((180 - data.Roll) % 360)], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
          type: legendName, // 模型图例类别
        });
      });
    }
  } else {
    // 导弹数据
    if (missileData[current]) {
      missileData[current].forEach((data) => {
        var legendName = 'red';
        if (!redMissileArray.includes(data.Id)) {
          legendName = 'blue';
        }

        jsonData.data.push({
          id: data.Id, // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          scale: [1, 1, 1],
          label: data.Id, // 标签文本
          coord: [data.Longitude, data.Latitude], // XY 轴坐标，X：经度；Y：纬度
          coordZ: data.Altitude, // Z 轴高度（单位：米）
          rotation: [-data.Yaw - 180, -data.Pitch, (180 - data.Roll) % 360],
          // rotation: [-data.Yaw, -data.Pitch, -((180 - data.Roll) % 360)], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
          type: legendName, // 模型图例类别
        });
      });
    }
  }

  if (category === 'air') {
    initializationPosition = jsonData.data;
    attributeList(initializationPosition);
  }
  appInstance.uniCall('updateIconModelTrailLayerCoord', jsonData, (result) => {
    if (category == 'air') {
      redArray = [];
      blueArray = [];
      jsonData.data.forEach((val) => {
        if (redAirArray.indexOf(val.id) >= 0) {
          redArray.push(val.id);
        }
        if (blueAirArray.indexOf(val.id) >= 0) {
          blueArray.push(val.id);
        }
      });
    } else {
      blueMissile = [];
      redMissile = [];
      jsonData.data.forEach((val) => {
        if (blueMissileArray.indexOf(val.id) >= 0) {
          blueMissile.push(val.id);
        }
        if (redMissileArray.indexOf(val.id) >= 0) {
          redMissile.push(val.id);
        }
      });
    }
    if (category === 'missile') {
      var deletes = [];
      for (let i = 0; i < missileRowData.length; i++) {
        var type = jsonData.data.filter((r) => r.id === missileRowData[i].id);
        if (!type.length) {
          deletes.push(missileRowData[i].id);
          for (let e = 0; e < blueMissile.length; e++) {
            if (blueMissile[e] === missileRowData[i].id) {
              blueMissile.splice(e, 1);
              e--;
            }
          }
          for (let e = 0; e < redMissile.length; e++) {
            if (redMissile[e] === missileRowData[i].id) {
              redMissile.splice(e, 1);
              e--;
            }
          }
        }
      }
      if (deletes.length) {
        removeModelTrailLayerMissile(deletes);
      }
      missileRowData = jsonData.data;
    }
    aircraftTabClick(tabSelect);
  });
}

// 移除导弹模型轨迹图
function removeModelTrailLayerMissile(ids) {
  let jsonData = {
    overlayType: 'iconModelTrailLayer', // 图层对象类别，只支持带有子对象的图层，包括：landmarkLayer，bubbleLayer，eventLayer，trailLayer，trackLayer，typeAreaLayer，colorAreaLayer，roadSgHeatLayer，3DColumnLayer，3DGridLayer，modelTrailLayer，modelLandmarkLayer，3DMarkerLandmarkLayer
    idLayer: 'missileModelTrailLayer', // 图层对象id，只支持带有子对象的图层
    id: '', // 需要删除的图层子对象id
    ids: ids, // 需要删除的图层子对象id数组，如果这个不为空，则会和id一起被删除
  };
  appInstance.uniCall('removeLayerObj', jsonData, (result) => {
    // console.log("removeLayerObj 导弹");
    // console.log(ids);
  });
}

// 飞机列表点击事件
function followingCameraBtn(id, category) {
  followingCameraId = id;
  let jsonData = {
    // modelId: '3000201', // 镜头跟踪的模型Id，镜头和模型之前保持相对静止关系，支持运动的模型
    modelId: followingCameraId, // 镜头跟踪的模型Id，镜头和模型之前保持相对静止关系，支持运动的模型
    distance: category === 'air' ? 30 : 10, // 镜头与被跟踪物体的距离(单位:米)
    distanceMin: 10, // 镜头与被跟踪物体的最近距离(单位:米)
    distanceMax: 50000, // 镜头与被跟踪物体的最远距离(单位:米)
    pitch: 20, //镜头俯仰角(5~89)
    heading: 90, //镜头偏航角(0正北, 0~359)
    relative: 'world', // 视角的相对位置，"self"，视角相对模型固定，"world"，视角相对世界固定。鼠标可以支持环绕模型旋转和缩放。
  };

  attributeList(initializationPosition);

  freeCamera();

  let jsonData2 = {
    state: 'stop',
  };

  appInstance.uniCall('setCameraFollowingState', jsonData2, (result) => {
    // console.log(result);
    stopRotate();
    appInstance.uniCall('followingCamera', jsonData, (result) => {
      // console.log(result);
    });
  });
}

// 取消限制镜头
function freeCamera() {
  let jsonData2 = {
    state: 'free', //restricted：受限；free：不受限制
  };
  appInstance.uniCall('setCameraRestrictionState', jsonData2, (result) => {
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
    limitDistance: [1000, 611807], //摄像机 镜头距离限制 (单位:米)
    center: [39.660310731151, 43.21953957886], //视点 限制区中心坐标
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

// 设置基准点
function setBaseCenter() {
  let jsonData = {
    originLon: 40.78949, // 中心点经度
    originLat: 43.32718, // 中心点纬度
    originHeight: 0, // 单位m
  };
  appInstance.uniCall('setBaseCenter', jsonData, (result) => {
    // console.log(result);
  });
}

// 设置环境时间
function setEnvTime() {
  var newTime = new Date(currentTime.getTime() + 5 * 60 * 60 * 1000);
  let envs = formatDate(newTime).split(' ');
  let jsonData = {
    envTime: envs[1], // 设置时间，结合 envDate 属性和 setBaseCenter 接口，可以显示正确的日照角度
    envDate: envs[0], // 设置日期，结合 envTime 属性和 setBaseCenter 接口，可以显示正确的日照角度，暂时只支持流渲染
    fixedTime: false, // 时间是否固定，false：默认值，会从用户设置的时间，一秒一秒往后走，若走到晚上，则场景会变成黑夜效果，true：场景中的时间一直是用户设置的时间，暂时只支持流渲染
    alwaysForward: false, // 时间是否总是向前，false：如果新时间小于当前时间，时间会倒回去，true：如果新时间小于当前时间，会经历 23:59 分再到新时间
    duration: 1, // 切换时间，秒
  };

  appInstance.uniCall('setEnvTime', jsonData, (result) => {
    //console.log(result);
  });
}

// 设置时间参数
function timeParameter() {
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
  let enableRotate = chkRotate.checked;
  if (enableRotate) {
    appInstance.uniCall(
      'rotateCamera',
      {
        enabled: true, // 是否启用相机围绕目标飞行
        duration: 60, // 飞行一周所需要的秒数，数值越大飞行越慢
        interruptable: true, // 是否可以被打断，默认为true
        direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
      },
      (result) => {
        // console.log(result);
      }
    );
  } else {
    stopRotate();
  }
}

// 停止环绕
function stopRotate() {
  let jsonData = {
    enabled: false, // 是否启用相机围绕目标飞行
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
  chkRotate.checked = r.enableRotate;
}

// 设置关键帧
function setKeyFrame(e, int) {
  var startTimer = startTime.getTime();
  var endTimer = endTime.getTime();
  var timer = endTimer - startTimer;
  var timeline = document.querySelector('.time-line').clientWidth;
  currentTime = new Date(e);
  percent = (((currentTime.getTime() - startTimer) * (timeline / timer)) / timeline) * 100;

  if (percent >= 100) {
    currentTime = endTime;
    percent = 100;
  }
  if (percent <= 0) {
    currentTime = startTime;
    percent = 0;
  }
  clearInterval(updateTimer);
  updateTimer = '';
  stopRotate();

  timeKey = new Date(currentTime);
  if (timeKey.getTime() <= endTime.getTime()) {
    timeStr = formatDate(timeKey, 'HHmm');
    timeStr = timeStr.slice(0, -1) + '0';
    getTrailData();
  }

  let jsonData = {
    id: 'destroyAircraft', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    overlayType: 'landmarkLayer', // 图层对象类别
  };

  appInstance.uniCall('removeOverlay', jsonData, (result) => {
    // console.log(result);
    addLandmark = false;
  });

  appInstance.uniCall('clearOverlayType', { overlayType: 'iconModelTrailLayer' }, (result) => {
    // console.log(result);

    addModelTrailLayer('air');
    addModelTrailLayer('missile');
    setTimeout(() => {
      play();
    }, 1000);
    setTimeout(() => {
      // 要先看是红蓝飞机，然后切换红蓝选项卡后等飞机列表补充完毕再获取飞机元素进行滚动再跟随
      const modelId = visualFieldLocation[int].modelId;
      followingCameraId = modelId;

      selectedAircraftId = modelId;

      tabSelect = 2;
      if (redAirArray.includes(modelId)) {
        tabSelect = 1;
      }

      aircraftTabClick(tabSelect);

      const btn = document.querySelector(`.list [data-id="${modelId}"]`);

      attributeList(initializationPosition);
      freeCamera();
      let jsonData2 = {
        state: 'stop',
      };

      appInstance.uniCall('setCameraFollowingState', jsonData2, (result) => {
        // console.log(result);
        appInstance.uniCall('followingCamera', visualFieldLocation[int], (result) => {
          // console.log(result);
        });
      });

      if (!btn) {
        return;
      }
      btn.style.background = '#007CA0';
      // 计算滚动距离
      const container = btn.parentElement;
      const scrollDistance = btn.offsetTop - container.clientHeight / 2 + btn.clientHeight / 2;

      // 滚动到居中位置
      container.scrollTo({
        top: scrollDistance,
        behavior: 'smooth',
      });

      // btn.click();
    }, 2000);
  });

  timeParameter();
}

// 速度点击事件
function speedClick(int) {
  var speeds = document.getElementsByClassName('zoomClass');
  for (let i = 0; i < speeds.length; i++) {
    speeds[i].classList.remove('active');
  }
  speeds[int - 1].classList.add('active');
  speed = int === 3 ? 4 : int;
  if (updateTimer) {
    clearInterval(updateTimer);
    updateModelTrailInterval();
  }
}

// 渲染红蓝方飞机导弹面板列表
function aircraftTabClick(int) {
  tabSelect = int;
  var list = document.getElementsByClassName('list')[0];
  var listName = document.getElementsByClassName('guided-missile-list')[0];
  var imgList = document.getElementsByClassName('tab');
  for (let i = 0; i < imgList.length; i++) {
    imgList[i].style.background = '#002B32';
  }
  imgList[int - 1].style.background = '#007DA3';
  list.innerHTML = '';
  listName.innerHTML = '';
  if (int === 1) {
    // 动态创建红方对象列表和注册列表事件
    redArray.forEach((val) => {
      var newDiv = document.createElement('div');
      newDiv.onclick = function () {
        var lists = document.getElementsByClassName('list')[0].querySelectorAll('div');
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.background = null;
        }
        selectedAircraftId = newDiv.innerHTML;
        newDiv.style.background = '#007CA0';
        followingCameraBtn(val, 'air'); // 点击事件处理程序
      };
      newDiv.innerHTML = val;
      newDiv.setAttribute('data-id', val);
      if (selectedAircraftId === val) {
        newDiv.style.background = '#007CA0';
      }
      list.appendChild(newDiv);
    });

    redMissile.forEach((val) => {
      var newDiv = document.createElement('div');
      newDiv.onclick = function () {
        var lists = document.getElementsByClassName('guided-missile-list')[0].querySelectorAll('div');
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.background = null;
        }
        selectedAircraftId = newDiv.innerHTML;
        newDiv.style.background = '#007CA0';
        followingCameraBtn(val, 'missile'); // 点击事件处理程序
      };
      newDiv.innerHTML = val;
      newDiv.setAttribute('data-id', val);
      if (selectedAircraftId === val) {
        newDiv.style.background = '#007CA0';
      }
      listName.appendChild(newDiv);
    });
  } else if (int === 2) {
    // 动态创建蓝方对象列表和注册列表事件
    blueArray.forEach((val) => {
      var newDiv = document.createElement('div');
      newDiv.onclick = function () {
        var lists = document.getElementsByClassName('list')[0].querySelectorAll('div');
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.background = null;
        }
        selectedAircraftId = newDiv.innerHTML;
        newDiv.style.background = '#007CA0';
        followingCameraBtn(val, 'air'); // 点击事件处理程序
      };
      newDiv.innerHTML = val;
      newDiv.setAttribute('data-id', val);
      if (selectedAircraftId === val) {
        newDiv.style.background = '#007CA0';
      }
      list.appendChild(newDiv);
    });

    blueMissile.forEach((val) => {
      var newDiv = document.createElement('div');
      newDiv.onclick = function () {
        var lists = document.getElementsByClassName('guided-missile-list')[0].querySelectorAll('div');
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.background = null;
        }
        selectedAircraftId = newDiv.innerHTML;
        newDiv.style.background = '#007CA0';
        followingCameraBtn(val, 'missile'); // 点击事件处理程序
      };
      newDiv.innerHTML = val;
      newDiv.setAttribute('data-id', val);
      if (selectedAircraftId === val) {
        newDiv.style.background = '#007CA0';
      }
      listName.appendChild(newDiv);
    });
  }
}

// 复位 (停止)
function reset() {
  restrictCamera();
  setCamera();

  // 移除图层及定时器
  clearInterval(updateTimer);
  updateTimer = '';

  // 移除模型轨迹图
  removeModelTrailLayer('air');
  removeModelTrailLayer('missile');
  let jsonData = {
    id: 'destroyAircraft', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    overlayType: 'landmarkLayer', // 图层对象类别
  };

  appInstance.uniCall('removeOverlay', jsonData, (result) => {
    // console.log(result);
  });

  // 重置记录数组
  redArray = [];
  blueArray = [];
  missile = [];
  missileRowData = [];
  redMissile = [];
  blueMissile = [];

  // 初始化时间进度条
  currentTime = new Date('2016-6-24 10:00:00');
  percent = 0;

  // 清空已跟随对象记录并隐藏右侧属性面板
  addLandmark = false;
  followingCameraId = '';
  document.querySelector('.attribute-list').style.display = 'none';

  // 重置轨迹图初始值
  addModelTrailLayer('air');
  addModelTrailLayer('missile');

  timeParameter();
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
  }
  timeParameter();
}

// 更新模型轨迹图数据 每秒执行一次
function updateModelTrailInterval() {
  updateModelTrailLayerCoord('air');
  updateModelTrailLayerCoord('missile');
  removeModelTrailLayerCoord();
  updateTimer = setInterval(() => {
    currentTime = new Date(currentTime.getTime() + speed * 1000);

    // 添加时间结束点逻辑
    if (currentTime.getTime() >= endTime.getTime()) {
      clearInterval(updateTimer);
      updateTimer = '';
    }
    setEnvTime();
    updateModelTrailLayerCoord('air');
    updateModelTrailLayerCoord('missile');
    removeModelTrailLayerCoord();
    setProgressBar();
    timeParameter();
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
  timeParameter();
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
function attributeList(data) {
  var listStats = document.getElementsByClassName('list-stats');
  var lastTime;
  data.forEach((val) => {
    if (val.id === followingCameraId) {
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
    }
  });
  this.lastTime = lastTime;
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

function addBlackSea() {
  getJsonData('./json/blacksea.json', (res) => {
    addLandmarkLayer(res.RECORDS);
  });
}

function getAirAndMissile() {
  idb = new Idb('dhCase', 'kz');
}

// 获取轨迹图数据
function getTrailData() {
  return new Promise((resolve) => {
    idb.get(timeStr).then((result) => {
      if (result) {
        resolveTrailData(result.data, this.airData[result.data[0].Time] || this.missileData[result.data[0].Time] || this.destroyData[result.data[0].Time]);
        resolve();
      } else {
        getJsonData(`./json/${timeStr}.json`, (res) => {
          idb.add({ id: timeStr, data: res });
          resolveTrailData(res);
          resolve();
        });
      }
    });
  });
}

// 处理轨迹图数据
function resolveTrailData(records, keyFrame) {
  if (!keyFrame) {
    let category = 'air';
    records.forEach((data) => {
      category = categorys[data.Type];
      if (!this[category + 'Data'][data.Time]) {
        this[category + 'Data'][data.Time] = [];
      }
      this[category + 'Data'][data.Time].push(data);
    });
  }

  timeKey = new Date(timeKey.getTime() + 10 * 60 * 1000);
  if (timeKey.getTime() <= endTime.getTime()) {
    timeStr = formatDate(timeKey, 'HHmm');
    timeStr = timeStr.slice(0, -1) + '0';
    getTrailData();
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

window.onload = function () {
  getTrailData();
  init();
  timeParameter();
  aircraftTabClick(2);
  speedClick(1);
};
