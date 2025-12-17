window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      isLoadingShow: false,
      legendList: [
        {
          id: 1,
          action: "写实化风格",
          serviceName: "默认服务",
          active: true,
          isLoaded: true,
        },
        {
          id: 2,
          action: "信息化风格(深色)",
          serviceName: "信息化",
          active: false,
          isLoaded: false,
          sceneId: "hny7f5u7",
        },
        {
          id: 3,
          action: "信息化风格(浅色)",
          serviceName: "浅色信息化",
          active: false,
          isLoaded: false,
          sceneId: "m64gzmtc",
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: "post",
          url: "https://www.tuguan.net/api/user/v1/visitorScene/y6vm4j3z",
        }).then((res) => {
          _this.init(res.data.accessToken);
        });
      },
      // 初始化加载图观三维场景服务
      init(token) {
        let _this = this;
        //使用授权码读取模型文件初始化场景
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById("container"),
            mode: "scene",
            token: token,
            url: "https://www.tuguan.net/publish/scene/api/y6vm4j3z", //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.isZZ = false;
              //预加载监听
              appInstance.uniCall(
                "addEventListener",
                {
                  eventName: "onServiceLoad",
                  callback: function (event) {
                    _this.isLoaded = true;
                    // 监听预加载结束
                    _this.legendList.forEach((item) => {
                      if (event.name == item.serviceName) {
                        item.isLoaded = true;
                        _this.switchService(item.serviceName);
                      }
                    });
                  },
                },
                (result) => {}
              );
              //切换监听
              appInstance.uniCall(
                "addEventListener",
                {
                  eventName: "onServiceSwitch",
                  callback: function (event) {},
                },
                (result) => {}
              );
            }
          }
        );
      },
      // 显示场景信息
      showSceneInfo() {
        appInstance.uniCall(
          "showSceneInfo",
          {
            isOpen: true,
          },
          (result) => {}
        );
      },
      //预加载场景
      preloadCut(item) {
        let _this = this;
        axios
          .post(
            "https://www.tuguan.net/api/user/v1/visitorScene/" + item.sceneId
          )
          .then((res) => {
            _this.loadService(res.data.accessToken, item);
            _this.isLoadingShow = true;
          });
      },
      //信息化场景信息
      loadService(token, item) {
        let jsonData = {
          name: item.serviceName, // 服务名称
          url: "https://www.tuguan.net/publish/scene/api/" + item.sceneId, // 服务地址
          mode: "scene", // 服务模式 scene 端渲染 , streaming 流渲染
          token: token, // 服务 Token
        };
        appInstance.uniCall("loadService", jsonData, (result) => {});
      },
      //切换场景服务
      switchService(name) {
        window.appInstance.uniCall("switchService", { name: name }, (res) => {
          this.isLoadingShow = false;
        });
      },
      //点击进行场景切换 legendList
      controlChecked(el) {
        // 控制高亮
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
            // 已经被预加载
            if (el.isLoaded) {
              // 直接切换
              this.switchService(el.serviceName);
            } else {
              // 去预加载场景
              this.preloadCut(el);
            }
          } else {
            item.active = false;
          }
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
