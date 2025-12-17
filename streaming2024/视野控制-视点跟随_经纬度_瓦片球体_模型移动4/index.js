window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: false, // 是否显示遮罩
      isInit: false, // 是否初始化
      running: false, // 是否移动
      enableRotate: false, // 是否开启环绕
      flyTime: 0, // 当前飞行时长
      allTime: 13200, //总飞行时间（秒） 3小时40分钟对应的秒数
      percent: 0, // 播放时间占比，进度条使用
      allDistance: '2,244Km', // 总飞行距离
      step: 0, // 数据间隔步时长（毫秒） 1倍速时，飞机在两个拐点应该飞行的时间
      duration: 0, // 移动Timer 使用的移动持续时间
      current: 0, //当前数据索引
      stepCount: 0, //当前倍速下跨越点数
      multiple: 2, //倍速
      transTimer: undefined, // 移动定时器
      envTimer: undefined, // 环境时间定时器
      startTime: new Date('2024/4/17 08:15:00'), // 飞机起飞时间
      endTime: undefined, // 飞机降落时间
      currentTime: 0, //当前时间
      isAirWheelRelease: false, // 是否执行完放轮
      legendList: [
        {
          id: 1,
          action: '镜头跟随模型-自身',
          isChecked: true,
          value: 'self',
        },
        {
          id: 2,
          action: '镜头跟随模型-世界',
          isChecked: false,
          value: 'world',
        },
      ],
      speedMultiples: [
        {
          id: 11,
          action: 'X2',
          isChecked: true,
          value: 2,
        },
        {
          id: 12,
          action: 'X10',
          isChecked: false,
          value: 10,
        },
        {
          id: 13,
          action: 'X50',
          isChecked: false,
          value: 50,
        },
      ],
      pathData: [],
      keyframeDataSet: [
        {
          current: 545,
          flyTime: 12600,
          percent: 96,
          currentTime: new Date('2024/4/17 11:45:00'),
          name: 'end',
        },
        {
          current: 49,
          flyTime: 1056,
          percent: 8,
          currentTime: new Date('2024/4/17 08:32:36'),
          name: '河北省',
        },
        {
          current: 157,
          flyTime: 3564,
          percent: 27,
          currentTime: new Date('2024/4/17 09:14:24'),
          name: '河南省',
        },
        {
          current: 210,
          flyTime: 4752,
          percent: 36,
          currentTime: new Date('2024/4/17 09:34:12'),
          name: '安徽省',
        },
        {
          current: 227,
          flyTime: 5148,
          percent: 39,
          currentTime: new Date('2024/4/17 09:40:48'),
          name: '湖北省',
        },
        {
          current: 276,
          flyTime: 6336,
          percent: 48,
          currentTime: new Date('2024/4/17 10:00:36'),
          name: '湖南省',
        },
        {
          current: 431,
          flyTime: 9900,
          percent: 75,
          currentTime: new Date('2024/4/17 11:00:00'),
          name: '广西省',
        },
      ],
      keyFrameBox: '',
    },
    methods: {
      // 初始化加载图观三维场景服务
      init() {
        let _this = this;
        // 初始化图观App
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById('container'),
            mode: 'streaming',
            token: 'VUFyAFo4', //StreamingServer服务器获取token
            url: 'https://172.16.1.128:9090', //StreamingServer服务器接口地址和端口，需要进行替换为实际地址
          },
          (result) => {
            window.appInstance.uniCall(
              'addEventListener',
              {
                eventName: 'onServiceInit',
                callback: (res) => {
                  _this.isZZ = true;
                  let jsonData = {
                    lightPower: 1, // 图层对象中如果带有发光特性的光的亮度，值域范围0.0 - 10.0，默认1.0
                    isLayerTopMost: false, // 图层是否盖在所有模型的最前面，此选项作用于全部图层
                    divTipMovingDelay: 200, // 使用HTML Div方法添加的Tip标牌和流画面同步延迟，默认200（单位毫秒）
                    labelColorStyle: 'nonlinear',
                  };

                  appInstance.uniCall('setSceneEffect', jsonData, (result) => {
                    console.log(result);
                    _this.isInit = true;

                    _this.initialization();
                  });
                },
              },
              (result) => {
                console.log(result);
              }
            );
          }
        );
      },

      // 添加大兴圆形区域
      addCircleDaXing() {
        let jsonData = {
          id: 'circleAreaDaXing',
          name: 'circleAreaDaXing',
          coordType: 0,
          coordTypeZ: 0,
          coordZ: 20,
          type: 'Segment01',
          color: '#ff0000',
          alpha: 1,
          visible: true,
          areaHeight: 20,
          fillArea: 'Gradient01',
          fillPosition: 'none',
          tag: 'custominfo',
          center: [116.40206179138, 39.50147162323],
          radius: 50000,
        };

        appInstance.uniCall('addCircularArea', jsonData, (result) => {
          console.log(result);
        });
      },

      // 添加美兰圆形区域
      addCircleMeiLan() {
        let jsonData = {
          id: 'circleAreaMeiLan',
          name: 'circleAreaMeiLan',
          coordType: 0,
          coordTypeZ: 0,
          coordZ: 20,
          type: 'Segment01',
          color: '#ff0000',
          alpha: 1,
          visible: true,
          areaHeight: 20,
          fillArea: 'Gradient01',
          fillPosition: 'none',
          tag: 'custominfo',
          center: [110.46471, 19.93497],
          radius: 50000,
        };

        appInstance.uniCall('addCircularArea', jsonData, (result) => {
          console.log(result);
        });
      },

      addGISMap() {
        let jsonData = {
          id: 'gisMapLayer', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: 'layerName', // 图层名称，支持为图层自定义名称
          maps: [
            // 流渲染和端渲染最多都可以添加3个MapUrl
            {
              mapUrl: 'http://172.16.0.252:8082/World-Satellite.01-12_TMS/tms.xml', // 地图瓦片地址 流渲染TMS类型的map填写tileset.json文件的完整URL路径，WMTS类型的填写不带Token的图层地址，类似：http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y} 端渲染填写https://abc.xyz.com/{z}/{x}/{y}.jpg 或 png 的格式，只支持 256x256 的影像瓦片
              mapType: 'TMS', // 地图瓦片数据格式类别，支持"TMS"或"WMTS"两种类型
              mapTokenName: 'tk', // 可以为""，或者如果地图瓦片需要 token，这里填写 token 的 name，在 URL 请求时当作 parameter 的 key 传入
              mapTokenValue: 'ABCDEFG', // 可以为""，或者如果地图瓦片需要 token，这里填写 token 的 value，在 URL 请求时当作 parameter 的 value 传入
              mapZOffset: 0, // 在请求地图地址时对于Z参数的偏移量，可以是-1、0、1或其他整数，默认值0
              mapLOD: 2, // 地图瓦片数据细节加载系数，表示在当前视野距离下，加载地图层级的级别系数。流渲染默认值是 2，如果想更加清晰，可以设置 1 或者 0.5
            },
            {
              mapUrl: 'http://172.16.0.116:8082/DHGSatellite/DaXingAirport/tms.xml',
              mapType: 'TMS',
              mapTokenName: 'tk',
              mapTokenValue: 'ABCDEFG',
              mapZOffset: 0,
              mapLOD: 2,
            },
            {
              mapUrl: 'http://172.16.0.116:8082/DHGSatellite/MeiLanAirport/tms.xml',
              mapType: 'TMS',
              mapTokenName: 'tk',
              mapTokenValue: 'ABCDEFG',
              mapZOffset: 0,
              mapLOD: 2,
            },
          ],

          terrainUrl: 'http://172.16.1.225:8084/layer.json', // 高程瓦片入口描述文件地址
          terrainType: 'TMS', // WMTS 的高程数据格式类别，目前仅支持 "TMS"
          terrainToken: 'ABCDEFG', // 预留字段
          visible: true, // 显隐控制，true：显示；false：隐藏
          alpha: 0.5, // 透明度，0：完全透明；1：完全不透明
        };

        appInstance.uniCall(
          'clearOverlayType',
          {
            overlayType: 'gisMap', // 覆盖物类型，支持 all
          },
          (result) => {
            console.log(result);
          }
        );
        appInstance.uniCall('addGISMap', jsonData, (result) => {
          console.log(result);
          if (result.result === 1) {
            appInstance.uniCall(
              'focusById',
              {
                id: 'gisMapLayer',
                overlayType: 'gisMap',
                distance: 2000,
              },
              (focusResult) => {
                console.log(focusResult);
              }
            );
          }
        });
      },

      // 取消限制镜头
      freeCamera() {
        let jsonData2 = {
          state: 'free', //restricted：受限；free：不受限制
        };
        appInstance.uniCall('setCameraRestrictionState', jsonData2, (result) => {
          console.log(result);
        });
      },

      // 添加地标图层（起飞和降落点）
      addLandmarkLayer() {
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
              name: '大兴', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              color: '#73FFFF', // 颜色（HEX 颜色值）
              iconName: 'custom-dx', // 内置图标名称，见图观官网统一API开发手册
              iconScale: 0.5, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
              labelScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
            },
            {
              name: '海口', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              color: '#73FFFF', // 颜色（HEX 颜色值）
              iconName: 'custom-ml', // 内置图标名称，见图观官网统一API开发手册
              iconScale: 0.5, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
              labelScale: 1, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
            },
          ],
          data: [
            // 定义图层可视化数据
            {
              id: '1', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              type: '大兴', // 地标点的图例类别名称
              label: '', // 图标标签文本
              coord: this.pathData[0].coord, // XY 轴坐标，X：经度；Y：纬度
              coordZ: this.pathData[0].coordZ + 40, // Z 轴高度（单位：米）
            },
            {
              id: '2',
              type: '海口',
              label: '',
              coord: this.pathData[570].coord,
              coordZ: this.pathData[this.pathData.length - 1].coordZ + 40,
            },
          ],
        };

        appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
          console.log(result);
        });
      },

      //添加模型，4.0版本的模型没有在场景中，需要调用 addModel 接口添加模型
      addModel() {
        let _this = this;
        let jsonData1 = {
          id: 'plane02', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coord: this.pathData[0].coord, // XY 轴坐标，X：经度；Y：纬度
          coordZ: 26, // Z 轴高度（单位：米）
          rotation: [173, 0, 0],
          alpha: 1, // 透明度，0：完全透明；1：完全不透明
          scale: 0.5, // 模型整体放缩倍数（单位：倍），支持单一数值，或者[scaleX, scaleY, scaleZ]的写法。
          titleText: '', // 特效标签文本
          titleColor: '#ffffff', // 特效标签文本颜色，可选值，默认白色
          titleBackgroundColor: '#333333', // 特效标签文本背景颜色，可选值，默认灰色
          titleFontSize: 20, // 模型标签文本字体大小，数值越大，文字越大
          titileAutoScale: false, // 模型标签是否随摄像机距离自动缩放，false，不缩放，永远一样大；true，缩放，摄像机越远标签越小
          visible: true, // 添加当前模型时默认显示还是隐藏
          isReferenceType: false, // 模型是引用类型还是复制类型，引用类型的对象占用更少的显存和绘制调用次数。但是无法自定义修改材质和粒子效果，且不支持设置单个实例的透明度。默认是复制类型。false: 复制类型，true: 引用类型。
          modelType: 'AirPlane', // 模型类型
        };

        appInstance.uniCall('addModel', jsonData1, (result) => {
          console.log(result);
          _this.isZZ = false;

          _this.followingCamera({ value: 'self' });
        });
      },
	  
	  // 聚焦大兴红模型
	  setFocus(){
		let jsonData = {
         id: '红立方体', // 模型id
         modelType: 'model', // 模型类别
         pitch: 30, // 聚焦后摄像机的默认镜头俯仰角(-89~89)，如果无则是默认角度
         heading: 0, // 聚焦镜头后的偏航角(0正北, 0~359)
         distance: 100, // 聚焦后摄像机的默认镜头距对象距离(单位:米)，如果无则根据对象大小自动计算
        };

        appInstance.uniCall('focusModel', jsonData, (result) => {
          console.log(result);
        });
      },

      // 设置模型基本变换（默认初始化加载调用）
      setModelTransform2Default() {
        let _this = this;
        let jsonData = {
          id: 'plane02', // 流渲染：plane02 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          //layerId: 'layerId', // 模型所属的图层Id，Id可以通过getModelsByType接口获得。如果这个为空，会在场景世界中查找并且设置第一个对应Id和Ids的对象，如果不为空，只会查找指定layerId图层内的匹配Id和Ids的模型对象。
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordX: this.pathData[0].coord[0], // X 轴坐标  // 如果coordType: 0，表示经度，如果coordType: 1，表示 X 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          coordY: this.pathData[0].coord[1], // Y 轴坐标  // 如果coordType: 0，表示纬度，如果coordType: 1，表示 Y 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          coordZ: 26, // Z 轴高度（单位：米）  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          rotationX: 173, // 3.6：353  ；4.0：173
          rotationY: 0, // 3.6：0 ； 4.0：0
          rotationZ: 0, // 3.6：0 ； 4.0：0
          duration: 0.01, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
        };
        appInstance.uniCall('setModelTransform2', jsonData, (result) => {
          console.log(result);

          _this.followingCamera({ value: 'self' });
          _this.isZZ = false;
        });
      },

      // 添加路径（调试用）
      addPath() {
        // Segment06
        let jsonData = {
          id: 'path', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: '路径', // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          type: 'Arrow01', // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Arrow07 Segment01 Segment02 Segment03 Segment04 Segment05 Segment06 Segment07 Segment08 ModelCube ModelCylinder
          texture: 'cableFlow.png', // 材质贴图名称，只有当 type 为 Model 开始的类型，才有用。端渲染：在场景中预置好的图片名称或外部图片 url，流渲染：服务器应用目录里的资源图片
          textureSpeed: 0, // 材质贴图的 UV 动画速度，默认：0，0为不运动，其他数值沿着路径模型方向前进，负数为反向
          color: '#ff0000', // 路线颜色，颜色透明（HEX 颜色值）
          colorPass: '#0000FF', // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
          width: 300, // 路径宽度（单位：米）
          tag: 'custominfo', // 用户自定标签，用户保存用户的扩展数据
          autoScale: true, // 线是否近大远小，false，镜头无论远近，看起来线一样大，true，镜头近线粗，镜头远线细
          visible: true, // 添加当前图层时默认是显示还是隐藏
          lineDataId: '', // 对应本服务器上线数据对象，如果找到 lineDataId，则下方的 points 不起作用
          snapSurface: 0, // 启用自动贴地，0：不贴地，1：自动贴地。默认值是0。
          points: [],
        };
        jsonData.points = this.pathData; // 定义路径途径点
        appInstance.uniCall('addPath', jsonData, (result) => {});
      },

      // 开启/停止环绕
      changeRotate(enableRotate) {
        let _this = this;
        if (enableRotate) {
          appInstance.uniCall(
            'rotateCamera',
            {
              enabled: true, // 是否启用相机围绕目标飞行
              duration: 30, // 飞行一周所需要的秒数，数值越大飞行越慢
              interruptable: true, // 是否可以被打断，默认为true
              direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
            },
            (result) => {
              console.log(result);
              _this.$set(_this.legendList[0], 'isChecked', false);
              _this.$set(_this.legendList[1], 'isChecked', true);
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
          duration: 30, // 飞行一周所需要的秒数，数值越大飞行越慢
          interruptable: true, // 是否可以被打断，默认为true
          direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
        };

        appInstance.uniCall('rotateCamera', jsonData, (result) => {
          console.log(result);
        });
      },

      /**
       * 控制按钮点击，切换相机 自身/世界 模式
       * @param {*} el 相机图例item项
       */
      controlChecked(el) {
        let _this = this;
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.isChecked = true;
          } else {
            item.isChecked = false;
          }
        });
        _this.followingCamera(el);
      },

      /**
       * 速度按钮点击，切换倍速
       * @param {*} el 倍速图例item项
       */
      speedChecked(el) {
        if (el.value == this.multiple) {
          this.$set(el, 'isChecked', true);
          return;
        }

        let multiple = this.multiple;
        for (let i = 0; i < this.speedMultiples.length; i++) {
          if (el.id == this.speedMultiples[i].id) {
            this.$set(this.speedMultiples[i], 'isChecked', true);
            multiple = this.speedMultiples[i].value;
          } else {
            this.$set(this.speedMultiples[i], 'isChecked', false);
          }
        }

        if (!this.running) {
          this.multiple = multiple;
          this.stepCount = this.multiple / 2;
          if (this.current >= this.pathData.length - 1) {
            this.resetTimer();
            this.flyTime = this.allTime;
            this.currentTime = new Date(this.endTime);
            this.percent = 100;
            this.setModelTransform2(false);
          }
          return;
        }

        clearTimeout(this.transTimer);
        this.setModelTransform2(false, () => {
          this.multiple = multiple;
          this.stepCount = this.multiple / 2;
          this.currentTime = new Date(this.startTime.getTime() + this.step * this.current);
          this.flyTime = (this.step * this.current) / 1000;
          this.doInterval();
        });
      },

      /**
       * 镜头跟随模型函数
       * @param {*} el 相机图例item项
       */
      followingCamera(el) {
        let relative = 'self';
        if (el.value == 'self') {
          // 自身
          relative = 'self';
          this.enableRotate = false;
          this.stopRotate();
        } else {
          // 世界
          relative = 'world';
        }
        appInstance.uniCall(
          'followingCamera',
          {
            modelId: 'plane02', // 镜头跟踪的模型Id，镜头和模型之前保持相对静止关系，支持运动的模型
            distanceMin: 10, // 镜头与被跟踪物体的最近距离(单位:米)
            distanceMax: 5000, // 镜头与被跟踪物体的最远距离(单位:米)
            distance: 150, // 镜头与被跟踪物体的距离(单位:米)
            pitch: 20, //镜头俯仰角(5~89)
            heading: 0, // 3.6:0；  4.0:90
            relative: relative, // 视角的相对位置，"self"，视角相对模型固定，"world"，视角相对世界固定。鼠标可以支持环绕模型旋转和缩放。如果在self模式下，鼠标旋转了，会自动变为world模式，直到用户重新调用followingCamera设置为self模式。
          },
          (result) => {
            console.log(result);
          }
        );
      },

      // 播放/暂停
      play() {
        if (!this.running) {
          if (this.current === this.pathData.length - 1 && this.currentTime >= this.endTime) {
            this.stop();
            setTimeout(() => {
              // 开始飞行，标记已飞行
              this.running = true;
              // 立即执行一次当前环境时间更新
              this.setEnvTime();
              // 启动动态环境时间更新定时器
              this.setDynamicTime();
              // 立即执行飞机初次飞行
              this.doInterval();
            }, 2000);
            return;
          }
          // 开始飞行，标记已飞行
          this.running = true;
          // 立即执行一次当前环境时间更新
          this.setEnvTime();
          // 启动动态环境时间更新定时器
          this.setDynamicTime();
          // 立即执行飞机初次飞行
          this.doInterval();
        } else {
          // 停止定时器
          this.resetTimer();
          // 暂停飞行，标记未飞行
          this.running = false;
          this.setModelTransform2(false, () => {
            this.currentTime = new Date(this.startTime.getTime() + this.step * this.current);
            this.flyTime = (this.step * this.current) / 1000;
            this.percent = (this.flyTime * 100) / this.allTime;
          });
        }
      },

      // 停止
      stop() {
        // 复位重置定时器和倍速选项
        this.resetTimer();
        this.current = 0;
        this.flyTime = 0;
        this.percent = 0;
        this.currentTime = new Date(this.startTime);
        this.running = false;
        // 复位时放下轮子
        this.playModelAnimation('放轮');
        // 复用事件函数设置相机模式和环绕按钮状态
        this.handleFollowingCameraChanged({
          relative: 'self',
          enableRotate: false,
        });
        // 初始化位置
        this.setModelTransform2Default();
        // 复位时重置飞行结束执行放轮的状态
        this.isAirWheelRelease = false;
      },

      // 设置关键帧
      setKeyFrame(mode) {
        this.resetTimer();
        let currentSet = {};
        this.keyframeDataSet.forEach((value) => {
          if (value.name === mode) {
            currentSet = value;
          }
        });
        if (mode === 'end') {
          if (this.isAirWheelRelease) {
            this.playModelAnimation('放轮');
            this.isAirWheelRelease = false;
          }
        } else {
          if (!this.isAirWheelRelease) {
            this.playModelAnimation('收轮');
            this.isAirWheelRelease = true;
          }
        }
        this.current = currentSet.current;
        this.flyTime = currentSet.flyTime - this.multiple;
        this.percent = currentSet.percent;
        this.currentTime = currentSet.currentTime;
        this.setModelTransform2(false, () => {
          if (this.running) {
            this.setEnvTime();
            //启动动态环境时间更新定时器
            this.setDynamicTime();
            this.doInterval();
          }
        });
      },

      // 起飞
      fly() {
        //标记起飞状态
        this.running = true;
        //立即执行一次当前环境时间更新
        this.setEnvTime();
        //启动动态环境时间更新定时器
        this.setDynamicTime();
        //立即执行飞机初次飞行
        this.doInterval();
      },

      /**
       * 执行飞行定时任务
       */
      doInterval() {
        // 累加起飞目目标索引
        this.current += this.stepCount;
        // 如果起飞目标索引超出路线最终长度，停止起飞定时器
        if (this.current >= this.pathData.length - 1) {
          this.current = this.pathData.length - 1;
          clearTimeout(this.transTimer);
          this.setModelTransform2();
          if (this.currentTime >= this.endTime) {
            this.running = false;
          }
          return;
        }
        //启动起飞定时器，调用自身再次下一目标索引的飞行任务
        this.transTimer = setTimeout(() => {
          this.doInterval();
        }, Math.floor(this.duration));
        // 执行当前飞行目标
        this.setModelTransform2();
      },

      /**
       * 设置模型基本变换（飞行）
       * @param {*} useDuration 使用持续时间更细目标位置而不是瞬间移动
       */
      setModelTransform2(useDuration = true, callback) {
        console.log(new Date(), this.current, useDuration, 'setModelTransform2');
        let current = this.current;

        let { coord, coordZ } = this.pathData[current];
        let heading = 0;
        if (useDuration) {
          if (current == 0) {
            heading = this.calculateYaw(coord, this.pathData[current + this.stepCount].coord);

            console.log('持续时间，当前0，计算出来的 ,' + heading);
          } else {
            heading = this.calculateYaw(this.pathData[current - this.stepCount].coord, coord);

            console.log('持续时间，当前非0，计算出来的 ,' + heading);
          }
        } else {
          // 瞬间移动永远计算的是当前点到下一个点的方向
          let next = current + 1;
          let prev = current;
          if (next > this.pathData.length - 1) {
            next = this.pathData.length - 1;
            prev = next - 1;
          }
          heading = this.calculateYaw(this.pathData[prev].coord, this.pathData[next].coord);

          console.log('瞬移，计算出来的 ,' + heading);
        }

        // 先转向
        let jsonData = {
          id: 'plane02', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          rotationX: heading - 180, // 3.6 heading；4.0：heading-180
          rotationY: 0, // Y 轴旋转度数（单位：度）  // 0水平，值域 -360~360  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          rotationZ: 0, // Z 轴旋转度数（单位：度）  // 0水平，值域 -360~360  // 如果值为null，或者没有传递这个属性，则表示不发生改变
          duration: 0.01, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
        };

        console.log('实际使用 ,' + heading);

        appInstance.uniCall('setModelTransform2', jsonData, (result) => {
          // 后移动
          let jsonData2 = {
            id: 'plane02', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            coordX: coord[0], // X 轴坐标  // 如果coordType: 0，表示经度，如果coordType: 1，表示 X 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
            coordY: coord[1], // Y 轴坐标  // 如果coordType: 0，表示纬度，如果coordType: 1，表示 Y 米，相对世界0，0点  // 如果值为null，或者没有传递这个属性，则表示不发生改变
            coordZ: current === 0 ? 29 : coordZ + 21.5, // Z 轴高度（单位：米）  // 如果值为null，或者没有传递这个属性，则表示不发生改变
            duration: useDuration ? Math.ceil(this.duration / 1000) : 0, // 持续时长（单位：秒），表示花费多少时间长度，变化到目标值，值域范围大于0，可以是小数
          };

          appInstance.uniCall('setModelTransform2', jsonData2, (result) => {
            callback && callback();
          });
        });
      },

      // 设置基准点
      setBaseCenter() {
        let jsonData = {
          originLon: this.pathData[0].coord[0], // 中心点经度
          originLat: this.pathData[0].coord[1], // 中心点纬度
          originHeight: 0, // 单位m
        };
        appInstance.uniCall('setBaseCenter', jsonData, (result) => {
          console.log(result);
        });
      },

      /**
       * 播放模型动画
       * @param {string} type - '收轮' 和 '放轮'
       */
      playModelAnimation(type = '收轮') {
        let jsonData = {
          id: 'plane02', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: type, // 动画名称
          state: 'begin', // 状态是： "begin", "pause", "stop", "restart" 四种
        };
        appInstance.uniCall('playModelAnimation', jsonData, (result) => {
          console.log(result);
        });
      },

      // 重置定时器
      resetTimer() {
        clearTimeout(this.transTimer);
        clearInterval(this.envTimer);
        this.transTimer = undefined;
        this.envTimer = undefined;
      },

      // 设置环境时间
      setDynamicTime() {
        // 如果已经启动环境时间定时器先停止
        clearInterval(this.envTimer);
        // 启动环境时间定时器，更新光照时间，更新飞行相关时间
        this.envTimer = setInterval(() => {
          this.flyTime += this.multiple;
          // 如果飞行时长大于总时长，停止环境时间定时器并设置相关飞行数据为最终时长数据
          if (this.flyTime >= this.allTime) {
            clearInterval(this.envTimer);
            this.flyTime = this.allTime;
            this.currentTime = new Date(this.endTime);
            this.percent = 100;
            if (this.current >= this.pathData.length - 1) {
              this.running = false;
            }
          } else {
            // 飞行过程中累积当前飞行时间和时长占比，使用时长占比更新界面进度条
            this.currentTime = new Date(this.currentTime.getTime() + 1000 * this.multiple);
            this.percent = (this.flyTime * 100) / this.allTime;
          }
          // 播放模型动画 起飞播放收轮动画
          if (this.currentTime.getTime() >= new Date('2024/4/17 11:45:10').getTime()) {
            if (this.isAirWheelRelease) {
              this.playModelAnimation('放轮');
              this.isAirWheelRelease = false;
            }
          } else {
            if (!this.isAirWheelRelease) {
              this.playModelAnimation('收轮');
              this.isAirWheelRelease = true;
            }
          }
          this.setEnvTime();
        }, 1000);
      },

      // 设置环境时间
      setEnvTime() {
        let envs = this.formatDate(this.currentTime).split(' ');
        let jsonData = {
          envTime: envs[1], // 设置时间，结合 envDate 属性和 setBaseCenter 接口，可以显示正确的日照角度
          envDate: envs[0], // 设置日期，结合 envTime 属性和 setBaseCenter 接口，可以显示正确的日照角度，暂时只支持流渲染
          fixedTime: true, // 时间是否固定，false：默认值，会从用户设置的时间，一秒一秒往后走，若走到晚上，则场景会变成黑夜效果，true：场景中的时间一直是用户设置的时间，暂时只支持流渲染
          alwaysForward: false, // 时间是否总是向前，false：如果新时间小于当前时间，时间会倒回去，true：如果新时间小于当前时间，会经历 23:59 分再到新时间
          duration: 1, // 切换时间，秒
        };

        appInstance.uniCall('setEnvTime', jsonData, (result) => {});
      },

      // 切换到大兴状态
      switchStateToDaXing() {
        appInstance.uniCall(
          'switchState',
          {
            name: '默认状态',
            sceneName: '北京大兴',
          },
          (result) => {
            this.initialization();
          }
        );
      },

      // 切换状态
      initialization() {
        if (this.pathData.length < 2) {
          return;
        }
        // 场景初始化
        //this.setBaseCenter();

        this.setEnvTime();
        this.freeCamera();
        this.addModel();
        this.addGISMap();
        this.addLandmarkLayer();
        // 注册跟随镜头改变事件
        window.appInstance.uniCall('addEventListener', {
          eventName: 'onFollowingCameraChanged',
          callback: (result) => {
            console.log('onFollowingCameraChanged', result);
            this.handleFollowingCameraChanged(result);
          },
        });
      },

      /**
       * 设置按钮状态，相机事件回调函数
       * @param {*} r 相机事件回调参数
       */
      handleFollowingCameraChanged(r) {
        // self
        this.legendList[0].isChecked = r.relative == 'self' ? true : false;
        // world
        this.legendList[1].isChecked = r.relative == 'world' ? true : false;
        // 环绕
        this.enableRotate = r.enableRotate ? true : false;
      },

      // 请求json数据（使用批量方式，便于其他页面复用或更新需求及数据）
      async getJsonData() {
        var p1 = new Promise((resolve, reject) => {
          axios
            .get('./json/JD5507.json')
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1]).then((res) => {
          this.pathData = res[0];
          // 计算1倍速时，飞机在两个拐点应该飞行的时间
          this.step = (this.allTime * 1000) / (this.pathData.length - 1);
          // 计算默认倍速下，飞机在两个拐点应该飞行的时间
          // this.duration = this.step / 2 / this.multiple;

          //[20240528固定飞行段落时间为2倍速时长，跨点飞行]
          this.duration = this.step / 2;
          this.stepCount = this.multiple / 2;
        });
      },

      // 格式化日期时间
      formatDate(date, format = 'YYYY/MM/DD HH:mm:ss') {
        date = new Date(date);
        const year = date.getFullYear();
        let hour = date.getHours();
        const isMS = year == 1970;
        if (isMS) {
          hour -= 8;
        }
        var o = {
          'M+': date.getMonth() + 1, //月份
          'D+': date.getDate(), //日
          'H+': hour, //小时
          'm+': date.getMinutes(), //分
          's+': date.getSeconds(), //秒
        };
        if (/(Y+)/.test(format)) format = format.replace(RegExp.$1, (year + '').substr(4 - RegExp.$1.length));
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
          }
        }

        return format;
      },

      // 计算两点间的偏航角
      calculateYaw(coord1, coord2) {
        const a = (coord1[1] * Math.PI) / 180;
        const b = (coord2[1] * Math.PI) / 180;
        const c = ((coord2[0] - coord1[0]) * Math.PI) / 180;

        const y = Math.sin(c) * Math.cos(b);
        const x = Math.cos(a) * Math.sin(b) - Math.sin(a) * Math.cos(b) * Math.cos(c);

        let yaw = Math.atan2(y, x);
        yaw = ((yaw * 180) / Math.PI + 360) % 360; // 将弧度转换为角度

        return yaw;
      },

      // 添加各倍速下间隔点（调试用）
      addLandmarkPoint() {
        let jsonData = {
          id: 'landmarkPoint',
          overlayType: 'landmarkLayer',
        };

        appInstance.uniCall('removeOverlay', jsonData, (result) => {
          let jsonData2 = {
            id: 'landmarkPoint', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            name: '地标图层倍速点', // 图层名称，支持为图层自定义名称
            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            autoScale: false, // 默认false，如果开启true后，图标会按照是摄像机远近自动缩放大小
            visible: true, // 添加当前图层时默认是显示还是隐藏
            legends: [
              // 定义图层包含图例，支持为不同图例定义各自样式
              {
                name: 'point', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
                color: '#ff0000', // 颜色（HEX 颜色值）
                iconName: 'netpoint', // 内置图标名称，见图观官网统一API开发手册
                iconScale: 0.2, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
                labelScale: 0.5, // 默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
              },
            ],
            data: [],
          };

          for (let i = this.stepCount; i < this.pathData.length; i += this.stepCount) {
            jsonData2.data.push({
              id: i.toString(), // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              type: 'point', // 地标点的图例类别名称
              label: i.toString(), // 图标标签文本
              coord: this.pathData[i].coord, // XY 轴坐标，X：经度；Y：纬度
              coordZ: this.pathData[i].coordZ + 40, // Z 轴高度（单位：米）
            });
          }

          appInstance.uniCall('addLandmarkLayer', jsonData2, (result) => {
            console.log(result);
          });
        });
      },
    },

    mounted() {
      while (!streaming2024Config) {
        console.log(streaming2024Config);
      }
      console.log(streaming2024Config);
      // 初始化飞行起始和终止时间
      this.currentTime = new Date(this.startTime);
      this.endTime = new Date(this.startTime.getTime() + this.allTime * 1000);
      // 获取数据并初始化场景服务
      this.getJsonData();
      this.init();
      // 临时挂载当前环境用于调试
      window._this = this;

      window.addPath = this.addPath;
      window.addLandmarkPoint = this.addLandmarkPoint;
    },
  });
};
