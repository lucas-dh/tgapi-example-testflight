// 旋转按钮
var chkRotate = undefined;
// 显隐按钮
var chkVisible = undefined;
// 日志显示
var txtLogs = undefined;
// 孪易类型
var twinEasyCategory = [];

// 基础经度
var baseLon = 41.59055347274;
// 基础纬度
var baseLat = 41.55568330028;
// 基础高度
var baseAlt = 800;
// 增加的经度
var deltaLon1 = 0.0059815798355;
// 增加的纬度
var deltaLat1 = 0.004359053508;
// 增加的经度2
var deltaLon2 = 0.0023926319342;
// 增加的纬度2
var deltaLat2 = 0.002179526754;

// 添加的图层集合
var layerList = [];

// 更新数据的Timer
var updateTimer = null;

// 调用开始时间
var logStartTime;

/**
 * ### 初始化加载三维场景服务
 */
function init() {
  // 初始化图观App
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: 'iPYyoyeE', // 128:iPYyoyeE   ;  225:U4BMYElJ
      url: 'https://172.16.1.128:9090',
    },
    (result) => {
      window.appInstance.uniCall(
        'addEventListener',
        {
          eventName: 'onServiceInit',
          callback: (res) => {
            // let jsonData = {
            //   lightPower: 1,
            //   isLayerTopMost: false,
            //   divTipMovingDelay: 200,
            //   labelColorStyle: 'nonlinear',
            // };

            // appInstance.uniCall('setSceneEffect', jsonData, (result) => {
            // });

            operationUIElement();
            getTwinEasyCategory();
            connectTwinEasyServer();
          },
        },
        (result) => {
          // console.log(result);
        }
      );
    }
  );
}

/**
 * ### 设置视野
 */
function btnSetCamera() {
  setCamera();
}

// 连接孪易服务器
function connectTwinEasyServer() {
  let jsonData = {
    name: 'TwinEasyServer',
    address: 'http://172.16.5.30:5000/v1/public/location/kmmhsw7m6i1ls51e/twinEasyCategoryId/{iconModelId}', // 孪易： kmmhsw7m6i1ls51e  健伟：ndj0r71o9a5q9r9k
    token: 'ABCDEFG',
  };
  appInstance.uniCall('connectAssetServer', jsonData, (result) => {
    console.log(result);
  });
}

/**
 * ### 设置界面元素初始状态，获取界面元素
 */
function operationUIElement() {
  document.getElementsByClassName('legends')[0].style.display = 'block';
  chkRotate = document.querySelector('#chkRotate');
  chkVisible = document.querySelector('#chkVisible');
  txtLogs = document.querySelector('#txtLogs');
}

/**
 * ### 添加对象 2个图层每个图层100个对象
 */
function btnAddClick() {
  // 记录开始时间
  setUnicallStartTime('添加');

  layerList = [];
  let allPosition = GetAllPosition1();
  let dataIndex = 0;

  let addedCount = 0;
  for (let i = 0; i < 2; i++) {
    let layer = getLayerDefine(i);
    let layerData = [];
    for (let j = 0; j < 100; j++) {
      let data = {
        id: i + '_' + j,
        label: i + '_' + j,
        label2: '',
        coord: allPosition[dataIndex],
        coordZ: baseAlt,
        scale: [10, 10, 10],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
      dataIndex++;
    }
    layer.data = layerData;

    layerList.push(layer);

    console.log('添加图层：', i);
    appInstance.uniCall('addIconModelTrailLayer', layer, (result) => {
      addedCount++;
      if (addedCount == 2) {
        console.log('添加图层：', result);
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 10个图层每个图层100个对象
 */
function btnAddClick2() {
  // 记录开始时间
  setUnicallStartTime('添加');

  layerList = [];
  let allPosition = GetAllPosition2();
  let dataIndex = 0;

  let addedCount = 0;
  for (let i = 0; i < 10; i++) {
    let layer = getLayerDefine(i);
    let layerData = [];
    for (let j = 0; j < 100; j++) {
      let data = {
        id: i + '_' + j,
        label: i + '_' + j,
        label2: '',
        coord: allPosition[dataIndex],
        coordZ: baseAlt,
        scale: [10, 10, 10],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
      dataIndex++;
    }
    layer.data = layerData;

    layerList.push(layer);

    console.log('添加图层：', i);
    appInstance.uniCall('addIconModelTrailLayer', layer, (result) => {
      console.log('添加图层：', result);
      addedCount++;
      if (addedCount == 10) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 删除对象
 */
function btnRemoveClick() {
  clearInterval(updateTimer);

  // 记录开始时间
  setUnicallStartTime('删除');

  let jsonData = {
    overlayType: 'iconModelTrailLayer',
  };

  appInstance.uniCall('clearOverlayType', jsonData, (result) => {
    // 记录结束时间
    setUnicallEndTime('删除');
  });
}

/**
 * ### 播放
 */
function btnPlay() {
  let numX = 0,
    numY = 0;
  let i = 0;
  let delta = 0.01;
  updateTimer = setInterval(() => {
    i++;
    let rotation = [];
    if (i == 1) {
      numX = delta;
      numY = 0;
      rotation = [-90, 0, 0];
    } else if (i == 2) {
      numX = delta;
      numY = delta;
      rotation = [-180, 0, 0];
    } else if (i == 3) {
      numX = 0;
      numY = delta;
      rotation = [-270, 0, 0];
    } else {
      numX = 0;
      numY = 0;
      rotation = [0, 0, 0];
    }
    let layerCount = 0;
    for (let j = 0; j < 2; j++) {
      let layerObj = layerList[j];
      let newData = [];
      layerObj.data.map((item, index) => {
        let obj = {
          id: item.id,
          label: '',
          label2: '',
          coord: [item.coord[0] + numX, item.coord[1] + numY],
          coordZ: baseAlt,
          scale: [10, 10, 10],
          rotation: rotation,
          type: 'legend',
        };
        newData.push(obj);
      });
      let jsonData = {
        id: layerObj.name,
        name: layerObj.name,
        coordType: 0,
        coordTypeZ: 0,
        isAppend: true,
        duration: 3,
        data: newData,
      };
      appInstance.uniCall('updateIconModelTrailLayerCoord', jsonData, (result) => {
        layerCount++;
        if (layerCount == 2 && i >= 4) {
          i = 0;
        }
      });
    }
  }, 3000);
}

/**
 * ### 设置视野
 */
function setCamera() {
  let jsonData = {
    coordType: 0,
    coordTypeZ: 0,
    centerCoord: [41.63093092456, 41.57686546386],
    coordZ: 187.5743,
    distance: 8497.114375,
    pitch: 73,
    heading: 4,
    fly: true,
    duration: 0.5,
  };

  appInstance.uniCall('setCamera', jsonData, (result) => {
    //console.log(result);
  });
}

/**
 * ### 获取到200个对象的所有坐标值
 */
function GetAllPosition1() {
  let data = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      lon = baseLon + j * deltaLon1;
      lat = baseLat + i * deltaLat1;
      data.push([lon, lat]);
    }
  }
  return data;
}

/**
 * ### 获取到1000个对象的所有坐标值
 */
function GetAllPosition2() {
  let data = [];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      lon = baseLon + j * deltaLon2;
      lat = baseLat + i * deltaLat2;
      data.push([lon, lat]);
    }
  }
  return data;
}

/**
 * ### 开启/停止环绕
 */
function changeRotate() {
  let jsonData = {
    enabled: chkRotate.checked,
    duration: 60,
    interruptable: true,
    direction: 'clockwise',
  };

  appInstance.uniCall('rotateCamera', jsonData, (result) => {
    // console.log(result);
  });
}

/**
 * ### 设置显隐
 */
function changeVisible() {
  setUnicallStartTime('显隐');

  let jsonData = {
    overlayType: 'iconModelTrailLayer',
    visible: chkVisible.checked,
  };

  appInstance.uniCall('setOverlayTypeVisibility', jsonData, (result) => {
    console.log(result);

    // 记录结束时间
    setUnicallEndTime('显隐');
  });
}

/**
 * ### 获取图层定义，每个图层生成一个图例
 * @param {number} index 模型型号的第几个
 * @param {string} id 指定的模型型号id，如果不传，使用第 index 个的 id
 */
function getLayerDefine(index, id) {
  let findIndex = index;
  if (findIndex >= 4) {
    findIndex = findIndex % 4;
  }
  let iconModelId = null;
  if (id != null) {
    iconModelId = id;
  } else {
    iconModelId = twinEasyCategory[findIndex].twinCategoryConfigID;
  }
  let jsonData = {
    id: 'layerId' + index,
    serverName: 'TwinEasyServer',
    name: 'layerId' + index,
    coordType: 0,
    coordTypeZ: 0,
    snapSurface: 0,
    duration: 3,
    isAutoRotation: false,
    // trackStyle: 'vector',
    // trackDuration: 500,
    // trackWidth: 9,
    //trackVisible: 'ShowAll',
    //objLife: 500000,
    visible: true,
    legends: [
      {
        name: 'legend',
        iconModelId: iconModelId,
        labelScale: 1,
        iconScale: 1,
      },
    ],
    data: [],
  };
  return jsonData;
}

/**
 * ### 获取孪生体类别
 */
function getTwinEasyCategory() {
  // ./json/TwinEasyCategory-WJW.json
  getJsonData('./json/TwinEasyCategory.json', (res) => {
    twinEasyCategory = res;
  });
}

/**
 * ### 设置调用开始时间
 * @param {string} operation 操作名称，默认是添加
 */
function setUnicallStartTime(operation = '添加') {
  txtLogs.innerHTML = '';

  // 记录开始时间
  logStartTime = new Date();
  let startLine = document.createElement('div');
  startLine.textContent = '开始' + operation + formatDate(logStartTime);
  txtLogs.appendChild(startLine);
}

/**
 * ### 设置调用结束时间
 * @param {string} operation 操作名称，默认是添加
 */
function setUnicallEndTime(operation = '添加') {
  let endTime = new Date();
  let endLine = document.createElement('div');
  endLine.textContent = operation + '完成' + formatDate(endTime);
  txtLogs.appendChild(endLine);
  // 记录时间差值
  let diff = endTime - logStartTime;
  let diffLine = document.createElement('div');
  diffLine.textContent = diff + '毫秒完成' + operation;
  txtLogs.appendChild(diffLine);
}

/**
 * ### 格式化日期
 * @param {Date} date 时间
 */
function formatDate(date) {
  const pad = (number) => String(number).padStart(2, '0');
  const padMilliseconds = (number) => String(number).padStart(3, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从0开始
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = padMilliseconds(date.getMilliseconds());

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

/**
 * ### 获取 json 数据
 * @param {string} url json 数据文件地址
 * @param callback 回调
 */
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
  init();
};
