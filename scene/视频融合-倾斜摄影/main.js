window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      BuildingList: [], //视频融合对象列表
      rowData:[
        {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          centerCoord: [113.1076985, 28.2058031], // 中心点的坐标 lng,lat
          coordZ:18.35, // Z 轴高度（单位：米）
          distance: 82.5,
          pitch: 65.5,
          heading: 281.65,// 镜头偏航角(0正北, 0~359)
          fly: true, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
          // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
          duration: 1, // 飞行时间，秒
          name:'视频融合对象2'
        },
        {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          centerCoord: [113.1067245,28.2045794], // 中心点的坐标 lng,lat
          coordZ: -214.12, // Z 轴高度（单位：米）
          distance: 320,
          pitch: 84.34,
          heading: 104.81, // 镜头偏航角(0正北, 0~359)
          fly: true, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
          // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
          duration: 1, // 飞行时间，秒
          name:'视频融合对象1'
        },
        {
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          centerCoord: [113.1082237, 28.20556], // 中心点的坐标 lng,lat
          coordZ: 49.95, // Z 轴高度（单位：米）
          distance: 190.38,
          pitch: 30,
          heading: 159.47, // 镜头偏航角(0正北, 0~359)
          fly: true, // true: 飞行动画(飞行时间根据当前点与目标点计算,则pitch及heading不生效, 会自行计算);
          // false: 立刻跳转过去(有一个短暂飞行动画,并按照distance, pitch, heading设置镜头)
          duration: 1, // 飞行时间，秒
          name:'恢复'
        }
      ] //视频融合对象数据视角信息集合
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl19,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl19, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
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
        appInstance.uniCall('getVideoFusionList', {}, (result) => {
          console.log(result);
          _this.BuildingList = result.data;
          _this.BuildingList.push({
            id:"恢复"
          })
        });
      },

      // 聚焦视频融合对象
      switchState(item) {
        this.BuildingList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
          this.$forceUpdate();
        });
        var _this = this;
        var rowData = _this.rowData.find(r => r.name === item.id);
        appInstance.uniCall('setCamera', rowData, function (result) {
          console.log(result);
        });
      }
    },

    mounted() {
      this.getToken();
    },
  });
};
