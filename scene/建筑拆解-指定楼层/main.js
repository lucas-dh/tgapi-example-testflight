window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      legendList: [ // 按钮数据
        {
          id: 1,
          action: '建筑拆解楼层1',
          value: 'Building01',
          floor: 1,
          active: false,
        },
        {
          id: 2,
          action: '建筑拆解楼层5',
          value: 'Building01',
          floor: 5,
          active: false,
        },
        {
          id: 10,
          action: '建筑拆解楼层10',
          value: 'Building01',
          floor: 10,
          active: false,
        },
        {
          id: 11,
          value: 'Building01',
          action: '建筑恢复',
          active: false,
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

      // 按钮点击事件
      changeModelArticulation(el) {
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        let jsonData = {
          buildingId: el.value,
          pitch: 30,
          heading: 20,
          distance: 300,
        };
        // 聚焦楼层
        appInstance.uniCall('focusBuilding', jsonData, (result) => {
          console.log(result);
          if (el.id == 11) {
            let jsonData = {
              id: el.value,
              animation: 1,
            };
            appInstance.uniCall('resetBuildingFloor', jsonData, function (result) {
              console.log(result);
            });
          } else {
            // 拆解楼层
            let jsonData = {
              id: el.value,
              floor: el.floor,
              animation: 1,
            };

            appInstance.uniCall('showBuildingFloor', jsonData, (result) => {
              console.log(result);
            });
          }
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
