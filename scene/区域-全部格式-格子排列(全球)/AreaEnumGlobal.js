window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      colorList: [
        "#FFC0CB",
        "#DC143C",
        "#FF00FF",
        "#0000FF",
        "#87CEEB",
        "#40E0D0",
        "#3CB371",
        "#7CFC00",
        "#FFFF00",
        "#FFA500",
        "#8B4513",
        "#FF0000",
      ],
      legendList: [
        {
          id: 1,
          action: "Arrow01",
          isChecked: true,
          Ids: "Arrow01",
        },
        {
          id: 2,
          action: "Gradient01",
          isChecked: true,
          Ids: "Gradient01",
        },
        {
          id: 3,
          action: "Gradient02",
          isChecked: true,
          Ids: "Gradient02",
        },
        {
          id: 4,
          action: "Gradient03",
          isChecked: true,
          Ids: "Gradient03",
        },
        {
          id: 5,
          action: "Grid01",
          isChecked: true,
          Ids: "Grid01",
        },
        {
          id: 6,
          action: "Grid02",
          isChecked: true,
          Ids: "Grid02",
        },
        {
          id: 7,
          action: "Grid03",
          isChecked: true,
          Ids: "Grid03",
        },
        {
          id: 8,
          action: "Grid04",
          isChecked: true,
          Ids: "Grid04",
        },
        {
          id: 9,
          action: "Grid05",
          isChecked: true,
          Ids: "Grid05",
        },
        {
          id: 10,
          action: "Segment01",
          isChecked: true,
          Ids: "Segment01",
        },
        {
          id: 11,
          action: "Segment02",
          isChecked: true,
          Ids: "Segment02",
        },
        {
          id: 12,
          action: "Segment03",
          isChecked: true,
          Ids: "Segment03",
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
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addArrow01();
              _this.addGradient01();
              _this.addGradient02();
              _this.addGradient03();
              _this.addGrid01();
              _this.addGrid02();
              _this.addGrid03();
              _this.addGrid04();
              _this.addGrid05();
              _this.addSegment01();
              _this.addSegment02();
              _this.addSegment03();
              //
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
      addArrow01() {
        let _this = this;

        let jsonData = {
          id: "Arrow01", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Arrow01", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03 Segment03
          color: _this.colorList[0], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Gradient01", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [82, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [88, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [88, 38], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [82, 38], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGradient01() {
        let _this = this;

        let jsonData = {
          id: "Gradient01", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Gradient01", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[1], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Gradient02", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [90, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [96, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [96, 38], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [90, 38], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGradient02() {
        let _this = this;

        let jsonData = {
          id: "Gradient02", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Gradient02", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[2], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Grid01", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [98, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [104, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [104, 38], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [98, 38], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGradient03() {
        let _this = this;

        let jsonData = {
          id: "Gradient03", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Gradient03", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[3], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Grid02", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [106, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [112, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [112, 38], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [106, 38], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGrid01() {
        let _this = this;

        let jsonData = {
          id: "Grid01", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Grid01", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[4], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Segment01", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [114, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [120, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [120, 38], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [114, 38], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGrid02() {
        let _this = this;

        let jsonData = {
          id: "Grid02", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Grid02", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[5], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Segment02", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [122, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [128, 46], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [128, 38], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [122, 38], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGrid03() {
        let _this = this;

        let jsonData = {
          id: "Grid03", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Grid03", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[6], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Solid01", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [82, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [88, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [88, 26], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [82, 26], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGrid04() {
        let _this = this;

        let jsonData = {
          id: "Grid04", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Grid04", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[7], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Solid02", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [90, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [96, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [96, 26], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [90, 26], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addGrid05() {
        let _this = this;

        let jsonData = {
          id: "Grid05", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Grid05", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[8], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Solid03", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [98, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [104, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [104, 26], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [98, 26], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addSegment01() {
        let _this = this;

        let jsonData = {
          id: "Segment01", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Segment01", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[9], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Solid04", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [106, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [112, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [112, 26], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [106, 26], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addSegment02() {
        let _this = this;

        let jsonData = {
          id: "Segment02", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Segment02", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[10], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Solid05", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [114, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [120, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [120, 26], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [114, 26], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      addSegment03() {
        let _this = this;

        let jsonData = {
          id: "Segment03", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: "区域轮廓", // 图层名称，支持为图层自定义名称
          coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          coordZ: 0, // 高度（单位：米）
          type: "Segment03", // 区域边界样式类别 Arrow01 Gradient01 Gradient02 Gradient03 Grid01 Grid02 Grid03 Grid04 Grid05 Segment01 Segment02 Segment03
          color: _this.colorList[11], // 颜色（HEX 颜色值）
          areaHeight: 300000, // 围栏高度（单位：米）
          fillArea: "Gradient01", // 区域填充样式类别 Gradient01 Gradient02 Grid01 Grid02 Segment01 Segment02 Solid01 Solid02 Solid03 Solid04 Solid05
          fillPosition: "top", // 区域填充的位置，top/bottom，默认top
          tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
          visible: true, // 添加当前图层时默认是显示还是隐藏
          points: [
            // 定义区域边界
            {
              coord: [122, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [128, 34], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [128, 26], // XY 轴坐标，X：经度；Y：纬度
            },
            {
              coord: [122, 26], // XY 轴坐标，X：经度；Y：纬度
            },
          ],
        };
        appInstance.uniCall("addArea", jsonData, (result) => {
          console.log(result);
        });
      },
      controlChecked(el) {
        el.isChecked = !el.isChecked;
        let jsonData = {
          id: el.Ids,
          overlayType: "area",
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
