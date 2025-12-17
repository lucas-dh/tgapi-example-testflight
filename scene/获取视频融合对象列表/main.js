window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      legendList: [
        //按钮数据
        {
          id: 1,
          action: '切换状态1',
          value: '第一排效果',
          active: false,
        },
        {
          id: 2,
          action: '切换状态2',
          value: '第二排效果',
          active: false,
        },
        {
          id: 3,
          action: '恢复',
          value: '默认状态',
          active: false,
        },
      ],
      BuildingList: [], //视频融合对象列表
      VideoFusion: {
        平面1_视频: { pitch: 3, heading: 0, distance: 500 },
        平面2_视频: { pitch: 3, heading: 0, distance: 310 },
        平面3_视频: { pitch: 3, heading: 0, distance: 310 },
        平面4_视频: { pitch: 3, heading: 0, distance: 500 },
        立方体_视频: { pitch: 3, heading: 0, distance: 500 },
        球体_视频: { pitch: 2, heading: 0, distance: 400 },
        圆柱体_视频: { pitch: 2, heading: 0, distance: 400 },
        复杂几何体_视频: { pitch: 2, heading: 0, distance: 530 },
      },
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.videoFusionUrl,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.videoFusionUrl, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
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

      // 聚焦视频融合对象
      switchState(item) {
        this.BuildingList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
          this.$forceUpdate();
        });
        let jsonData = {
          id: item.id,
          duration: 1,
          ...this.VideoFusion[item.id],
        };

        appInstance.uniCall('focusVideoFusionObject', jsonData, function (result) {
          console.log(result);
        });
      },

      // 切换场景状态----获取视频融合对象列表
      changeModelArticulation(el) {
        let _this = this;
        _this.BuildingList = [];
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        appInstance.uniCall(
          'switchState',
          {
            name: el.value,
            sceneName: '',
          },
          (result) => {
            appInstance.uniCall('getVideoFusionList', {}, (result) => {
              console.log(result);
              if (el.id == 3) return;
              _this.BuildingList = result.data.filter((n) => {
                return n.visible;
              });
            });
          }
        );
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
