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
            sceneConfig.earthUrl,
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
              sceneConfig.earthUrl, //模型地址
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
        var p3 = new Promise((resolve, reject) => {
          axios
            .get("./json/area.geojson")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p3]).then((res) => {
          let _this = this;
          // 隐藏遮罩
          _this.isZZ = false;
          //将数据推到图层
          res.forEach((el, index) => {
            _this.transData(el, index);
          });
        });
      },
      //将数据推到图层
      transData(inJsonArr, index) {
        let _this = this;
        _this.addColorArea(inJsonArr.features);
      },
      // 返回随机数
      mathRound() {
        return Math.round(Math.random() * 10 + 1);
      },
      addColorArea(inJsonArr) {
        let _this = this;
        let Areas = [];
        let Data = [];
        inJsonArr.forEach(function (item, index) {
          if (item.geometry) {
            if (item.geometry.coordinates.length == 1) {
              let value = _this.mathRound();
              //编辑边界点位数据
              let Points = [];
              item.geometry.coordinates[0][0].forEach(function (onecoord) {
                let obj = {
                  coord: onecoord, // XY 轴坐标，X：经度；Y：纬度
                };
                Points.push(obj);
              });

              //编辑区域
              let Area = {
                name: item.properties.NAME, // 图层区域子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                points: Points,
              };
              Areas.push(Area);
              let obj = {
                areaName: item.properties.NAME,
                value: value,
              };
              Data.push(obj);
            } else {
              let value = _this.mathRound();
              item.geometry.coordinates.forEach(function (onecoord, index) {
                let Points = [];
                onecoord[0].forEach((item) => {
                  let obj = {
                    coord: item, // XY 轴坐标，X：经度；Y：纬度
                  };
                  Points.push(obj);
                });
                //编辑区域
                let Area = {
                  name: item.properties.NAME + index, // 图层区域子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                  points: Points,
                };
                Areas.push(Area);

                let obj = {
                  areaName: item.properties.NAME + index,
                  value: value,
                };
                Data.push(obj);
              });
            }
          }
        });

        let jsonData = {
          id: "colorArea",
          name: "数值区域图",
          coordType: 0,
          coordTypeZ: 0,
          coordZ: 0,
          alpha: 1,
          type: "Segment03",
          areaHeight: 100,
          fillArea: "none",
          fillPosition: "top",
          colorMax: "#ff0000",
          colorMin: "#00BFFF",
          valueMax: 11,
          valueMin: 1,
          visible: true,
          lineDataId: "",
          areas: Areas,
          data: Data,
        };
        appInstance.uniCall("addColorAreaLayer", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
