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
          url:
            "https://www.tuguan.net/api/user/v1/visitorScene/" +
            sceneConfig.earthUrl,
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
              sceneConfig.earthUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.addTypeArea();
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
      addTypeArea() {
        let jsonData = {
          id: "typeArea",
          name: "类型区域图",
          coordType: 0,
          coordTypeZ: 0,
          coordZ: 0,
          alpha: 1,
          visible: true,
          lineDataId: "",
          areas: [
            {
              name: "Arrow01",
              points: [
                {
                  coord: [82, 46], //以深圳湾经纬度为例
                },
                {
                  coord: [88, 46],
                },
                {
                  coord: [88, 38],
                },
                {
                  coord: [82, 38],
                },
              ],
            },
            {
              name: "Gradient01",
              points: [
                {
                  coord: [90, 46],
                },
                {
                  coord: [96, 46],
                },
                {
                  coord: [96, 38],
                },
                {
                  coord: [90, 38],
                },
              ],
            },
            {
              name: "Gradient02",
              points: [
                {
                  coord: [98, 46],
                },
                {
                  coord: [104, 46],
                },
                {
                  coord: [104, 38],
                },
                {
                  coord: [98, 38],
                },
              ],
            },
            {
              name: "Gradient03",
              points: [
                {
                  coord: [106, 46],
                },
                {
                  coord: [112, 46],
                },
                {
                  coord: [112, 38],
                },
                {
                  coord: [106, 38],
                },
              ],
            },
            {
              name: "Grid01",
              points: [
                {
                  coord: [114, 46],
                },
                {
                  coord: [120, 46],
                },
                {
                  coord: [120, 38],
                },
                {
                  coord: [114, 38],
                },
              ],
            },
            {
              name: "Grid02",
              points: [
                {
                  coord: [122, 46],
                },
                {
                  coord: [128, 46],
                },
                {
                  coord: [128, 38],
                },
                {
                  coord: [122, 38],
                },
              ],
            },
            {
              name: "Grid03",
              points: [
                {
                  coord: [82, 34],
                },
                {
                  coord: [88, 34],
                },
                {
                  coord: [88, 26],
                },
                {
                  coord: [82, 26],
                },
              ],
            },
            {
              name: "Grid04",
              points: [
                {
                  coord: [90, 34],
                },
                {
                  coord: [96, 34],
                },
                {
                  coord: [96, 26],
                },
                {
                  coord: [90, 26],
                },
              ],
            },
            {
              name: "Grid05",
              points: [
                {
                  coord: [98, 34],
                },
                {
                  coord: [104, 34],
                },
                {
                  coord: [104, 26],
                },
                {
                  coord: [98, 26],
                },
              ],
            },
            {
              name: "Segment01",
              points: [
                {
                  coord: [106, 34],
                },
                {
                  coord: [112, 34],
                },
                {
                  coord: [112, 26],
                },
                {
                  coord: [106, 26],
                },
              ],
            },
            {
              name: "Segment02",
              points: [
                {
                  coord: [114, 34],
                },
                {
                  coord: [120, 34],
                },
                {
                  coord: [120, 26],
                },
                {
                  coord: [114, 26],
                },
              ],
            },
            {
              name: "Segment03",
              points: [
                {
                  coord: [122, 34],
                },
                {
                  coord: [128, 34],
                },
                {
                  coord: [128, 26],
                },
                {
                  coord: [122, 26],
                },
              ],
            },
          ],
          legends: [
            {
              name: "Arrow01",
              type: "Arrow01",
              color: "#000000",
              areaHeight: 300000,
              fillArea: "Gradient01",
              fillPosition: "top",
            },
            {
              name: "Gradient01",
              type: "Gradient01",
              color: "#FF0000",
              areaHeight: 300000,
              fillArea: "Gradient02",
              fillPosition: "top",
            },
            {
              name: "Gradient02",
              type: "Gradient02",
              color: "#FFC000",
              areaHeight: 300000,
              fillArea: "Grid01",
              fillPosition: "top",
            },
            {
              name: "Gradient03",
              type: "Gradient03",
              color: "#00B050",
              areaHeight: 300000,
              fillArea: "Grid02",
              fillPosition: "top",
            },
            {
              name: "Grid01",
              type: "Grid01",
              color: "#0070C0",
              areaHeight: 300000,
              fillArea: "Segment01",
              fillPosition: "top",
            },
            {
              name: "Grid02",
              type: "Grid02",
              color: "#7030A0",
              areaHeight: 300000,
              fillArea: "Segment02",
              fillPosition: "top",
            },
            {
              name: "Grid03",
              type: "Grid03",
              color: "#000000",
              areaHeight: 300000,
              fillArea: "Solid01",
              fillPosition: "top",
            },
            {
              name: "Grid04",
              type: "Grid04",
              color: "#FF0000",
              areaHeight: 300000,
              fillArea: "Solid02",
              fillPosition: "top",
            },
            {
              name: "Grid05",
              type: "Grid05",
              color: "#FFC000",
              areaHeight: 300000,
              fillArea: "Solid03",
              fillPosition: "top",
            },
            {
              name: "Segment01",
              type: "Segment01",
              color: "#00B050",
              areaHeight: 300000,
              fillArea: "Solid04",
              fillPosition: "top",
            },
            {
              name: "Segment02",
              type: "Segment02",
              color: "#0070C0",
              areaHeight: 300000,
              fillArea: "Solid05",
              fillPosition: "top",
            },
            {
              name: "Segment03",
              type: "Segment03",
              color: "#7030A0",
              areaHeight: 300000,
              fillArea: "Gradient01",
              fillPosition: "top",
            },
          ],
          data: [
            {
              areaName: "Arrow01",
              legendName: "Arrow01",
            },
            {
              areaName: "Gradient01",
              legendName: "Gradient01",
            },
            {
              areaName: "Gradient02",
              legendName: "Gradient02",
            },
            {
              areaName: "Gradient03",
              legendName: "Gradient03",
            },
            {
              areaName: "Grid01",
              legendName: "Grid01",
            },
            {
              areaName: "Grid02",
              legendName: "Grid02",
            },
            {
              areaName: "Grid03",
              legendName: "Grid03",
            },
            {
              areaName: "Grid04",
              legendName: "Grid04",
            },
            {
              areaName: "Grid05",
              legendName: "Grid05",
            },
            {
              areaName: "Segment01",
              legendName: "Segment01",
            },
            {
              areaName: "Segment02",
              legendName: "Segment02",
            },
            {
              areaName: "Segment03",
              legendName: "Segment03",
            },
          ],
        };

        appInstance.uniCall("addTypeAreaLayer", jsonData, (result) => {
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
