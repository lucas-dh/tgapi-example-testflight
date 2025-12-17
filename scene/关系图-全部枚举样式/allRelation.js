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
        //使用授权码读取模型文件初始化场景
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
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.isZZ = false;
              _this.upLoadAllRelation();
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
          (result) => {}
        );
      },
      //加载全部关系图样式
      upLoadAllRelation() {
        let jsonData = {
          id: "odline", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "关系图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          isShowBubble: true, // 是否显示气泡，默认显示，true / false
          bubbleRadiusMax: 2000000, // 气泡最大半径
          bubbleRadiusMin: 20000, // 气泡最小半径
          bubbleSpeed: 100000, // 气泡扩散速度（单位：米/秒）
          lineWidthMax: 300000, // 连线最大宽度（单位：米）
          lineWidthMin: 100, // 连线最小宽度（单位：米）
          lineSpeed: 50000, // 连线动画速度(单位:米/秒)
          curvature: 0.8, // 连线曲度调节(取值范围 -1 ~ 1, 0为直线, 此值越接近0曲线越平, 反之曲线越陡峭)
          valueMax: 100, // 数据最大值上限
          valueMin: 10, // 数据最小值上限
          visible: true, // 添加当前图层时默认是显示还是隐藏
          legends: [
            // 定义图层包含图例，支持为不同图例定义各自样式
            {
              name: "odline1", // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              type: "default", // 路线样式类别 default 波浪线型, arrow 箭头型, dot 虚线型, ray 射线型, pulse 脉冲型
              bubbleColor: "#33cccc", // 起点终点气泡 颜色（HEX颜色值）
              lineColor: "#33cccc", // 连线颜色（HEX颜色值）
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline2",
              type: "arrow",
              bubbleColor: "#99ff99",
              lineColor: "#99ff99",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline3",
              type: "dot",
              bubbleColor: "#669900",
              lineColor: "#669900",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline4",
              type: "ray",
              bubbleColor: "#339999",
              lineColor: "#339999",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline5",
              type: "arrow",
              bubbleColor: "#ff6600",
              lineColor: "#ff6600",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline6",
              type: "dot",
              bubbleColor: "#ff3333",
              lineColor: "#ff3333",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline7",
              type: "ray",
              bubbleColor: "#ffffcc",
              lineColor: "#ffffcc",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline8",
              type: "default",
              bubbleColor: "#ff3300",
              lineColor: "#ff3300",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline9",
              type: "ray",
              bubbleColor: "#ff6600",
              lineColor: "#ff6600",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline10",
              type: "arrow",
              bubbleColor: "#0033ff",
              lineColor: "#0033ff",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline11",
              type: "dot",
              bubbleColor: "#ff3399",
              lineColor: "#ff3399",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline12",
              type: "default",
              bubbleColor: "#ff33cc",
              lineColor: "#ff33cc",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline13",
              type: "ray",
              bubbleColor: "#663366",
              lineColor: "#663366",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline14",
              type: "arrow",
              bubbleColor: "#003399",
              lineColor: "#003399",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline15",
              type: "dot",
              bubbleColor: "#0033ff",
              lineColor: "#0033ff",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline16",
              type: "arrow",
              bubbleColor: "#ff6633",
              lineColor: "#ff6633",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline17",
              type: "dot",
              bubbleColor: "#666600",
              lineColor: "#666600",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline18",
              type: "ray",
              bubbleColor: "#330000",
              lineColor: "#330000",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline19",
              type: "default",
              bubbleColor: "#ffff00",
              lineColor: "#ffff00",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline20",
              type: "ray",
              bubbleColor: "#cc0000",
              lineColor: "#cc0000",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline21",
              type: "arrow",
              bubbleColor: "#996600",
              lineColor: "#996600",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline22",
              type: "dot",
              bubbleColor: "#ff9933",
              lineColor: "#ff9933",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline23",
              type: "ray",
              bubbleColor: "#cc0000",
              lineColor: "#cc0000",
              labelColor: "#ff6666", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline24",
              type: "default",
              bubbleColor: "#33ffff",
              lineColor: "#33ffff",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline25",
              type: "ray",
              bubbleColor: "#000033",
              lineColor: "#000033",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline26",
              type: "default",
              bubbleColor: "#ff0000",
              lineColor: "#ff0000",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline27",
              type: "dot",
              bubbleColor: "#6666cc",
              lineColor: "#6666cc",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline28",
              type: "dot",
              bubbleColor: "#cc00cc",
              lineColor: "#cc00cc",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline29",
              type: "arrow",
              bubbleColor: "#9900ff",
              lineColor: "#9900ff",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline30",
              type: "ray",
              bubbleColor: "#cc00cc",
              lineColor: "#cc00cc",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline31",
              type: "dot",
              bubbleColor: "#3300cc",
              lineColor: "#3300cc",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline32",
              type: "ray",
              bubbleColor: "#0000ff",
              lineColor: "#0000ff",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
            {
              name: "odline33",
              type: "arrow",
              bubbleColor: "#990066",
              lineColor: "#990066",
              labelColor: "#FFFFFF", // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: "#333333", // 标签文本背景颜色，可选值，默认灰色
              labelFontSize: 5, // 标签文本字体大小，数值越大，文字越大
            },
          ],
          data: [
            // 定义图层可视化数据
            {
              id: "1", // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              startCoord: [116.41, 39.9], // 起点 XY 轴坐标，X：经度；Y：纬度
              startCoordZ: 64, // 起点 Z 轴高度（单位：米）
              targetCoord: [126.66, 45.74], // 终点点 XY 轴坐标，X：经度；Y：纬度
              targetCoordZ: 64, // 终点 Z 轴高度（单位：米）
              label: "", // 标签文本，如果为 ""，则不显示标签
              value: 15, // 数据点权值
              type: "odline1", // 数据点图例类别
            },
            {
              id: "2",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [123.44, 41.84],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline2",
            },
            {
              id: "3",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [125.33, 43.9],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline3",
            },
            {
              id: "4",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [116.42, 40.75],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline4",
            },
            {
              id: "5",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [113.75, 34.77],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline5",
            },
            {
              id: "6",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [114.34, 30.55],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline6",
            },
            {
              id: "7",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [112.98, 28.12],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline7",
            },
            {
              id: "8",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [117.02, 36.67],
              targetCoordZ: 64,
              label: "",
              value: 20,
              type: "odline8",
            },
            {
              id: "9",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [116.37, 39.87],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline9",
            },
            {
              id: "10",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [108.95, 34.27],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline10",
            },
            {
              id: "11",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [117.33, 31.73],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline11",
            },
            {
              id: "12",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [120.15, 30.27],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline12",
            },
            {
              id: "13",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [118.76, 32.06],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline13",
            },
            {
              id: "14",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [119.3, 26.1],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline14",
            },
            {
              id: "15",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [116.37, 39.92],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline15",
            },
            {
              id: "16",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [109.61, 18.31],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline16",
            },
            {
              id: "17",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [116.38, 39.9],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline17",
            },
            {
              id: "18",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [116.25, 40.22],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline18",
            },
            {
              id: "19",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [106.71, 26.6],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline19",
            },
            {
              id: "20",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [101.78, 36.62],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline20",
            },
            {
              id: "21",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [103.83, 36.06],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline21",
            },
            {
              id: "22",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [116.34, 39.95],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline22",
            },
            {
              id: "23",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [116.24, 39.9],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline23",
            },
            {
              id: "24",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [111.77, 40.82],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline24",
            },
            {
              id: "25",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [106.26, 38.47],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline25",
            },
            {
              id: "26",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [87.63, 43.79],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline26",
            },
            {
              id: "27",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [91.12, 29.65],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline27",
            },
            {
              id: "28",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [108.33, 22.82],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline28",
            },
            {
              id: "29",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [121.47, 31.23],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline29",
            },
            {
              id: "30",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [117.2, 39.09],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline30",
            },
            {
              id: "31",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [106.55, 29.56],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline31",
            },
            {
              id: "32",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [114.17, 22.28],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline32",
            },
            {
              id: "33",
              startCoord: [116.41, 39.9],
              startCoordZ: 64,
              targetCoord: [113.54, 22.19],
              targetCoordZ: 64,
              label: "",
              value: 15,
              type: "odline33",
            },
          ],
        };
        appInstance.uniCall("addODLineLayer", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
