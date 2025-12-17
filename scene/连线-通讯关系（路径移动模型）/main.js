window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      pathData: [
        { coord: [237.0172621591, 215.0497969897], coordZ: 100, speed: 120 },
        { coord: [235.847, -197.0822553469], coordZ: 100, speed: 120 },
        { coord: [-242.551, -200.5019470933], coordZ: 100, speed: 120 },
        { coord: [-240.172, 211.018], coordZ: 100, speed: 120 },
        { coord: [237.0172621591, 215.0497969897], coordZ: 100, speed: 120 },
      ],
      pathData1: [
        { coord: [236.593786058, -45.2658123235], coordZ: 0, speed: 120 },
        { coord: [-236.1420958158, -46.9590634313], coordZ: 0, speed: 120 },
      ],
      lineData: [
        {
          overlayType: 'model',
          idLayer: '',
          startIdObj: '指挥车',
          startOffset: [0, 0, 0],
          endIdObj: '救护车运输',
          endOffset: [0, 0, 0],
          type: 'Segment07',
          texture: '',
          textureSpeed: 0,
          color: '#FF7C00',
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
        },
        {
          overlayType: 'model',
          idLayer: '',
          startIdObj: '指挥车',
          startOffset: [0, 0, 0],
          endIdObj: '无人机巡航',
          endOffset: [0, 0, 0],
          type: 'Segment07',
          texture: '',
          textureSpeed: 0,
          color: '#12F37C',
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl8,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl8, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.setSceneEffect();
              // 显示使用的模型
              appInstance.uniCall(
                'setModelVisibility',
                {
                  ids: ['指挥车', '救护车运输', '无人机巡航'],
                  visible: true,
                },
                (result) => {
                  _this.addLine();
                }
              );
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
      // 设置图层在所有模型前
      setSceneEffect() {
        let jsonData = {
          lightPower: 1.0, // 图层对象中如果带有发光特性的光的亮度，值域范围0.0 - 10.0，默认1.0
          lightPowerTip: 1.0, // 作用于addModelTip指令，当is3D等于true的时候，立体标牌的光照亮度。默认值：1.0，最大值：6.0，最小值：0，值越大 明度越低  透明度越高；值越小 明度越高 透明度越低（只支持流渲染）
          isLayerTopMost: false, // 图层是否盖在所有模型的最前面，此选项作用于全部图层
          divTipMovingDelay: 200, // 使用HTML Div方法添加的Tip标牌和流画面同步延迟，默认200（单位毫秒）
          focusDuration: 6, // 所有聚焦接口的聚焦动画的镜头移动时长，值域范围0-30，单位：秒，默认值：1，如果是0，则代表瞬间聚焦，没有过渡动画
          gis3dtileShadow: true, // 3dtile倾斜摄影是否根据光照生成阴影，true：生成阴影，false：无阴影。默认值true。
          clickColor: '#ff0000', // 点击或者悬浮包围框的高亮颜色（HEX 颜色值），会有影响的方法：selectModel、pickModel、clickModelType、highlightBuilding、highlightFloor、highlightRoom事件：onModelClick、onRectModelSelectionResult、onClickModelResult、onClickModelTypeResult、onBuildingClick、onFloorClick、onRoomClick覆盖物：模型地标图、模型轨迹图、气泡、柱图、栅格图、关系线 的点击事件
          labelColorStyle: 'default', // 地标点文字标牌背景颜色转换算法，"default": 默认样式，受环境光影响，偏亮；"nonlinear"，非线性转换比较接近二维取色版原始颜色
          clickEdgeWidth: 1, // 选中边线宽度属性，允许值是1、2、3、4、5
          tipMoveOnEdge: true, // overlayTip和modelTip，在弹出时碰上屏幕边缘，是否自动移动直到关联对象从屏幕中消失才隐藏，默认是true，
        };

        appInstance.uniCall('setSceneEffect', jsonData, (result) => {
          console.log(result);
        });
      },
      // 添加关系线
      addLine() {
        this.lineData.map((val, ind) => {
          let jsonData = {
            id: ind + 1,
            label: '',
            labelColor: '#ffffff',
            labelBackgroundColor: '#333333',
            labelFontSize: 20,
            autoScale: false,
            ...val,
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
            console.log(result);
            if (this.lineData.length - 1 == ind) {
              this.addPath('无人机巡航', 'Arrow01', this.pathData, [0, 0, 0], 'repeat', '#0000FF', 10, '#ff0000', 60);
              this.addPath('救护车运输', 'Segment07', this.pathData1, [0, 0, 0], 'round', '#30bfbf', 10, '#30bfbf', 40);
            }
          });
        });
      },

      // 添加路径
      // 模型名称  路线样式类别  数据  偏移量  循环模式   移动经过后的路径颜色   路径宽度   路线颜色   模型移动速度
      addPath(id, type, points, offset, loopMode, colorPass, width, color, speed) {
        let jsonData = {
          id: id, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: '路径', // 图层名称，支持为图层自定义名称
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          type: type, // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Arrow07 Segment01 Segment02 Segment03 Segment04 Segment05 Segment06 Segment07 Segment08 ModelCube ModelCylinder
          texture: '', // 材质贴图名称，只有当 type 为 Model 开始的类型，才有用。端渲染：在场景中预置好的图片名称或外部图片 url，流渲染：服务器应用目录里的资源图片
          textureSpeed: 3, // 材质贴图的 UV 动画速度，默认：0，0为不运动，其他数值沿着路径模型方向前进，负数为反向
          color: color, // 路线颜色，颜色透明（HEX 颜色值）
          colorPass: colorPass, // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
          width: width, // 路径宽度（单位：米）
          tag: 'custominfo', // 用户自定标签，用户保存用户的扩展数据
          autoScale: true, // 线是否近大远小，false，镜头无论远近，看起来线一样大，true，镜头近线粗，镜头远线细
          visible: true, // 添加当前图层时默认是显示还是隐藏
          lineDataId: '', // 对应本服务器上线数据对象，如果找到 lineDataId，则下方的 points 不起作用
          points: points,
        };

        appInstance.uniCall('addPath', jsonData, (result) => {
          let jsonData = {
            id: id, // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            pathId: id, // 路径图层对象 id
            loopMode: loopMode, // 循环模式，none：不循环；round：往返循环；repeat：从头循环
            reverse: false, // 是否沿路径反向移动，true：反向运动；false：正向运动
            direction: 'path', // 沿路径调整方向，path：沿路径调整模型方向；self：模型自己原本方向不变
            offset: offset, // 沿 XYZ 三轴向的偏移量（单位：米）
            speed: speed, // 模型移动速度（单位：米/秒）
          };
          appInstance.uniCall('pathingModel', jsonData, (result) => {
            console.log(result);
          });
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
