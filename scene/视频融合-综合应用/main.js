window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      BuildingList: [], //视频融合对象列表
      rowData: [
        {
          id: '广告牌视频', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: -0.98,
          heading: 0,
          distance: 370,
        },
        {
          id: '南路公交站视频1', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0.3,
          heading: 0,
          distance: 240,
        },
        {
          id: '南路公交站视频2', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0.2,
          heading: 0,
          distance: 243,
        },
        {
          id: '小广告牌平面视频1', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0,
          heading: 180,
          distance: 319.3,
        },
        {
          id: '小广告牌平面视频2', // 视频对象 id，唯一标识，用于各种操作的对象识别
          duration: 1, // 从上一位置移动到这个新位置花费的时间长度（单位，秒）
          pitch: 0,
          heading: 180,
          distance: 307.5,
        },
      ], //视频融合对象数据视角信息集合
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl18,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl18, //模型地址
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
        var _this = this;
        appInstance.uniCall(
          'showSceneInfo',
          {
            isOpen: true,
          },
          (result) => {
            console.log(result);
          }
        );

        //获取场景视频项
        window.appInstance.uniCall('getVideoFusionList', {}, (result) => {
          console.log(result);
          _this.BuildingList = result.data;
          _this.BuildingList.push({
            id: '恢复',
          });
        });
      },

      // 聚焦视频融合对象
      switchState(item, index) {
        this.BuildingList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
          if (n.id == item.id) {
            n.activePlay = true;
          } else {
            n.activePlay = false;
          }
          this.$forceUpdate();
        });
        if (index == 1 || index == 2) {
          this.BuildingList[1].activePlay = true;
          this.BuildingList[2].activePlay = true;
        } else if (index == 3 || index == 4) {
          this.BuildingList[3].activePlay = true;
          this.BuildingList[4].activePlay = true;
        }
        //控制视频流显隐
        this.videoConcealment();
        if (item.id === '恢复') {
          let jsonData = {
            name: '默认状态', // 状态名称需要先使用 获取状态信息 接口,获取到状态名称填入此处
            sceneName: 'scene1', // 状态所属的场景，如果状态是当前场景的，可以不写
          };

          appInstance.uniCall('switchState', jsonData, (result) => {
            console.log(result);
          });
          return;
        }
        var rowData = this.rowData.find((r) => r.id === item.id);
        window.appInstance.uniCall('focusVideoFusionObject', rowData, function (result) {
          console.log(result);
        });
      },

      //控制视频流显隐
      videoConcealment() {
        this.BuildingList.forEach((n) => {
          window.appInstance.uniCall(
            'setModelVisibility',
            {
              ids: [n.id],
              visible: n.activePlay,
            },
            (result) => {
              console.log(result);
            }
          );
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
