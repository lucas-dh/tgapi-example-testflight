window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 0,
      legendList: [
        {
          id: 1,
          action: "国界",
          isChecked: false,
          Ids: "country",
          num: 34,
        },
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
      ],
      typeList: [
        "Arrow01",
        "Gradient01",
        "Gradient02",
        "Gradient03",
        "Grid01",
        "Grid02",
        "Grid03",
        "Grid04",
        "Grid05",
        "Segment01",
        "Segment02",
        "Segment03",
      ],
      fillList: [
        "Gradient01",
        "Gradient02",
        "Grid01",
        "Grid02",
        "Segment01",
        "Segment02",
        "Solid01",
        "Solid02",
        "Solid03",
        "Solid04",
        "Solid05",
        "Gradient01",
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
            .get("./json/area.geojson")
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
            _this.transData(el.features, index);
          });
        });
      },
      //将数据推到图层
      transData(inJsonArr, index) {
        let _this = this;
        if (index == 0) {
          //添加国界区域
          _this.addCountry(inJsonArr);
        }
      },
      //   随机返回数组中的一项
      randomArr(index) {
        if (index >= this.typeList.length) {
          let num = index % this.typeList.length;
          return num;
        } else {
          return index;
        }
      },
      //添加国界区域
      addCountry(inJsonArr) {
        this.isZZ = false;
        let _this = this;
        let areas = [];
        let Legends = [];
        // 处理数据
        inJsonArr.forEach(function (item, index) {
          if (item.geometry) {
            if (item.geometry.coordinates.length == 1) {
              //编辑边界点位数据
              let Points = [];
              item.geometry.coordinates[0][0].forEach(function (onecoord) {
                let obj = {
                  coord: onecoord, // XY 轴坐标，X：经度；Y：纬度
                };
                Points.push(obj);
              });
              let objtwo = {
                name: "areaName" + index,
                points: Points,
              };
              areas.push(objtwo);
            } else {
              let number = index;
              item.geometry.coordinates.forEach(function (onecoord, index) {
                let Points = [];
                onecoord[0].forEach((item) => {
                  let obj = {
                    coord: item, // XY 轴坐标，X：经度；Y：纬度
                  };
                  Points.push(obj);
                });
                let objtwo = {
                  name: "areaName" + number + "xia" + index,
                  points: Points,
                };
                areas.push(objtwo);
              });
            }
          }
        });
        // 生成数据
        let Data = areas.map((e, idx) => {
          return {
            areaName: e.name,
            legendName: e.name,
          };
        });
        // 生成legend
        areas.forEach((item, index) => {
          let type = this.randomArr(index);
          let Legend = {
            name: item.name, // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
            type: _this.typeList[type], // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
            color: _this.colorList[type], // 颜色（HEX 颜色值）
            areaHeight: 100, // 边界围栏高度（单位：米）
            fillArea: _this.fillList[type], // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
            fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          };
          Legends.push(Legend);
        });

        // 添加国界区域
        let jsonData = {
          id: "typeArea1", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "类型区域图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // Z 轴高度（单位：米）
          alpha: 1, // 透明度
          visible: false, // 添加当前图层时默认是显示还是隐藏
          lineDataId: "", // 对应本服务器上线数据对象，如果找到 lineDataId，则下方的 areas 不起作用
          areas: areas,
          legends: Legends,
          data: Data,
        };
        appInstance.uniCall("addTypeAreaLayer", jsonData, (result) => {
          console.log(result);
        });
        _this.legendList[0].num = inJsonArr.length;
      },
      //checkbox控制图层显示与隐藏
      controlChecked(el, idx) {
        el.isChecked = !el.isChecked;
        if (el.isChecked) {
          this.number = this.number + el.num;
        } else {
          this.number = this.number - el.num;
        }
        let jsonData = {
          id: "typeArea1",
          overlayType: "typeAreaLayer",
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
