window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      legendList: [
        {
          id: 1,
          action: "男性",
          isChecked: true,
          Ids: "barMale",
        },
        {
          id: 2,
          action: "女性",
          isChecked: true,
          Ids: "barFemale",
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
            .get("./json/全球各国男女比例.json")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("./json/全球各国男女比例.json")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2]).then((res) => {
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
          _this.addMale(inJsonArr);
        }
        if (index == 1) {
          _this.addFemale(inJsonArr);
        }
      },
      addMale(inJsonArr) {
        let Data = inJsonArr.map((item, index) => {
          return {
            id: "male" + index,
            label: "男性",
            coord: [item.lon, item.lat],
            value: item.male,
          };
        });
        let jsonData = {
          id: "barMale", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "三维柱状图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 1000, // Z 轴高度（单位：米）
          columnType: "cube", // 柱体外观类别，cube：方柱；cylinder：圆柱
          columnMinHeight: 100000, // 柱体最小高度（单位：米）
          columnMaxHeight: 1000000, // 柱体最大高度（单位：米）
          columnAlpha: 1, // 柱体透明度，0：完全透明；1：完全不透明
          columnPaint: "solid", // 柱体样式类别，solid：单色着色；linear：线性着色；legend：根据图例颜色区间绘制
          columnGap: 40000, // 柱体间隙（单位：米）
          columnWidth: 40000, // 柱体宽度（单位：米）
          colorMax: "#0000FF", // 最大值颜色（HEX 颜色值）
          colorMin: "#0000A0", // 最小值颜色（HEX 颜色值）
          valueMax: 100000000, // 数据最大值上限
          valueMin: 0, // 数据最小值下限
          labelColor: "#00FF00", // 标签文本颜色，可选值，默认白色
          labelBackgroundColor: "#333333", // 标签文本背景色，可选值，默认灰色
          visible: true, // 添加当前图层时默认是显示还是隐藏
          pointDataId: "", // 对应本服务器上点数据对象，如果找到pointDataId，则下方的data不起作用
          data: Data,
        };

        appInstance.uniCall("add3DColumnLayer", jsonData, (result) => {
          console.log(result);
        });
      },
      addFemale(inJsonArr) {
        let Data = inJsonArr.map((item, index) => {
          let _lon = parseFloat(item.lon) + 0.4;
          return {
            id: "female" + index,
            label: "女性",
            coord: [_lon, item.lat],
            value: item.female,
          };
        });
        let jsonData = {
          id: "barFemale", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "三维柱状图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 1000, // Z 轴高度（单位：米）
          columnType: "cube", // 柱体外观类别，cube：方柱；cylinder：圆柱
          columnMinHeight: 100000, // 柱体最小高度（单位：米）
          columnMaxHeight: 1000000, // 柱体最大高度（单位：米）
          columnAlpha: 1, // 柱体透明度，0：完全透明；1：完全不透明
          columnPaint: "solid", // 柱体样式类别，solid：单色着色；linear：线性着色；legend：根据图例颜色区间绘制
          columnGap: 40000, // 柱体间隙（单位：米）
          columnWidth: 40000, // 柱体宽度（单位：米）
          colorMax: "#FFC0CB", // 最大值颜色（HEX 颜色值）
          colorMin: "#FFC090", // 最小值颜色（HEX 颜色值）
          valueMax: 100000000, // 数据最大值上限
          valueMin: 0, // 数据最小值下限
          labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
          labelBackgroundColor: "#333333", // 标签文本背景色，可选值，默认灰色
          visible: true, // 添加当前图层时默认是显示还是隐藏
          pointDataId: "", // 对应本服务器上点数据对象，如果找到pointDataId，则下方的data不起作用
          data: Data,
        };

        appInstance.uniCall("add3DColumnLayer", jsonData, (result) => {
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
