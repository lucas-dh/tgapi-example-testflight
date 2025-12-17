window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      isNum: -1,
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
            sceneConfig.jxbUrl,
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
              "https://www.tuguan.net/publish/scene/api/" + sceneConfig.jxbUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.isZZ = false;
              _this.getArmAnimation();
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
      //获取机械臂动画
      getArmAnimation() {
        let jsonData = {
          id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
        };
        appInstance.uniCall("getModelAnimation", jsonData, (result) => {
          console.log(result);
          this.legendList = result.data;
        });
      },
      //模型对象
      machineAnimation(name) {
        let jsonData = {
          id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: name, // 动画名称
          state: "begin", // 状态是： "begin", "pause", "stop", "restart" 四种
        };
        appInstance.uniCall("playModelAnimation", jsonData, (result) => {
          console.log(result);
        });
      },
      // 停止动画
      stopAnimation() {
        this.legendList.forEach((item, index) => {
          let jsonData = {
            id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            name: item.name, // 动画名称
            state: "stop", // 状态是： "begin", "pause", "stop", "restart" 四种
          };
          appInstance.uniCall("playModelAnimation", jsonData, (result) => {
            console.log(result);
          });
        });
      },
      //机械臂动画
      controlChecked(el, index) {
        this.stopAnimation();
        this.legendList.forEach((item, index) => {
          if (item.name == el.name) {
            this.isNum = index;
            this.machineAnimation(el.name);
          }
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
