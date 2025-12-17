window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      legendList:[ // 按钮数据
        {
          id: 1,
          action: '获取内部建筑列表Building01',
          value:'Building01',
          active: false,
        },
      ],
      BuildingList:[], // 建筑内部对象列表
      arr:[]// 添加的图层数据
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.zhsqUrl,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.zhsqUrl, //模型地址
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
      // 获取建筑内部对象列表
      changeModelArticulation(el) {
        this.legendList.forEach((item) => {
          if (item.id == el.id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
        appInstance.uniCall('getModelsByBuilding', {id: el.value}, (result) => {
          console.log(result);
          this.BuildingList=result.buildings
        });
      },
      // 聚焦高亮建筑
      addModel(event,item,item2,item3){
        this.arr.forEach(item=>{
          let jsonData = {
            id: item, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            overlayType: 'landmark', // 图层对象类别
          };
          appInstance.uniCall('removeOverlay', jsonData);
        })
        this.arr = []
        if(item&&item2&&item3){
          let jsonData = {
            buildingId: item.id,
            pitch: 30,
            heading: 0,
            distance: 100,
            floor: item2.num,
            room: item3.name,
          };
            appInstance.uniCall(
              'showBuildingFloor',
              {
                id: item.id,
                floor: item2.num,
                animation: 1,
              },
              (result) => {
                appInstance.uniCall('focusRoom', jsonData, (result) => {
                  appInstance.uniCall(
                    'highlightRoom',
                    {
                      id: item.id,
                      floor: item2.num,
                      room: item3.name,
                      type: 'style1',
                    },
                    (result) => {
                      this.addLanmark(item3);
                    }
                  );
                });
              }
            );
        }else if(item&&item2){
          let jsonData = {
            buildingId: item.id,
            pitch: 30,
            heading: 20,
            distance: 300,
          };
          appInstance.uniCall('focusBuilding', jsonData, (result) => {
            appInstance.uniCall(
              'showBuildingFloor',
              {
                id: item.id,
                floor: item2.num,
                animation: 1,
              },
              () => {
                appInstance.uniCall(
                  'highlightFloor',
                  {
                    id: item.id,
                    floor: item2.num,
                    type: 'style1',
                  },
                  () => {
                    this.addLanmark(item2);
                  }
                );
              }
            );
          });
        }else{
          appInstance.uniCall("resetBuildingFloor", {id: "Building01",animation: 1}, (result) => {
            console.log(result);
            let jsonData = {
              buildingId: item.id,
              pitch: 30,
              heading: 20,
              distance: 300,
            };
            appInstance.uniCall('focusBuilding', jsonData, () => {
              appInstance.uniCall(
                'highlightBuilding',
                {
                  id: item.id,
                  type: 'style1',
                },
                () => {this.addLanmark(item);}
              );
            });
          });
        }
        var buildings = document.querySelectorAll('.building')
        buildings.forEach(it=>{
          it.style.backgroundColor = 'transparent'
        })
        event.target.style.backgroundColor = '#007d9d'
      },

      // 添加地标点
      addLanmark(item){
        let jsonData = {
          id: item.models[0],
          coordType: 0,
          coordTypeZ: 0,
          iconName:'site_02',
          autoScale: false,
          visible: true,
          label: item.models[0],
          iconScale: 1,
          labelScale: 1,
          tag: item.models[0], // 用户自定标签，用户保存用户的扩展数据
          coord: item.coord, //以深圳湾经纬度为例
          coordZ: item.coordZ + item.size[2],
        };
        this.arr.push(item.models[0])
        appInstance.uniCall('addLandmark', jsonData);
      }
    },

    mounted() {
      this.getToken();
    },
  });
};
