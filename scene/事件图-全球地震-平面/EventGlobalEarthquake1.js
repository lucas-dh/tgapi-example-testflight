window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 1675,
      legendList: [
        {
          id: 1,
          name: "2017年",
          layerId: "event0",
          isChecked: true,
          num: 372,
        },
        {
          id: 2,
          name: "2018年",
          layerId: "event1",
          isChecked: true,
          num: 300,
        },
        {
          id: 3,
          name: "2019年",
          layerId: "event2",
          isChecked: true,
          num: 424,
        },
        {
          id: 4,
          name: "2020年",
          layerId: "event3",
          isChecked: true,
          num: 319,
        },
        {
          id: 5,
          name: "2021年",
          layerId: "event4",
          isChecked: true,
          num: 260,
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: "post",
          url:
            "https://www.tuguan.net/api/user/v1/visitorScene/" +
            sceneConfig.worldUrl,
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
            url:
              "https://www.tuguan.net/publish/scene/api/" +
              sceneConfig.worldUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.getEarthData();
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
      // 请求五年地震数据
      getEarthData() {
        var p1 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2017")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2018")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p3 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2019")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p4 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2020")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p5 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/world2021")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2, p3, p4, p5]).then((res) => {
          let _this = this;

          //获取到五个年份的数据
          res.forEach((el, index) => {
            this.transData(el, index);
          });
        });
      },
      //处理数据并添加事件图
      transData(earthArr, index) {
        let _this = this;
        let transArr = [];
        earthArr.forEach((item) => {
          if (item.value) {
            //根据条件获取到对应年份的地震数据
            if (item.value > 5.5) {
              let obj = {
                id: item.id,
                value: item.value,
                coord: item.coord,
                coordZ: -400000,
                type: "地震",
                message: "",
              };
              transArr.push(obj);
            }
          }
        });
        _this.legendList[index].num = transArr.length;
        this.addEvent(transArr, index);
      },
      //添加事件图
      addEvent(data, index) {
        let jsonData = {
          id: "event" + index, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "事件图层", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          visible: true, // 添加当前图层时默认是显示还是隐藏
          legends: [
            // 定义图层包含图例，支持为不同图例定义各自样式
            {
              name: "地震", // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              icon: "event_01", // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              type: "wave", // 区域边界样式类别，详见下表：区域边界样式类别
              color: "#ff0000", // 颜色（HEX 颜色值）
              fillArea: "type01", // 区域填充样式类别，详见下表：区域填充样式类别
              speed: 500000, // 气泡扩散速度（单位：米/秒）
              radius: 500000, // 气泡最大半径（单位：米）
              iconScale: 0.3,
            },
          ],
          data: data,
        };
        appInstance.uniCall("addEventLayer", jsonData, (result) => {
          console.log(result);
          // 隐藏遮罩
          this.isZZ = false;
        });
      },
      //checkbox控制事件图显示与隐藏
      controlChecked(el, idx) {
        el.isChecked = !el.isChecked;
        if (el.isChecked) {
          this.number = this.number + el.num;
        } else {
          this.number = this.number - el.num;
        }

        let jsonData = {
          id: "event" + idx,
          overlayType: "eventLayer",
          visible: el.isChecked,
        };

        appInstance.uniCall("setOverlayVisibility", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
