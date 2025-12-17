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
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.addProvince();
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
      // 处理路径段数据
      async addProvince() {
        let res = await axios.get("./城市全景-道路交通拥堵图.json");
        console.log(res.data.RECORDS);
        let data = [];
        res.data.RECORDS.forEach((ele) => {
          data.push(ele.trafficJamLevel);
        });
        this.unique10(data);
        console.log(this.unique10(data));
        res.data.RECORDS = res.data.RECORDS.slice(0, 1000);
        let severe = res.data.RECORDS.filter((ele) => {
          return ele.trafficJamLevel == "重度拥堵";
        });
        console.log("重度拥堵", severe);
        let basic = res.data.RECORDS.filter((ele) => {
          return ele.trafficJamLevel == "基本畅通";
        });
        console.log("基本畅通", basic);
        let open = res.data.RECORDS.filter((ele) => {
          return ele.trafficJamLevel == "畅通";
        });
        console.log("畅通", open);
        // =======================================
        let severeSegments = []; // 重度拥堵-segments
        let severeData = []; // 重度拥堵-data
        severe.forEach((e) => {
          let data = [];
          e.position[0].forEach((item) => {
            const newObj = {
              coord: item,
              coordZ: 0,
            };
            data.push(newObj);
          });
          const objSegments = {
            name: "重度拥堵" + e.id,
            points: data,
          };
          const objData = {
            name: "重度拥堵" + e.id,
            value: 100,
          };
          severeSegments.push(objSegments);
          severeData.push(objData);
        });
        console.log("重度拥堵", severeSegments);
        console.log("重度拥堵", severeData);

        // =======================================
        let basicSegments = []; // 基本畅通-segments
        let basicData = []; // 基本畅通-data
        basic.forEach((e) => {
          let data = [];
          e.position[0].forEach((item) => {
            const newObj = {
              coord: item,
              coordZ: 0,
            };
            data.push(newObj);
          });
          const objSegments = {
            name: "基本畅通" + e.id,
            points: data,
          };
          const objData = {
            name: "基本畅通" + e.id,
            value: 50,
          };
          basicSegments.push(objSegments);
          basicData.push(objData);
        });
        console.log("基本畅通", basicSegments);
        console.log("基本畅通", basicData);

        // =======================================
        let openSegments = []; // 畅通-segments
        let openData = []; // 畅通-data
        open.forEach((e) => {
          let data = [];
          e.position[0].forEach((item) => {
            const newObj = {
              coord: item,
              coordZ: 0,
            };
            data.push(newObj);
          });
          const objSegments = {
            name: "畅通" + e.id,
            points: data,
          };
          const objData = {
            name: "畅通" + e.id,
            value: 0,
          };
          openSegments.push(objSegments);
          openData.push(objData);
        });
        console.log("畅通", openSegments);
        console.log("畅通", openData);
        // =======================================
        let RoadSgHeatSegments = [
          ...severeSegments,
          ...basicSegments,
          ...openSegments,
        ];
        console.log("路径段Segments", RoadSgHeatSegments);
        let RoadSgHeatData = [...severeData, ...basicData, ...openData];
        console.log("路径段Data", RoadSgHeatData);
        this.addRoadSgHeatLayer(RoadSgHeatSegments, RoadSgHeatData);
      },

      // 添加路径段
      addRoadSgHeatLayer(RoadSgHeatSegments, RoadSgHeatData) {
        let jsonData = {
          id: "RoadSgHeat",
          name: "RoadSgHeat",
          coordType: 0,
          coordTypeZ: 0,
          alpha: 1,
          width: 30,
          colorMax: "#bd1e21",
          colorMin: "#43a5bc",
          valueMax: 100,
          valueMin: 0,
          lineDataId: "",
          visible: true,
          segments: RoadSgHeatSegments,
          data: RoadSgHeatData,
        };
        appInstance.uniCall("addRoadSgHeatLayerCoord", jsonData, (result) => {
          console.log("添加路径段热力图", jsonData, result);
          this.isZZ = false;
        });
      },
      // 数组去重
      unique10(arr) {
        //Set数据结构，它类似于数组，其成员的值都是唯一的
        return Array.from(new Set(arr)); // 利用Array.from将Set结构转换成数组
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
