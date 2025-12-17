window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      isNum: 0,
      legendList: [],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: "post",
          url:
            "https://www.tuguan.net/api/user/v1/visitorScene/" +
            sceneConfig.shequUrl,
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
            url:
              "https://www.tuguan.net/publish/scene/api/" +
              sceneConfig.shequUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();
              //获取状态信息
              appInstance.uniCall("getStates", {}, (result) => {
                console.log(result);
                _this.legendList = result.states;
                //添加判断条件
                _this.legendList.forEach((item, index) => {
                  item.active = false;
                  item.id = index + 1;
                });
                //获取到数组的第一项改变为默认选中状态
                _this.legendList[0].active = true;
              });
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
      //切换状态
      switchStatus(name) {
        appInstance.uniCall(
          "switchState",
          {
            name: name,
          },
          (result) => {
            console.log(result);
          }
        );
      },
      //点击切换状态
      controlChecked(el, index) {
        this.legendList.forEach((item, index) => {
          if (item.id == el.id) {
            this.isNum = index;
            this.switchStatus(el.name);
          }
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
