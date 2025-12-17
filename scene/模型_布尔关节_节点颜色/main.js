window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      legendList: [
        {
          id: 1,
          action: '节点颜色-布尔开',
          value: false,
          active: true,
        },
        {
          id: 2,
          action: '节点颜色-布尔关',
          value: true,
          active: false,
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.articulationUrl16,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.articulationUrl16, //模型地址
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

      // 设置节点颜色
      changeModelArticulation(el) {
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        let jsonData = {
          id: '机械臂',
          layerId: '',
          duration: 0,
          data: [
            {
              articulation: '节点颜色_布尔型',
              type: 'bool',
              value: el.value,
            },
          ],
        };
        appInstance.uniCall('setModelArticulation', jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
