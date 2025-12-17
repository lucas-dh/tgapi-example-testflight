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
              _this.showSceneInfo();
              _this.getJsonData();
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
      // 请求json数据
      getJsonData() {
        var p1 = new Promise((resolve, reject) => {
          axios
            .get("./json/province.json")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("./json/1.json")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2]).then((res) => {
          let _this = this;
          //将数据推到图层
          _this.transData(res);
        });
      },
      //将数据推到图层
      transData(inJsonArr) {
        let _this = this;
        _this.addColorArea(inJsonArr[0], inJsonArr[1]);
      },
      addColorArea(inJsonArr1, inJsonArr2) {
        let that = this;
        let Data = [];
        inJsonArr2.forEach((element) => {
          inJsonArr1.map((item, index) => {
            if (element.name == item.name) {
              let obj = {
                areaName: item.name,
                value: element.value,
              };
              Data.push(obj);
            }
          });
        });
        let jsonData = {
          id: "colorArea",
          name: "数值区域图",
          coordType: 0,
          coordTypeZ: 0,
          coordZ: 64,
          alpha: 1,
          type: "Segment03",
          areaHeight: 100,
          fillArea: "none",
          fillPosition: "top",
          colorMax: "#ff0000",
          colorMin: "#00BFFF",
          valueMax: 450,
          valueMin: 60,
          visible: true,
          lineDataId: "",
          areas: inJsonArr1,
          data: Data,
        };
        appInstance.uniCall("addColorAreaLayer", jsonData, (result) => {
          console.log(result);
          // 隐藏遮罩
          this.isZZ = false;
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
