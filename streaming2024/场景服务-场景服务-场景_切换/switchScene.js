let legendsBtnListDom = null;
let showCloudCheckboxDom = null;

window.onload = function () {
  init();

  // 获取飞入到社区及返回到地球两个按钮的 dom
  legendsBtnListDom = document.querySelectorAll('.legends .div');
};

// 初始化场景
function init() {
  //初始化流场景
  window.appInstance = new TGApp.App();
  window.appInstance.initService(
    {
      container: document.getElementById('container'),
      mode: 'streaming',
      token: streaming2024Config.flyToken, //StreamingServer服务器获取token
      url: streaming2024Config.url, //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
    },
    (result) => {
      window.appInstance.uniCall(
        'addEventListener',
        {
          eventName: 'onServiceInit',
          callback: (res) => {
            window.appInstance.uniCall(
              'addEventListener',
              {
                eventName: 'onLandmarkClick', // 事件名称 见图观官网统一API开发手册
                callback: function () {
                  window.switchCommunity();

                  legendsBtnListDom.forEach((item) => item.classList.remove('active'));
                  legendsBtnListDom[0].classList.add('active');
                },
              },
              (result) => {
                console.log(result);
              }
            );
            window.addLandmark();

            document.querySelector('.legends').style.display = 'block';
          },
        },
        (result) => {
          console.log(result);
        }
      );
    }
  );
}

// 添加地标图层
function addLandmark() {
  let jsonData = {
    id: 'landmark', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    iconName: 'site_03', // 内置图标名称，见图观官网统一API开发手册
    autoScale: false, // 如果开启后，图标会按照摄像机远近自动缩放大小
    label: '回龙观小区', // 图标标签文本
    iconScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
    labelScale: 0.8, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
    tag: 'custominfo', // 用户自定标签，用户保存用户的扩展数据
    coord: [116.34864807, 40.08437589], // XY 轴坐标，X：经度；Y：纬度
    coordZ: 0, // Z 轴高度（单位：米）
    visible: true, // 添加当前图层时默认是显示还是隐藏
  };

  appInstance.uniCall('addLandmark', jsonData, (result) => {
    console.log('地标点添加完成，开启点击事件');
    let jsonData1 = {
      overlayType: 'landmark', // 图层对象类别
      idLayer: 'landmark', // 如果具体想限定图层对象，则填写图层对象 id，如不限制，可不填
      type: 'click', // 单选模式，click：点击选中；hover：悬停选中
      allowMultiple: false, // 多选模式，false：单击单选当前对象并且取消其他全部选中对象，按住ctrl+单击可多选，按住ctrl+单击统一对象取消选中，true：单击添加当前到多选，再次单击同一对象取消选中，点击场景取消全部选中
      isShowDecorator: true, // 表示是否显示选中的高亮装饰符，true：显示，false：不显示，默认：true
    };
    appInstance.uniCall('pickOverlay', jsonData1, (result) => {
      console.log('开启点击事件，并注册地标图click事件');
    });
  });
}

// 返回到地球
function backToEarth() {
  let jsonData = {
    name: '默认场景', // 场景名称
    //serviceName: "service1", //场景所属的服务，如果场景是当前服务的，可以不写。服务需要先通过 loadService 加载。
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    centerCoord: [116.34864807, 40.08437589], // 进入场景视点的默认中心点的坐标 lng,lat
    coordZ: 0, // 进入场景视点的默认Z 轴高度（单位：米）
    distance: 15000000, // 进入场景摄像机的默认镜头距视点距离(单位:米)
    pitch: 0, // 进入场景摄像机的默认镜头俯仰角(5~89)
    heading: 0, // 镜头偏航角(0正北, 0~359)
    duration: 2, // 切换场景过渡的时间长度，会插入渐隐渐显效果，单位：秒
  };

  appInstance.uniCall('switchScene', jsonData, (result) => {
    console.log(result);
  });
}

// 切换到社区
function switchCommunity() {
  let jsonData = {
    name: '智慧社区', // 场景名称
    //serviceName: "service1", //场景所属的服务，如果场景是当前服务的，可以不写。服务需要先通过 loadService 加载。
    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
    centerCoord: [116.34864807, 40.08437589], // 进入场景视点的默认中心点的坐标 lng,lat
    coordZ: 0, // 进入场景视点的默认Z 轴高度（单位：米）
    distance: 500, // 进入场景摄像机的默认镜头距视点距离(单位:米)
    pitch: 20, // 进入场景摄像机的默认镜头俯仰角(5~89)
    heading: 340, // 镜头偏航角(0正北, 0~359)
    duration: 2, // 切换场景过渡的时间长度，会插入渐隐渐显效果，单位：秒
  };

  appInstance.uniCall('switchScene', jsonData, (result) => {
    console.log(result);
  });
}

//控制按钮点击
function legendClick(index) {
  // 点击按钮 进行高亮显示
  legendsBtnListDom.forEach((item) => item.classList.remove('active'));
  legendsBtnListDom[index].classList.add('active');

  if (index == 0) {
    window.switchCommunity();
  } else if (index == 1) {
    window.backToEarth();
  }
}
