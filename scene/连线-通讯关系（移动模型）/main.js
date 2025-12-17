window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      pathData: [
        // 无人机
        { coord: [237.0172621591, 215.0497969897], coordZ: 100, speed: 60 },
        { coord: [235.847, -197.0822553469], coordZ: 100, speed: 60 },
        { coord: [-242.551, -200.5019470933], coordZ: 100, speed: 60 },
        { coord: [-240.172, 211.018], coordZ: 100, speed: 60 },
        { coord: [237.0172621591, 215.0497969897], coordZ: 100, speed: 60 },
      ],
      pathData1: [
        //救护车
        { coord: [236.593786058, -45.2658123235], coordZ: -19.99, speed: 40 },
        { coord: [-236.1420958158, -46.9590634313], coordZ: -19.99, speed: 40 },
        { coord: [236.593786058, -45.2658123235], coordZ: -19.99, speed: 40 },
      ],
      lineData: [
        {
          overlayType: 'model',
          idLayer: '',
          startIdObj: '指挥车',
          startOffset: [0, 0, 0],
          endIdObj: '救护车运输',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/T_M_JuJiChe_Link.jpg',
          textureSpeed: 0.2,
          color: '#FF7C00',
          width: 6,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
        },
        {
          overlayType: 'model',
          idLayer: '',
          startIdObj: '无人机巡航',
          startOffset: [0, 0, 0],
          endIdObj: '指挥车',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/T_M_WuRenJi02_link.jpg',
          textureSpeed: 0.3,
          color: '#12F37C',
          width: 6,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl8,
        }).then((res) => {
          _this.init(res.data.accessToken);
        });
      },
      // 初始化加载图观三维场景服务
      init(token) {
        let _this = this;
        // 初始化图观App
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById('container'),
            mode: 'scene',
            token: token,
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl8, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              appInstance.uniCall(
                'setModelVisibility',
                {
                  ids: ['指挥车', '救护车运输', '无人机巡航'],
                  visible: true,
                },
                (result) => {
                  _this.showSceneInfo();
                  _this.addLine();
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
          (result) => {
            console.log(result);
          }
        );
      },
      // 添加关系线
      addLine() {
        this.lineData.map((val, ind) => {
          let jsonData = {
            id: ind + 1,
            label: '',
            labelColor: '#ffffff',
            labelBackgroundColor: '#333333',
            labelFontSize: 20,
            autoScale: true,
            ...val,
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
            console.log(result);
            if (this.lineData.length - 1 == ind) {
              this.movingModel('无人机巡航', [0, 0, 0], this.pathData);
              this.movingModel('救护车运输', [0, 0, 0], this.pathData1);
            }
          });
        });
      },

      //  持续移动模型
      movingModel(id, offset, points) {
        let jsonData = {
          id: id, // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          loopMode: 'round', // 循环模式，none：不循环；round：往返循环；repeat：从头循环
          reverse: false, // 是否沿路径反向移动，true：反向运动；false：正向运动
          direction: 'path', // 沿路径调整方向，path：沿路径调整模型方向；self：模型自己原本方向不变
          offset: offset, // 沿 XYZ 三轴向的偏移量（单位：米）
          points: points,
        };
        appInstance.uniCall('movingModel', jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
