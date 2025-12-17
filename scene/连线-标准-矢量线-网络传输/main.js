window.onload = function () {
  var vm = new Vue({
    el: '#app',
    data: {
      isZZ: true, // 是否显示遮罩
      lineData: [], // 关系线数据
      legendList: [
        {
          id: 1,
          action: '卫星通讯',
          isChecked: true,
        },
        {
          id: 2,
          action: '激光通讯',
          isChecked: true,
        },
        {
          id: 3,
          action: '微波通讯',
          isChecked: true,
        },
      ],
      timer: null,
      lineData: [
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡19',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE1B16',
          textureSpeed: 0,
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '微波通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡08',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE1B16',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '微波通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_缅甸01',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE1B16',
          textureSpeed: 0,
          width: 1,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '微波通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡20',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE1B16',
          textureSpeed: 0,
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '微波通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡04',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#1BF80E',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'curve',
          curvature: 0.5,
          angleOrder: 'xyz',
          virusType: '卫星通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡12',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#1BF80E',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '卫星通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡05',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#1BF80E',
          textureSpeed: 0,
          width: 1,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '卫星通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡06',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#1BF80E',
          textureSpeed: 0,
          width: 0.6,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '卫星通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡07',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE5616',
          textureSpeed: 0,
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '激光通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡14',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE5616',
          textureSpeed: 0,
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '激光通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡13',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE5616',
          textureSpeed: 0,
          width: 0.8,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '激光通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡10',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE5616',
          textureSpeed: 0,
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '激光通讯',
        },
        {
          startIdObj: '中国_气泡01',
          startOffset: [0, 0, 0],
          endIdObj: '境外_气泡11',
          endOffset: [0, 0, 0],
          type: 'Segment06',
          texture: '',
          color: '#EE5616',
          textureSpeed: 0,
          width: 0.4,
          shapeType: 'curve',
          curvature: 0.3,
          angleOrder: 'xyz',
          virusType: '激光通讯',
        },
      ],
    },
    methods: {
      // 获取场景token
      getToken() {
        let _this = this;
        axios({
          method: 'post',
          url: 'https://www.tuguan.net/api/user/v1/visitorScene/' + sceneConfig.lineUrl6,
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
            url: 'https://www.tuguan.net/publish/scene/api/' + sceneConfig.lineUrl6, //模型地址
            resourceBasePath: 'https://www.tuguan.net/public/tgapp/scene', //在线引用资源地址
          },
          (result) => {
            if (result.result == 1) {
              //添加TGAPI事件回调，图观场景服务初始化成功后
              // 隐藏遮罩
              _this.isZZ = false;
              _this.showSceneInfo();
              _this.addLine();
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
            id: 'Connection' + ind,
            overlayType: 'model',
            idLayer: '',
            label: '',
            labelColor: '#ffffff',
            labelBackgroundColor: '#333333',
            labelFontSize: 20,
            autoScale: false,
            ...val,
          };
          appInstance.uniCall('addConnection', jsonData, (result) => {
            console.log(result);
            if (ind == this.lineData.length - 1) {
              this.updateStyle();
            }
          });
        });
      },
      // 更新关系线样式
      updateStyle() {
        this.timer = setInterval(() => {
          this.lineData.map((val, ind) => {
            let randomNum = Math.floor(Math.random() * 13) + 1;
            let jsonData = {
              id: 'Connection' + ind,
              textureSpeed: randomNum / 10,
              color: this.lineData[randomNum - 1].color,
              width: randomNum / 10,
            };
            if (this.lineData[randomNum - 1].color == '#EE1B16') {
              val.virusType = '微波通讯';
            } else if (this.lineData[randomNum - 1].color == '#1BF80E') {
              val.virusType = '卫星通讯';
            } else if (this.lineData[randomNum - 1].color == '#EE5616') {
              val.virusType = '激光通讯';
            }
            appInstance.uniCall('updateConnectionStyle', jsonData, (result) => {
              console.log(result);
            });
          });
          this.setLineShow();
        }, 3000);
      },

      //checkbox控制图层显示与隐藏
      controlChecked(el) {
        el.isChecked = !el.isChecked;
        clearInterval(this.timer);
        if (el.isChecked) {
          let ids = [];
          this.lineData.map((val, ind) => {
            if (val.virusType == el.action) {
              ids.push('Connection' + ind);
            }
          });
          let jsonData = {
            ids,
            visible: true,
          };
          appInstance.uniCall('setModelVisibility', jsonData, (result) => {
            console.log(result);
            this.updateStyle();
          });
        } else {
          let ids = [];
          this.lineData.map((val, ind) => {
            if (val.virusType == el.action) {
              ids.push('Connection' + ind);
            }
          });
          let jsonData = {
            ids,
            visible: false,
          };
          appInstance.uniCall('setModelVisibility', jsonData, (result) => {
            console.log(result);
            this.updateStyle();
          });
        }
      },
      //更新数据重置线的隐藏与显示
      setLineShow() {
        this.legendList.forEach((item2) => {
          var ids = [];
          this.lineData.forEach((item, ind) => {
            if (item.virusType == item2.action) {
              ids.push('Connection' + ind);
            }
          });
          let jsonData = {
            ids,
            visible: item2.isChecked,
          };
          appInstance.uniCall('setModelVisibility', jsonData, (result) => {
            console.log(result);
          });
        });
      },
    },

    mounted() {
      this.getToken();
    },
  });
};
