window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      isshow: false,
      legendList: [
        {
          id: 1,
          action: "沙盘模式",
          active: true,
        },
        {
          id: 2,
          action: "行走模式",
          active: false,
        },
        {
          id: 3,
          action: "飞行模式",
          active: false,
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
      //沙盘模式
      defaultMode() {
        let jsonData = {
          mode: "default", // 摄像机模式，"default": 默认交互行为，"walk", 第一人称或者第三人称行走，WSAD 移动，鼠标左键或右键按下旋转，"fly"，第一人称飞行，WSAD 移动，QE 升降，鼠标左键或右键按下旋转
          speed: 10, // 当 mode 为"walk"或者"fly"的时候，摄像机移动速度
          turnSpeed: 0.1, // 当 mode 为"walk"的时候，鼠标按下旋转时的速度，0 为最慢，1 为最快
          eysHeight: 1.8, // 当 mode 为"walk"的时候，摄像机的高度
          collision: false, // 是否启用碰撞检测
          gravity: false, // 当 mode 为"walk"的时候是否启用重力，启用后，可以按空格键跳跃
          thirdPersonType: 0, // 当 mode 为"walk"的时候，可以选择不同的第三人称模型，0：表示关闭第三人称，1：表示1号人物模型，2：表示2号人物模型
        };

        appInstance.uniCall("setCameraMode", jsonData, (result) => {
          console.log(result);
        });
      },
      //第一人称行走
      runMode(coord) {
        this.removeEventListener();
        let jsonData = {
          coordType: 0,
          coordTypeZ: 0,
          centerCoord: coord,
          coordZ: -3.6,
          distance: 184.02,
          pitch: 5.4,
          heading: 267.54,
          fly: true,
          duration: 0.5,
        };
        appInstance.uniCall("setCamera", jsonData, (result) => {
          console.log(result);
          setTimeout(() => {
            this.walkMode();
          }, 1000);
        });
      },
      //设置镜头模式
      walkMode() {
        let jsonData = {
          mode: "walk",
          speed: 10,
          turnSpeed: 0.5,
          eysHeight: 10,
          collision: false,
          gravity: false,
          thirdPersonType: 0,
        };

        appInstance.uniCall("setCameraMode", jsonData, (result) => {
          console.log(result);
        });
      },
      //第一人称飞行
      flyMode(coord) {
        this.removeEventListener();
        let jsonData = {
          coordType: 0,
          coordTypeZ: 0,
          centerCoord: coord,
          coordZ: -3.6,
          distance: 184.02,
          pitch: 5.4,
          heading: 267.54,
          fly: true,
          duration: 0.5,
        };
        appInstance.uniCall("setCamera", jsonData, (result) => {
          console.log(result);
          setTimeout(() => {
            this.flying();
          }, 1000);
        });
      },
      //设置镜头模式
      flying() {
        let jsonData = {
          mode: "fly", // 摄像机模式，"default": 默认交互行为，"walk", 第一人称或者第三人称行走，WSAD 移动，鼠标左键或右键按下旋转，"fly"，第一人称飞行，WSAD 移动，QE 升降，鼠标左键或右键按下旋转
          speed: 10, // 当 mode 为"walk"或者"fly"的时候，摄像机移动速度
          turnSpeed: 0.1, // 当 mode 为"walk"的时候，鼠标按下旋转时的速度，0 为最慢，1 为最快
          eysHeight: 1.8, // 当 mode 为"walk"的时候，摄像机的高度
          collision: false, // 是否启用碰撞检测
          gravity: false, // 当 mode 为"walk"的时候是否启用重力，启用后，可以按空格键跳跃
          thirdPersonType: 0, // 当 mode 为"walk"的时候，可以选择不同的第三人称模型，0：表示关闭第三人称，1：表示1号人物模型，2：表示2号人物模型
        };

        appInstance.uniCall("setCameraMode", jsonData, (result) => {
          console.log(result);
        });
      },
      addEventListener(id) {
        let that = this;
        appInstance.uniCall(
          "addEventListener",
          {
            eventName: "onSceneClick",
            callback: function (event) {
              that.isshow = false;
              if (id == 2) {
                that.runMode(event.data[0].coord);
              } else if (id == 3) {
                that.flyMode(event.data[0].coord);
              }
            },
          },
          (result) => {
            console.log(result);
          }
        );
      },
      removeEventListener() {
        appInstance.uniCall(
          "removeEventListener",
          {
            eventName: "onSceneClick", // 事件名称 见图观官网统一API开发手册
            callback: window.eventCallback, // 要注销的事件监听回调函数，此处的回调函数不能是匿名函数。如果不提供本参数，则注销指定事件上的所有回调函数。注意这个回调函数要和本次 addEventListener 调用完成的回调函数区分开。
          },
          (result) => {
            console.log(result);
            window.eventCallback = null;
          }
        );
      },
      //按钮控制状态
      controlChecked(el, index) {
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
            if (item.id == 1) {
              this.isshow = false;
              this.removeEventListener()
              this.defaultMode();
            } else if (item.id == 2) {
              this.isshow = true;
              this.addEventListener("2");
            } else {
              this.isshow = true;
              this.addEventListener("3");
            }
          } else {
            item.active = false;
          }
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
