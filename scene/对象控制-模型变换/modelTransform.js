window.onload = function () {
  var vm = new Vue({
    el: "#app", //vue 挂载范围
    data: {
      //进度条部分代码3
      isZZ: true,
      //控制二级菜单的限制隐藏
      rotateShow: false,
      colorShow: false,
      //数据的集合
      list: [
        {
          id: 1,
          action: "移动",
          active: false,
        },
        {
          id: 2,
          action: "旋转",
          active: false,
        },
        {
          id: 3,
          action: "变色",
          active: false,
        },
      ],
      //旋转的角度
      rotateList: [
        {
          id: 1,
          action: "旋转90度",
          active: false,
          rotationY: 90,
        },
        {
          id: 2,
          action: "旋转180度",
          active: false,
          rotationY: 180,
        },
        {
          id: 3,
          action: "旋转复原",
          active: false,
          rotationY: 0,
        },
      ],
      //小车变化的颜色
      carColorList: [
        {
          id: 1,
          action: "金色",
          active: false,
          maskColor: "#ff6600",
        },
        {
          id: 2,
          action: "蓝色",
          active: false,
          maskColor: "#0000ff",
        },
        {
          id: 3,
          action: "绿色",
          active: false,
          maskColor: "#00ff66",
        },
        {
          id: 4,
          action: "还原",
          active: false,
          maskColor: "",
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
      //控制小车移动
      ctrlCarMove() {
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
            // 定义路径途径点
            {
              coord: [116.34574319115728, 40.08524783112259], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
            },
            {
              coord: [116.34573396306384, 40.08278463862886],
              coordZ: 0,
            },
          ],
        };

        appInstance.uniCall("addPath", jsonData1, (result) => {
          console.log(result);
          let jsonData = {
            id: "民用机动车-跑车31-卡通",
            pathId: "car",
            loopMode: "repeat",
            reverse: false,
            direction: "path",
            offset: [0, 0, 0],
            speed: 20,
          };
          appInstance.uniCall("pathingModel", jsonData, (result) => {
            console.log(result);
          });
        });
        let jsonData2 = {
          modelId: "民用机动车-跑车31-卡通", // 镜头跟踪的模型Id，镜头和模型之前保持相对静止关系，支持运动的模型
          distance: 100, // 镜头与被跟踪物体的距离(单位:米)
          distanceMin: 10, // 镜头与被跟踪物体的最近距离(单位:米)
          pitch: 30, //镜头俯仰角(5~89)
          heading: 0, //镜头偏航角(0正北, 0~359)
        };

        appInstance.uniCall("followingCamera", jsonData2, (result) => {
          console.log(result);
        });
      },
      //控制二级菜单旋转度数
      ctrlRotate(el, idx) {
        this.rotateShow = true;
        this.rotateList.forEach((item) => {
          if (el.id == item.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        this.ctrlCarRotateFirst(el.rotationY);
      },
      //控制旋转90度
      ctrlCarRotateFirst(rotationY) {
        let jsonData3 = {
          id: "民用机动车-跑车31-卡通",
          state: "pause",
        };
        appInstance.uniCall("setModelPathingState", jsonData3, (result) => {
          console.log(result);
        });
        let jsonData = {
          id: "民用机动车-跑车31-卡通", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          rotationX: 0, // X 轴旋转度数（单位：度）  // 0正北，值域 -360~360  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          rotationY: rotationY, // Y 轴旋转度数（单位：度）  // 0水平，值域 -360~360  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          rotationZ: 0, // Z 轴旋转度数（单位：度）  // 0水平，值域 -360~360  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          scaleX: 1, // X 轴放缩倍数（单位：倍）  // 1为原始大小，值域 大于0，如果小于1表示缩小，大于1表示放大  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          scaleY: 1, // Y 轴放缩倍数（单位：倍）  // 1为原始大小，值域 大于0，如果小于1表示缩小，大于1表示放大  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          scaleZ: 1, // Z 轴放缩倍数（单位：倍）  // 1为原始大小，值域 大于0，如果小于1表示缩小，大于1表示放大  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          duration: 3, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
        };
        appInstance.uniCall("setModelTransform2", jsonData, (result) => {
          console.log(result);
        });
        let jsonData1 = {
          id: "民用机动车-跑车31-卡通", // 模型id
          modelType: "model", // 模型类别
          distance: 200, // 镜头距模型的距离(单位:米)
        };

        appInstance.uniCall("focusModel", jsonData1, (result) => {
          console.log(result);
        });
      },
      //控制颜色变换
      ctrlColor(el) {
        this.carColorList.forEach((item) => {
          if (el.id == item.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        this.colorGolden(el.maskColor);
      },
      //颜色变化\
      //金色
      colorGolden(color) {
        let jsonData = {
          id: "民用机动车-跑车31-卡通", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          alpha: 1, // 模型透明度，0：完全透明；1：完全不透明
          scale: 1, // 模型整体放缩倍数（单位：倍）
          maskType: color ? "color" : "none", // 模型遮罩样式类别，color：颜色遮罩；picture：图片遮罩；none：无遮罩
          maskAlpha: 1, // 遮罩透明度，0：完全透明；1：完全不透明
          maskColor: color, // 遮罩颜色（HEX 颜色值）
          maskPicture: "", //内置遮罩样式 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Segment06；或根据项目，在场景中预置好的图片 URL
          maskPictureScale: 1.0, // 遮罩贴图的比例系数
          maskFlowSpeed: 1.0, // 遮罩贴图的流动速度系数
          maskFlowDirection: 180, // 遮罩贴图 UV 流动方向角度， 0-360 度
          includeChildren: "false", // 当前样式设置是否包含子节点，此功能可以实现例如控制子节点显隐的功能
          xRay: "off", // X 光样式（半透明效果，且不会被前方物体遮挡）开关，on：开启 X 光效果；off：关闭 X 光效果
        };
        appInstance.uniCall("setModelStyle", jsonData, (result) => {
          console.log(result);
        });
        let jsonData1 = {
          id: "民用机动车-跑车31-卡通", // 模型id
          modelType: "model", // 模型类别
          distance: 200, // 镜头距模型的距离(单位:米)
        };

        appInstance.uniCall("focusModel", jsonData1, (result) => {
          console.log(result);
        });
      },
      //停止小车移动
      stopMove() {
        let jsonData2 = {
          id: "民用机动车-跑车31-卡通", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识
          rotation: [0, 180, 0], // XYZ 三轴旋转度数（单位：度）
        };
        appInstance.uniCall("setModelTransform", jsonData2, (result) => {
          console.log(result);
        });
        let jsonData = {
          id: "民用机动车-跑车31-卡通",
          state: "stop",
        };
        appInstance.uniCall("setModelPathingState", jsonData, (result) => {
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
          this.rotateShow = false;
          this.colorShow = false;
          this.ctrlCarMove();
        } else if (el.action == "旋转") {
          this.colorShow = false;
          this.rotateShow = true;
        } else if (el.action == "变色") {
          this.rotateShow = false;
          this.colorShow = true;
        }
      },
    },
    mounted() {
      this.getToken();
    },
  });
};
