window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, //是否显示遮罩
      isOne: true, // 是否第一次执行持续路径移动模型
      isSelfActive: false, // 是否开启环绕
      legendList: [
        {
          id: 1,
          action: '镜头跟随模型-自身',
          value: 'self',
          active: false,
        },
        {
          id: 2,
          action: '镜头跟随模型-世界',
          value: 'world',
          active: false,
        },
      ],
      pathData: [
        { coord: [116.3500334325, 40.0827615907], coordZ: 0.2571975037 },
        { coord: [116.3500098172, 40.0834542161], coordZ: 0.2571975037 },
        { coord: [116.3489790818, 40.0834668793], coordZ: 0.2571975037 },
        { coord: [116.3490214442, 40.0841187598], coordZ: 0.2571975037 },
        { coord: [116.3501087593, 40.0841149262], coordZ: 0.2571975037 },
        { coord: [116.3501196232, 40.0848165199], coordZ: 0.2571975037 },
        { coord: [116.3490582181, 40.0848213169], coordZ: 0.2571975037 },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.zhsqUrl2,
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
            container: document.getElementById('container'),
            mode: 'scene',
            token: token,
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.zhsqUrl2, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.addPath();
              // 注册跟随镜头改变事件
              window.appInstance.uniCall('addEventListener', {
                eventName: 'onFollowingCameraChanged',
                callback: (result) => {
                  console.log('onFollowingCameraChanged', result);
                  _this.handleMouseUp(result);
                },
              });
            }
          }
        );
      },
      // 添加路径
      addPath() {
        let jsonData = {
          id: 'path',
          name: '路径',
          coordType: 0,
          coordTypeZ: 0,
          type: 'Segment06',
          texture: 'cableFlow.png',
          textureSpeed: 0,
          color: '#00ff00',
          colorPass: '#0000ff',
          width: 10,
          tag: 'custominfo', // 用户自定标签，用户保存用户的扩展数据
          autoScale: false,
          visible: true,
          lineDataId: '', // 对应本服务器上线数据对象，如果找到lineDataId，则下方的points不起作用。注意：此属性端渲染未生效
          points: [],
        };
        jsonData.points = this.pathData;
        appInstance.uniCall('addPath', jsonData, (result) => {});
      },
      // 显示场景信息
      showSceneInfo() {
        appInstance.uniCall(
          'showSceneInfo',
          {
            isOpen: true,
          },
          (result) => {
            console.log(result);
          }
        );
      },
      // 环绕
      changeRelative(isSelfActive) {
        if (isSelfActive) {
          appInstance.uniCall(
            'rotateCamera',
            {
              enabled: true,
              duration: 50,
              direction: 'counterclockwise',
              interruptable: true,
            },
            (result) => {
              console.log(result);
            }
          );
        } else {
          this.stopRotate();
        }
      },
      // 停止环绕
      stopRotate() {
        let jsonData = {
          enabled: false, // 是否启用相机围绕目标飞行
          duration: 60, // 飞行一周所需要的秒数，数值越大飞行越慢
          interruptable: true, // 是否可以被打断，默认为true
          direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
        };

        appInstance.uniCall('rotateCamera', jsonData, (result) => {
          console.log(result);
        });
      },
      // 按钮点击事件
      changeModelArticulation(el) {
        let _this = this;
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        _this.followingCamera(el);
      },

      // 镜头跟随模型
      followingCamera(el) {
        let _this = this;
        let heading = 0,
          relative = 'self';
        if (el.value == 'self') {
          // 自身
          // 模型应该车头面向场景正面 但当前为反面 所以模型旋转180
          heading = 180;
          relative = 'self';
        } else {
          // 世界
          heading = 0;
          relative = 'world';
        }
        // 镜头跟随模型
        appInstance.uniCall(
          'followingCamera',
          {
            modelId: '13060',
            distance: 40,
            distanceMin: 5,
            pitch: 6,
            heading: heading,
            relative: relative,
          },
          (result) => {
            console.log(result);
            if (_this.isOne) {
              // 持续路径移动模型
              appInstance.uniCall(
                'pathingModel',
                {
                  id: '13060',
                  pathId: 'path',
                  loopMode: 'round', //循环模式：none，不循环；round，往返；repeat，从头循环
                  reverse: false, //是否反向移动
                  direction: 'path',
                  offset: [0, 0, 0],
                  speed: 20, //移动速度 (单位:米/秒)
                },
                (result) => {
                  _this.isOne = false;
                  console.log(result);
                }
              );
            }
          }
        );
      },

      // 设置按钮状态
      handleMouseUp(r) {
        // self
        this.legendList[0].active = r.relative == 'self' ? true : false;
        // world
        this.legendList[1].active = r.relative == 'world' ? true : false;
        // 环绕
        this.isSelfActive = r.enableRotate ? true : false;
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
