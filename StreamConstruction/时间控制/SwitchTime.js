window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: false,
      legendList: [
        {
          action: '默认状态',
          stateName: '默认状态',
          active: true
        },
        {
          action: '清晨',
          stateName: '清晨',
          active: false
        },
        {
          action: '傍晚',
          stateName: '傍晚',
          active: false
        },
        {
          action: '夜晚',
          stateName: '夜晚',
          active: false
        }
      ]
    },
    methods: {
      // 初始化加载图观三维场景服务
      init(token) {
        let _this = this;
        //使用授权码读取模型文件初始化场景
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById("container"),
            mode: "streaming",
            token: streamingConfig.shequToken, //StreamingServer服务器获取token
            url: streamingConfig.url, //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
            
          },
          (result) => {
            window.appInstance.uniCall(
              "addEventListener",
              {
              eventName: "onServiceInit",
                callback: (res) => {
                  _this.isZZ = true
                  _this.isZZ = false;
                },
              },
              (result) => {
                console.log(result);
              }
            );
          }
        );
      },
      //点击进行场景切换 legendList
      controlChecked(el) {
        // 控制高亮
        this.legendList.forEach((item) => {
          if (item.action == el.action) {
            item.active = true;
            appInstance.uniCall(
              'switchState',
              {
                name: item.stateName,
                sceneName: "智慧社区"
              },
              (result) => {
                console.log(result);
              }
            );
          } else {
            item.active = false;
          }
        });
      },
    },

    mounted() {
      this.init();
    },
  });
};
