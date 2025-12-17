window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      legendList: [
        {
          id: 'id01',
          action: '原水_二通AB',
          isChecked: true,
          Ids: ['政府网点', '原水_二通AB'],
        },
        {
          id: 'id02',
          action: '电视_二通AB',
          isChecked: true,
          Ids: ['政府网点1', '有线电视_二通AB'],
        },
        {
          id: 'id03',
          action: '水管_弯管AB01',
          isChecked: true,
          Ids: ['政府网点2', '水管_弯管90AB01'],
        },
        {
          id: 'id04',
          action: '水管_弯管C0102',
          isChecked: true,
          Ids: ['政府网点3', '水管_弯管90C0102'],
        },
        {
          id: 'id05',
          action: '水管_弯管AB02',
          isChecked: true,
          Ids: ['政府网点4', '水管_弯管90AB02'],
        },
        {
          id: 'id14',
          action: '水管_弯管D0102',
          isChecked: true,
          Ids: ['政府网点13', '水管_弯管90分支D0102'],
        },
        {
          id: 'id06',
          action: '燃气_二通AB',
          isChecked: true,
          Ids: ['政府网点5', '燃气_二通AB'],
        },
        {
          id: 'id07',
          action: '通信_二通AB',
          isChecked: true,
          Ids: ['政府网点6', '通信_二通AB'],
        },
        {
          id: 'id08',
          action: '排水_AB01',
          isChecked: true,
          Ids: ['政府网点7', '排水AB01'],
        },
        {
          id: 'id09',
          action: '排水_BC02',
          isChecked: true,
          Ids: ['政府网点8', '排水BC02'],
        },
        {
          id: 'id10',
          action: '排水_CD02',
          isChecked: true,
          Ids: ['政府网点9', '排水CD03'],
        },
        {
          id: 'id11',
          action: '排水_DE04',
          isChecked: true,
          Ids: ['政府网点10', '排水DE04'],
        },
        {
          id: 'id16',
          action: '排水_EF04',
          isChecked: true,
          Ids: ['政府网点15', '排水EF04'],
        },
        {
          id: 'id12',
          action: '电力_二通AB',
          isChecked: true,
          Ids: ['政府网点11', '电力_二通AB'],
        },
        {
          id: 'id13',
          action: '绿化_二通AB',
          isChecked: true,
          Ids: ['政府网点12', '绿化_二通AB'],
        },
        {
          id: 'id15',
          action: '氮气_二通AB',
          isChecked: true,
          Ids: ['政府网点14', '氮气_二通AB'],
        },
        {
          id: 'id17',
          action: '恢复',
          isChecked: true,
          Ids: '',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl16,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl16, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              // _this.addLine();
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

      //隐藏所有模型
      allVisibility() {
        let ids = [];
        this.legendList.map((val) => {
          if (val.Ids[0]) {
            ids.push(val.Ids[0]);
          }
        });
        let jsonData1 = {
          ids: ids, // 模型对象 id 集合
          //layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。如果这个为空，会在场景世界中查找并且设置第一个对应Id和Ids的对象，如果不为空，只会查找指定layerId图层内的匹配Id和Ids的模型对象。
          visible: false, // 模型需要设置显隐的状态，true: 显示，false：隐藏
        };
        appInstance.uniCall('setModelVisibility', jsonData1, (result) => {
          console.log(result);
        });
      },

      //显示所有模型
      controlsModel(ids, type) {
        let jsonData = {
          ids: Array.isArray(ids) ? ids : [ids], // 模型对象 id 集合
          //layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。如果这个为空，会在场景世界中查找并且设置第一个对应Id和Ids的对象，如果不为空，只会查找指定layerId图层内的匹配Id和Ids的模型对象。
          visible: type, // 模型需要设置显隐的状态，true: 显示，false：隐藏
        };
        appInstance.uniCall('setModelVisibility', jsonData, (result) => {
          console.log(result);
        });
      },

      //原水_二通AB
      rawWaterAB() {
        let jsonData = {
          id: '原水_二通AB', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 30, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 69.75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //电视_二通AB
      televisionAB() {
        let jsonData = {
          id: '有线电视_二通AB', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 22, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 70.75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //水管_弯管AB01
      waterPipeAB01() {
        let jsonData = {
          id: '水管_弯管90AB01', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 35, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 70.75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //水管_弯管C0102
      waterPipeC0102() {
        let jsonData = {
          id: '水管_弯管90C0102', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 35, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 70.4, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //水管_弯管AB02
      waterPipeAB02() {
        let jsonData = {
          id: '水管_弯管90AB02', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 15, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 270, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 79.5, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //燃气_二通AB
      gasAB() {
        let jsonData = {
          id: '燃气_二通AB', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 40, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 75.52, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //通信_二通AB
      communicationAB() {
        let jsonData = {
          id: '通信_二通AB', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 27, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 64.75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //排水_AB01
      drainwaterAB01() {
        let jsonData = {
          id: '排水AB01', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 15, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //排水_BC02
      drainwaterBC02() {
        let jsonData = {
          id: '排水BC02', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 15, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 66.2, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //排水_CD02
      drainwaterCD02() {
        let jsonData = {
          id: '排水CD03', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 21, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 63.86, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //排水_DE04
      drainwaterDE04() {
        let jsonData = {
          id: '排水DE04', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 20, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 67.68, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //电力_二通AB
      electricityAB() {
        let jsonData = {
          id: '电力_二通AB', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 15, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 67, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //绿化_二通AB
      afforestationAB() {
        let jsonData = {
          id: '绿化_二通AB', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 30, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 64.75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //水管_弯管90分支D0102
      waterPipeD0102() {
        let jsonData = {
          id: '水管_弯管90分支D0102', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 26, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 70.4, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //氮气_二通AB
      nitrogenAB() {
        let jsonData = {
          id: '氮气_二通AB', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 26, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 180, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 74.75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      //排水EF04
      drainWaterEF04() {
        let jsonData = {
          id: '排水EF04', // 模型id
          // layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。（只支持端渲染）
          modelType: 'connection', // 模型类别
          pitch: 15, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
          heading: 256.91, // 聚焦镜头后的偏航角(0正北, 0~359)
          distance: 70.75, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      // 点击事件
      controlChecked(item, event) {
        var _this = this;
        if (event.target.className == 'Areali active') {
          return;
        }
        this.allVisibility();
        item.isChecked = true;
        if (item.id != 'id17') {
          _this.controlsModel(item.Ids, item.isChecked);
        }
        event.target.className = 'Areali active';
        if (this.parentNode) {
          this.parentNode.className = 'Areali';
        }
        switch (item.id) {
          case 'id01':
            if (item.isChecked) {
              _this.rawWaterAB();
            }
            break;
          case 'id02':
            if (item.isChecked) {
              _this.televisionAB();
            }
            break;
          case 'id03':
            if (item.isChecked) {
              _this.waterPipeAB01();
            }
            break;
          case 'id04':
            if (item.isChecked) {
              _this.waterPipeC0102();
            }
            break;
          case 'id05':
            if (item.isChecked) {
              _this.waterPipeAB02();
            }
            break;
          case 'id06':
            if (item.isChecked) {
              _this.gasAB();
            }
            break;
          case 'id07':
            if (item.isChecked) {
              _this.communicationAB();
            }
            break;
          case 'id08':
            if (item.isChecked) {
              _this.drainwaterAB01();
            }
            break;
          case 'id09':
            if (item.isChecked) {
              _this.drainwaterBC02();
            }
            break;
          case 'id10':
            if (item.isChecked) {
              _this.drainwaterCD02();
            }
            break;
          case 'id11':
            if (item.isChecked) {
              _this.drainwaterDE04();
            }
            break;
          case 'id12':
            if (item.isChecked) {
              _this.electricityAB();
            }
            break;
          case 'id13':
            if (item.isChecked) {
              _this.afforestationAB();
            }
            break;
          case 'id14':
            if (item.isChecked) {
              _this.waterPipeD0102();
            }
            break;
          case 'id15':
            if (item.isChecked) {
              _this.nitrogenAB();
            }
            break;
          case 'id16':
            if (item.isChecked) {
              _this.drainWaterEF04();
            }
            break;
          case 'id17':
            this.legendList.map((r) => (r.isChecked = true));
            this.$forceUpdate();
            let jsonData = {
              name: '默认状态', // 状态名称需要先使用 获取状态信息 接口,获取到状态名称填入此处
              sceneName: '', // 状态所属的场景，如果状态是当前场景的，可以不写
            };

            appInstance.uniCall('switchState', jsonData, (result) => {
              console.log(result);
            });
            break;
        }
        this.$forceUpdate();
        this.parentNode = event.target;
      },

      //单选框点击事件
      clickInput(item) {
        item.isChecked = !item.isChecked;
        this.controlsModel(item.Ids[1], item.isChecked);
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
