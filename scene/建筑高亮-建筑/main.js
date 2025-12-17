window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      legendList: [
        {
          id: 1,
          action: '高亮建筑1',
          value: 'Building01',
          active: false,
          coord: [116.34948212413697,40.083093941972095],
          iconName: 'site_02',
          coordZ: 75,
        },
        {
          id: 2,
          action: '高亮建筑2',
          value: 'Building02',
          active: false,
          coord: [116.35064232203815,40.08309190305994],
          iconName: 'site_02',
          coordZ: 75,
        },
        {
          id: 3,
          action: '高亮建筑3',
          value: 'Building03',
          active: false,
          coord: [116.34959087723992,40.08377781483175],
          iconName: 'site_02',
          coordZ: 75,
        },
        {
          id: 4,
          action: '取消高亮',
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
      // 建筑高亮-建筑
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
            'highlightBuilding',
            {
              id: el.value,
              type: 'none',
            },
            (result) => {
              console.log(result);
            }
          );
          return;
        }
        this.legendList[3].value = el.value;
        let jsonData = {
          buildingId: el.value,
          pitch: 30,
          heading: 20,
          distance: 300,
        };
        appInstance.uniCall('focusBuilding', jsonData, (result) => {
          console.log(result);

          appInstance.uniCall(
            'highlightBuilding',
            {
              id: el.value,
              type: 'style1',
            },
            (result) => {
              console.log(result);
              _this.addLand(el);
            }
          );
        });
      },
      // 添加地标点
      addLand(el) {
        let jsonData = {
          id: el.value,
          coordType: 0,
          coordTypeZ: 0,
          iconName: el.iconName,
          autoScale: false,
          visible: true,
          label: el.value,
          iconScale: 1,
          labelScale: 1,
          tag: el.value, // 用户自定标签，用户保存用户的扩展数据
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
