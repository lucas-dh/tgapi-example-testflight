window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 0,
      legendList: [
        {
          id: 1,
          name: "2017年",

          layerId: "heat0",
          isChecked: false,
          num: 179,
        },
        {
          id: 2,
          name: "2018年",

          layerId: "heat1",
          isChecked: false,
          num: 199,
        },
        {
          id: 3,
          name: "2019年",

          layerId: "heat2",
          isChecked: false,
          num: 255,
        },
        {
          id: 4,
          name: "2020年",

          layerId: "heat3",
          isChecked: false,
          num: 140,
        },
        {
          id: 5,
          name: "2021年",

          layerId: "heat4",
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
            sceneConfig.worldUrl,
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
              sceneConfig.worldUrl, //模型地址
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
            .get("https://sss141.tuguan.net:3000/world2017")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2018")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p3 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2019")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p4 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2020")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p5 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2021")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2, p3, p4, p5]).then((res) => {
          let _this = this;
          // 隐藏遮罩
          _this.isZZ = false;
          //获取到五个年份的数据
          res.forEach((el, index) => {
            this.legendList[index].num = res[index].length;
            this.addHeat(el, index);
          });
        });
      },
      //添加热力图
      addHeat(data, index) {
        let jsonData = {
          id: "heat" + index, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "热力图层", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // Z 轴高度（单位：米）
          type: "default", // 外观类型，default：标准热图；dot：点状热图
          alpha: 1, // 透明度，0：完全透明；1：完全不透明
          colorMax: "#FF0000", // 最大值颜色（HEX 颜色值）
          colorMin: "#009acf", // 最小值颜色（HEX 颜色值）
          valueMax: 10, // 数据最大值上限
          valueMin: 1, // 数据最小值下限
          radius: 400000, // 每一个点的半径单位（米）
          visible: false, // 添加当前图层时默认是显示还是隐藏
          pointDataId: "", // 对应本服务器上点数据对象，如果找到pointDataId，则下方的data不起作用
          data: data,
        };

        appInstance.uniCall("addHeatMapLayer", jsonData, (result) => {
          console.log(result);
        });
      },
      //checkbox控制热力图显示与隐藏
      controlChecked(el, idx) {
        el.isChecked = !el.isChecked;
        if (el.isChecked) {
          this.number = this.number + el.num;
        } else {
          this.number = this.number - el.num;
        }

        let jsonData = {
          id: "heat" + idx,
          overlayType: "heatMapLayer",
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
