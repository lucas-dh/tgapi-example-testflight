window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,// 是否显示遮罩
      legendList: [
        {
          id: 1,
          action: '默认颜色',
          value:'状态-默认颜色',
          active: true,
        },
        {
          id: 2,
          action: '蓝色',
          value:'状态-车身材质修改蓝',
          active: false,
        },
        {
          id: 4,
          action: '红色',
          value:'状态-车身材质修改红',
          active: false,
        },
        {
          id: 3,
          action: '棕色',
          value:'状态-车身材质修改棕',
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
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.articulationUrl5,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.articulationUrl5, //模型地址
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

      // 修改材质
      changeModelArticulation(el) {
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        appInstance.uniCall(
          'switchState',
          {
            name: el.value,
            sceneName: ""
          },
          (result) => {
            console.log(result);
          }
        );
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
