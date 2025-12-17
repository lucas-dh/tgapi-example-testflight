window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: "post",
          url:
            "https://www.tuguan.net/api/user/v1/visitorScene/" +
            sceneConfig.chinaUrl,
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
              sceneConfig.chinaUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.addPath();
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
      //添加路径图层
      addPath() {
        axios.get("./公路path.geojson").then((res) => {
          res.data.features.forEach((i, index) => {
            let data = [];
            i.geometry.coordinates[0].forEach((item, index) => {
              let obj = {};
              obj = {
                coord: item,
                coordZ: 0,
              };
              data.push(obj);
            });
            let jsonData = {
              id: "path" + index,
              name: "path",
              coordType: 0,
              coordTypeZ: 0,
              type: "Segment06",
              color: "#ff0000",
              width: 25000,
              points: data,
              colorPass: "#0000FF",
              tag: "",
              autoScale: true,
              visible: true,
              lineDataId: "",
            };
            appInstance.uniCall("addPath", jsonData, (result) => {
              console.log(result);
              this.isZZ = false;
            });
          });
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
