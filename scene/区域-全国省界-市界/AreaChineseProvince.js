window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 0,
      legendList: [
        {
          id: 1,
          action: "省界",
          isChecked: false,
          Ids: "province",
          num: 34,
          shujuliang:0
        },
        {
          id: 2,
          action: "市界",
          isChecked: false,
          Ids: "city",
          num: 363,
          shujuliang:0
        },
      ],
      areaType: [
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
            .get("https://sss141.tuguan.net:3000/areaPro")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/areaCity")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2]).then((res) => {
          let _this = this;
          // 隐藏遮罩
          _this.isZZ = false;
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
          // 添加省类型区域图
          _this.addProvince(inJsonArr);
        }
        if (index == 1) {
          //添加市县界区域
          _this.addCity(inJsonArr);
        }
      },
      // 添加省类型区域图
      addProvince(inJsonArr) {
        let that = this;
        that.legendList[0].shujuliang = inJsonArr.length
        inJsonArr.forEach(function (item, index) {
          let jsonData = {
            id: "province" + index, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            name: item.name, // 图层名称，支持为图层自定义名称
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            coordZ: 0, // 高度（单位：米）
            type: that.randomArr(that.areaType), // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
            color: that.color16(), // 颜色（HEX 颜色值）
            areaHeight: 100, // 围栏高度（单位：米）index
            fillArea: "none", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
            fillPosition: "top", // 区域填充的位置，top/bottom，默认top
            tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            visible: false, // 添加当前图层时默认是显示还是隐藏
            points: item.points,
          };

          appInstance.uniCall("addArea", jsonData, (result) => {
            console.log(result);
          });
        });
      },
      //添加市县界区域
      addCity(inJsonArr) {
        let that = this;
        that.legendList[1].shujuliang = inJsonArr.length
        inJsonArr.forEach(function (item, index) {
          let jsonData = {
            id: "city" + index, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            name: item.name, // 图层名称，支持为图层自定义名称
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            coordZ: 0, // 高度（单位：米）
            type: that.randomArr(that.areaType), // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
            color: that.color16(), // 颜色（HEX 颜色值）
            areaHeight: 100, // 围栏高度（单位：米）index
            fillArea: "none", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
            fillPosition: "top", // 区域填充的位置，top/bottom，默认top
            tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            visible: false, // 添加当前图层时默认是显示还是隐藏
            points: item.points,
          };

          appInstance.uniCall("addArea", jsonData, (result) => {
            console.log(result);
          });
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
        for (i = 0; i < el.shujuliang; i++) {
          let jsonData = {
            id: el.Ids + i,
            overlayType: "area",
            visible: el.isChecked,
          };

          appInstance.uniCall("setOverlayVisibility", jsonData, (result) => {
            console.log(result);
          });
        }

      },
      //十六进制颜色随机
      color16() {
        return "#" + Math.random().toString(16).substr(2, 6);
      },
      //   随机返回数组中的一项
      randomArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
