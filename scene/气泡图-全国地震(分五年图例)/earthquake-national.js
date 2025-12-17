window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 0,
      legendList: [
        {
          id: 1,
          name: "2017年",
          layerId: "bubble0",
          isChecked: false,
          num: 179,
        },
        {
          id: 2,
          name: "2018年",
          layerId: "bubble1",
          isChecked: false,
          num: 199,
        },
        {
          id: 3,
          name: "2019年",
          layerId: "bubble2",
          isChecked: false,
          num: 255,
        },
        {
          id: 4,
          name: "2020年",
          layerId: "bubble3",
          isChecked: false,
          num: 140,
        },
        {
          id: 5,
          name: "2021年",
          layerId: "bubble4",
          isChecked: false,
          num: 140,
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
            sceneConfig.chinaUrl,
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
              sceneConfig.chinaUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后

              _this.getEarthData();
              _this.showSceneInfo();
            }
          }
        );
      },
      // 请求五年地震数据
      getEarthData() {
        var p1 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/pro2017")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p2 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/pro2018")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p3 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/pro2019")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p4 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/pro2020")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        var p5 = new Promise((resolve, reject) => {
          axios
            .get("https://sss141.tuguan.net:3000/pro2021")
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
        });
        Promise.all([p1, p2, p3, p4, p5]).then((res) => {
          //获取到五个年份的数据
          // 隐藏遮罩
          this.isZZ = false;
          res.forEach((el, index) => {
            this.legendList[index].num = res[index].length;
            this.addBubble(el, index);
          });
        });
      },
      //添加气泡图
      addBubble(data, index) {
        let jsonData = {
          id: "bubble" + index,
          name: "气泡图层",
          coordType: 0,
          coordTypeZ: 0,
          fillArea: "none",
          speed: 100000,
          radiusMax: 400000,
          radiusMin: 15000,
          valueMax: 10,
          valueMin: 1,
          visible: false,
          legends: [
            {
              name: "legend0",
              color: "#ff0000",
            },
            {
              name: "legend1",
              color: "#00ff00",
            },
            {
              name: "legend2",
              color: "#0000ff",
            },
            {
              name: "legend3",
              color: "#ff3300",
            },
            {
              name: "legend4",
              color: "#cc86ff",
            },
          ],
          data: data,
        };
        appInstance.uniCall("addBubbleLayer", jsonData, (result) => {
          console.log(result);
        });
      },
      //checkbox控制气泡图显示与隐藏
      controlChecked(el, idx) {
        el.isChecked = !el.isChecked;
        if (el.isChecked) {
          this.number = this.number + el.num;
        } else {
          this.number = this.number - el.num;
        }

        let jsonData = {
          id: "bubble" + idx,
          overlayType: "bubbleLayer",
          visible: el.isChecked,
        };

        appInstance.uniCall("setOverlayVisibility", jsonData, (result) => {
          console.log(result);
        });
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
    },

    mounted() {
      this.getToken();
    },
  });
};
