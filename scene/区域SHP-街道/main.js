window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      resetBtn: [
        {
          //显示区划按钮数据
          id: 0,
          action: '显示区划',
          active: false,
        },
        {
          // 恢复
          id: 1,
          action: '恢复',
          active: false,
        },
      ],
      legendList: [
        // 定义图层可视化数据
        {
          id: '1',
          type: '摄像头',
          label: '五山街道',
          coord: [113.34975820020937, 23.15800640841587],
          coordZ: 150,
        },
        {
          id: '2',
          type: '摄像头',
          label: '员村街道',
          coord: [113.36160467124016, 23.117538660606982],
          coordZ: 150,
        },
        {
          id: '3',
          type: '摄像头',
          label: '新塘街道',
          coord: [113.40024632174254, 23.16568851474478],
          coordZ: 150,
        },
        {
          id: '4', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          type: '摄像头', // 地标点的图例类别名称
          label: '凤凰街道', // 图标标签文本
          coord: [113.38410966266514, 23.222320892061234], // XY 轴坐标，X：经度；Y：纬度
          coordZ: 150, // Z 轴高度（单位：米）
        },
        {
          id: '5',
          type: '摄像头',
          label: '龙洞街道',
          coord: [113.36134264808081, 23.205628194156308],
          coordZ: 150,
        },
        {
          id: '6',
          type: '摄像头',
          label: '元岗街道',
          coord: [113.33843342175277, 23.184465207497],
          coordZ: 150,
        },
        {
          id: '7',
          type: '摄像头',
          label: '长兴街道',
          coord: [113.36965400903809, 23.177216443449108],
          coordZ: 150,
        },

        {
          id: '8',
          type: '摄像头',
          label: '兴华街道',
          coord: [113.32341751635171, 23.169582846527984],
          coordZ: 150,
        },

        {
          id: '9',
          type: '摄像头',
          label: '棠下街道',
          coord: [113.37506131462314, 23.14134060552319],
          coordZ: 150,
        },
        {
          id: '10',
          type: '摄像头',
          label: '黄村街道',
          coord: [113.4112866678741, 23.143861038225584],
          coordZ: 150,
        },
        {
          id: '11',
          type: '摄像头',
          label: '珠吉街道',
          coord: [113.42213933528755, 23.129481301692056],
          coordZ: 150,
        },
        {
          id: '12',
          type: '摄像头',
          label: '沙东街道',
          coord: [113.3104399650285, 23.16241268952239],
          coordZ: 150,
        },
        {
          id: '13',
          type: '摄像头',
          label: '沙河街道',
          coord: [113.30245024090739, 23.151311286210117],
          coordZ: 150,
        },
        {
          id: '14',
          type: '摄像头',
          label: '林和街道',
          coord: [113.31859154114119, 23.150419153733548],
          coordZ: 150,
        },
        {
          id: '15',
          type: '摄像头',
          label: '石牌街道',
          coord: [113.33765089576339, 23.138980877159206],
          coordZ: 150,
        },
        {
          id: '16',
          type: '摄像头',
          label: '天园街道',
          coord: [113.36522634728126, 23.128325466998493],
          coordZ: 150,
        },
        {
          id: '17',
          type: '摄像头',
          label: '车陂街道',
          coord: [113.39184063080118, 23.123938355375916],
          coordZ: 150,
        },
        {
          id: '18',
          type: '摄像头',
          label: '前进街道',
          coord: [113.4059771400056, 23.113031467823436],
          coordZ: 150,
        },
        {
          id: '19',
          type: '摄像头',
          label: '天河南街',
          coord: [113.3170615515606, 23.137429965074165],
          coordZ: 150,
        },
        {
          id: '20',
          type: '摄像头',
          label: '冼村街道',
          coord: [113.32713601593977, 23.1268203013147],
          coordZ: 150,
        },
        {
          id: '21',
          type: '摄像头',
          label: '猎德街道',
          coord: [113.32555994286682, 23.116741213734674],
          coordZ: 150,
        },
      ],
      shpList: [
        //shp区域数据
        {
          color: '#cae124',
          areaHeight: 200,
          shpPath: './data/红.shp',
        },
        {
          color: '#04cc77',
          areaHeight: 200,
          shpPath: './data/黄.shp',
        },
        {
          color: '#1292fa',
          areaHeight: 200,
          shpPath: './data/蓝.shp',
        },
        {
          color: '#d82e58',
          areaHeight: 200,
          shpPath: './data/绿.shp',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.shpDataUrl,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.shpDataUrl, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addTips();
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
      // 设置图层顺序
      moveOverlayForward() {
        let jsonData = {
          idLayer: 'landmarkLayer', // 需要移动的图层Id
          offset: 0, // 移动图层偏移几个，是相对图层的数量，如果是0，表示前移到最上面，值域只能是大于0
        };
        appInstance.uniCall('moveOverlayForward', jsonData, (result) => {
          console.log(result);
        });
      },

      // 显示区划按钮事件
      addArea(el) {
        el.active = !el.active;
        if (el.id == 0) {
          if (el.active) {
            // 添加shp区域
            this.addAreaShp();
          } else {
            // 删除shp区域
            this.shpList.map((val, ind) => {
              let jsonData = {
                id: 'Area' + ind,
                overlayType: 'area',
              };

              appInstance.uniCall('removeOverlay', jsonData, (result) => {
                console.log(result);
              });
            });
          }
        } else {
          this.legendList.forEach((n) => {
            n.active = false;
            this.$forceUpdate();
          });
          appInstance.uniCall(
            'switchState',
            {
              name: '默认状态',
              sceneName: '',
            },
            (result) => {
              console.log(result);
            }
          );
        }
      },

      // 聚焦区域
      changeView(id) {
        this.legendList.forEach((n) => {
          if (n.id == id) {
            n.active = true;
          } else {
            n.active = false;
          }
          this.$forceUpdate();
        });
        this.resetBtn[1].active = false
        window.appInstance.uniCall(
          'focusByLayer',
          {
            id: id,
            idLayer: 'landmarkLayer',
            layerType: 'landmarkLayer',
            distance: 3000,
          },
          (result) => {
            console.log(result);
          }
        );
      },

      // 添加区域图层
      addAreaShp() {
        this.shpList.map((val, ind) => {
          let jsonData = {
            id: 'Area' + ind, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            name: 'layerName', // 图层名称，支持为图层自定义名称
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            type: 'Gradient03', // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
            color: val.color, // 颜色（HEX 颜色值）
            alpha: 0.3, // 透明度，0：完全透明；1：完全不透明，默认值1
            areaHeight: val.areaHeight, // 围栏高度（单位：米）
            fillArea: 'Segment01', // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
            fillPosition: 'bottom', // 区域填充的位置，top/bottom，默认top
            tag: 'custominfo', // 用户自定标签，用户保存用户的扩展数据
            shpPath: val.shpPath, // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"，只能支持 EPSG:3857 和 EPSG:4326 两种坐标系的文件，如果 shp 中有多个多边形区域，只会加载第一个。
            coordZ: -100, // 高度（单位：米）
            dataRegion: 'all',
          };

          appInstance.uniCall('addAreaShp', jsonData, (result) => {
            console.log(result);
            this.moveOverlayForward();
          });
        });
      },
      // 添加地标图
      addTips() {
        let jsonData = {
          id: 'landmarkLayer', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: '地标图层', // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          autoScale: false, // 默认false，如果开启true后，图标会按照是摄像机远近自动缩放大小
          visible: true, // 添加当前图层时默认是显示还是隐藏
          legends: [
            // 定义图层包含图例，支持为不同图例定义各自样式
            {
              name: '摄像头', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              color: '#ffffff', // 颜色（HEX 颜色值）
              iconName: 'site_02', // 内置图标名称，见图观官网统一API开发手册
              iconScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
              labelScale: 1.3, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
            },
          ],
          data: this.legendList,
        };

        appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
