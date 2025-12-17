window.onload = function () {
  var vm = new Vue({
    el: "#app",
    data: {
      isZZ: true,
      isSlider: false,
      ullist: [],
      legendList: [
        {
          id: 1,
          action: "向前抓取",
          active: false,
          jointList: [
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机头弯曲", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          id: 2,
          action: "向后抓取",
          active: false,
          jointList: [
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 50,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机头弯曲", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          id: 3,
          action: "向左抓取",
          active: false,
          jointList: [
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 25,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机头弯曲", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          id: 4,
          action: "向右抓取",
          active: false,
          jointList: [
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
                {
                  articulation: "机械臂旋转", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 75,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                {
                  articulation: "机械臂弯曲01", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机械臂旋转02", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
                {
                  articulation: "机头弯曲", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 100,
                },
              ],
            },
            {
              id: "机械臂", // 模型对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              duration: 1, // 更新数据时长，在这个时间周期内进行差值动画（单位：秒）
              data: [
                // 定义模型关节数据
                {
                  articulation: "卡钳左开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },

                {
                  articulation: "卡钳右开", // 关节名称
                  type: "float", // 关节类型，float：浮点型关节、enum：枚举型关节；bool：布尔型关节
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          id: 5,
          action: "自由控制",
          active: false,
          jointList: [],
          timer: "",
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
            sceneConfig.jxbUrl,
        }).then((res) => {
          _this.init(res.data.accessToken);
        });
      },
      // 初始化加载图观三维场景服务
      init(token) {
        let _this = this;
        //使用授权码读取模型文件初始化场景
        window.appInstance = new TGApp.App();
        window.appInstance.initService(
          {
            container: document.getElementById("container"),
            mode: "scene",
            token: token,
            url:
              "https://www.tuguan.net/publish/scene/api/" + sceneConfig.jxbUrl, //模型地址
            resourceBasePath: "https://www.tuguan.net/public/tgapp/scene", //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              _this.showSceneInfo();
              _this.getJointInfo();
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
          (result) => { }
        );
      },
      //获取关节信息
      getJointInfo() {
        let jsonData = {
          id: "机械臂",
        };
        appInstance.uniCall("getModelArticulation", jsonData, (result) => {
          console.log(result);
          this.ullist = result.data;
          this.ullist = this.ullist.slice(0, 16);
          var index = this.ullist.findIndex(function(obj) {
            return obj.articulation === '箱体移动';
          });
          if (index != -1) {
            this.ullist.splice(index,1)
          }
          this.isZZ = false;
        });
      },
      // 控制边框选中状态
      controlChecked(el) {
        let that = this;
        this.legendList.forEach((element) => {
          if (el.id == element.id) {
            element.active = true;
            if (el.id == 5) {
              clearInterval(that.timer);
              that.getJointInfo();
              that.isSlider = true;
            } else {
              clearInterval(that.timer);
              that.isSlider = false;
              let index = 1;
              let jsonDataList = el.jointList;
              appInstance.uniCall(
                "setModelArticulation",
                jsonDataList[0],
                (result) => {
                  console.log(result);
                }
              );
              that.timer = setInterval(() => {
                if (index > 4) {
                  clearInterval(that.timer);
                }
                appInstance.uniCall(
                  "setModelArticulation",
                  jsonDataList[index],
                  (result) => {
                    console.log(result);
                  }
                );

                index = index + 1;
              }, 1000);
            }
          } else {
            element.active = false;
          }
        });
      },
      // 进度条控制机械臂
      changeData(i, e) {
        let jsonData = {
          id: "机械臂",
          duration: 1,
          data: [
            {
              articulation: i.articulation,
              type: "float",
              value: e,
            },
          ],
        };
        appInstance.uniCall("setModelArticulation", jsonData, (result) => {
          console.log(result);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
