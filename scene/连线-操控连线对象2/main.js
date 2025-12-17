window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true,// 是否显示遮罩
      legendList: [
        {
          id: 'id01',
          action: "电缆位置1",
          isChecked: false,
          active: false,
        },
        {
          id: "id02",
          action: "电缆位置2",
          isChecked: false,
          active: false,
        },{
          id:"id03",
          action: "恢复",
          isChecked: false,
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
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl17,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl17, //模型地址
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

      //电缆位置1
      cablePositionOne(){
        let jsonData = {
          id: '高压电塔A', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coord: [0.00019086052021569062,-0.00002542929288748662], // XY 轴坐标，X：经度；Y：纬度
          coordZ: 2, // Z 轴高度（单位：米）
        };
        appInstance.uniCall('setModelCoord', jsonData, result => {
            console.log(result);
        });
      },

      //电缆位置2
      cablePositionTwo(){
        let jsonData = {
          id: '高压电塔A', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coord: [-0.0001652723624073193,0.00017710225112684222], // XY 轴坐标，X：经度；Y：纬度
          coordZ: 10, // Z 轴高度（单位：米）
        };
        appInstance.uniCall('setModelCoord', jsonData, result => {
            console.log(result);
        });
      },

      // 点击事件
      controlChecked(item){
        this.legendList.forEach((n) => {
          if (n.id == item.id) {
            n.active = true;
          } else {
            n.active = false;
          }
        });
        var _this = this;
        switch (item.id){
          case 'id01' :
            _this.cablePositionOne()
          break;
          case 'id02' :
            _this.cablePositionTwo()
          break;
          case 'id03' :
            let jsonData = {
              name: '默认状态', // 状态名称需要先使用 获取状态信息 接口,获取到状态名称填入此处
              sceneName: '', // 状态所属的场景，如果状态是当前场景的，可以不写
            };
            
            appInstance.uniCall('switchState', jsonData, (result) => {
              
            });
            let jsonDatas = {
              id: '高压电塔A', // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
              coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
              coord: [ -6.88,-12.33], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 4.28, // Z 轴高度（单位：米）
            };
            appInstance.uniCall('setModelCoord', jsonDatas, result => {
                console.log(result);
            });
          break;
          
        }
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
