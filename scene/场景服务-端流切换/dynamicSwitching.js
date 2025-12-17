window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,
      legendList: [
        {
          id: 1,
          action: '端渲染场景',
          active: true,
        },
        {
          id: 2,
          action: '流渲染场景',
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
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.shequUrl,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.shequUrl, //模型地址
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
      //初始化流场景
      initStream() {
        let that = this;
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById('container'),
            mode: 'streaming',
            token: streamingConfigUE5.shequToken, //StreamingServer服务器获取token
            url: streamingConfigUE5.url, //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
          },
          (result) => {
            window.appInstance.uniCall(
              'addEventListener',
              {
                eventName: 'onServiceInit',
                callback: (res) => {},
              },
              (result) => {
                console.log(result);
              }
            );
          }
        );
      },
      //点击进行场景切换
      controlChecked(el) {
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        //销毁场景
        appInstance.uniCall('destroy', {}, (result) => {
          console.log(result);
        });
        //按钮点击判断切换场景
        if (el.action == '端渲染场景') {
          //从新给进度条赋值，并启用
          this.isZZ = true;
          this.getToken();
        } else if (el.action == '流渲染场景') {
          this.initStream();
        }
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
