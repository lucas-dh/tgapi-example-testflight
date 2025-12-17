window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      isF: false,
      legendList: [
        {
          id: 1,
          action: '默认状态',
          state: '默认状态',
          value: '',
          active: true,
        },
        {
          id: 2,
          action: '第一层',
          state: '一层有投影',
          value: 'ZqAzpXf2c0GhvmsY',
          coordZ: 0,
          active: false,
        },
        {
          id: 3,
          action: '第二层',
          state: '二层有投影',
          value: 'fYkBoTjZV99gE_cX',
          coordZ: 72.5,
          active: false,
        },
        {
          id: 4,
          action: '第三层',
          state: '三层有投影',
          value: 'C0knGJkmzq1sQFdu',
          coordZ: 142.5,
          active: false,
        },
      ],
      trailData: [],
      timer: null,
      isClickBtn: true,
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.modelTrialUrl2,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.modelTrialUrl2, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();
              // _this.getJsonData();
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
      // 切换状态
      changeModelArticulation(item) {
        let _this = this;
        if (!this.isClickBtn) return;
        this.isClickBtn = false;
        clearInterval(this.timer);
        this.legendList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
        });
        if (this.isF) {
          this.trailData.map((item, index) => {
            if (item.coord[1] < 15.2005005112 && item.coord[1] > -25.6654994888 && item.coord[0] < 25.760129594 && item.coord[0] > -10.7121281891) return;

            let jsonData = {
              id: 'connection' + index,
            };

            appInstance.uniCall('removeModel', jsonData, (result) => {
              console.log(result);
            });
          });
        }
        appInstance.uniCall('clearOverlayType', { overlayType: 'all' }, (res) => {
          appInstance.uniCall(
            'switchState',
            {
              name: item.state,
              sceneName: '',
            },
            (result) => {
              if (item.id >= 2) {
                this.isF = true;
                _this.addStart(this.trailData, item.value, item.coordZ);
              } else {
                this.isClickBtn = true;
              }
            }
          );
        });
      },

      // 添加模型轨迹图
      addStart(list, id, coordZ) {
        let Data = [];
        list.map((item, index) => {
          if (item.coord[1] < 15.2005005112 && item.coord[1] > -25.6654994888 && item.coord[0] < 25.760129594 && item.coord[0] > -10.7121281891) return;
          let obj = {
            id: id + index,
            label: '',
            coord: item.coord, // XY 轴坐标，X：经度；Y：纬度
            coordZ: coordZ, // Z 轴高度（单位：米）
            rotation: [0, 0, 0],
            type: 'modelLayer', // 数据点图例类别
          };
          Data.push(obj);
        });
        Data.push({
          id: id,
          label: '',
          coord: [15.78504203240272, 10.02547792560903], // XY 轴坐标，X：经度；Y：纬度
          coordZ: coordZ, // Z 轴高度（单位：米）
          rotation: [0, 0, 0],
          type: 'modelLayer1', // 数据点图例类别
        });

        let jsonData = {
          id: id, // 模型对象图层 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: 'layerName', // 图层名称，支持为图层自定义名称
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 1, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          snapSurface: 0, // 启用自动贴地。0：不贴地；1：贴地
          duration: 3, // 从上一位置运动到新位置花费的时间（单位：秒），如果启用modelTrailData数据服务，同时表示同步数据的时间周期
          modelMaxDistance: 5000, // 模型最大可见距离（单位：米），不可见后显示icon
          iconMaxDistance: 100000, // icon最大可见距离（单位：米），不可见后隐藏
          isAutoRotation: false, // 是否自动根据当前位置和上一位置计算运动方向，如果为true的话，data中的rotation将不起作用。
          trackStyle: 'style001', // 尾迹内置风格，详见注释
          trackDuration: 6, // 尾迹粒子生命周期
          trackWidth: 20, // 尾迹粒子的宽度
          objLife: 400, // 批号消批时间长度
          modelTrailDataId: '', // 对应本服务器上modelTrail数据Id，如果找到id，则下方的data不起作用
          visible: true, // 添加当前图层时默认显示还是隐藏
          isReferenceType: true,
          legends: [
            {
              name: 'modelLayer', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              modelType: 'Demo_car', // 模型类型
              scale: 4, // 整体放缩倍数（单位：倍）
              iconName: 'car', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              labelColor: '#ff0000', // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
            },
            {
              name: 'modelLayer1', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              modelType: '住宅01', // 模型类型
              scale: 1, // 整体放缩倍数（单位：倍）
              iconName: 'car', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              labelColor: '#ff0000', // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
            },
          ],
          data: Data,
        };
        console.log(jsonData);
        appInstance.uniCall('addModelTrailLayer', jsonData, (result) => {
          console.log(result);
          this.isClickBtn = true;
          setTimeout(() => {
            this.addLine(list, id);
            this.updateModelTrail(list, id, coordZ);
          }, 1000);
        });
      },
      // 更新模型轨迹图
      updateModelTrail(list, id, coordZ) {
        let numX = 0,
          numY = 0;
        let i = 0;
        this.timer = setInterval(() => {
          i++;
          let rotation = [];
          if (i == 1) {
            numX = 10;
            numY = 0;
            rotation = [0, 90, 0];
          } else if (i == 2) {
            numX = 10;
            numY = 10;
            rotation = [0, 0, 0];
          } else if (i == 3) {
            numX = 0;
            numY = 10;
            rotation = [0, 270, 0];
          } else {
            numX = 0;
            numY = 0;
            rotation = [0, 180, 0];
          }
          let Data = [];
          list.map((item, index) => {
            if (item.coord[1] < 15.2005005112 && item.coord[1] > -25.6654994888 && item.coord[0] < 25.760129594 && item.coord[0] > -10.7121281891) return;
            let obj = {
              id: id + index,
              label: '',
              coord: [item.coord[0] + numX, item.coord[1] + numY], // XY 轴坐标，X：经度；Y：纬度
              coordZ: coordZ, // Z 轴高度（单位：米）
              rotation: rotation,
              type: 'modelLayer', // 数据点图例类别
            };
            Data.push(obj);
          });
          let jsonData = {
            id: id,
            name: 'layerName',
            coordType: 1,
            coordTypeZ: 1,
            isAppend: true,
            duration: 3,
            data: Data,
          };
          appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
            if (i == 4) {
              i = 0;
            }
          });
        }, 3000);
      },

      // 添加关系线
      async addLine(list, id) {
        function addLine(item, index) {
          return new Promise((resolve) => {
            let jsonData = {
              id: 'connection' + index,
              overlayType: 'modelTrailLayer',
              idLayer: id,
              startIdObj: id + index,
              startOffset: [0, 0, 2],
              endIdObj: id,
              endOffset: [0, 0, 13],
              type: 'Segment06',
              texture: '../image/line/redop.png',
              textureSpeed: 1,
              autoScale: false,
              color: '#ff0000',
              width: 1,
              shapeType: 'curve',
              curvature: item.curvature,
              angleOrder: 'xyz',
              label: '',
              labelColor: '#ffffff',
              labelBackgroundColor: '#333333',
              labelFontSize: 5,
            };
            appInstance.uniCall('addConnection', jsonData, (result) => {
              resolve();
            });
          });
        }
        for (const [index, item] of list.entries()) {
          if (item.coord[1] < 15.2005005112 && item.coord[1] > -25.6654994888 && item.coord[0] < 25.760129594 && item.coord[0] > -10.7121281891) {
            continue;
          }
          await addLine(item, index);
        }
      },

      // 创建模型轨迹图数据
      createData() {
        let data = [];
        for (let n = 0; n < 10; n++) {
          for (let i = 0; i < 10; i++) {
            let curvature = 1;
            switch (n) {
              case 0:
              case 9:
                curvature = 0.1;
                break;
              case 1:
              case 8:
                curvature = 0.08;
                break;
              case 2:
              case 7:
                curvature = 0.06;
              case 3:
              case 6:
                curvature = 0.04;
                break;
              case 4:
              case 5:
                curvature = 0.02;
                break;
              default:
                curvature = 0.01;
                break;
            }
            let list = {
              coord: [-50 + n * 15, -50 + i * 12],
              curvature,
            };
            data.push(list);
          }
        }
        this.trailData = data;
      },
    },

    mounted() {
      this.getToken();
      this.createData();
    },
  });
};
