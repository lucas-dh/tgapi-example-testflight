window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      oldState: '', //上次设置动画状态
      legendList: [
        {
          id: 0,
          action: '随机动画',
          state: '随机动画',
          value: '',
          active: false,
        },
        {
          id: 1,
          action: '机械臂向左',
          state: '机械臂向左',
          value: '',
          active: false,
        },
        {
          id: 2,
          action: '机械臂向右',
          state: '机械臂向右',
          active: false,
        },
        {
          id: 3,
          action: '机械臂向前',
          state: '机械臂向前',
          active: false,
        },
        {
          id: 4,
          action: '机械臂向后',
          state: '机械臂向后',
          active: false,
        },
      ],
      trailData: [],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl20,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl20, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addStart(_this.trailData,'modelLayer');
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
      
      // 播放模型动画
      changeModelArticulation(item) {
        this.legendList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
        });
        if (this.oldState) {
          this.trailData.map((val, index) => {
            let jsonData = {
              id: 'modelLayer' + index,
              layerId: 'modelLayer',
              name: this.oldState == '随机动画' ? val.animationType : this.oldState,
              state: 'stop',
            };

            appInstance.uniCall('playModelAnimation', jsonData, (result) => {
              console.log(result);
            });
          });
        }

        this.oldState = item.state;
        this.trailData.map((val, index) => {
          let randomNum = Math.floor(Math.random() * 3) + 1;
          if (item.state == '随机动画') {
            val.animationType = this.legendList[randomNum].state;
          }
          let jsonData = {
            id: 'modelLayer' + index,
            layerId: 'modelLayer',
            name: item.state == '随机动画' ? this.legendList[randomNum].state : item.state,
            state: 'begin',
          };

          appInstance.uniCall('playModelAnimation', jsonData, (result) => {
            console.log(result);
          });
        });
      },

      // 添加模型地标图
      addStart(list, id) {
        let Data = [];
        list.map((item, index) => {
          let obj = {
            id: id + index,
            label:'',
            coord: item.coord, // XY 轴坐标，X：经度；Y：纬度
            coordZ: 0.1, // Z 轴高度（单位：米）
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
              modelType: '机械臂_动画', // 模型类型
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
          console.log(result);
        });
      },
       // 创建模型轨迹图数据
       createData() {
        let data = [];
        for (let n = 0; n < 10; n++) {
          for (let i = 0; i < 10; i++) {
            let list = {
              coord: [-10 + i * 2, -10 + n * 2],
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
