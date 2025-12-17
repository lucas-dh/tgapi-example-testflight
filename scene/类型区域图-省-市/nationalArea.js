window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      number: 0,
      //省数据的集合
      provinceArr: [],
      //市数据的集合
      cityAreas: [],
      legendList: [
        {
          id: 1,
          action: "省界",
          isChecked: false,
          Ids: "typeArea",
          num: 34,
        },
        {
          id: 2,
          action: "市界",
          isChecked: false,
          Ids: "typeArea1",
          num: 363,
        },
      ],
      areaType: [
        "Arrow01",
        "Gradient01",
        "Gradient02",
        "Gradient03",
        "Grid01",
        "Grid02",
        "Grid03",
        "Grid04",
        "Grid05",
        "Segment01",
        "Segment02",
        "Segment03",
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

              _this.getProData();
              _this.getCityData();
              _this.showSceneInfo();
            }
          }
        );
      },
      // 请求省边界数据
      getProData() {
        axios.get("https://sss141.tuguan.net:3000/areaPro").then((res) => {
          this.provinceArr = res.data;
          this.addProvince();
        });
      },
      getCityData() {
        axios.get("https://sss141.tuguan.net:3000/areaCity").then((res) => {
          // 隐藏遮罩
          this.isZZ = false;
          this.cityAreas = res.data;
          this.addCity();
        });
      },
      // 添加省类型区域图
      addProvince() {
        let Data = this.provinceArr.map((e, idx) => {
          return {
            areaName: e.name,
            legendName: "legendName" + idx,
          };
        });
        let legends = this.lengedsRandom(34);
        let jsonData = {
          id: "typeArea", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "类型区域图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // Z 轴高度（单位：米）
          alpha: 1, // 透明度
          visible: false, // 添加当前图层时默认是显示还是隐藏
          lineDataId: "", // 对应本服务器上线数据对象，如果找到 lineDataId，则下方的 areas 不起作用
          areas: this.provinceArr,
          legends: legends,
          data: Data,
        };
        console.log(jsonData);
        appInstance.uniCall("addTypeAreaLayer", jsonData, (result) => {
          console.log(result);
        });
      },
      //十六进制颜色随机
      color16() {
        return "#" + Math.random().toString(16).substr(2, 6);
      },
      //   随机返回数组中的一项
      randomArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      },
      //随机生成legends
      lengedsRandom(num) {
        let areaArr = [];
        for (var i = 0; i <= num; i++) {
          let obj = {
            name: "legendName" + i,
            type: this.randomArr(this.areaType),
            color: this.color16(),
            areaHeight: 100,
            fillArea: "Solid03",
            fillPosition: "top",
          };
          areaArr.push(obj);
        }
        return areaArr;
      },
      //添加市县界区域
      addCity() {
        let Data = this.cityAreas.map((e, idx) => {
          return {
            areaName: e.name,
            legendName: "legendName" + idx,
          };
        });
        let legends = this.lengedsRandom(this.cityAreas.length);
        let jsonData = {
          id: "typeArea1", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "类型区域图", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // Z 轴高度（单位：米）
          alpha: 1, // 透明度
          visible: false, // 添加当前图层时默认是显示还是隐藏
          lineDataId: "", // 对应本服务器上线数据对象，如果找到 lineDataId，则下方的 areas 不起作用
          areas: this.cityAreas,
          legends: legends,
          data: Data,
        };
        console.log(jsonData);
        appInstance.uniCall("addTypeAreaLayer", jsonData, (result) => {
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
          id: el.Ids,
          overlayType: "typeAreaLayer",
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
