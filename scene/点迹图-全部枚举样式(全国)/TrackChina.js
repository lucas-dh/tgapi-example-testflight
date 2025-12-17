window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      lineTypeList: [
        {
          id: 0,
          lineType: "default",
          lineLabel: "波浪线型",
          color: "#FF0000",
          isChecked: true,
        },
        {
          id: 1,
          lineType: "arrow",
          lineLabel: "箭头型",
          color: "#00B050",
          isChecked: false,
        },
        {
          id: 2,
          lineType: "dot",
          lineLabel: "虚线型",
          color: "#0070C0",
          isChecked: false,
        },
        {
          id: 3,
          lineType: "ray",
          lineLabel: "射线型",
          color: "#7030A0",
          isChecked: false,
        },
      ],
      date: [],
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
            .get("./json/省副本.json")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1]).then((res) => {
          let _this = this;
          _this.date = JSON.parse(JSON.stringify(res[0].province));
          _this.addTrack(_this.lineTypeList[0]);
        });
      },

      addTrack(el) {
        let Legends = [];
        let Data = [];
        this.date.forEach((item, index) => {
          if (item.provinceName.indexOf("北京市") == -1) {
            //编辑legends，保持跟点迹数量一致
            let obj = {
              name: "legendName" + index, // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              icon: "car", // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              lineColor: el.color, // 路线颜色（HEX 颜色值）
              lineWidth: 50000, // 路线宽度（单位：米）
              lineType: el.lineType, // 路线样式类别 default 波浪线型, arrow 箭头型, dot 虚线型
              lineSpeed: 25000, // 路线流动速度（单位：米/秒）
              curvature: 0.5, // 路线曲率系数
              iconScale: 0.5,
              labelScale: 0.5,
            };
            Legends.push(obj);

            //编辑Data
            let obj1 = {
              id: index,
              label: item.timelabel,
              time: "2022-10-01 08:00:01",
              coord: [this.date[index - 1].lon, this.date[index - 1].lat],
              coordZ: 64,
              type: "legendName" + index,
            };
            Data.push(obj1);
            if (index == 6) {
              let obj2 = {
                id: index,
                label: "12月13日",
                time: "2022-10-01 09:00:01",
                coord: [item.lon, item.lat],
                coordZ: 64,
                type: "legendName" + index,
              };
              Data.push(obj2);
            } else {
              let obj2 = {
                id: index,
                label: "",
                time: "2022-10-01 09:00:01",
                coord: [item.lon, item.lat],
                coordZ: 64,
                type: "legendName" + index,
              };
              Data.push(obj2);
            }
          }
        });
        let jsonData = {
          id: "trackLayerId" + el.id,
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
      //checkbox控制显示与隐藏
      controlChecked(el, idx) {
        this.lineTypeList.forEach((item) => {
          item.isChecked = false;
        });
        let jsonData = {
          overlayType: "trackLayer",
        };

        appInstance.uniCall("clearOverlayType", jsonData, (result) => {
          console.log(result);
        });
        this.lineTypeList[idx].isChecked = true;
        this.addTrack(el);
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
