window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,

      pageSecondShow: false,
      pageFirstShow: true,
      activeName: 'first',
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
              _this.addLandMark();
              _this.showSceneInfo();

              //开启事件图点击事件
              appInstance.uniCall(
                'pickOverlay',
                {
                  overlayType: 'eventLayer',
                  idLayer: '',
                  type: 'click',
                  isShowDecorator: false,
                },
                (result) => {
                  console.log(result);
                }
              );
              //监听事件图点击事件
              appInstance.uniCall(
                'addEventListener',
                {
                  eventName: 'onEventLayerClick',
                  callback: function (event) {
                    _this.pageSecondShow = true;
                    _this.pageFirstShow = false;
                    _this.activeName = 'second';
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
      //添加图层
      addLandMark() {
        let jsonData = {
          id: 'eventLayerId', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: 'layerName', // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          visible: true, // 添加当前图层时默认是显示还是隐藏
          legends: [
            // 定义图层包含图例，支持为不同图例定义各自样式
            {
              name: '摄像头', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              icon: 'event_01', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              iconScale: 0.5, // 默认值是 1 表示原大，0 - 1：表示缩小倍率，大于 1：表示放大倍率
              type: 'wave', // 区域边界样式类别，详见下表：区域边界样式类别
              color: '#ff0000', // 颜色（HEX 颜色值）
              fillArea: 'type01', // 区域填充样式类别，详见下表：区域填充样式类别
              speed: 50, // 气泡扩散速度（单位：米/秒）
              radius: 100, // 气泡最大半径（单位：米）
            },
          ],
          data: [
            // 定义图层可视化数据
            {
              id: '事件01', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              coord: [116.3495406421435, 40.083762842088], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 68, // Z 轴高度（单位：米）
              message: '', // 数据点事件信息
              type: '摄像头', // 数据点图例类别
            },
          ],
        };

        appInstance.uniCall('addEventLayer', jsonData, (result) => {
          console.log(result);
        });
      },
      //导航控制页面展示
      handleClick(event) {
        if (event.name == 'first') {
          this.pageFirstShow = true;
          this.pageSecondShow = false;
        } else {
          this.pageSecondShow = true;
          this.pageFirstShow = false;
        }
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
