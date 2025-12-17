window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      vehicleList: [
        {
          id: 1,
          iconName: "car",
          iconLabel: "汽车",
        },
        {
          id: 2,
          iconName: "policecar",
          iconLabel: "警车",
        },
        {
          id: 3,
          iconName: "fireengine",
          iconLabel: "消防车",
        },
        {
          id: 4,
          iconName: "ambulance",
          iconLabel: "救护车",
        },
        {
          id: 5,
          iconName: "taxi",
          iconLabel: "出租车",
        },
        {
          id: 6,
          iconName: "truck",
          iconLabel: "卡车",
        },
        {
          id: 7,
          iconName: "bus",
          iconLabel: "公交车",
        },
        {
          id: 8,
          iconName: "newscar",
          iconLabel: "新闻车",
        },
        {
          id: 9,
          iconName: "militarycar",
          iconLabel: "军车",
        },
        {
          id: 10,
          iconName: "municipal",
          iconLabel: "公务车",
        },
        {
          id: 11,
          iconName: "electriccar",
          iconLabel: "电车",
        },
        {
          id: 12,
          iconName: "watercar",
          iconLabel: "水车",
        },
        {
          id: 13,
          iconName: "train",
          iconLabel: "火车",
        },
        {
          id: 14,
          iconName: "ship",
          iconLabel: "轮船",
        },
        {
          id: 15,
          iconName: "cargoship",
          iconLabel: "货船",
        },
        {
          id: 16,
          iconName: "airplane",
          iconLabel: "飞机",
        },
        {
          id: 17,
          iconName: "helicopter",
          iconLabel: "直升机",
        },
        {
          id: 18,
          iconName: "uav",
          iconLabel: "无人机",
        },
        {
          id: 19,
          iconName: "satellite",
          iconLabel: "卫星",
        },
        {
          id: 20,
          iconName: "rocket",
          iconLabel: "火箭",
        },
      ],
      lineTypeList: [
        {
          id: 1,
          lineType: "default",
          lineLabel: "波浪线型",
          color: "#FF0000",
        },
        {
          id: 2,
          lineType: "arrow",
          lineLabel: "箭头型",
          color: "#00B050",
        },
        {
          id: 3,
          lineType: "dot",
          lineLabel: "虚线型",
          color: "#0070C0",
        },
        {
          id: 4,
          lineType: "ray",
          lineLabel: "射线型",
          color: "#7030A0",
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
        Promise.all([p1]).then((res) => {
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
          _this.addTrack(inJsonArr);
        }
      },
      addTrack(inJsonArr) {
        let _this = this;
        let Legends = [];
        let Data = [];
        inJsonArr.country.map((item, index) => {
          if (item.name.indexOf("中国") == -1) {
            //编辑legends，保持跟点迹数量一致
            let veh = index % 20;
            let lin = index % 4;
            let obj = {
              name: "legendName" + index, // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              icon: this.vehicleList[veh].iconName, // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              lineColor: this.lineTypeList[lin].color, // 路线颜色（HEX 颜色值）
              lineWidth: 50000, // 路线宽度（单位：米）
              lineType: this.lineTypeList[lin].lineType, // 路线样式类别 default 波浪线型, arrow 箭头型, dot 虚线型
              lineSpeed: 2500, // 路线流动速度（单位：米/秒）
              curvature: 0.3, // 路线曲率系数
            };
            Legends.push(obj);

            //编辑Data
            if (index == 0) {
              let obj1 = {
                id: index,
                label: "",
                time: "2022-10-01 08:00:01",
                coord: ["116.405285", "39.904989"],
                coordZ: 0,
                type: "legendName" + index,
              };
              Data.push(obj1);
            } else {
              let obj1 = {
                id: index,
                label: "",
                time: "2022-10-01 08:00:01",
                coord: [
                  inJsonArr.country[index - 1].lon,
                  inJsonArr.country[index - 1].lat,
                ],
                coordZ: 0,
                type: "legendName" + index,
              };
              Data.push(obj1);
            }
            let obj2 = {
              id: index,
              label: "",
              time: "2022-10-01 09:00:01",
              coord: [item.lon, item.lat],
              coordZ: 0,
              type: "legendName" + index,
            };
            Data.push(obj2);
          }
        });

        let jsonData = {
          id: "trackLayerId",
          name: "layerName",
          coordType: 0,
          coordTypeZ: 0,
          visible: true,
          legends: Legends,
          data: Data,
        };

        appInstance.uniCall("addTrackLayer", jsonData, (result) => {
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
