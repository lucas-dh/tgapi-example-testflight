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
          _this.addStart(inJsonArr);
        }
      },
      addStart(inJsonArr) {
        let _this = this;
        let Data = [];
        inJsonArr.province.map((item, index) => {
          if (item.provinceName.indexOf("北京市") == -1) {
            let obj = {
              id: index,
              coord: ["116.405285", "39.904989"], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
              type: "poiCar", // 数据点图例类别
            };
            Data.push(obj);
          }
        });

        let jsonData = {
          id: "trail", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "轨迹图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          trackStyle: "style001", // 尾迹内置风格
          trackDuration: 20, // 尾迹粒子生命周期(单位：秒)
          trackWidth: 10000, // 尾迹粒子的宽度
          objLife: 40, // 批号消批时间长度(单位：秒)
          visible: true, // 添加当前图层时默认是显示还是隐藏
          duration: 30, // 从上一位置移动到新位置花费的时间长度（单位，秒）这里的值是更新数据可以使用的默认值
          legends: [
            {
              name: "poiCar", // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              iconName: "taxi", // 内置图标名称：见图观官网统一API开发手册
              trackColor: "#ff0000", // 轨迹颜色（HEX 颜色值）
              iconScale: 0.5,
            },
          ],
          data: Data,
        };
        appInstance.uniCall("addTrailLayer", jsonData, (result) => {
          console.log(result);
          // 隐藏遮罩
          _this.isZZ = false;
          _this.addTrail(inJsonArr);
        });
      },
      addTrail(inJsonArr) {
        let Data = [];
        inJsonArr.province.map((item, index) => {
          if (item.provinceName.indexOf("北京市") == -1) {
            let obj = {
              id: index,
              coord: [item.lon, item.lat], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
              type: "poiCar", // 数据点图例类别
            };
            Data.push(obj);
          }
        });
        let jsonData = {
          id: "trail", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "轨迹图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          isAppend: true, // 是否追加数据（按数据顺序），true：按新数据 更新原有重复数据 & 追加新数据；false：清除原有数据 & 重建新数据
          duration: 30, // 从上一位置移动到新位置花费的时间长度（单位，秒）这里的值优先级高于 addTrailLayer 中的 duration 值
          data: Data,
        };

        setTimeout(() => {
          appInstance.uniCall("updateTrailLayerCoord", jsonData, (result) => {
            console.log(result);
          });
        }, 1000);
        setTimeout(() => {
          let jsonData = {
            overlayType: "all",
          };
          appInstance.uniCall("clearOverlayType", jsonData, (result) => {
            console.log(result);
          });
          this.getJsonData();
        }, 40000);
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
