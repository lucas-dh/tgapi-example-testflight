window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      lineData: [
        {
          startIdObj: '大脑',
          startOffset: [0, 0, 50],
          endIdObj: '云服务01',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#1FC6ED',
          textureSpeed: 0,
          width: 1,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'zxy',
        },
        {
          startIdObj: '大脑',
          startOffset: [0, 0, 50],
          endIdObj: '云服务02',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#1FC6ED',
          textureSpeed: 0,
          width: 1,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'zyx',
        },
        {
          startIdObj: '大脑',
          startOffset: [0, 0, 50],
          endIdObj: '云服务03',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#1FC6ED',
          textureSpeed: 0,
          width: 1,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'zxy',
        },
        {
          startIdObj: '大脑',
          startOffset: [0, 0, 50],
          endIdObj: '云服务04',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#1FC6ED',
          textureSpeed: 0,
          width: 1,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'zxy',
        },
        {
          startIdObj: '云服务01',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房2',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#84EA0A',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '云服务02',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房10',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#84EA0A',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'xyz',
        },

        {
          startIdObj: '云服务04',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房9',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#84EA0A',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '云服务03',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房4',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#84EA0A',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '主_机房2',
          startOffset: [0, 0, 0],
          endIdObj: '机房3',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '机房3',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房4',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'yxz',
        },
        {
          startIdObj: '主_机房4',
          startOffset: [0, 0, 0],
          endIdObj: '机房5',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'yxz',
        },
        {
          startIdObj: '机房5',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房9',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '主_机房9',
          startOffset: [0, 0, 0],
          endIdObj: '机房06',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'xyz',
        },
        {
          startIdObj: '机房06',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房10',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'yxz',
        },
        {
          startIdObj: '主_机房10',
          startOffset: [0, 0, 0],
          endIdObj: '机房01',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'yxz',
        },
        {
          startIdObj: '机房01',
          startOffset: [0, 0, 0],
          endIdObj: '主_机房2',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'yxz',
        },
        {
          startIdObj: '机房01',
          startOffset: [0, 0, 0],
          endIdObj: '机房5',
          endOffset: [0, 0, 0],
          type: 'Arrow01',
          texture: '../../image/line/black.png',
          color: '#008000',
          textureSpeed: 0,
          width: 0.5,
          shapeType: 'angle90',
          curvature: -0.1,
          angleOrder: 'yxz',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl5,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl5, //模型地址
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
            autoScale: false,
            ...val,
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
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
