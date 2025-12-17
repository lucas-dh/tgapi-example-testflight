window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,

      legendList: [
        {
          id: 1,
          action: "Radar01",
          isChecked: true,
          Ids: "Radar01",
          coord: [82, 45],
        },
        {
          id: 2,
          action: "Revolve01",
          isChecked: true,
          Ids: "Revolve01",
          coord: [94, 45],
        },
        {
          id: 3,
          action: "Revolve02",
          isChecked: true,
          Ids: "Revolve02",
          coord: [106, 45],
        },
        {
          id: 4,
          action: "Revolve03",
          isChecked: true,
          Ids: "Revolve03",
          coord: [118, 45],
        },
        {
          id: 5,
          action: "Revolve04",
          isChecked: true,
          Ids: "Revolve04",
          coord: [130, 45],
        },
        {
          id: 6,
          action: "Spread01",
          isChecked: true,
          Ids: "Spread01",
          coord: [82, 39],
        },
        {
          id: 7,
          action: "Spread02",
          isChecked: true,
          Ids: "Spread02",
          coord: [94, 39],
        },
        {
          id: 8,
          action: "Spread03",
          isChecked: true,
          Ids: "Spread03",
          coord: [106, 39],
        },
        {
          id: 9,
          action: "Spread04",
          isChecked: true,
          Ids: "Spread04",
          coord: [118, 39],
        },
        {
          id: 10,
          action: "Spread05",
          isChecked: true,
          Ids: "Spread05",
          coord: [82, 33],
        },
        {
          id: 11,
          action: "Spread06",
          isChecked: true,
          Ids: "Spread06",
          coord: [94, 33],
        },
        {
          id: 12,
          action: "Spread07",
          isChecked: true,
          Ids: "Spread07",
          coord: [106, 33],
        },
        {
          id: 13,
          action: "Spread08",
          isChecked: true,
          Ids: "Spread08",
          coord: [118, 33],
        },
        {
          id: 14,
          action: "Spread09",
          isChecked: true,
          Ids: "Spread09",
          coord: [82, 27],
        },
        {
          id: 15,
          action: "Square01",
          isChecked: true,
          Ids: "Square01",
          coord: [94, 27],
        },
        {
          id: 16,
          action: "Explosion",
          isChecked: true,
          Ids: "Explosion",
          coord: [106, 27],
        },
        {
          id: 17,
          action: "Flame",
          isChecked: true,
          Ids: "Flame",
          coord: [118, 27],
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
            sceneConfig.chinaUrl,
        }).then((res) => {
          _this.init(res.data.accessToken);
        });
      },
      // 初始化加载图观三维场景服务
      init(token) {
        let _this = this;
        // 初始化图观App
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
            console.log(result);
            if (result.result == 1) {
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.legendList.forEach((item) => {
                this.add3DMarker(item);
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
          (result) => {
            console.log(result);
          }
        );
      },
      // 添加特效
      add3DMarker(item) {
        let jsonData = {
          id: item.Ids,
          coordType: 0,
          coordTypeZ: 0,
          alpha: 1,
          scale: 130000,
          type: item.action,
          titleText: "",
          titleColor: "#ffffff",
          titleBackgroundColor: "#333333",
          tag: "custominfo",
          coord: item.coord, //以深圳湾经纬度为例
          coordZ: 100000,
          visible: true,
        };

        appInstance.uniCall("add3DMarker", jsonData, (result) => {
          console.log(result);
        });
      },
      controlChecked(el) {
        el.isChecked = !el.isChecked;
        let jsonData = {
          id: el.Ids,
          overlayType: "3DMarker",
          visible: el.isChecked,
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
