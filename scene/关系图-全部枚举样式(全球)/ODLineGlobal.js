window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,

      number: 0,
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
          _this.addODLine(inJsonArr);
        }
      },

      addODLine(inJsonArr) {
        let _this = this;
        let Legends = [];
        let Data = [];
        inJsonArr.country.map((item, index) => {
          if (item.name.indexOf("中国") == -1) {
            let rndIndex = index % 4;
            let obj1 = {
              name: "line" + rndIndex,
              type: _this.lineTypeList[rndIndex].lineType,
              bubbleColor: _this.lineTypeList[rndIndex].color,
              lineColor: _this.lineTypeList[rndIndex].color,
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            };
            Legends.push(obj1);

            let obj2 = {
              id: index, // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              startCoord: ["116.405285", "39.904989"], // 起点 XY 轴坐标，X：经度；Y：纬度
              startCoordZ: 0, // 起点 Z 轴高度（单位：米）
              targetCoord: [item.lon, item.lat], // 终点点 XY 轴坐标，X：经度；Y：纬度
              targetCoordZ: 0, // 终点 Z 轴高度（单位：米）
              label: "", // 标签文本，如果为 ""，则不显示标签
              value: 70, // 数据点权值
              type: "line" + rndIndex, // 数据点图例类别
            };
            Data.push(obj2);
          }
        });
        let jsonData = {
          id: "odline", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "关系图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          isShowBubble: true, // 是否显示气泡，默认显示，true / false
          bubbleRadiusMax: 300000, // 气泡最大半径
          bubbleRadiusMin: 50000, // 气泡最小半径
          bubbleSpeed: 50000, // 气泡扩散速度（单位：米/秒）
          lineWidthMax: 150000, // 连线最大宽度（单位：米）
          lineWidthMin: 5000, // 连线最小宽度（单位：米）
          lineSpeed: 100000, // 连线动画速度(单位:米/秒)
          curvature: 0.3, // 连线曲度调节(取值范围 -1 ~ 1, 0为直线, 此值越接近0曲线越平, 反之曲线越陡峭)
          valueMax: 100, // 数据最大值上限
          valueMin: 50, // 数据最小值上限
          visible: true, // 添加当前图层时默认是显示还是隐藏
          legends: Legends,
          data: Data,
        };
        appInstance.uniCall("addODLineLayer", jsonData, (result) => {
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
