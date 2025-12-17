window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 3237,
      legendList: [
        {
          id: 1,
          action: "省",
          isChecked: true,
          Ids: "province",
          num: 34,
        },
        {
          id: 2,
          action: "市",
          isChecked: true,
          Ids: "city",
          num: 363,
        },
        {
          id: 3,
          action: "乡",
          isChecked: true,
          Ids: "district",
          num: 2840,
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
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.addProvince();
              _this.addcity();
              _this.addDistrict();
            }
          }
        );
      },
      addProvince() {
        axios.get("./json/省.json").then((res) => {
          let Data = res.data.province.map((item) => {
            return {
              id: item.ID,
              type: "省",
              label: item.provinceName,
              coord: [item.lon, item.lat],
              coordZ: 100,
            };
          });
          let jsonData = {
            id: "province",
            name: "地标图层",
            coordType: 0,
            coordTypeZ: 0,
            autoScale: false,
            visible: true,
            legends: [
              {
                name: "省",
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
        });
      },
      addcity() {
        axios.get("./json/市.json").then((res) => {
          let Data = res.data.city.map((item) => {
            return {
              id: item.ID,
              type: "市",
              label: item.cityName,
              coord: [item.lon, item.lat], //以深圳湾经纬度为例
              coordZ: 100,
            };
          });
          let jsonData = {
            id: "city",
            name: "地标图层",
            coordType: 0,
            coordTypeZ: 0,
            autoScale: false,
            visible: true,
            legends: [
              {
                name: "市",
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
        });
      },
      addDistrict() {
        axios.get("./json/乡.json").then((res) => {
          // 隐藏遮罩
          this.isZZ = false;
          let Data = res.data.district.map((item) => {
            return {
              id: item.ID,
              type: "乡",
              label: item.districtName,
              coord: [item.lon, item.lat], //以深圳湾经纬度为例
              coordZ: 100,
            };
          });
          let jsonData = {
            id: "district",
            name: "地标图层",
            coordType: 0,
            coordTypeZ: 0,
            autoScale: false,
            visible: true,
            legends: [
              {
                name: "乡",
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
        });
      },
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
    },

    mounted() {
      this.getToken();
    },
  });
};
