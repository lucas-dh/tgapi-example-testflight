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
          url: "https://www.tuguan.net/api/user/v1/visitorScene/ydbpupv2",
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
            url: "https://www.tuguan.net/publish/scene/api/ydbpupv2", //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.addgisMap();
              _this.setCamera();
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
      addgisMap() {
        this.isZZ = false;
        let jsonData = {
          id: "gisMapLayer", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "layerName", // 图层名称，支持为图层自定义名称

          maps: [
            {
              // 天地图影像
              mapUrl:
                "//t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&tk={apiKey}&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}",
              mapType: "WMTS", // 地图瓦片数据格式类别，支持"TMS"或"WMTS"两种类型
              mapTokenName: "apiKey", // 可以为""，或者如果地图瓦片需要 token，这里填写 token 的 name，在 URL 请求时当作 parameter 的 key 传入
              mapTokenValue: "bca97764cdd425b124df714eb1631935", // 可以为""，或者如果地图瓦片需要 token，这里填写 token 的 value，在 URL 请求时当作 parameter 的 value 传入
              mapLOD: 18, // 地图瓦片数据细节加载系数，表示在当前视野距离下，加载地图层级的级别系数。流渲染默认值是 2，如果想更加清晰，可以设置 1 或者 0.5
            },
            {
              // 天地图影像
              mapUrl:
                "//t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&tk={apiKey}&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}",
              mapType: "WMTS", // 地图瓦片数据格式类别，支持"TMS"或"WMTS"两种类型
              mapTokenName: "apiKey", // 可以为""，或者如果地图瓦片需要 token，这里填写 token 的 name，在 URL 请求时当作 parameter 的 key 传入
              mapTokenValue: "bca97764cdd425b124df714eb1631935", // 可以为""，或者如果地图瓦片需要 token，这里填写 token 的 value，在 URL 请求时当作 parameter 的 value 传入
              mapLOD: 18, // 地图瓦片数据细节加载系数，表示在当前视野距离下，加载地图层级的级别系数。流渲染默认值是 2，如果想更加清晰，可以设置 1 或者 0.5
            },
          ],
          visible: true, // 显隐控制，true：显示；false：隐藏
          alpha: 1, // 透明度，0：完全透明；1：完全不透明
        };

        appInstance.uniCall("addGISMap", jsonData, (result) => {
          console.log(result);
        });
      },
      // 设置镜头
      setCamera() {
        let jsonData = {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          centerCoord: [114.7671245, 40.1574316], // 中心点的坐标 lng,lat
          coordZ: 30522.75, // Z 轴高度（单位：米）
          distance: 305288.91, // 镜头距中心点距离(单位:米)
          pitch: 61.56, // 镜头俯仰角(5~89)
          heading: 0.8, // 镜头偏航角(0正北, 0~359)
          fly: false, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
          // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
          duration: 0.5, // 飞行时间，秒
        };

        appInstance.uniCall("setCamera", jsonData, (result) => {
          console.log(result);
          this.restrictCamera();
        });
      },
      // 限制镜头
      restrictCamera() {
        let jsonData2 = { state: "restricted" }; //restricted：受限；free：不受限制
        appInstance.uniCall(
          "setCameraRestrictionState",
          jsonData2,
          (result) => {
            console.log(result);
          }
        );
        let jsonData = {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          limitPitch: [30, 89], //摄像机 镜头垂直俯仰角 限制 (-89~89)
          limitYaw: [0, 359], //摄像机 镜头水平摇摆角 限制 (0正北, 0~359)
          limitCoordZ: [0, 100], //摄像机 坐标高度限制 (单位:米)
          limitDistance: [60475.02513204591, 4233251.759243214], //摄像机 镜头距离限制 (单位:米)
          center: [114.7671245, 40.1574316], //视点 限制区中心坐标
          radius: 100000, //视点 限制区半径，会形成一个球体，并在所有条件中取交集
        };
        appInstance.uniCall("restrictCamera", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
