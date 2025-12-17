window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      isCurrent: -1,
      legendList: [
        {
          id: 1,
          action: "自由剖分",
        },
        {
          id: 2,
          action: "建筑恢复",
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
            sceneConfig.pouFenUrl,
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
            container: document.getElementById('container'),
            mode: 'scene',
            token: token,
            url: 'https://www.tuguan.net/publish/scene/api/'+sceneConfig.pouFenUrl, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            _this.showSceneInfo();
            _this.isZZ = false;
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
          (result) => { }
        );
      },
      // 限制镜头
      // restrictCamera() {
      //   let jsonData2 = {
      //     state: "restricted",
      //   };
      //   appInstance.uniCall(
      //     "setCameraRestrictionState",
      //     jsonData2,
      //     (result) => {
      //       console.log(result);
      //     }
      //   );
      //   let jsonData = {
      //     coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
      //     coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
      //     limitPitch: [5, 89], //摄像机 镜头垂直俯仰角 限制 (-89~89)
      //     limitYaw: [0, 359], //摄像机 镜头水平摇摆角 限制 (0正北, 0~359)
      //     limitCoordZ: [0, 300], //摄像机 坐标高度限制 (单位:米)
      //     limitDistance: [0, 500], //摄像机 镜头距离限制 (单位:米)
      //     center: [116.34848189984, 40.0844832038], //视点 限制区中心坐标
      //     radius: 500, //视点 限制区半径，会形成一个球体，并在所有条件中取交集
      //   };
      //   appInstance.uniCall("restrictCamera", jsonData, (result) => {
      //     console.log(result);
      //   });
      // },
      //点击恢复建筑
      clickToRegain() {
        appInstance.uniCall("clearModelClipping", {}, (result) => {
          console.log(result);
        });
      },
      //点击进行建筑聚焦
      focus() {
        let jsonData = {
          coordType: 0,
          coordTypeZ: 0,
          centerCoord: [116.3495178, 40.0834539], //以深圳湾经纬度为例
          coordZ: -12.15,
          distance: 265.29,
          pitch: 41,
          heading: 14,
          fly: true,
          duration: 0.5,
        };
        appInstance.uniCall("setCamera", jsonData, (result) => {
          console.log(result);
          let jsonData = {
            id: "Building04",
            modelType: "building",
            planePadding: [0, 0, 0, 0, 0, 0],
            planeColor: "#0000ff",
            planeStyle: "style1",
          };
          appInstance.uniCall("setModelClipping", jsonData, (result) => {
            console.log(result);
          });
        });
      },
      //控制按钮点击
      controlChecked(el, idx) {
        this.isCurrent = idx;
        if (el.id == 1) {
          this.focus();
        } else if (el.id == 2) {
          this.clickToRegain();
        }
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
