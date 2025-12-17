window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      BuildingList: [], //视频融合对象列表
      rowData: [
        {
          id: '广告牌视频', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: -0.98,
          heading: 0,
          distance: 370,
        },
        {
          id: '南路公交站视频1', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0.3,
          heading: 0,
          distance: 240,
        },
        {
          id: '南路公交站视频2', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0.2,
          heading: 0,
          distance: 243,
        },
        {
          id: '小广告牌平面视频1', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0,
          heading: 180,
          distance: 319.3,
        },
        {
          id: '小广告牌平面视频2', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0,
          heading: 180,
          distance: 307.5,
        },
      ], //视频融合对象数据视角信息集合
      oldId: '',
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl18,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl18, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.modelClick();
              _this.onModelEvent();
            }
          }
        );
      },
      // 显示场景信息
      showSceneInfo() {
        var _this = this;
        appInstance.uniCall(
          'showSceneInfo',
          {
            isOpen: true,
          },
          (result) => {
            console.log(result);
          }
        );

        //获取场景视频项
        window.appInstance.uniCall('getVideoFusionList', {}, (result) => {
          console.log(result);
          _this.BuildingList = result.data;
          _this.BuildingList.push({
            id: '恢复',
          });
        });
      },

      // 聚焦视频融合对象
      switchState(item, index) {
        this.BuildingList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
          this.$forceUpdate();
        });
        if (item.id === '恢复') {
          let jsonData = {
            name: '默认状态', // 状态名称需要先使用 获取状态信息 接口,获取到状态名称填入此处
            sceneName: 'scene1', // 状态所属的场景，如果状态是当前场景的，可以不写
          };

          appInstance.uniCall('switchState', jsonData, (result) => {
            console.log(result);
          });
          return;
        }
        var rowData = this.rowData.find((r) => r.id === item.id);
        window.appInstance.uniCall('focusVideoFusionObject', rowData, function (result) {
          console.log(result);
        });
      },

      // 开启模型点击
      modelClick() {
        var paramsObj = {
          modelType: 'model',
          type: 'click',
          allowMultiple: false, // 是否支持多选，false：单选，true：多选
          isShowDecorator: false, // 表示是否显示选中的高亮装饰符，true：显示，false：不显示，默认：true
        };

        window.appInstance.uniCall('pickModel', paramsObj, (result) => {
          console.log(result);
        });
      },

      // 挂载模型事件回调
      onModelEvent() {
        var _this = this;
        //模型点击回调
        window.appInstance.uniCall('addEventListener', {
          eventName: 'onModelClick', // 事件名称 见图观官网统一API开发手册
          callback: (result) => {
            if (this.oldId != result.id) {
              let jsonData = {
                id: this.oldId,
                nodeId: '',
              };
              appInstance.uniCall('removeModelTip', jsonData, (result) => {
                console.log(result);
              });
            }
            if (result.selected) {
              let url = '';
              let size = '';
              let offset = '';
              let rotation = '';
              if (result.id == '广告牌') {
                url = location.href.replace('index', 'scene/MechArmProperties');
                size = [50, 30];
                offset = [-25, 25,0];
                rotation = [0, 0, 0];
              } else if (result.id == '南路公交站') {
                url = location.href.replace('index', 'scene/端场景');
                size = [50, 30];
                offset = [5, 0, 0];
                rotation = [0, 0, 0];
              } else if (result.id == '小广告牌1') {
                url = location.href.replace('index', 'scene/流场景');
                size = [50, 30];
                offset = [3, 0, 0];
                rotation = [0, 180, 0];
              }
              if (url == '') return;
              //添加html标牌
              var obj = {
                id: result.id, //模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                nodeId: '', // 节点对象Id，该属性不为空时，表示在模型的这个节点上添加弹框，无该属性或者该属性值为空时，表示在模型上添加弹框
                url: url, //Tip 窗口页面地址
                divId: '', //HTML 侧弹出标牌的 dom div id，如果这个不为""，url 属性不起作用
                isShowClose: true, //是否显示右上角关闭按钮，默认显示关闭按钮
                is3D: true, //是否是立体标牌，false：不是3D立体标牌，true：是。默认值false。
                size: size, //Tip 窗口宽高 xy，x：窗口宽；y：窗口高（单位：像素）
                offset: offset, //Tip 左上角相对 对象中心点 偏移量 xy，x：为正，向右偏移；y：为正，向上偏移（单位：像素）
                rotation: rotation, //Tip 中心点相对 对象中心点 旋转量 xyz，x：以x轴旋状，y：以x轴旋状，z：以z轴旋状（只有当立体标牌的时候有效）（单位：角度，0到360度）
                autoScale: true,
              };
              window.appInstance.uniCall('addModelTip', obj, (result) => {
                this.oldId = result;
                console.log(result);
              });
            } else {
              // 移除弹出框
              let jsonData = {
                id: result.id,
                nodeId: '',
              };
              appInstance.uniCall('removeModelTip', jsonData, (result) => {
                console.log(result);
              });
            }
          },
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
