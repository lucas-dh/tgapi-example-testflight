window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,

      isCurrent: -1,
      legendList: [
        {
          id: 1,
          action: "开始漫游",
        },
        {
          id: 2,
          action: "停止漫游",
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
              _this.setCamera();
              _this.addPath();
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
          (result) => {}
        );
      },
      //设置室外路径漫游
      roam() {
        //路径移动镜头
        let jsonData1 = {
          pathId: "roam", // 路径的id
          loopMode: "none", //循环模式：none，不循环；round，往返；repeat，从头循环
          reverse: false, //是否反向移动
          distance: 50, //镜头距覆盖物距离(单位:米)
          pitch: 10, //镜头俯仰角(0~89)
          speed: 20, //移动速度 (单位:米/秒)
        };
        appInstance.uniCall("pathingCamera", jsonData1, (result) => {
          console.log(result);
        });
      },
      addPath() {
        let jsonData0 = {
          id: "roam", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "室外漫游路线", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          type: "Arrow01", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Arrow07 Segment01 Segment02 Segment03 Segment04 Segment05 Segment06 Segment07 Segment08 ModelCube ModelCylinder
          texture: "cableFlow.png", // 材质贴图名称，只有当 type 为 Model 开始的类型，才有用。端渲染：在场景中预置好的图片名称或外部图片 url，流渲染：服务器应用目录里的资源图片
          textureSpeed: 1, // 材质贴图的 UV 动画速度，默认：0，0为不运动，其他数值沿着路径模型方向前进，负数为反向
          color: "#f8e71c", // 路线颜色，颜色透明（HEX 颜色值）
          colorPass: "#0000FF", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
          width: 2, // 路径宽度（单位：米）
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          autoScale: true, // 线是否近大远小，false，镜头无论远近，看起来线一样大，true，镜头近线粗，镜头远线细
          visible: true, // 添加当前图层时默认是显示还是隐藏
          lineDataId: "", // 对应本服务器上线数据对象，如果找到 lineDataId，则下方的 points 不起作用
          points: [
            {
              coord: [116.34579974937617, 40.084176263185604],
              coordZ: 0.2571975128923543,
            },
            {
              coord: [116.34898189543219, 40.08417183994231],
              coordZ: 0.306636993369664,
            },
            {
              coord: [116.34897839755848, 40.08480781858338],
              coordZ: 0.3066369933696464,
            },
            {
              coord: [116.35012571437571, 40.08481179124513],
              coordZ: 0.2571975036835298,
            },
            {
              coord: [116.35011904585376, 40.084410326456265],
              coordZ: 0.2571975036835298,
            },
            {
              coord: [116.35082494549306, 40.08441134130678],
              coordZ: 0.2571975036835649,
            },
            {
              coord: [116.35083268569616, 40.08410610344256],
              coordZ: 0.2571975036835298,
            },
            {
              coord: [116.35011064481361, 40.08410610601954],
              coordZ: 0.2571975036835649,
            },
            {
              coord: [116.34903688131494, 40.08409120556059],
              coordZ: 0.2571975036835298,
            },
            {
              coord: [116.34899456388727, 40.08347057404222],
              coordZ: 0.2571975036835298,
            },
            {
              coord: [116.35002290345895, 40.08345815814164],
              coordZ: 0.2571975036835298,
            },
            {
              coord: [116.35001861536801, 40.08275734583144],
              coordZ: 0.2571975036835298,
            },
          ],
        };

        appInstance.uniCall(
          "clearOverlayType",
          {
            overlayType: "path", // 覆盖物类型，支持 all
          },
          (result) => {
            console.log(result);
          }
        );
        appInstance.uniCall("addPath", jsonData0, (result) => {
          console.log(result);
          if (result.result === 1) {
            appInstance.uniCall(
              "focusById",
              {
                id: "path",
                overlayType: "path",
                distance: 2000,
              },
              (focusResult) => {
                console.log(focusResult);
              }
            );
          }
        });
      },
      stop() {
        let jsonData = {
          state: "stop", //pause:暂停移动; continue:继续移动; stop:停止移动, 释放焦点
        };
        appInstance.uniCall("setCameraPathingState", jsonData, (result) => {
          console.log(result);
        });
      },
      //点击控制按钮事件
      controlChecked(el, index) {
        this.isCurrent = index;
        if (el.id == 1) {
          this.roam();
        } else {
          this.stop();
        }
      },
      //设置场景镜头视野
      setCamera() {
        let jsonData = {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          centerCoord: [116.3485037, 40.0838189], // 中心点的坐标 lng,lat
          coordZ: 6.46, // Z 轴高度（单位：米）
          distance: 810.54, // 镜头距中心点距离(单位:米)
          pitch: 78.13, // 镜头俯仰角(5~89)
          heading: 0.41, // 镜头偏航角(0正北, 0~359)
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
