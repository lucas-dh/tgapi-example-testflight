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
              _this.pickModel();
              _this.clickModel();
              _this.isZZ = false;
              _this.addLandMark();
              _this.showSceneInfo();
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
          (result) => {}
        );
      },
      //开始单选模型事件
      pickModel() {
        let jsonData = {
          modelType: "model",
          type: "click",
        };
        appInstance.uniCall("pickModel", jsonData, (result) => {
          console.log(result);
        });
      },

      //左键点击模型对象
      clickModel() {
        let _this = this;
        appInstance.uniCall(
          "addEventListener",
          {
            eventName: "onModelClick",
            callback: function (event) {
              console.log(event);
              if (event.id == 9603) {
                _this.addTip(event.id);
              } else {
                appInstance.uniCall("clearModelSelected", {}, (result) => {
                  console.log(result);
                });
              }
            },
          },
          (result) => {
            console.log(result);
          }
        );
      },
      //添加住宅楼图标
      addLandMark() {
        let jsonData = {
          id: "landmark", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          iconName: "custom-住宅楼", // 内置图标名称，见图观官网统一API开发手册
          autoScale: false, // 如果开启后，图标会按照摄像机远近自动缩放大小
          label: "", // 图标标签文本
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          coord: [116.34940202499243, 40.08507886803248], // XY 轴坐标，X：经度；Y：纬度
          coordZ: 30, // Z 轴高度（单位：米）
          visible: true, // 添加当前图层时默认是显示还是隐藏
        };

        appInstance.uniCall("addLandmark", jsonData, (result) => {
          console.log(result);
        });
      },
      //点击添加tip
      addTip(ids) {
        if (!document.getElementById(`${ids}`)) {
          let videoBox = document.createElement("div");
          videoBox.id = ids;
          videoBox.innerHTML = `<div class="box-industry">
                            <div class="title">
                                <span class="fontStyle">住宅楼</span>
                            </div>
                            <div class="table">
                                <div class="content">
                                    <div class="name">建筑名称：</div>
                                    <div class="value">G5栋</div>
                                </div>
                                <div class="content">
                                    <div class="name">总楼层数：</div>
                                    <div class="value">6层</div>
                                </div>
                                <div class="content">
                                    <div class="name">总房间数：</div>
                                    <div class="value">48间</div>
                                </div>
                                <div class="content">
                                    <div class="name">建成时间：</div>
                                    <div class="value">2000年12月6日</div>
                                </div>
                            </div>
                        </div>`;
          document.body.appendChild(videoBox);

          // 动态添加tip
          let jsonData = {
            id: ids,
            url: "",
            divId: ids,
            size: [330, 230],
            offset: [70, 80],
            isShowClose: true,
          };
          appInstance.uniCall("addModelTip", jsonData, (result) => {
            console.log(result);
          });
        }
      },
      //设置场景镜头视野
      setCamera() {
        let jsonData = {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          centerCoord: [116.3496353, 40.08395], // 中心点的坐标 lng,lat
          coordZ: 9.46, // Z 轴高度（单位：米）
          distance: 461.04, // 镜头距中心点距离(单位:米)
          pitch: 7.63, // 镜头俯仰角(5~89)
          heading: 181.24, // 镜头偏航角(0正北, 0~359)
          fly: false, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
          // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
          duration: 1, // 飞行时间，秒
        };

        appInstance.uniCall("setCamera", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
