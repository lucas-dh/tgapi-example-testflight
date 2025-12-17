window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
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
          value: 'zxmrfJvR4XFsOmA2',
          coordZ: 0,
          active: false,
        },
        {
          id: 3,
          action: '第二层',
          state: '二层有投影',
          value: 'g1RSub-5GIFj5ugC',
          coordZ: 40,
          active: false,
        },
        {
          id: 4,
          action: '第三层',
          state: '三层有投影',
          value: 'ThKyTzfqCvDj40K4',
          coordZ: 60,
          active: false,
        },
      ],
      trailData: [],
      isClickBtn:true,
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.modelTrialUrl,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.modelTrialUrl, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();
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
        if(!this.isClickBtn)return
        this.isClickBtn = false
        this.legendList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
        });
        appInstance.uniCall('clearOverlayType', { overlayType: 'all' }, (res) => {
          appInstance.uniCall(
            'switchState',
            {
              name: item.state,
              sceneName: '',
            },
            (result) => {
              if (item.id >= 2) {
                _this.addStart(this.trailData, item.value, item.coordZ);
              }else{
                this.isClickBtn = true
              }
            }
          );
        });
      },

      // 添加模型地标图
      addStart(list, id, coordZ) {
        let Data = [];
        list.map((item, index) => {
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

        let jsonData = {
          id: id, // 模型对象图层 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 1, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          snapSurface: 1, // 启用自动贴地。0：不贴地；1：贴地
          alpha: 1, // 透明度，0：完全透明；1：完全不透明
          modelMaxDistance: 1500, // 模型最大可见距离（单位：米），不可见后显示icon
          iconMaxDistance: 1500, // icon最大可见距离（单位：米），不可见后隐藏
          modelLandmarkDataId: '', // 对应本服务器上modelLandmark数据Id，如果找到id，则下方的data不起作用
          visible: true, // 添加当前图层时默认显示还是隐藏
          isReferenceType:true,
          legends: [
            {
              name: 'modelLayer', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              modelType: 'box', // 模型类型
              scale: 1, // 整体放缩倍数（单位：倍）
              iconName: '', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              labelColor: '#ff0000', // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
            },
          ],
          data: Data,
        };
        console.log(jsonData);
        appInstance.uniCall('addModelLandmarkLayer', jsonData, (result) => {
          this.isClickBtn = true
          console.log(result);
        });
      },
      // 创建模型轨迹图数据
      createData() {
        let data = [];
        for (let n = 0; n < 25; n++) {
          for (let i = 0; i < 20; i++) {
            let list = {
              coord: [-21 + i * 2.75, -29 + n * 2.25],
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
