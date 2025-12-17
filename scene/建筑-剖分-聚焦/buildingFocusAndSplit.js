window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      isCurrent: -1,
      legendList: [
        {
          id: 1,
          action: "建筑剖分",
        },
        {
          id: 2,
          action: "建筑恢复",
        },
      ],
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
              _this.showSceneInfo();
              _this.isZZ = false;
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
      //点击恢复建筑
      clickToRegain() {
        let jsonData = {
          id: "Building", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          animation: 1, // 楼层拆解动画类型，1：默认动画类型
        };
        appInstance.uniCall("resetBuildingFloor", jsonData, (result) => {
          console.log(result);
        });
      },
      //点击进行建筑聚焦
      focus() {
        let jsonData3 = {
          name: "住宅",
        };

        appInstance.uniCall("switchState", jsonData3, (result) => {
          console.log(result);
          let jsonData = {
            id: "Building", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            floor: 10, // 要拆解的楼层号，1 楼为 1，地下一楼为 -1，依此类推
            animation: 1, // 楼层拆解动画类型，1：默认动画类型
          };

          appInstance.uniCall("showBuildingFloor", jsonData, (result) => {
            console.log(result);
          });
        });
      },
      //控制按钮点击
      controlChecked(el, idx) {
        this.isCurrent = idx;
        if (el.id == 1) {
          this.focus();
        } else if (el.id == 2) {
          this.clickToRegain();
        }
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
