window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,// 是否显示遮罩
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl12,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl12, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addLandmark();
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
    // 添加关系线
      addLine() {
        axios.get('./json/line.json').then((res) => {
          console.log(res.data.lineData);
          res.data.lineData.map((val, ind) => {
            let jsonData = {
              id: ind + 1,
              overlayType: 'model',
              idLayer: '',
              label: '',
              labelColor: '#ffffff',
              labelBackgroundColor: '#333333',
              labelFontSize: 20,
              autoScale: false,
              ...val,
            };
            appInstance.uniCall('addConnection', jsonData, (result) => {
              console.log(result);
            });
          });
        });
      },
      addLandmark() {
        let jsonData = {
          id: '交付中心',
          coordType: 1,
          coordTypeZ: 0,
          name: '交付中心',
          autoScale: false,
          visible: false,
          legends: [
            {
              name: 'camera',
              iconName: 'camera',
              color: '#ff0000',
              iconScale: 1,
              labelScale: 1,
            },
          ],
          data: [
            {
              coord: [220.097, -0.754],
              coordZ: 92.15737320916803,
              id: '1',
              type: 'camera',
              label: '交付箭头',
            },
            {
              coord: [156.5925942964984, 12.340780474774785],
              coordZ: 61.95465433935488,
              id: '2',
              type: 'camera',
              label: '交付1',
            },
            {
              coord: [209.4431461813608, 63.4172160446386],
              coordZ: 62.59742216323137,
              id: '3',
              type: 'camera',
              label: '交付3',
            },
            {
              coord: [280.54406296782656, 23.196684840349764],
              coordZ: 61.53881177542565,
              id: '4',
              type: 'camera',
              label: '交付4',
            },
            {
              coord: [267.5700188994205, -45.9898642827883],
              coordZ: 63.205876846793466,
              id: '5',
              type: 'camera',
              label: '交付5',
            },
            {
              coord: [195.36905338139235, -60.59416501839651],
              coordZ: 62.994484176072014,
              id: '6',
              type: 'camera',
              label: '交付2',
            },
          ],
        };
        appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
          console.log(result);
        });
        let jsonData2 = {
          id: '海外业务',
          coordType: 1,
          coordTypeZ: 0,
          name: '海',
          autoScale: false,
          visible: false,
          legends: [
            {
              name: 'camera',
              iconName: 'camera',
              color: '#ff0000',
              iconScale: 1,
              labelScale: 1,
            },
          ],
          data: [
            {
              coord: [-220.689, -1.314],
              coordZ: 91.529,
              id: '1',
              type: 'camera',
              label: '海箭头',
            },
            {
              coord: [-160.52013242987917, 23.065442573286962],
              coordZ: 63.36070053782612,
              id: '2',
              type: 'camera',
              label: '海连接点',
            },
            {
              coord: [-233.81195364131668, -64.26701791754846],
              coordZ: 62.81674791836614,
              id: '3',
              type: 'camera',
              label: '海链接点2',
            },
            {
              coord: [-282.946, 12.357000000000001],
              coordZ: 64.003,
              id: '4',
              type: 'camera',
              label: '海链接点3',
            },
          ],
        };

        appInstance.uniCall('addLandmarkLayer', jsonData2, (result) => {
          console.log(result);
        });
        let jsonData3 = {
          id: '国内营销',
          coordType: 1,
          coordTypeZ: 0,
          name: '营销',
          autoScale: false,
          visible: false,
          legends: [
            {
              name: 'camera',
              iconName: 'camera',
              color: '#ff0000',
              iconScale: 1,
              labelScale: 1,
            },
          ],
          data: [
            {
              coord: [-1.4068408373143169, 0.9860232229227641],
              coordZ: 96.03283084850587,
              id: '1',
              type: 'camera',
              label: '营销箭头',
            },
            {
              coord: [-61.2197605204524, -24.742956872678995],
              coordZ: 62.928768927175504,
              id: '2',
              type: 'camera',
              label: '营销1',
            },
            {
              coord: [-12.850936310408436, 63.97851810085747],
              coordZ: 61.95342826530878,
              id: '3',
              type: 'camera',
              label: '营销2',
            },
            {
              coord: [60.040087915993055, 24.93647721535907],
              coordZ: 62.480309516630136,
              id: '4',
              type: 'camera',
              label: '营销3',
            },
            {
              coord: [23.90801697813689, -59.5247080179472],
              coordZ: 61.811203065870814,
              id: '5',
              type: 'camera',
              label: '营销4',
            },
          ],
        };

        appInstance.uniCall('addLandmarkLayer', jsonData3, (result) => {
          this.addLine();
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
