window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      legendList: [
        {
          id: 1,
          name: "2017年",
          layerId: "grid0",
          isChecked: false,
          num: 179,
        },
        {
          id: 2,
          name: "2018年",
          layerId: "grid1",
          isChecked: false,
          num: 199,
        },
        {
          id: 3,
          name: "2019年",
          layerId: "grid2",
          isChecked: false,
          num: 255,
        },
        {
          id: 4,
          name: "2020年",
          layerId: "grid3",
          isChecked: false,
          num: 140,
        },
        {
          id: 5,
          name: "2021年",
          layerId: "grid4",
          isChecked: false,
          num: 140,
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
              _this.getEarthData();
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
      // 请求五年地震数据
      getEarthData() {
        var p1 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/gridWorld2017")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/gridWorld2018")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p3 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/gridWorld2019")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p4 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/gridWorld2020")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p5 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/gridWorld2021")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2, p3, p4, p5]).then((res) => {
          _this = this;

          //获取到五个年份的数据
          res.forEach((el, index) => {
            this.legendList[index].num = res[index].length;
            this.addGrid(el, index);
          });
        });
      },

      //添加栅格图
      addGrid(data, index) {
        let jsonData = {
          id: "grid" + index, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "栅格图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // Z 轴高度（单位：米）
          gridType: "grid", // 栅格外观类别，grid：方格；dot：圆点
          gridHeight: 1000, // 单栅高度（单位：米）
          gridAlpha: 1, // 栅格透明度，0：完全透明；1：完全不透明
          gridWidth: 100000, // 栅格宽度（单位：米）
          colorMax: "#FF0000", // 最大值颜色（HEX 颜色值）
          colorMin: "#009acf", // 最小值颜色（HEX 颜色值）
          valueMax: 15, // 数据最大值上限
          valueMin: 1, // 数据最小值下限
          visible: false, // 添加当前图层时默认是显示还是隐藏
          pointDataId: "", // 对应本服务器上点数据对象，如果找到 pointDataId，则下方的 data 不起作用
          data: data,
        };

        appInstance.uniCall("add3DGridLayer", jsonData, (result) => {
          console.log(result);
          this.isZZ = false;
        });
      },
      //checkbox控制栅格图显示与隐藏
      controlChecked(el, idx) {
        if (el.isChecked) {
          el.isChecked = false;
        } else {
          this.legendList.forEach((item, index) => {
            item.isChecked = false;
            let jsonData = {
              id: "grid" + index,
              overlayType: "3DGridLayer",
              visible: el.isChecked,
            };

            appInstance.uniCall("setOverlayVisibility", jsonData, (result) => {
              console.log(result);
            });
          });
          el.isChecked = true;
        }

        let jsonData = {
          id: "grid" + idx,
          overlayType: "3DGridLayer",
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
