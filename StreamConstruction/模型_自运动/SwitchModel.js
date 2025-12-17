window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: false,
      legendList: [
        {
          action: '自运动',
          stateName: '模型自运动',
          active: true
        },
        {
          action: '自旋转',
          stateName: '模型自旋转',
          active: false
        },
        {
          action: '自扩散',
          stateName: '模型自扩散',
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
            token: streamingConfig.jxbToken, //StreamingServer服务器获取token
            url: streamingConfig.url, //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
            
          },
          (result) => {
            window.appInstance.uniCall(
              "addEventListener",
              {
              eventName: "onServiceInit",
                callback: (res) => {
                  _this.isZZ = true
                  appInstance.uniCall(
                    'switchState',
                    {
                      name: '模型自运动',
                      sceneName: "模型_自运动"
                    },
                    (result) => {
                      console.log(result);
                      _this.isZZ = false;
                    }
                  );

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
                sceneName: "模型_自运动"
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
