window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      legendList: [
        {
          id: 1,
          action: '高亮房间1',
          value: 'Building01',
          active: false,
          roomName: 'building01_floor06_room01房间01',
          iconName: 'site_02',
          coord: [116.34916058878459, 40.083107931053235],
          coordZ: 35,
        },
        {
          id: 2,
          action: '高亮房间2',
          value: 'Building01',
          active: false,
          roomName: 'building01_floor06_room01房间02',
          iconName: 'site_02',
          coord: [116.34911513492753, 40.08309433146997],
          coordZ: 35,
        },
        {
          id: 3,
          action: '高亮房间3',
          value: 'Building01',
          active: false,
          roomName: 'building01_floor06_room01房间03',
          iconName: 'site_02',
          coord: [116.34911139373583, 40.08304921840637],
          coordZ: 35,
        },
        {
          id: 4,
          action: '取消高亮',
          roomName: 'building01_floor06_room01房间03',
          value: 'Building01',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.zhsqUrl,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.zhsqUrl, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
            }
          }
        );
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
      // 建筑高亮-房间
      changeModelArticulation(el) {
        let _this = this;
        appInstance.uniCall('clearOverlayType', { overlayType: 'all' }, (res) => {});
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        if (el.id == 4) {
          appInstance.uniCall(
            'setCamera',
            {
              coordType: 0,
              coordTypeZ: 0,
              centerCoord: [116.3488375, 40.0842803], //以深圳湾经纬度为例
              coordZ: -30.79,
              distance: 780.62,
              pitch: 30.85,
              heading: 29.8,
              fly: true,
              duration: 0.5,
            },
            (result) => {
              console.log(result);
            }
          );
          appInstance.uniCall(
            'resetBuildingFloor',
            {
              id: 'Building01',
              animation: 1,
            },
            function (result) {
              console.log(result);
            }
          );
          appInstance.uniCall(
            'highlightRoom',
            {
              id: el.value,
              floor: 6,
              room: el.roomName,
              type: 'none',
            },
            (result) => {
              console.log(result);
            }
          );
          return;
        }
        this.legendList[3].value = el.value;
        this.legendList[3].roomName = el.roomName;
        let jsonData = {
          buildingId: el.value,
          pitch: 30,
          heading: 0,
          distance: 100,
          floor: 6,
          room: el.roomName,
        };
        appInstance.uniCall('focusRoom', jsonData, (result) => {
          console.log(result);

          appInstance.uniCall(
            'showBuildingFloor',
            {
              id: el.value,
              floor: 6,
              animation: 1,
            },
            (result) => {
              appInstance.uniCall(
                'highlightRoom',
                {
                  id: el.value,
                  floor: 6,
                  room: el.roomName,
                  type: 'style1',
                },
                (result) => {
                  console.log(result);
                  _this.addLand(el);
                }
              );
            }
          );
        });
      },
      // 添加地标点
      addLand(el) {
        let jsonData = {
          id: el.roomName,
          coordType: 0,
          coordTypeZ: 0,
          iconName: el.iconName,
          autoScale: false,
          visible: true,
          label: el.roomName,
          iconScale: 1,
          labelScale: 1,
          tag: el.roomName, // 用户自定标签，用户保存用户的扩展数据
          coord: el.coord, //以深圳湾经纬度为例
          coordZ: el.coordZ,
        };

        appInstance.uniCall('addLandmark', jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
