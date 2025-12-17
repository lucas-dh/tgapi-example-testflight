window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      list: [
        // 环绕数据
        { coord: [2.5248480375, -4.3756464717] },
        { coord: [2.5248480375, -7.413] },
        { coord: [6.222, -7.413] },
        { coord: [6.222, -4.3756464717] },
        { coord: [2.5248480375, -4.3756464717] },
      ],
      lineData: [
        {
          startIdObj: '01_01_A_起点',
          startOffset: [0, 0, 0.2],
          endIdObj: '01_01_A_终点',
          endOffset: [0, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.05,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '01_01_B_终点',
          startOffset: [0, 0, 0.2],
          endIdObj: '01_01_B_起点',
          endOffset: [0, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#009aff',
          width: 0.05,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '02_01_A_起点',
          startOffset: [0, 0, 0.2],
          endIdObj: '02_02_B_重点',
          endOffset: [0, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#009aff',
          width: 0.05,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '03_01_A_起点',
          startOffset: [0, 0, 0.2],
          endIdObj: '03_01_B_终点',
          endOffset: [0, 0.4, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW1.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.02,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '03_02_A_起点',
          startOffset: [0, 0, 0.2],
          endIdObj: '03_02_B_终点',
          endOffset: [-0.4, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.05,
          shapeType: 'angle90',
          curvature: 0.01,
          angleOrder: 'yzx',
        },
        {
          startIdObj: '03_03_A_起点',
          startOffset: [0, 0, 0.2],
          endIdObj: '03_03_B_终点',
          endOffset: [-0.4, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0.015,
          angleOrder: 'zyx',
        },
        {
          startIdObj: '04_01_A_开始_移动_水平',
          startOffset: [0, 0, 0.2],
          endIdObj: '04_01_B_终止_移动_水平',
          endOffset: [0, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '04_02_A_开始_移动_垂直',
          startOffset: [0, 0, 0],
          endIdObj: '04_02_A_终止_移动_垂直',
          endOffset: [0, 0, 0],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '04_03_A_开始_移动_环绕',
          startOffset: [0, 0, 0],
          endIdObj: '04_03_B_终止_移动_环绕',
          endOffset: [0, 0, 0],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '04_03_A_开始_移动_环绕',
          startOffset: [0.1, 0.1, 0.1],
          endIdObj: '04_03_B_终止_移动_环绕',
          endOffset: [0.1, 0.1, 0.1],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#009aff',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '04_04_A_开始_移动_通讯线',
          startOffset: [0, 0, 0.2],
          endIdObj: '04_04_B_终止_移动_通讯线01',
          endOffset: [0, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#ff0000',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '04_04_A_开始_移动_通讯线',
          startOffset: [0, 0, 0.1],
          endIdObj: '04_04_B_终止_移动_通讯线02',
          endOffset: [0, 0, 0.2],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#009aff',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '03_04_A_起点',
          startOffset: [0, 0, 0],
          endIdObj: '03_04_B_终点',
          endOffset: [0, 0, 0],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#009aff',
          width: 0.02,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '03_05_A_起点',
          startOffset: [0, 0, 0],
          endIdObj: '03_05_B_终点',
          endOffset: [0, 0, 0],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#009aff',
          width: 0.05,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
        {
          startIdObj: '03_06_A_起点',
          startOffset: [0, 0, 0],
          endIdObj: '03_06_B_终点',
          endOffset: [0, 0, 0],
          type: 'Segment03',
          texture: '../../image/line/BlackW.jpg',
          textureSpeed: 0.5,
          color: '#009aff',
          width: 0.1,
          shapeType: 'angle90',
          curvature: 0,
          angleOrder: 'xzy',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl14,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl14, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addLine();
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
        this.lineData.map((val, ind) => {
          let jsonData = {
            id: ind + 1,
            overlayType: 'model',
            idLayer: '',
            label: '',
            labelColor: '#ffffff',
            labelBackgroundColor: '#333333',
            labelFontSize: 20,
            autoScale: true,
            ...val,
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
            console.log(result);
            if (ind == this.lineData.length - 1) {
              // 水平移动
              this.updateTransform(true, 2, 'x', '04_01_A_开始_移动_水平', -5.5924707808770835, -7.950203667504241, 0);
              this.updateTransform(true, -2, 'x', '04_01_B_终止_移动_水平', -3.7370584243922615, -4.022021566599352, 0);
              // 垂直移动
              this.updateTransform(true, 1.5, 'z', '04_02_A_开始_移动_垂直', -1.7984423372973295, -7.967265265711157, 0.2);
              this.updateTransform(true, -1.5, 'z', '04_02_A_终止_移动_垂直', -1.7537989147952173, -3.9438005807891137, 1.5);
              // 水平垂直移动
              this.updateTransform(true, 2, 'x', '04_04_B_终止_移动_通讯线01', 0.0172245571933174, -7.64243720965484, 0);
              this.updateTransform(true, 2, 'x', '04_04_B_终止_移动_通讯线02', 0.27394933189020854, -4.014322908344621, 0);
              this.updateTransform(true, 1, 'z', '04_04_A_开始_移动_通讯线', 1.1275168372324387, -5.860122943137806, 1);
              // 环绕
              this.updateEncircle();
            }
          });
        });
      },
      // 是否往返值 移动后的数值 改变的坐标  移动的模型 经度 纬度 高度
      updateTransform(flag, num, isX, id, x, y, z) {
        let n = flag ? num : 0;
        let jsonData = {
          id: id, // 04_01_A_开始_移动_水平
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coord: [x + (isX == 'x' ? n : 0), y + (isX == 'y' ? n : 0)],
          coordZ: z + (isX == 'z' ? n : 0), // Z 轴高度（单位：米）
          rotation: [0, 0, 0], // XYZ 三轴旋转度数（单位：度）
          scale: [1, 1, 1],
        };
        appInstance.uniCall('setModelTransform', jsonData, (result) => {
          setTimeout(() => {
            flag = !flag;
            this.updateTransform(flag, num, isX, id, x, y, z);
          }, 2000);
        });
      },

      // 环绕模型
      updateEncircle() {
        let index = 0;
        let jsonData = {
          id: '04_03_B_终止_移动_环绕', // 04_01_A_开始_移动_水平
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coord: [this.list[index].coord[0], this.list[index].coord[1]],
          coordZ: 1, // Z 轴高度（单位：米）
          rotation: [0, 0, 0], // XYZ 三轴旋转度数（单位：度）
          scale: [1, 1, 1],
        };
        appInstance.uniCall('setModelTransform', jsonData, (result) => {
          index += 1;
        });
        let isAdd = true;
        setInterval(() => {
          let jsonData = {
            id: '04_03_B_终止_移动_环绕', // 04_01_A_开始_移动_水平
            coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            coord: [this.list[index].coord[0], this.list[index].coord[1]],
            coordZ: 1, // Z 轴高度（单位：米）
            rotation: [0, 0, 0], // XYZ 三轴旋转度数（单位：度）
            scale: [1, 1, 1],
          };
          appInstance.uniCall('setModelTransform', jsonData, (result) => {
            if (isAdd) {
              index += 1;
            } else {
              index -= 1;
            }
            if (index >= this.list.length - 1) {
              isAdd = false;
            } else if (index == 0) {
              isAdd = true;
            }
          });
        }, 2000);
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
