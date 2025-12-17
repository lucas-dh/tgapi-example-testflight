window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      lineData: [], // 关系线数据
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl6,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl6, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.getData();
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
      getData() {
        let _this = this;
        axios.get('./json/line.json').then((res) => {
          _this.lineData = res.data.lineData;
          _this.addLine();
        });
      },
      // 添加关系线
      addLine() {
        this.lineData.map((val, ind) => {
          let jsonData = {
            id: 'Connection' + ind,
            overlayType: 'model',
            idLayer: '',
            label: '',
            labelColor: '#ffffff',
            labelBackgroundColor: '#333333',
            labelFontSize: 20,
            autoScale: true,
            ...val,
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
            console.log(result);
          });
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
