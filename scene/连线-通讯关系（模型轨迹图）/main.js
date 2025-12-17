window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      pathData: [
        //无人机
        [236.4563163074, -46.7175033566],
        [-12.207842756900007, -46.2376267828],
        [-260.8720018212, -45.757750209],
      ],
      pathData1: [
        // 救护车
        [214.239, 178.92],
        [236.9780516516, -183.2384417472],
        [-235.9933709912, -184.0266731766],
        [-227.5692340488, 217.0952723512],
        [214.239, 178.92],
      ],
      lineData: [
        {
          overlayType: 'modelTrailLayer',
          idLayer: 'modelTrailLayerIdCar',
          startIdObj: '1',
          startOffset: [0, 0, 0],
          endIdObj: '3',
          endOffset: [0, 0, 0],
          type: 'Segment07',
          texture: '',
          textureSpeed: 0,
          color: '#FF7C00',
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
        },
        {
          overlayType: 'modelTrailLayer',
          idLayer: 'modelTrailLayerId',
          startIdObj: '2',
          startOffset: [0, 0, 0],
          endIdObj: '3',
          endOffset: [0, 0, 0],
          type: 'Segment07',
          texture: '',
          textureSpeed: 0,
          color: '#12F37C',
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl8,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl8, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addModelTrailCar();
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
      // 添加关系线
      addLine() {
        this.lineData.map((val, ind) => {
          let jsonData = {
            id: ind + 1,
            label: '',
            labelColor: '#ffffff',
            labelBackgroundColor: '#333333',
            labelFontSize: 20,
            autoScale: false,
            ...val,
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
            console.log(result);
          });
        });
      },
      // 添加救护车轨迹图
      addModelTrailCar() {
        let jsonData = {
          id: 'modelTrailLayerIdCar', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: 'modelTrailLayer', // 图层名称，支持为图层自定义名称
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          snapSurface: 0, // 启用自动贴地。0：不贴地；1：贴地
          duration: 5, // 从上一位置运动到新位置花费的时间（单位：秒），如果启用modelTrailData数据服务，同时表示同步数据的时间周期
          modelMaxDistance: 5000, // 模型最大可见距离（单位：米），不可见后显示icon
          iconMaxDistance: 100000, // icon最大可见距离（单位：米），不可见后隐藏
          isAutoRotation: false, // 是否自动根据当前位置和上一位置计算运动方向，如果为true的话，data中的rotation将不起作用。
          trackStyle: 'style001', // 尾迹内置风格，详见注释
          trackDuration: 7, // 尾迹粒子生命周期
          trackWidth: 10, // 尾迹粒子的宽度
          objLife: 6000, // 批号消批时间长度
          modelTrailDataId: '', // 对应本服务器上 modelTrail 数据Id，如果找到id，则下方的 data 不起作用
          visible: true, // 添加当前图层时默认显示还是隐藏
          legends: [
            // 定义图层包含图例，支持为不同图例定义各自样式
            {
              name: 'legendName1', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              modelType: '救护车运输', // 模型类型
              scale: 1, // 整体放缩倍数（单位：倍）
              iconName: 'bus', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              labelColor: '#ff0000', // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
            },
            {
              name: 'legendName3', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              modelType: '指挥车', // 模型类型
              scale: 1, // 整体放缩倍数（单位：倍）
              iconName: 'bus', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              labelColor: '#ff0000', // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
            },
          ],
          data: [
            // 定义图层可视化数据
            {
              id: '1', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              label: '', // 标签文本
              coord: [236.4563163074, -46.7175033566], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
              rotation: [0, -90, 0], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
              type: 'legendName1', // 模型图例类别
            },
            {
              id: '3', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              label: '', // 标签文本
              coord: [123.695814734961, 110.8729260720978], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
              rotation: [0, 0, 0], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
              type: 'legendName3', // 模型图例类别
            },
          ],
        };

        appInstance.uniCall('addModelTrailLayer', jsonData, (result) => {
          console.log(result);
          this.addModelTrail();
          setTimeout(() => {
            this.updataTrailCar();
          }, 5000);
        });
      },
      // 添加无人机轨迹图
      addModelTrail() {
        let jsonData = {
          id: 'modelTrailLayerId', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: 'modelTrailLayer', // 图层名称，支持为图层自定义名称
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          snapSurface: 0, // 启用自动贴地。0：不贴地；1：贴地
          duration: 5, // 从上一位置运动到新位置花费的时间（单位：秒），如果启用modelTrailData数据服务，同时表示同步数据的时间周期
          modelMaxDistance: 5000, // 模型最大可见距离（单位：米），不可见后显示icon
          iconMaxDistance: 100000, // icon最大可见距离（单位：米），不可见后隐藏
          isAutoRotation: false, // 是否自动根据当前位置和上一位置计算运动方向，如果为true的话，data中的rotation将不起作用。
          trackStyle: 'style001', // 尾迹内置风格，详见注释
          trackDuration: 2.5, // 尾迹粒子生命周期
          trackWidth: 10, // 尾迹粒子的宽度
          objLife: 6000, // 批号消批时间长度
          modelTrailDataId: '', // 对应本服务器上 modelTrail 数据Id，如果找到id，则下方的 data 不起作用
          visible: true, // 添加当前图层时默认显示还是隐藏
          legends: [
            // 定义图层包含图例，支持为不同图例定义各自样式

            {
              name: 'legendName2', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              modelType: '无人机巡航', // 模型类型
              scale: 1, // 整体放缩倍数（单位：倍）
              iconName: 'bus', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              labelColor: '#ff0000', // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
            },
            {
              name: 'legendName3', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
              modelType: '指挥车', // 模型类型
              scale: 1, // 整体放缩倍数（单位：倍）
              iconName: 'bus', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
              labelColor: '#ff0000', // 标签文本颜色，可选值，默认白色
              labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
            },
          ],
          data: [
            {
              id: '2', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              label: '', // 标签文本
              coord: [214.239, 178.92], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 100, // Z 轴高度（单位：米）
              rotation: [0, 0, 0], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
              type: 'legendName2', // 模型图例类别
            },
            {
              id: '3', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              label: '', // 标签文本
              coord: [123.695814734961, 110.8729260720978], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
              rotation: [0, 0, 0], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
              type: 'legendName3', // 模型图例类别
            },
          ],
        };

        appInstance.uniCall('addModelTrailLayer', jsonData, (result) => {
          console.log(result);
          this.addLine();
          setTimeout(() => {
            this.updataTrail();
          }, 5000);
        });
      },
      // 更新无人机轨迹图
      updataTrail() {
        let index = 1;
        let isAdd = true;
        let jsonData = {
          id: 'modelTrailLayerId', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: 'modelTrailLayer', // 图层名称，支持为图层自定义名称
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          isAppend: true, // 是否追加数据（按数据顺序），true：按新数据 更新原有重复数据 & 追加新数据；false：清除原有数据 & 重建新数据
          duration: 5, // 从上一位置移动到新位置花费的时间长度（单位，秒）这里的值优先级高于 addTrailLayer 中的 duration 值
          data: [
            {
              id: '2', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              label: '', // 标签文本
              coord: this.pathData1[index], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 100, // Z 轴高度（单位：米）
              rotation: [0, 0, 0], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
              type: 'legendName2', // 模型图例类别
            },
          ],
        };
        appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
          console.log(result);
          index += 1;
          setInterval(() => {
            let jsonData = {
              id: 'modelTrailLayerId', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              name: 'modelTrailLayer', // 图层名称，支持为图层自定义名称
              coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
              coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
              isAppend: true, // 是否追加数据（按数据顺序），true：按新数据 更新原有重复数据 & 追加新数据；false：清除原有数据 & 重建新数据
              duration: 5, // 从上一位置移动到新位置花费的时间长度（单位，秒）这里的值优先级高于 addTrailLayer 中的 duration 值
              data: [
                {
                  id: '2', // 图层子对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                  label: '', // 标签文本
                  coord: this.pathData1[index], // XY 轴坐标，X：经度；Y：纬度
                  coordZ: 100, // Z 轴高度（单位：米）
                  rotation: [0, 0, 0], // XYZ 三轴旋转度数 [偏航角（单位：角度，0正北, -360~360), 俯仰角（单位：角度，0水平, -360~360),翻滚角（单位：角度，0水平, -360~360)]
                  type: 'legendName2', // 模型图例类别
                },
              ],
            };
            appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
              console.log(result);
              if (index >= this.pathData1.length - 1) {
                index = 0;
              } else if (index == 0) {
              }
              if (isAdd) {
                index += 1;
              } else {
                index -= 1;
              }
            });
          }, 5000);
        });
      },
      // 更新救护车轨迹图
      updataTrailCar() {
        let index = 1;
        let isAdd = true;
        let jsonData = {
          id: 'modelTrailLayerIdCar', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
          name: 'modelTrailLayer', // 图层名称，支持为图层自定义名称
          coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
          coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
          isAppend: true, // 是否追加数据（按数据顺序），true：按新数据 更新原有重复数据 & 追加新数据；false：清除原有数据 & 重建新数据
          duration: 5, // 从上一位置移动到新位置花费的时间长度（单位，秒）这里的值优先级高于 addTrailLayer 中的 duration 值
          data: [
            {
              id: '1',
              coord: this.pathData[index], // XY 轴坐标，X：经度；Y：纬度
              coordZ: 0, // Z 轴高度（单位：米）
              label: '',
              rotation: isAdd ? [0, -90, 0] : [0, 90, 0],
              type: 'legendName1', // 数据点图例类别
            },
          ],
        };
        appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
          console.log(result);
          index += 1;
          setInterval(() => {
            let jsonData = {
              id: 'modelTrailLayerIdCar', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
              name: 'modelTrailLayer', // 图层名称，支持为图层自定义名称
              coordType: 1, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
              coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
              isAppend: true, // 是否追加数据（按数据顺序），true：按新数据 更新原有重复数据 & 追加新数据；false：清除原有数据 & 重建新数据
              duration: 5, // 从上一位置移动到新位置花费的时间长度（单位，秒）这里的值优先级高于 addTrailLayer 中的 duration 值
              data: [
                {
                  id: '1',
                  coord: this.pathData[index], // XY 轴坐标，X：经度；Y：纬度
                  coordZ: 0, // Z 轴高度（单位：米）
                  label: '',
                  rotation: isAdd ? [0, -90, 0] : [0, 90, 0],
                  type: 'legendName1', // 数据点图例类别
                },
              ],
            };
            appInstance.uniCall('updateModelTrailLayerCoord', jsonData, (result) => {
              console.log(result);
              if (index >= this.pathData.length - 1) {
                isAdd = false;
              } else if (index == 0) {
                isAdd = true;
              }
              if (isAdd) {
                index += 1;
              } else {
                index -= 1;
              }
            });
          }, 5000);
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
