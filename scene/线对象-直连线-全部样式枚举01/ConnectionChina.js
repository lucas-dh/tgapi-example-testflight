window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,

      number: 0,
      beijing: 0,
      landMarks: [],
      colorList: [
        "#ffffff",
        "#fffff0",
        "#ffffe0",
        "#ffff00",
        "#fffafa",
        "#fffaf0",
        "#fffacd",
        "#fff8dc",
        "#fff5ee",
        "#fff0f5",
        "#ffefd5",
        "#ffebcd",
        "#ffe4e1",
        "#ffe4c4",
        "#ffe4b5",
        "#ffdead",
        "#ffdab9",
        "#ffd700",
        "#ffc0cb",
        "#ffb6c1",
        "#ffa500",
        "#ffa07a",
        "#ff8c00",
        "#ff7f50",
        "#ff69b4",
        "#ff6347",
        "#ff4500",
        "#ff1493",
        "#ff00ff",
        "#ff00ff",
        "#ff0000",
        "#fdf5e6",
        "#fafad2",
        "#faf0e6",
        "#faebd7",
        "#fa8072",
        "#f8f8ff",
        "#f5fffa",
        "#f5f5f5",
        "#f5f5dc",
        "#f5deb3",
        "#f4a460",
        "#f0ffff",
        "#f0fff0",
        "#f0f8ff",
        "#f0e68c",
        "#f08080",
        "#eee8aa",
        "#ee82ee",
        "#e9967a",
        "#e6e6fa",
        "#e0ffff",
        "#deb887",
        "#dda0dd",
        "#dcdcdc",
        "#dc143c",
        "#db7093",
        "#daa520",
        "#da70d6",
        "#d8bfd8",
        "#d3d3d3",
        "#d3d3d3",
        "#d2b48c",
        "#d2691e",
        "#cd853f",
        "#cd5c5c",
        "#c71585",
        "#c0c0c0",
        "#bdb76b",
        "#bc8f8f",
        "#ba55d3",
        "#b8860b",
        "#b22222",
        "#b0e0e6",
        "#b0c4de",
        "#afeeee",
        "#adff2f",
        "#add8e6",
        "#a9a9a9",
        "#a9a9a9",
        "#a52a2a",
        "#a0522d",
        "#9932cc",
        "#98fb98",
        "#9400d3",
        "#9370db",
        "#90ee90",
        "#8fbc8f",
        "#8b4513",
        "#8b008b",
        "#8b0000",
        "#8a2be2",
        "#87cefa",
        "#87ceeb",
        "#808080",
        "#808080",
        "#808000",
        "#800080",
        "#800000",
        "#7fffd4",
        "#7fff00",
        "#7cfc00",
        "#7b68ee",
        "#778899",
        "#778899",
        "#708090",
        "#708090",
        "#6b8e23",
        "#6a5acd",
        "#696969",
        "#696969",
        "#66cdaa",
        "#6495ed",
        "#5f9ea0",
        "#556b2f",
        "#4b0082",
        "#48d1cc",
        "#483d8b",
        "#4682b4",
        "#4169e1",
        "#40e0d0",
        "#3cb371",
        "#32cd32",
        "#2f4f4f",
        "#2f4f4f",
        "#2e8b57",
        "#228b22",
        "#20b2aa",
        "#1e90ff",
        "#191970",
        "#00ffff",
        "#00ffff",
        "#00ff7f",
        "#00ff00",
        "#00fa9a",
        "#00ced1",
        "#00bfff",
        "#008b8b",
        "#008080",
        "#008000",
        "#006400",
        "#0000ff",
        "#0000cd",
        "#00008b",
        "#000080",
        "#000000",
      ],
      typeList: [
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
        "ModelCube",
        "ModelCylinder",
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
              _this.showSceneInfo();
              _this.getJsonData();

              //设置地标随机上下运动
              this.timer = setInterval(() => {
                if (_this.isZZ == false) {
                  this.addUpDown();
                }
              }, 3000);
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
            .get("./json/省.json")
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
          _this.addProvince(inJsonArr);
        }
      },
      addProvince(inJsonArr) {
        let _this = this;
        let counter = inJsonArr.province.length;
        inJsonArr.province.forEach(function (item, index) {
          let obj = {
            ID: item.ID,
            provinceName: item.provinceName,
            lon: item.lon,
            lat: item.lat,
            coordZ: 100,
          };
          _this.landMarks.push(obj);

          if (item.provinceName == "北京市") {
            _this.beijing = item.ID;
          }
          let jsonData = {
            id: "landmark" + item.ID, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            iconName: "site_02", // 内置图标名称，见图观官网统一API开发手册
            autoScale: false, // 如果开启后，图标会按照摄像机远近自动缩放大小
            label: item.provinceName, // 图标标签文本
            tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            coord: [item.lon, item.lat], // XY 轴坐标，X：经度；Y：纬度
            coordZ: 100, // Z 轴高度（单位：米）
            visible: true, // 添加当前图层时默认是显示还是隐藏
            labelScale: 0.5,
            iconScale: 0.3,
          };

          appInstance.uniCall("addLandmark", jsonData, (result) => {
            console.log(item.provinceName + "的地标添加结束");
            console.log(result);

            counter--;
            if (counter <= 0) {
              _this.addConnection(inJsonArr);
            }
          });
        });
      },
      addConnection(inJsonArr) {
        let _this = this;
        let counter = parseInt(inJsonArr.province.length) - 1;
        inJsonArr.province.forEach(function (item, index) {
          if (item.provinceName != "北京市") {
            let typeIdx =
              parseInt(Math.random() * _this.typeList.length) %
              _this.typeList.length;
            let colorIdx = index % _this.colorList.length;
            let jsonData = {
              id: "connectionId" + index,
              overlayType: "landmark",
              idLayer: "",
              startIdObj: "landmark" + _this.beijing,
              startOffset: [0, 0, 0],
              endIdObj: "landmark" + item.ID,
              endOffset: [0, 0, 0],
              type: _this.typeList[typeIdx],
              texture: "cableFlow.png",
              textureSpeed: 1,
              autoScale: false,
              color: _this.colorList[colorIdx],
              width: 1,
              shapeType: "angle90",
              curvature: 0.5,
              angleOrder: "zxy",
              label: "",
              labelColor: "#ffffff",
              labelBackgroundColor: "#333333",
              labelFontSize: 20,
            };
            appInstance.uniCall("addConnection", jsonData, (result) => {
              console.log("到" + item.provinceName + "的直连线添加结束");
              console.log(result);

              counter--;
              if (counter <= 0) {
                // 隐藏遮罩
                _this.isZZ = false;
              }
            });
          }
        });
      },
      //设置地标上下移动
      addUpDown() {
        let _this = this;
        _this.landMarks.forEach(function (item, index) {
          let hei = item.coordZ;
          if (hei == 100) {
            hei = 250000;
          } else {
            hei = 100;
          }
          let jsonData = {
            id: "landmark" + item.ID, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            coord: [item.lon, item.lat], // XY 轴坐标，X：经度；Y：纬度
            coordZ: hei, // Z 轴高度（单位：米）
          };
          _this.landMarks[index].coordZ = hei;

          appInstance.uniCall("updateLandmarkCoord", jsonData, (result) => {
            // console.log(item.provinceName + '移动结束');
            // console.log(result);
          });
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
