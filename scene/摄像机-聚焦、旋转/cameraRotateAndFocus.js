window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,

      isCurrent: -1,
      legendList: [
        {
          id: 1,
          action: "聚焦",
        },
        {
          id: 2,
          action: "旋转",
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
            sceneConfig.shequUrl,
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
              sceneConfig.shequUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();

              //开启事件图点击事件
              appInstance.uniCall(
                "pickOverlay",
                {
                  overlayType: "eventLayer",
                  idLayer: "",
                  type: "click",
                  isShowDecorator: true,
                },
                (result) => {
                  console.log(result);
                }
              );
              //监听事件图点击事件
              appInstance.uniCall(
                "addEventListener",
                {
                  eventName: "onEventLayerClick",
                  callback: function (event) {
                    console.log(event);
                  },
                },
                (result) => {
                  console.log(result);
                }
              );
              _this.addEventLayer();
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
      //添加事件图层
      addEventLayer() {
        let jsonData = {
          id: "eventLayerId", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "layerName", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          visible: true, // 添加当前图层时默认是显示还是隐藏
          legends: [
            // 定义图层包含图例，支持为不同图例定义各自样式
            {
              name: "摄像头", // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              icon: "event_01", // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              type: "wave", // 区域边界样式类别，详见下表：区域边界样式类别
              color: "#ff0000", // 颜色（HEX 颜色值）
              fillArea: "type01", // 区域填充样式类别，详见下表：区域填充样式类别
              speed: 50, // 气泡扩散速度（单位：米/秒）
              radius: 80, // 气泡最大半径（单位：米）
            },
          ],
          data: [
            // 定义图层可视化数据
            {
              id: "事件01", // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              coord: [116.34691365695414, 40.084409308831255], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
              message: "", // 数据点事件信息
              type: "摄像头", // 数据点图例类别
            },
          ],
        };

        appInstance.uniCall("addEventLayer", jsonData, (result) => {
          console.log(result);
        });
      },
      //判断聚焦建筑
      focus() {
        let jsonData = {
          id: "eventLayerId",
          overlayType: "eventLayer",
          distance: 200,
        };
        appInstance.uniCall("focusById", jsonData, (result) => {
          console.log(result);
        });
      },
      //点击旋转
      rotate() {
        let jsonData = {
          enabled: true, // 是否启用相机围绕目标飞行
          duration: 60, // 飞行一周所需要的秒数，数值越大飞行越慢
          interruptable: true, // 是否可以被打断，默认为true
          direction: "clockwise", // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
        };

        appInstance.uniCall("rotateCamera", jsonData, (result) => {
          console.log(result);
        });
      },
      //点击控制按钮事件
      controlChecked(el, index) {
        this.isCurrent = index;
        if (el.id == 1) {
          this.focus();
        } else {
          this.rotate();
        }
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
