window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, //是否显示遮罩
      odLineData: [
        //模型数据
        {
          name: '新疆',
          coord: [
            [87.6168, 43.8256],
            [89.1658, 42.9355],
            [84.85, 45.6],
            [79.9224, 37.1143],
            [82.98, 46.75],
          ],
          type: 'Arrow01',
        },
        {
          name: '西藏',
          coord: [
            [91.1322, 29.6604],
            [88.8815, 29.267],
            [94.3681, 29.6548],
            [97.1785, 31.1369],
            [92.0512, 31.4761],
          ],
          type: 'Arrow02',
        },
        {
          name: '青海',
          coord: [
            [101.7782, 36.6171],
            [102.1033, 36.5029],
            [100.9009, 37.3785],
            [100.6203, 36.2864],
            [100.2476, 34.4772],
          ],
          type: 'Arrow03',
        },
        {
          name: '四川',
          coord: [
            [104.0665, 30.5723],
            [101.716, 26.5804],
            [105.8434, 32.4354],
            [103.7613, 29.582],
            [103.8485, 30.0754],
          ],
          type: 'Arrow04',
        },
        {
          name: '云南',
          coord: [
            [102.8329, 24.8801],
            [102.5537, 24.3575],
            [103.7172, 27.3369],
            [100.087, 23.8866],
            [103.3841, 23.3665],
          ],
          type: 'Arrow05',
        },
        {
          name: '贵州',
          coord: [
            [106.6366, 26.652],
            [104.8361, 26.5927],
            [106.9272, 27.7253],
            [105.9475, 26.2531],
            [105.3333, 27.4086],
          ],
          type: 'Arrow06',
        },
        {
          name: '广西',
          coord: [
            [108.3669, 22.8172],
            [109.4244, 24.3291],
            [110.2991, 25.2742],
            [111.2791, 23.4748],
            [109.1199, 21.4733],
          ],
          type: 'Arrow07',
        },
        {
          name: '广东',
          coord: [
            [113.2644, 23.1291],
            [114.0579, 22.5431],
            [113.5767, 22.2707],
            [114.4168, 23.1115],
            [116.1176, 24.2998],
          ],
          type: 'Segment01',
        },
        {
          name: '湖南',
          coord: [
            [112.9389, 28.2282],
            [113.1517, 27.8358],
            [112.5719, 26.8932],
            [113.1355, 29.3632],
            [110.0015, 27.5697],
          ],
          type: 'Segment02',
        },
        {
          name: '重庆',
          coord: [
            [106.5569, 29.5582],
            [106.5743, 29.606],
            [106.5607, 29.523],
            [106.6302, 29.7181],
            [106.2769, 29.9721],
          ],
          type: 'Segment03',
        },
        {
          name: '河南',
          coord: [
            [113.6254, 34.7466],
            [114.3415, 34.7971],
            [112.4344, 34.663],
            [114.3525, 36.1034],
            [113.826, 34.0224],
          ],
          type: 'Segment04',
        },
        {
          name: '浙江',
          coord: [
            [120.1551, 30.2741],
            [121.5439, 29.8683],
            [119.6474, 29.0791],
            [118.8726, 28.9417],
            [122.2072, 29.9858],
          ],
          type: 'Segment05',
        },
        {
          name: '辽宁',
          coord: [
            [123.4315, 41.8057],
            [121.6147, 38.914],
            [122.9946, 41.1085],
            [124.3547, 40.0005],
            [121.127, 41.0951],
          ],
          type: 'Segment06',
        },
        {
          name: '吉林',
          coord: [
            [125.3236, 43.8171],
            [126.5503, 43.8378],
            [124.3504, 43.1664],
            [122.8456, 45.6254],
            [129.4859, 42.8964],
          ],
          type: 'Segment07',
        },
        {
          name: '黑龙江',
          coord: [
            [126.5349, 45.8038],
            [123.9182, 47.354],
            [129.6186, 44.582],
            [130.3189, 46.7998],
            [125.1031, 46.5899],
          ],
          type: 'Segment08',
        },
        {
          name: '内蒙古',
          coord: [
            [111.6708, 40.8183],
            [109.8462, 40.6582],
            [106.7942, 39.6555],
            [118.887, 42.2578],
            [122.2604, 43.6338],
          ],
          type: 'ModelCube',
          texture: '../../image/line/bluegrd.png',
        },
        {
          name: '陕西',
          coord: [
            [108.9398, 34.3416],
            [108.7089, 34.3296],
            [109.7412, 38.2902],
            [109.0293, 32.6903],
            [109.9388, 33.8683],
          ],
          type: 'ModelCylinder',
          texture: '../../image/line/redyellowgrd.png',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl22,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl22, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.setModelCoord();
              _this.addLandmarkLayer();
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
        this.odLineData.map((val, ind) => {
          let jsonData = {
            id: 'connectionId' + ind,
            overlayType: 'model',
            idLayer: '',
            label: '',
            labelColor: '#ffffff',
            labelBackgroundColor: '#333333',
            labelFontSize: 2,
            autoScale: true,
            startIdObj: '总部大楼',
            startOffset: [0, 0, 0],
            endIdObj: 'Model' + (ind < 9 ? '0' + (ind + 1) : ind + 1),
            endOffset: [0, 0, 0],
            type: val.type,
            texture: val.texture ? val.texture : '',
            textureSpeed: 0.5,
            width: 2,
            color: '#ff0000',
            shapeType: 'curve',
            curvature: 0.1,
            angleOrder: 'xyz',
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
            console.log(result);
            if (ind == this.odLineData.length - 1) {
              this.updateCoord();
            }
          });
        });
      },
      // 更新模型和地标图位置
      updateCoord() {
        let index = 0;
        setInterval(() => {
          index += 1;
          if (index >= 5) {
            index = 0;
          }
          let jsonDataLayer = {
            id: 'landmarkLayerId', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            name: 'landmarkLayer', // 图层名称，支持为图层自定义名称
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            isAppend: true, // 是否追加数据（按顺序），true：按新数据 更新原有重复数据 & 追加新数据；false：清除原有数据 & 重建新数据
            data: [],
          };

          this.odLineData.map((val, ind) => {
            jsonDataLayer.data.push({
              id: val.name + ind, // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              type: 'camera', // 地标点的图例类别名称
              label: val.name, // 图标标签文本
              coord: this.odLineData[ind].coord[index], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 100000, // Z 轴高度（单位：米）
            });
            let jsonData = {
              id: 'Model' + (ind < 9 ? '0' + (ind + 1) : ind + 1),
              coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
              coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
              coord: this.odLineData[ind].coord[index],
              coordZ: -23490.131887588293, // Z 轴高度（单位：米）
            };
            // 更新模型数据
            appInstance.uniCall('setModelCoord', jsonData, (result) => {
              console.log(result);
            });
          });

          // 更新地标图数据
          appInstance.uniCall('updateLandmarkLayerCoord', jsonDataLayer, (result) => {
            console.log(result);
          });
        }, 3000);
      },

      // 设置初始化模型位置
      setModelCoord() {
        this.odLineData.map((val, ind) => {
          let jsonData = {
            id: 'Model' + (ind < 9 ? '0' + (ind + 1) : ind + 1),
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            coord: this.odLineData[ind].coord[0],
            coordZ: -23490.131887588293, // Z 轴高度（单位：米）
          };
          appInstance.uniCall('setModelCoord', jsonData, (result) => {
            console.log(result);
          });
        });
        let jsonData = {
          id: '总部大楼',
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coord: [116.4074, 39.9042],
          coordZ: -23490.131887588293, // Z 轴高度（单位：米）
        };
        appInstance.uniCall('setModelCoord', jsonData, (result) => {
          console.log(result);
          this.addLine();
        });
      },
      // 添加地标图
      addLandmarkLayer() {
        let jsonData = {
          id: 'landmarkLayerId',
          coordType: 0,
          coordTypeZ: 0,
          name: 'landmarkLayer',
          autoScale: false,
          visible: true,
          legends: [
            {
              name: 'camera',
              iconName: 'none',
              color: '#ffffff',
              iconScale: 0,
              labelScale: 0.5,
            },
          ],
          data: [
            {
              coord: [116.4074, 39.9042],
              coordZ: 200000,
              id: '北京',
              type: 'camera',
              label: '北京总部',
            },
          ],
        };
        this.odLineData.map((val, ind) => {
          jsonData.data.push({
            coord: val.coord[0],
            coordZ: 200000,
            id: val.name + ind,
            type: 'camera',
            label: val.name,
          });
        });
        appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
