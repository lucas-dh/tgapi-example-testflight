window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.shequUrl,
        }).then((res) => {
          _this.init(res.data.accessToken);
        });
      },
      // 初始化加载图观三维场景服务
      init(token) {
        let _this = this;
        //使用授权码读取模型文件初始化场景
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById('container'),
            mode: 'scene',
            token: token,
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.shequUrl, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.isZZ = false;
              _this.addLandmark();
              _this.showSceneInfo();
              //开启事地标图点击事件
              appInstance.uniCall(
                'pickOverlay',
                {
                  overlayType: 'landmarkLayer',
                  idLayer: '',
                  type: 'click',
                  isShowDecorator: true,
                },
                (result) => {
                  console.log(result);
                }
              );
              //监听事件图点击事件
              appInstance.uniCall(
                'addEventListener',
                {
                  eventName: 'onLandmarkLayerClick',
                  callback: function (event) {
                    _this.addTip(event.idObj);
                  },
                },
                (result) => {
                  console.log(result);
                }
              );
            }
          }
        );
      },
      // 显示场景信息
      showSceneInfo() {
        appInstance.uniCall(
          'showSceneInfo',
          {
            isOpen: true,
          },
          (result) => {}
        );
      },
      //添加事件图层
      addLandmark() {
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
              name: '摄像头', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              color: '#73FFFF', // 颜色（HEX 颜色值）
              iconName: 'camera', // 内置图标名称，见图观官网统一API开发手册
              iconScale: 0.5, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
            },
          ],
          data: [
            // 定义图层可视化数据
            {
              id: '1', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              type: '摄像头', // 地标点的图例类别名称
              label: '', // 图标标签文本
              coord: [116.34994620600183, 40.082688024521055], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 3, // Z 轴高度（单位：米）
            },
            {
              id: '2',
              type: '摄像头',
              label: '',
              coord: [116.34643117370462, 40.08378211577987],
              coordZ: 0,
            },
            {
              id: '3',
              type: '摄像头',
              label: '',
              coord: [116.34866475629556, 40.08489952796061],
              coordZ: 14,
            },
          ],
        };

        appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
          console.log(result);
        });
      },
      //点击弹出视频tip
      addTip(ids) {
        if (!document.getElementById(`${ids}`)) {
          let videoBox = document.createElement('div');
          videoBox.id = ids;
          videoBox.innerHTML = `
                <div  class="video">
                    <video autoplay muted loop src="https://projects.obs.cn-north-4.myhuaweicloud.com/TGAPIEX/video/%E8%BD%A6%E9%97%B8.mp4" style="width:100%;height:100%;"></video>
                </div>
                        `;
          document.body.appendChild(videoBox);

          // 动态添加tip
          let jsonData = {
            id: ids,
            url: '',
            divId: ids,
            size: [260, 230],
            offset: [0, -10],
            isShowClose: true,
            overlayType: 'landmarkLayer',
          };
          appInstance.uniCall('addOverlayTip', jsonData, (result) => {
            console.log(result);
          });
        }
      },
      //设置场景镜头视野
      setCamera() {
        let jsonData = {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          centerCoord: [116.3485037, 40.0838189], // 中心点的坐标 lng,lat
          coordZ: 6.46, // Z 轴高度（单位：米）
          distance: 810.54, // 镜头距中心点距离(单位:米)
          pitch: 78.13, // 镜头俯仰角(5~89)
          heading: 0.41, // 镜头偏航角(0正北, 0~359)
          fly: false, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
          // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
          duration: 1, // 飞行时间，秒
        };

        appInstance.uniCall('setCamera', jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
