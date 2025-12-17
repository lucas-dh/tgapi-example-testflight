window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true, // 是否显示遮罩
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: "post",
          url:
            "https://www.tuguan.net/api/user/v1/visitorScene/" +
            sceneConfig.lineUrl21,
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
              sceneConfig.lineUrl21, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            console.log(result);
            if (result.result == 1) {
              _this.isZZ = false;
              _this.showSceneInfo();
              //开启模型点击
              _this.modelClick();
              //开启模型鼠标移入移出
              _this.mouseEvent();
              //挂载模型各种事件集合
              _this.onModelEvent();
            }
          }
        );
      },

      // 开启鼠标事件
      mouseEvent() {
        var paramsObj = {
          modelType: "model",
          type: "hover",
          allowMultiple: false, // 是否支持多选，false：单选，true：多选
          isShowDecorator: false, // 表示是否显示选中的高亮装饰符，true：显示，false：不显示，默认：true
        };
        window.appInstance.uniCall("pickModel", paramsObj, (result) => {
          console.log(result);
        });
      },

      // 开启模型点击
      modelClick() {
        var paramsObj = {
          modelType: "model",
          type: "click",
          allowMultiple: false, // 是否支持多选，false：单选，true：多选
          isShowDecorator: false, // 表示是否显示选中的高亮装饰符，true：显示，false：不显示，默认：true
        };

        window.appInstance.uniCall("pickModel", paramsObj, (result) => {
          console.log(result);
        });
      },

      // 挂载模型事件回调
      onModelEvent() {
        var _this = this;
        //模型点击回调
        window.appInstance.uniCall("addEventListener", {
          eventName: "onModelClick", // 事件名称 见图观官网统一API开发手册
          callback: (result) => {
            // console.log(222,result)
            if (result.id != "机械臂_动画") return;
            if (result.selected) {
              //js生成div弹框
              var div = document.createElement("div");
              div.innerHTML = `<div id="modelTip" class="placard">
                <p class="scutcheon-header">
                  <span>对象信息</span>
                  <span onClick="removeTip()" style="margin-right: -15px;font-size: 25px;text-align: center;cursor: pointer;pointer-events: all;">×</span>
                </p>
                <div class="scutcheon">
                  <span>编号：</span>
                  <span>JXB-001</span>
                </div>
                <div class="scutcheon">
                  <span>型号：</span>
                  <span>VS65EGM</span>
                </div>
                <div class="scutcheon" style="margin-top: 3px;">
                  <span>最大工作范围：</span>
                  <span>R=733mm</span>
                </div>
                <div class="scutcheon" style="margin-top: 3px;">
                  <span>最大搬运量：</span>
                  <span>8kg</span>
                </div>
                <div class="scutcheon" style="margin-top: 3px;">
                  <span>工作时长</span>
                  <span>6.8h</span>
                </div>
              </div>`;
              document.body.insertBefore(div, document.body.lastChild);
              //添加html标牌
              var obj = {
                id: result.id, //模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                nodeId: "", // 节点对象Id，该属性不为空时，表示在模型的这个节点上添加弹框，无该属性或者该属性值为空时，表示在模型上添加弹框
                url: "", //Tip 窗口页面地址
                divId: "modelTip", //HTML 侧弹出标牌的 dom div id，如果这个不为""，url 属性不起作用
                isShowClose: false, //是否显示右上角关闭按钮，默认显示关闭按钮
                is3D: false, //是否是立体标牌，false：不是3D立体标牌，true：是。默认值false。
                size: [264, 220], //Tip 窗口宽高 xy，x：窗口宽；y：窗口高（单位：像素）
                offset: [100, -50], //Tip 左上角相对 对象中心点 偏移量 xy，x：为正，向右偏移；y：为正，向上偏移（单位：像素）
                rotation: [0, 0, 0], //Tip 中心点相对 对象中心点 旋转量 xyz，x：以x轴旋状，y：以x轴旋状，z：以z轴旋状（只有当立体标牌的时候有效）（单位：角度，0到360度）
              };
              window.appInstance.uniCall("addModelTip", obj, (result) => {
                console.log(result)
              });
            } else {
              //移除弹出框
              let jsonData = {
                id: "机械臂_动画",
                nodeId: "",
              };
              appInstance.uniCall("removeModelTip", jsonData, (result) => {
                console.log(result);
              });
            }
          },
        });

        //模型鼠标移入回调
        window.appInstance.uniCall(
          "addEventListener",
          {
            eventName: "onModelHover",
            callback: function (event) {
              if (event.id === "机械臂_动画") {
                document.querySelector("body").style.cursor = "pointer";
              }
            },
          },
          (result) => {
            console.log(result);
          }
        );

        //模型鼠标移除回调
        window.appInstance.uniCall(
          "addEventListener",
          {
            eventName: "onModelUnhover",
            callback: function (event) {
              if (event.id === "机械臂_动画") {
                document.querySelector("body").style.cursor = "default";
              }
            },
          },
          (result) => {
            console.log(result);
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
    },

    mounted() {
      this.getToken();
    },
  });
};
