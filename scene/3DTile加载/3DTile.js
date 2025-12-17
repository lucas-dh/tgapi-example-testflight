window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: "post",
          url: "https://www.tuguan.net/api/user/v1/visitorScene/pfj4qmyv",
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
            container: document.getElementById("container"),
            mode: "scene",
            token: token,
            url: "https://www.tuguan.net/publish/scene/api/pfj4qmyv", //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.add3DTitle();
            }
          }
        );
      },
      // 显示场景信息
      showSceneInfo() {
        appInstance.uniCall(
          "showSceneInfo",
          {
            isOpen: true,
          },
          (result) => {
            console.log(result);
          }
        );
      },
      add3DTitle() {
        let jsonData = {
          id: "3DTileLayer", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "3D标题", // 图层名称，支持为图层自定义名称
          url: "https://mapserver.obs-website.cn-north-4.myhuaweicloud.com/huaian/3dtile/tileset.json", // 3dTile入口描述文件地址
          type: "b3dm", // 3dTile类别，b3dm； i3dm；s3dm，目前仅支持 b3dm
          // token: 'ABCDEFG', // 预留字段
          LOD: 6, // 倾斜摄影数据的细节加载系数。表示在当前视野距离下，加载倾斜摄影数据的级别系数。流渲染默认值是 16，如果想更加清晰，可以设置 8 或者 4，一定是 2 的倍数。端渲染默认是 6，如果想更加清晰，可以设置 7 或者 8。加载越清晰的数据会越耗费渲染侧的性能。
          centerTranslate: [-2000, -4000, 0], // 倾斜摄影数据中心点在x, y, z方向上的二次位移。数据默认值加偏移量是新位置，支持负数。（单位：米）
          centerRotation: [0, 0, 0], // 倾斜摄影数据中心点在x, y, z方向上的二次旋转。（单位：度）值域 -360~360
          visible: true, // 显隐控制，true：显示；false：隐藏
          alpha: 0.5, // 透明度，0：完全透明；1：完全不透明
        }; // 中心基准点调用 setBaseCenter 方法，默认都是东8时区

        appInstance.uniCall("add3DTile", jsonData, (result) => {
          console.log(result);
          // 隐藏遮罩
          this.isZZ = false;
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
