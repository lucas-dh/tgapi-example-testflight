window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,// 是否显示遮罩
      value1: 0, //滑块数值
    },
    watch: {
      // 监听滑块变化调用设置节点移动方法
      value1: {
        deep: true,
        handler(newV) {
          this.changeModelArticulation(newV);
        },
      },
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.articulationUrl8,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.articulationUrl8, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.changeModelArticulation(0);
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

      changeModelArticulation(num) {
        let jsonData = {
          id: '机械臂',
          layerId: '',
          duration: 0,
          data: [
            {
              articulation: '箱体前进',
              type: 'float',
              value: num,
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
