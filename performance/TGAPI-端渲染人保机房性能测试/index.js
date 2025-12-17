// 旋转按钮
var chkRotate = undefined;
// 日志显示
var txtLogs = undefined;
// 孪易类型
var twinEasyCategory = [];

// 基础经度
var baseLon = 116.53204939291325;
// 基础纬度
var baseLat = 39.815261825948376;
// 基础高度
var baseAlt = 18.31;
// 增加的经度
var deltaLon1 = 0.000001379374502;
// 增加的纬度
var deltaLat1 = 0.000014011183774;
// 增加的经度2
var deltaLon2 = 0.00001379374502;
// 增加的纬度2
var deltaLat2 = 0.0000014011183774;

// 调用开始时间
var logStartTime;

/**
 * ### 初始化加载三维场景服务
 */
function init() {
  // 初始化图观App
  window.appInstance = new TGApp.App();

  let sceneId = 'jguwcg3e';
  let tokenUrl = `https://www.tuguan.net/api/user/v1/visitorScene/${sceneId}`;

  let xhr = new XMLHttpRequest();
  xhr.open('post', tokenUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json charset=utf-8');
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let tokenResult = JSON.parse(xhr.responseText);

      window.appInstance.initService(
        {
          container: document.getElementById('container'),
          mode: 'scene',
          resourceBasePath: '../../js/scene',
          token: tokenResult.accessToken,
          url: 'http://www.tuguan.net/publish/scene/api/' + sceneId,
        },
        (result) => {
          operationUIElement();
          getTwinEasyCategory();
          connectTwinEasyServer();
        }
      );
    }
  };
  xhr.send();
}

/**
 * ### 连接孪易服务器
 */
function connectTwinEasyServer() {
  let jsonData = {
    name: 'TwinEasyServer',
    //address: 'http://172.16.5.30:5000/v1/public/location/th1s0kkzk3copxe0/twinEasyCategoryId/{iconModelId}', // 原始地点

    address: 'http://172.16.5.30:5000/v1/public/location/wne03njzu8l74s3n/twinEasyCategoryId/{iconModelId}', // 复制的地点，增加了类别
    token: 'ABCDEFG',
  };
  appInstance.uniCall('connectAssetServer', jsonData, (result) => {
    if (result.result == '1') {
      console.log('连接孪易服务成功');
    }
  });
}

/**
 * ### 设置界面元素初始状态，获取界面元素
 */
function operationUIElement() {
  document.getElementsByClassName('legends')[0].style.display = 'block';
  chkRotate = document.querySelector('#chkRotate');
  txtLogs = document.querySelector('#txtLogs');
}

/**
 * ### 添加对象 10个图层每个图层100个对象
 */
function btnAddClick() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;

  for (let i = 0; i < 10; i++) {
    let layer = getLayerDefine(i);
    let layerData = [];
    for (let j = 0; j < 100; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon1 * j, baseLat + deltaLat1 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      if (addedCount == 10) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 100个图层每个图层10个对象
 */
function btnAddClick2() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;
  for (let i = 0; i < 100; i++) {
    let layer = getLayerDefine(i);

    let layerData = [];
    for (let j = 0; j < 10; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon2 * j, baseLat + deltaLat2 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      if (addedCount == 100) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 140个图层每个图层10个对象
 */
function btnAddClick3() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;
  for (let i = 0; i < 140; i++) {
    let layer = getLayerDefine(i);

    let layerData = [];
    for (let j = 0; j < 10; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon2 * j, baseLat + deltaLat2 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      if (addedCount == 140) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 按照孪易个数添加
 */
function btnAddClick4() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;
  for (let i = 0; i < twinEasyCategory.length; i++) {
    let layer = getLayerDefine(i);

    let layerData = [];

    for (let j = 0; j < layer.exampleCount; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon2 * j * 0.2, baseLat + deltaLat2 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      console.log('添加完成：' + addedCount);
      if (addedCount == twinEasyCategory.length) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 按照孪易个数一半添加
 */
function btnAddClick5() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;
  for (let i = 0; i < 70; i++) {
    let layer = getLayerDefine(i);

    let layerData = [];

    for (let j = 0; j < layer.exampleCount; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon2 * j * 0.2, baseLat + deltaLat2 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      if (addedCount == 70) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 200个图层每个图层10个对象
 */
function btnAddClick7() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;
  for (let i = 0; i < 200; i++) {
    let index = i % 140;
    let layer = getLayerDefine(index);
    layer.id = 'layerId' + i;
    let layerData = [];
    for (let j = 0; j < 10; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon2 * j, baseLat + deltaLat2 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      console.log('添加完成：' + addedCount);
      if (addedCount == 200) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 220个图层每个图层10个对象
 */
function btnAddClick8() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;
  for (let i = 0; i < 220; i++) {
    let index = i % 140;
    let layer = getLayerDefine(index);
    layer.id = 'layerId' + i;

    //let layer = getLayerDefine(i);
    let layerData = [];
    for (let j = 0; j < 10; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon2 * j, baseLat + deltaLat2 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      console.log('添加完成：' + addedCount);
      if (addedCount == 220) {
        // 记录结束时间
        setUnicallEndTime('添加');
      }
    });
  }
}

/**
 * ### 添加对象 240个图层每个图层10个对象
 */
function btnAddClick9() {
  // 记录开始时间
  setUnicallStartTime('添加');

  let addedCount = 0;
  for (let i = 0; i < 240; i++) {
    let index = i % 140;
    let layer = getLayerDefine(index);
    layer.id = 'layerId' + i;

    let layerData = [];
    for (let j = 0; j < 10; j++) {
      let data = {
        id: i + '_' + j,
        label: '',
        label2: '',
        coord: [baseLon + deltaLon2 * j, baseLat + deltaLat2 * i],
        coordZ: baseAlt,
        scale: [1, 1, 1],
        rotation: [0, 0, 0],
        type: 'legend',
      };
      layerData.push(data);
    }
    layer.data = layerData;
    appInstance.uniCall('addIconModelLandmarkLayer', layer, (result) => {
      addedCount++;
      console.log('添加完成：' + addedCount);
      if (addedCount == 240) {
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
  // 记录开始时间
  setUnicallStartTime('删除');

  let jsonData = {
    overlayType: 'all',
  };

  appInstance.uniCall('clearOverlayType', jsonData, (result) => {
    // 记录结束时间
    setUnicallEndTime('删除');
  });
}

/**
 * ### 切换状态
 */
function btnSwitchStateClick(name) {
  appInstance.uniCall(
    'switchState',
    {
      name: name, // 默认状态 '5层'
    },
    (result) => {
      //console.log(result);
    }
  );
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
 * ### 获取图层定义，每个图层生成一个图例
 * @param {number} index 模型型号的第几个
 * @param {string} id 指定的模型型号id，如果不传，使用第 index 个的 id
 */
function getLayerDefine(index, id) {
  let iconModelId = null;
  if (id != null) {
    iconModelId = id;
  } else {
    iconModelId = twinEasyCategory[index].twinCategoryConfigID;
  }
  let jsonData = {
    id: 'layerId' + index,
    serverName: 'TwinEasyServer',
    coordType: 0,
    coordTypeZ: 0,
    snapSurface: 0,
    alpha: 1,
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
    exampleCount: twinEasyCategory[index].exampleCount,
  };
  return jsonData;
}

/**
 * ### 获取孪生体类别
 */
function getTwinEasyCategory() {
  getJsonData('./json/TwinEasyCategory500.json', (res) => {
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
