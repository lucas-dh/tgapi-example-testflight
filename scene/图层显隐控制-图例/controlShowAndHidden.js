window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,

      legendList: [
        {
          id: 1,
          action: "摄像头 ",
          tcId: "landmarkLayer",
          overlayType: "landmarkLayer",
          checked: true,
        },
        {
          id: 2,
          action: "热力图  ",
          checked: true,
          tcId: "heat1",
          overlayType: "heatMapLayer",
        },
        {
          id: 3,
          action: "告警事件",
          checked: true,
          tcId: "warning",
          overlayType: "eventLayer",
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
              _this.addCamera();
              _this.addWarning();
              _this.addFloorHot();
              _this.showSceneInfo();
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
      //添加摄像头
      addCamera() {
        axios.get("./json/markLayer.json").then((res) => {
          appInstance.uniCall("addLandmarkLayer", res.data, (result) => {
            console.log(result);
          });
        });
      },
      //添加告警事件
      addWarning() {
        axios.get("./json/warning.json").then((res) => {
          appInstance.uniCall("addEventLayer", res.data, (result) => {
            console.log(result);
          });
        });
      },
      //添加热力图
      addFloorHot() {
        axios.get("./json/floorHot.json").then((res) => {
          appInstance.uniCall("addHeatMapLayer", res.data, (result) => {
            console.log(result);
            this.isZZ = false;
          });
        });
      },
      //控制显示隐藏
      controlChecked(el) {
        el.checked = !el.checked;
        let jsonData = {
          id: el.tcId,
          overlayType: el.overlayType,
          visible: el.checked,
        };

        appInstance.uniCall("setOverlayVisibility", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
