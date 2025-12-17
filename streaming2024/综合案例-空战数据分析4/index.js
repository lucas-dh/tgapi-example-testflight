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
var redAircraftAliveList = [];
var blueAircraftAliveList = [];
var redMissileAliveList = [];
var blueMissileAliveList = [];
var selectedTab;
var selectedAircraftId;
var addLandmark = false;
var missileRowData = [];
var categorys = {
  aircraftgps: 'air',
  missilecraftgps: 'missile',
  destroyplane: 'destroy',
};
// 红方飞机数组
var redAircraftAllList = [
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
var blueAircraftAllList = [
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
var blueMissileAllList = [
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
var redMissileAllList = [
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
var keyFrameSettings = [
  {
    modelId: '3000109',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 10,
    heading: 251,
    relative: 'world',
    time: '2016-06-24 10:29:25',
  },
  {
    modelId: '3005302',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 15,
    heading: 334,
    relative: 'world',
    time: '2016-06-24 11:06:12',
  },
  {
    modelId: '300010d',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 5,
    heading: 109,
    relative: 'world',
    time: '2016-06-24 11:26:01',
  },
  {
    modelId: '3009e05',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 5,
    heading: 45,
    relative: 'world',
    time: '2016-06-24 12:12:56',
  },
  {
    modelId: '300010a',
    distance: 30,
    distanceMin: 10,
    distanceMax: 50000,
    pitch: 10,
    heading: 311,
    relative: 'world',
    time: '2016-06-24 12:27:50',
  },
];

// 是否自动旋转
var chkRotate = undefined;

// #region ********** TGAPI 初始化阶段 **********

// 初始化加载图观三维场景服务
function init() {
  // 初始化图观App
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: '4BUx1416', //StreamingServer服务器获取token
      url: 'https://172.16.1.225:9090', //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
    },
    (result) => {
      window.appInstance.uniCall('addEventListener', {
        eventName: 'onServiceInit',
        callback: (res) => initScene(),
      });
    }
  );
}

/**
 * 初始化场景设置，包括场景效果、分辨率、摄像机限制、环境时间等。
 *
 * @function initScene
 * @description 该函数设置场景的各种效果参数，并调用一系列函数来初始化场景中的模型、轨迹图层和事件处理。
 */
function initScene() {
  let sceneEffectData = {
    lightPower: 1, // 图层对象中如果带有发光特性的光的亮度，值域范围0.0 - 10.0，默认1.0
    isLayerTopMost: false, // 图层是否盖在所有模型的最前面，此选项作用于全部图层
    divTipMovingDelay: 200, // 使用HTML Div方法添加的Tip标牌和流画面同步延迟，默认200（单位毫秒）
    labelColorStyle: 'default',
  };

  appInstance.uniCall('setSceneEffect', sceneEffectData, (result) => {
    // console.log(result);
    let resolutionData = {
      width: window.innerWidth,
      height: window.innerHeight,
      qp: 40,
      fpsMax: 60,
    };
    appInstance.uniCall('setResolution', resolutionData, (result) => {
      // console.log(result);
    });

    setBaseCenter();
    restrictCamera();
    resetDefaultCamera();
    setEnvTime();
    getLandmarkAndAddLayer();
    addModelTrailLayer('air');
    addModelTrailLayer('missile');

    chkRotate = document.querySelector('#chkRotate');
    document.getElementsByClassName('legends')[0].style.display = 'block';
    document.getElementsByClassName('time-panel')[0].style.display = 'block';

    // 注册轨迹图层和摄像机事件
    addEventHandler();
  });
}

/**
 * 注册事件处理程序以处理跟随镜头改变和模型轨迹层点击事件。
 *
 * 该函数向 `appInstance` 注册两个事件监听器：
 * 1. `onFollowingCameraChanged`：当跟随镜头改变时触发，更新 `chkRotate` 的 `checked` 状态。
 * 2. `onModelTrailLayerClick`：当模型轨迹层被点击时触发，模拟点击与事件 `idObj` 匹配的列表项。
 */
function addEventHandler() {
  // 注册跟随镜头改变事件
  appInstance.uniCall('addEventListener', {
    eventName: 'onFollowingCameraChanged',
    callback: (result) => {
      // console.log('onFollowingCameraChanged', result);
      chkRotate.checked = result.enableRotate;
    },
  });

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

// #endregion ********** TGAPI 初始化阶段 **********

// #region ********** TGAPI 图层相关操作 **********

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

/**
 * 添加模型轨迹图层
 *
 * @param {string} category - 模型类别，可以是 'missile' 或 'air'
 *
 * @description
 * 该函数根据传入的类别参数，创建并添加一个模型轨迹图层。图层包含红方和蓝方的模型数据，
 * 并根据类别设置不同的轨迹样式和图标。函数还会根据当前时间从相应的数据源中获取初始数据，
 * 并将其添加到图层中。最后，调用 `appInstance.uniCall` 方法将图层添加到应用实例中。
 *
 * @example
 * addModelTrailLayer('missile');
 * addModelTrailLayer('air');
 */
function addModelTrailLayer(category) {
  let jsonData = {
    id: category + 'ModelTrailLayer',
    name: 'modelTrailLayer',
    coordType: 0,
    coordTypeZ: 0,
    snapSurface: 0,
    duration: 1,
    modelMaxDistance: 100,
    iconMaxDistance: 100000000000000000,
    isAutoRotation: category === 'missile',
    trackStyle: 'belt',
    trackDuration: 900,
    trackWidth: category === 'missile' ? 1 : 9,
    objLife: 0,
    modelTrailDataId: '',
    isReferenceType: false,
    visible: true,
    legends: [
      {
        name: 'red',
        modelType: category === 'missile' ? 'AIM-120' : 'F-15',
        scale: 1,
        iconName: category === 'missile' ? 'custom-icon_导弹_红方' : 'custom-icon_飞机_红方',
        trackColor: '#FF3131',
        trackBottomColor: '#FFB086',
        labelColor: '#ffB973',
        labelScale: 1,
        labelOffset: [0, 0, 0],
        labelBackgroundColor: '#0000004D',
      },
      {
        name: 'blue',
        modelType: category === 'missile' ? 'AIM-120' : 'FA-18',
        scale: 1,
        iconName: category === 'missile' ? 'custom-icon_导弹_蓝方' : 'custom-icon_飞机_蓝方',
        trackColor: '#00A9FB',
        trackBottomColor: '#82FFE2',
        labelColor: '#4DFFFF',
        labelScale: 1,
        labelOffset: [0, 0, 0],
        labelBackgroundColor: '#0000004D',
      },
    ],
    data: [],
  };

  let startData = this[category + 'Data'][formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss')];
  if (startData) {
    startData.forEach((data) => {
      let legendName;
      if (redAircraftAllList.includes(data.Id)) {
        legendName = 'red';
      } else {
        legendName = 'blue';
      }
      jsonData.data.push({
        id: data.Id,
        label: data.Id,
        coord: [data.Longitude, data.Latitude],
        coordZ: data.Altitude,
        rotation: [-data.Yaw - 180, -data.Pitch, (180 - data.Roll) % 360],
        type: legendName,
      });
    });
  }
  if (category === 'air') {
    initializationPosition = jsonData.data;
  }
  appInstance.uniCall('addModelTrailLayer', jsonData, (result) => {
    jsonData.data.forEach((val) => {
      // 添加飞机ID到数组
      const addUnique = (array, id) => {
        if (!array.includes(id)) {
          array.push(id);
        }
      };

      // 根据飞机Id添加到对应的数组
      if (redAircraftAllList.includes(val.id)) {
        addUnique(redAircraftAliveList, val.id);
      } else if (blueAircraftAllList.includes(val.id)) {
        addUnique(blueAircraftAliveList, val.id);
      } else if (blueMissileAllList.includes(val.id)) {
        addUnique(blueMissileAliveList, val.id);
      } else if (redMissileAllList.includes(val.id)) {
        addUnique(redMissileAliveList, val.id);
      }
    });
    onAircraftPanelClick(selectedTab);
    updateTimelineControl();
  });
}

/**
 * 更新模型轨迹图位置
 * @param {string} category - 两个参数 'air' 和 'missile' 飞机和导弹
 */
function updateModelTrailLayerCoord(category) {
  let current = formatDate(currentTime, 'YYYY-MM-DD HH:mm:ss');
  let jsonData = {
    id: category + 'ModelTrailLayer',
    name: 'modelTrailLayer',
    coordType: 0,
    coordTypeZ: 0,
    isAppend: true,
    duration: 1,
    data: [],
  };
  const processData = (data, array, legendRed, legendBlue) => {
    data.forEach((item) => {
      const legendName = array.includes(item.Id) ? legendRed : legendBlue;
      jsonData.data.push({
        id: item.Id,
        label: item.Id,
        coord: [item.Longitude, item.Latitude],
        coordZ: item.Altitude,
        rotation: [-item.Yaw - 180, -item.Pitch, (180 - item.Roll) % 360],
        type: legendName,
      });
    });
  };

  if (category === 'air') {
    if (airData[current]) {
      processData(airData[current], redAircraftAllList, 'red', 'blue');
    }
  } else {
    if (missileData[current]) {
      processData(missileData[current], redMissileAllList, 'red', 'blue');
    }
  }

  if (category === 'air') {
    initializationPosition = jsonData.data;
    updatePropertyPanel(initializationPosition);
  }
  appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
    updateAircraftAndMissileList(jsonData.data, category);
    onAircraftPanelClick(selectedTab);
  });
}

/**
 * 更新飞机和导弹列表。
 *
 * @param {Array} dataList - 数据列表，包含飞机或导弹的信息。
 * @param {string} category - 类别，'air' 表示飞机，'missile' 表示导弹。
 *
 */
function updateAircraftAndMissileList(dataList, category) {
  const updateList = (dataList, redList, blueList, targetRedList, targetBlueList) => {
    targetRedList.length = 0;
    targetBlueList.length = 0;
    dataList.forEach((val) => {
      if (redList.includes(val.id)) {
        targetRedList.push(val.id);
      }
      if (blueList.includes(val.id)) {
        targetBlueList.push(val.id);
      }
    });
  };

  if (category === 'air') {
    updateList(dataList, redAircraftAllList, blueAircraftAllList, redAircraftAliveList, blueAircraftAliveList);
  } else {
    updateList(dataList, redMissileAllList, blueMissileAllList, redMissileAliveList, blueMissileAliveList);
  }

  if (category === 'missile') {
    const deletes = missileRowData.filter((item) => !dataList.some((data) => data.id === item.id)).map((item) => item.id);
    if (deletes.length) {
      removeModelTrailLayerMissile(deletes);
    }
    missileRowData = dataList;
  }
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
    overlayType: 'modelTrailLayer', // 图层对象类别
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
        type: redAircraftAllList.includes(record.Id) ? 'redplane' : 'blueplane',
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
        type: redAircraftAllList.includes(record.Id) ? 'redplane' : 'blueplane',
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
 * 删除模型轨迹图层 重置时使用
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

// 移除导弹模型轨迹图
function removeModelTrailLayerMissile(ids) {
  let jsonData = {
    overlayType: 'modelTrailLayer', // 图层对象类别，只支持带有子对象的图层，包括：landmarkLayer，bubbleLayer，eventLayer，trailLayer，trackLayer，typeAreaLayer，colorAreaLayer，roadSgHeatLayer，3DColumnLayer，3DGridLayer，modelTrailLayer，modelLandmarkLayer，3DMarkerLandmarkLayer
    idLayer: 'missileModelTrailLayer', // 图层对象id，只支持带有子对象的图层
    id: '', // 需要删除的图层子对象id
    ids: ids, // 需要删除的图层子对象id数组，如果这个不为空，则会和id一起被删除
  };
  appInstance.uniCall('removeLayerObj', jsonData, (result) => {
    // console.log("removeLayerObj 导弹");
    // console.log(ids);
  });
}

// #endregion ********** TGAPI 图层相关操作 **********

// #region ********** TGAPI 摄像机相关操作 **********

/**
 * 重置相机到默认设置。
 *
 * 该函数将相机的位置、方向和其他参数设置为预定义的值。
 */
function resetDefaultCamera() {
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

// 取消限制镜头
function freeCamera() {
  let jsonData2 = {
    state: 'free', //restricted：受限；free：不受限制
  };
  appInstance.uniCall('setCameraRestrictionState', jsonData2, (result) => {
    // console.log(result);
  });
}

// 限制镜头视界
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

// #endregion ********** TGAPI 摄像机相关操作 **********

// #region ********** TGAPI 时间和基准点操作 **********

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

// #endregion ********** TGAPI 时间和基准点操作 **********

// #region ********** HTML界面控件的事件处理函数 **********

// 开启/停止环绕
function onAutoRotationChange() {
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
    stopAutoRotation();
  }
}

// 停止环绕
function stopAutoRotation() {
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
 * 处理关键帧设置。
 *
 * 根据关键帧索引获取对应的飞机模型ID，并切换到相应的选项卡。然后获取飞机元素并滚动到居中位置。
 *
 * @param {number} keyFrameIndex - 关键帧索引。
 */
function handleKeyFrameSettings(keyFrameIndex) {
  // 要先看是红蓝飞机，然后切换红蓝选项卡后等飞机列表补充完毕再获取飞机元素进行滚动再跟随
  const modelId = keyFrameSettings[keyFrameIndex].modelId;
  followingCameraId = modelId;
  selectedAircraftId = modelId;

  // 修改对象列表的Tab选中状态
  selectedTab = 2;
  if (redAircraftAllList.includes(modelId)) {
    selectedTab = 1;
  }
  onAircraftPanelClick(selectedTab);

  updatePropertyPanel(initializationPosition);

  // 设置镜头跟踪状态
  freeCamera();
  appInstance.uniCall('setCameraFollowingState', { state: 'stop' }, (result) => {
    // console.log(result);
    appInstance.uniCall('followingCamera', keyFrameSettings[keyFrameIndex], (result) => {
      // console.log(result);
    });
  });

  // 高亮选中飞机
  const selectedAircraftElement = document.querySelector(`.list [data-id="${modelId}"]`);
  if (!selectedAircraftElement) {
    return;
  }
  selectedAircraftElement.style.background = '#007CA0';
  // 计算滚动距离
  const container = selectedAircraftElement.parentElement;
  const scrollDistance = selectedAircraftElement.offsetTop - container.clientHeight / 2 + selectedAircraftElement.clientHeight / 2;

  // 滚动到居中位置
  container.scrollTo({
    top: scrollDistance,
    behavior: 'smooth',
  });
}

/**
 * 处理时间轴上的点击事件。
 *
 * @param {number} keyFrameIndex - 表示关键帧设置索引的整数。
 */
function onTimelineClick(keyFrameIndex) {
  var startTimer = startTime.getTime();
  var endTimer = endTime.getTime();
  var timer = endTimer - startTimer;
  var timeline = document.querySelector('.time-line').clientWidth;
  currentTime = new Date(keyFrameSettings[keyFrameIndex].time);
  percent = (((currentTime.getTime() - startTimer) * (timeline / timer)) / timeline) * 100;

  if (percent >= 100) {
    currentTime = endTime;
    percent = 100;
  }
  if (percent <= 0) {
    currentTime = startTime;
    percent = 0;
  }

  // 停止定时器，停止自动旋转
  clearInterval(updateTimer);
  updateTimer = '';
  stopAutoRotation();

  // 更新时间，获取相关数据
  timeKey = new Date(currentTime);
  if (timeKey.getTime() <= endTime.getTime()) {
    timeStr = formatDate(timeKey, 'HHmm');
    timeStr = timeStr.slice(0, -1) + '0';
    getTrailData();
  }

  // 清除图层
  // 1. 被摧毁的飞机
  // 2. 飞机和导弹的轨迹图层
  let jsonData = {
    id: 'destroyAircraft', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    overlayType: 'landmarkLayer', // 图层对象类别
  };
  appInstance.uniCall('removeOverlay', jsonData, (result) => {
    // console.log(result);
    addLandmark = false;
  });

  appInstance.uniCall('clearOverlayType', { overlayType: 'modelTrailLayer' }, (result) => {
    // console.log(result);

    // 清除完图层后，添加新的图层
    addModelTrailLayer('air');
    addModelTrailLayer('missile');
    setTimeout(onPlayClick, 1000);
    setTimeout(() => {
      handleKeyFrameSettings(keyFrameIndex);
    }, 2000);
  });

  updateTimelineControl();
}

/**
 * 当速度按钮被点击时触发的函数。
 *
 * @param {number} index - 被点击的速度按钮的索引（从1开始）。
 */
function onSpeedClick(index) {
  // 修改界面元素倍速控件的显示状态
  // 取消所有倍速按钮的高亮状态，只高亮被点击的按钮
  var speeds = document.getElementsByClassName('zoomClass');
  for (let i = 0; i < speeds.length; i++) {
    speeds[i].classList.remove('active');
  }
  speeds[index - 1].classList.add('active');

  // 根据被点击的按钮的索引设置速度
  speed = index === 3 ? 4 : index;
  if (updateTimer) {
    clearInterval(updateTimer);
    updateModelTrailInterval();
  }
}

/**
 * 当飞机列表被点击时触发的函数。
 *
 * @param {string} id - 被点击飞机的ID。
 * @param {string} category - 飞机的类别，飞机或者导弹。
 *
 * 该函数执行以下操作：
 * 1. 设置跟踪镜头的模型ID。
 * 2. 根据飞机类别设置镜头与被跟踪物体的距离。
 * 3. 设置镜头的俯仰角和偏航角。
 * 4. 设置视角的相对位置。
 * 5. 初始化属性列表。
 * 6. 切换到自由镜头模式。
 * 7. 停止自动旋转。
 * 8. 调用`setCameraFollowingState`和`followingCamera`方法来设置镜头跟踪状态。
 */
function onAircraftClick(id, category) {
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

  updatePropertyPanel(initializationPosition);

  freeCamera();

  let jsonData2 = {
    state: 'stop',
  };

  appInstance.uniCall('setCameraFollowingState', jsonData2, (result) => {
    // console.log(result);
    stopAutoRotation();
    appInstance.uniCall('followingCamera', jsonData, (result) => {
      // console.log(result);
    });
  });
}

/**
 * 当飞机面板被点击时触发的事件处理程序。
 *
 * @param {number} index - 选中的面板编号。1 表示红方，2 表示蓝方。
 */
function onAircraftPanelClick(index) {
  selectedTab = index;

  // 修改界面元素飞机面板的显示状态
  var list = document.getElementsByClassName('list')[0];
  var listName = document.getElementsByClassName('guided-missile-list')[0];
  var tabHeaderList = document.getElementsByClassName('tab');
  for (let i = 0; i < tabHeaderList.length; i++) {
    tabHeaderList[i].style.background = '#002B32';
  }
  tabHeaderList[index - 1].style.background = index == 1 ? '#ea3323' : '#007DA3';

  list.innerHTML = '';
  listName.innerHTML = '';
  // 修改飞机列表的选中样式
  const createList = (array, color, category) => {
    array.forEach((val) => {
      var newDiv = document.createElement('div');
      newDiv.onclick = function () {
        var lists = document.getElementsByClassName(category === 'air' ? 'list' : 'guided-missile-list')[0].querySelectorAll('div');
        for (let i = 0; i < lists.length; i++) {
          lists[i].style.background = null;
        }
        selectedAircraftId = newDiv.innerHTML;
        newDiv.style.background = color;
        onAircraftClick(val, category); // 点击事件处理程序
      };
      newDiv.innerHTML = val;
      newDiv.setAttribute('data-id', val);
      if (selectedAircraftId === val) {
        newDiv.style.background = color;
      }
      (category === 'air' ? list : listName).appendChild(newDiv);
    });
  };

  if (index === 1) {
    createList(redAircraftAliveList, '#ea3323', 'air');
    createList(redMissileAliveList, '#ea3323', 'missile');
  } else if (index === 2) {
    createList(blueAircraftAliveList, '#007CA0', 'air');
    createList(blueMissileAliveList, '#007CA0', 'missile');
  }
}

// 复位 (停止)
function onResetClick() {
  restrictCamera();
  resetDefaultCamera();

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
  redAircraftAliveList = [];
  blueAircraftAliveList = [];
  redMissileAliveList = [];
  blueMissileAliveList = [];
  missile = [];
  missileRowData = [];

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

  updateTimelineControl();
}

// 播放暂停
function onPlayClick() {
  if (updateTimer) {
    clearInterval(updateTimer);
    updateTimer = '';
  } else {
    // 添加结束位置再次开始逻辑
    if (currentTime.getTime() >= endTime.getTime()) {
      onRestClick();

      setTimeout(() => {
        updateModelTrailInterval();
        return;
      }, 1000);
    }
    updateModelTrailInterval();
  }
  updateTimelineControl();
}

// #endregion ********** HTML界面控件的事件处理函数 **********

// #region ********** 每秒执行的时间轴相关更新函数 **********

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
    updatePercentAndTimeline();
  }, 1000);
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

  // 切换暂停和播放按钮的显示状态
  pause.style.display = updateTimer ? 'block' : 'none';
  playBack.style.display = updateTimer ? 'none' : 'block';
}

// 设置进度条
function updatePercentAndTimeline() {
  // 获取开始时间、结束时间和当前时间
  let startTimes = startTime.getTime(); // 开始时间戳
  let endTimes = endTime.getTime(); // 结束时间戳
  let currentTimes = currentTime.getTime(); // 当前时间戳

  // 计算时间差和当前时间点的秒数
  let timeDifference = endTimes - startTimes;
  let currentTimeDiff = currentTimes - startTimes;

  // 计算当前时间在时间范围内的百分比
  percent = (currentTimeDiff / timeDifference) * 100;
  updateTimelineControl();
}

// #endregion ********** 每秒执行的时间轴相关更新函数 **********

//展示属性列表
function updatePropertyPanel(data) {
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
        var distance = calculateDistance(val.coord[0], val.coord[1], val.coordZ, this.lastTime.coord[0], this.lastTime.coord[1], this.lastTime.coordZ); // 计算两个经纬度之间的距离（单位：米）
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

// #region ********** 工具函数 **********

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

// #endregion ********** 工具函数 **********

// #region ********** 从网络请求固定和移动对象数据 **********

function getLandmarkAndAddLayer() {
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

// #endregion ********** 从网络请求固定和移动对象数据 **********

window.onload = function () {
  // 初始化
  // 1. 获取数据
  // 2. 初始化图观场景
  // 3. 初始化时间轴
  // 4. 初始化飞机列表
  // 5. 初始化导弹列表
  getTrailData();
  init();
  updateTimelineControl();
  onAircraftPanelClick(2);
  onSpeedClick(1);
};
