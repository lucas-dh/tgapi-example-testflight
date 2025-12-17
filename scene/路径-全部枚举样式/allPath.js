window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      pathType: [
        "Arrow01",
        "Arrow02",
        "Arrow03",
        "Arrow04",
        "Arrow05",
        "Arrow06",
        "Arrow07",
        "Segment01",
        "Segment02",
        "Segment03",
        "Segment04",
        "Segment05",
        "Segment06",
        "Segment07",
        "Segment08",
      ],
      colorList: [
        "#FFC0CB",
        "#DC143C",
        "#FF00FF",
        "#0000FF",
        "#87CEEB",
        "#40E0D0",
        "#3CB371",
        "#7CFC00",
        "#FFFF00",
        "#FFA500",
        "#8B4513",
        "#FF0000",
        "#ffffff",
        "#fffff0",
        "#ffffe0",
        "#d3d3d3",
        "#d2b48c",
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
      //   随机返回数组中的一项
      randomArr(index) {
        if (index >= this.pathType.length) {
          let num = index % this.pathType.length;
          return num;
        } else {
          return index;
        }
      },
      //添加路径图层
      addPath() {
        axios.get("./json/全国城市.json").then((res) => {
          res.data.forEach((item, index) => {
            let type = this.randomArr(index);
            let jsonData = {
              id: "path" + index + 1,
              name: "path" + index + 1,
              coordType: 0,
              coordTypeZ: 0,
              type: this.pathType[type],
              color: this.colorList[type],
              width: 50000,
              textureSpeed: 10,
              points: [
                { coord: [116.41, 39.9], coordZ: 0 },
                { coord: [item.coord[0], item.coord[1]], coordZ: 0 },
              ],
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
