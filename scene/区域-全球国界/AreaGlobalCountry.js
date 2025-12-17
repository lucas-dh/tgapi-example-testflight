window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 164,
      legendList: [
        {
          id: 1,
          action: "国界",
          isChecked: true,
          Ids: "country",
          num: 164,
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
            .get("./json/全球国界.geojson")
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
              let type = _this.randomArr(index);
              let objtwo = {
                id: "areaName" + index,
                name: "区域轮廓",
                coordType: 0,
                coordTypeZ: 0,
                coordZ: 0,
                type: _this.typeList[type], // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
                color: _this.colorList[type], // 颜色（HEX 颜色值）
                areaHeight: 100, // 边界围栏高度（单位：米）
                fillArea: _this.fillList[type], // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
                fillPosition: "top", // 区域填充的位置，top/bottom，默认top
                tag: "custominfo",
                points: Points,
              };
              appInstance.uniCall("addArea", objtwo, (result) => {
                console.log(result);
              });
            } else {
              let number = index;
              let type = _this.randomArr(index);
              item.geometry.coordinates.forEach(function (onecoord, index) {
                let Points = [];
                onecoord[0].forEach((item) => {
                  let obj = {
                    coord: item, // XY 轴坐标，X：经度；Y：纬度
                  };
                  Points.push(obj);
                });

                let objtwo = {
                  id: "areaName" + number + "xia" + index,
                  name: "区域轮廓",
                  coordType: 0,
                  coordTypeZ: 0,
                  coordZ: 0,
                  type: _this.typeList[type], // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
                  color: _this.colorList[type], // 颜色（HEX 颜色值）
                  areaHeight: 100, // 边界围栏高度（单位：米）
                  fillArea: _this.fillList[type], // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
                  fillPosition: "top", // 区域填充的位置，top/bottom，默认top
                  tag: "custominfo",
                  points: Points,
                };
                appInstance.uniCall("addArea", objtwo, (result) => {
                  console.log(result);
                });
              });
            }
          }
        });
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
          overlayType: "area",
          visible: el.isChecked,
        };

        appInstance.uniCall("setOverlayTypeVisibility", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
