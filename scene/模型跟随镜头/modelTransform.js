window.onload = function () {
  var vm = new Vue({
    el: "#app", //vue 挂载范围
    data: {
      //进度条部分代码3
      isZZ: true,
      //数据的集合
      list: [
        {
          id: 1,
          action: "移动",
          active: false,
        },
      ],
    },
    methods: {
      //创建TGAPI对象,获取token
      getToken() {
        let _this = this;
        axios({
          method: "post",
          url: "https://www.tuguan.net/api/user/v1/visitorScene/echag1p5",
        }).then((res) => {
          _this.init(res.data.accessToken);
        });
      },
      init(token) {
        let _this = this;
        //使用授权码读取模型文件初始化场景
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById("container"),
            mode: "scene",
            token: token,
            url: "https://www.tuguan.net/publish/scene/api/echag1p5", //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addPath();
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
      addPath() {
        let jsonData1 = {
          id: "car", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "路径", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Arrow07 Segment01 Segment02 Segment03 Segment04 Segment05 Segment06 Segment07 Segment08 ModelCube ModelCylinder
          texture: "cableFlow.png", // 材质贴图名称，只有当 type 为 Model 开始的类型，才有用。端渲染：在场景中预置好的图片名称或外部图片 url，流渲染：服务器应用目录里的资源图片
          textureSpeed: 0, // 材质贴图的 UV 动画速度，默认：0，0为不运动，其他数值沿着路径模型方向前进，负数为反向
          color: "#ff0000", // 路线颜色，颜色透明（HEX 颜色值）
          colorPass: "#0000FF", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
          width: 0, // 路径宽度（单位：米）
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          autoScale: false, // 线是否近大远小，false，镜头无论远近，看起来线一样大，true，镜头近线粗，镜头远线细
          visible: true, // 添加当前图层时默认是显示还是隐藏
          lineDataId: "", // 对应本服务器上线数据对象，如果找到 lineDataId，则下方的 points 不起作用
          points: [
            {
              coord: [116.34579288067027, 40.0851953470433],
              coordZ: 0.2819329171113536,
            },
            {
              coord: [116.34579288067027, 40.0853034328208],
              coordZ: 0.28192625979634556,
            },
            {
              coord: [116.3458616925094, 40.08538137728773],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.34598659113132, 40.08542980952744],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.34616941192392, 40.08543067926556],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.35102314319421, 40.08543041110254],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.3511432738181, 40.08540952571713],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.35123712597661, 40.08534434909831],
              coordZ: 0.2571975128923894,
            },
            {
              coord: [116.35124220123117, 40.0852376528563],
              coordZ: 0.2571975128923894,
            },
            {
              coord: [116.35124087970485, 40.08280437518715],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.35123797027104, 40.08270743480253],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.35116415343902, 40.082622993463545],
              coordZ: 0.2571975128923367,
            },
            {
              coord: [116.35105415440785, 40.0826039401376],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.35093419490198, 40.08260459059304],
              coordZ: 0.28194206213916273,
            },
            {
              coord: [116.34606584278426, 40.08260220750077],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.34593987554274, 40.08261146957747],
              coordZ: 0.2571975128923192,
            },
            {
              coord: [116.34584742529034, 40.08266186967249],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.34579488896706, 40.08273869984873],
              coordZ: 0.2571975128923192,
            },
            {
              coord: [116.34579811465272, 40.08283342667791],
              coordZ: 0.28194206213916273,
            },
            {
              coord: [116.34579288067027, 40.0851953470433],
              coordZ: 0.2819329171113536,
            },
          ],
        };

        appInstance.uniCall("addPath", jsonData1, (result) => {
          console.log(result);
        });
      },
      //控制小车移动
      ctrlCarMove() {
        let jsonData = {
          id: "民用机动车-跑车31-卡通", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识
          rotation: [0, 180, 0], // XYZ 三轴旋转度数（单位：度）
        };
        appInstance.uniCall("setModelTransform", jsonData, (result) => {
          console.log(result);
        });
        let jsonData1 = {
          id: "民用机动车-跑车31-卡通",
          pathId: "car",
          loopMode: "repeat",
          reverse: false,
          direction: "path",
          offset: [0, 0, 0],
          speed: 20,
        };
        appInstance.uniCall("pathingModel", jsonData1, (result) => {
          console.log(result);
        });
        let jsonData2 = {
          modelId: "民用机动车-跑车31-卡通", // 镜头跟踪的模型Id，镜头和模型之前保持相对静止关系，支持运动的模型
          distance: 50, // 镜头与被跟踪物体的距离(单位:米)
          distanceMin: 10, // 镜头与被跟踪物体的最近距离(单位:米)
          pitch: 30, //镜头俯仰角(5~89)
          heading: 90, //镜头偏航角(0正北, 0~359)
        };

        appInstance.uniCall("followingCamera", jsonData2, (result) => {
          console.log(result);
        });
      },
      //控制移动旋转变化
      ctrlMove(el, idx) {
        this.list.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        if (el.action == "移动") {
          this.ctrlCarMove();
        }
      },
    },
    mounted() {
      this.getToken();
    },
  });
};
