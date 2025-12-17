window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 3061,
      legendList: [
        {
          id: 1,
          action: "国家",
          isChecked: true,
          Ids: "countries",
          num: 247,
        },
        {
          id: 2,
          action: "首都",
          isChecked: true,
          Ids: "capitals",
          num: 274,
        },
        {
          id: 3,
          action: "城市",
          isChecked: true,
          Ids: "cities",
          num: 2540,
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
        var p1 = new Promise((resolve, reject) => {
          axios
            .get("./json/全球国家.json")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("./json/全球首都.json")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p3 = new Promise((resolve, reject) => {
          axios
            .get("./json/全球主要城市.geojson")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2, p3]).then((res) => {
          let _this = this;
          //将数据推到图层
          res.forEach((el, index) => {
            _this.transData(el, index);
          });
        });
      },
      //将数据推到图层
      transData(inJsonArr, index) {
        let _this = this;
        if (index == 0) {
          _this.addCountry(inJsonArr);
        }
        if (index == 1) {
          _this.addCapital(inJsonArr);
        }
        if (index == 2) {
          _this.addCity(inJsonArr.features);
        }
      },
      addCountry(inJsonArr) {
        let Data = inJsonArr.country.map((item) => {
          return {
            id: item.ID,
            type: "国家",
            label: item.name,
            coord: [item.lon, item.lat],
            coordZ: 0,
          };
        });
        let jsonData = {
          id: "countries",
          name: "国家图层",
          coordType: 0,
          coordTypeZ: 0,
          autoScale: false,
          visible: true,
          legends: [
            {
              name: "国家",
              color: "#FFF",
              iconName: "site_02",
              labelScale: 0.5,
              iconScale: 0.3,
            },
          ],
          data: Data,
        };

        appInstance.uniCall("addLandmarkLayer", jsonData, (result) => {
          console.log(result);
        });
      },
      addCapital(inJsonArr) {
        let Data = inJsonArr.capital.map((item) => {
          return {
            id: item.ID,
            type: "首都",
            label: item.name,
            coord: [item.lon, item.lat],
            coordZ: 0,
          };
        });
        let jsonData = {
          id: "capitals",
          name: "首都图层",
          coordType: 0,
          coordTypeZ: 0,
          autoScale: false,
          visible: true,
          legends: [
            {
              name: "首都",
              color: "#73FFFF",
              iconName: "site_02",
              labelScale: 0.5,
              iconScale: 0.3,
            },
          ],
          data: Data,
        };

        appInstance.uniCall("addLandmarkLayer", jsonData, (result) => {
          console.log(result);
        });
      },
      addCity(inJsonArr) {
        let Data = inJsonArr.map((item) => {
          return {
            id: item.properties.FID,
            type: "城市",
            label: item.properties.CITY_NAME,
            coord: item.geometry.coordinates,
            coordZ: 0,
          };
        });
        let jsonData = {
          id: "cities",
          name: "城市图层",
          coordType: 0,
          coordTypeZ: 0,
          autoScale: false,
          visible: true,
          legends: [
            {
              name: "城市",
              color: "#73FFFF",
              iconName: "site_02",
              labelScale: 0.5,
              iconScale: 0.3,
            },
          ],
          data: Data,
        };

        appInstance.uniCall("addLandmarkLayer", jsonData, (result) => {
          console.log(result);
          // 隐藏遮罩
          this.isZZ = false;
        });
      },
      //checkbox控制图层显示与隐藏
      controlChecked(el) {
        el.isChecked = !el.isChecked;
        if (el.isChecked) {
          this.number = this.number + el.num;
        } else {
          this.number = this.number - el.num;
        }
        let jsonData = {
          id: el.Ids,
          overlayType: "landmarkLayer",
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
