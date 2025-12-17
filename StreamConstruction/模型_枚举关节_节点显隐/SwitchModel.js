window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: false,
      legendList: [
        {
          action: '初始状态',
          stateName: '模型_枚举关节2_节点显隐',
          active: true
        },
        {
          action: '节点显隐50',
          stateName: '模型_枚举关节1_节点显隐',
          active: false
        },
        {
          action: '节点显隐100',
          stateName: '默认状态',
          active: false
        },
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
                  _this.isZZ = false;
                  appInstance.uniCall(
                    'switchState',
                    {
                      name: '模型_枚举关节2_节点显隐',
                      sceneName: "模型_枚举关节_节点显隐"
                    },
                    (result) => {
                      console.log(result);
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
                sceneName: "模型_枚举关节_节点显隐"
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
