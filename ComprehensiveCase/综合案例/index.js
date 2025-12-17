window.onload = function() {
    var vm = new Vue({
        el: '#app',
        data: {
            pathnumber: 10000,
            quanqiudata: [],
            zhongguodata: [],
            guangdongdata: [],
            shenzhendata: [],
            nanshanqudata: [],
            nanshanquditie: [],
            nanshanqugaosu: [],
            nanshanquguodao: [],
            nanshanqushengdao: [],
            shenzhengaosu: [],
            shenzhenshengdao: [],
            shenzhenguodao: [],
            shenzhenditie: [],
            isZZ: true,
            isRunning: false,
            number: 0,
            data: [],
            isFold: true,
            legendList4: [{
                id: -1,
                action: '自动旋转',
                value: '自动旋转',
                active: false,
            }, {
                id: 0,
                action: '全屏',
                value: '全屏',
                active: false,
            }, ],
            legendList3: [],
            isvisible: false,
            // 地标的图例
            legendList: [{
                id: 1,
                name: "餐饮_POI",
                value: '餐饮_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 2,
                name: "购物_POI",
                value: '购物_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 3,
                name: "购物场所_POI",
                value: '购物场所_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 4,
                name: "金融服务_POI",
                value: '金融服务_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 5,
                name: "公安交警_POI",
                value: '公安交警_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 6,
                name: "火车站_POI",
                value: '火车站_POI.json',
                active: false,
            }, {
                id: 7,
                name: "机场_POI",
                value: '机场_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 8,
                name: "加油站_POI",
                value: '加油站_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 9,
                name: "居委会点_POI",
                value: '居委会点_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 10,
                name: "旅游_POI",
                value: '旅游_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 11,
                name: "汽车站_POI",
                value: '汽车站_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 12,
                name: "山峰点_POI",
                value: '山峰点_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 13,
                name: "停车场_POI",
                value: '停车场_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 14,
                name: "深圳市_火车站",
                value: '深圳市shp_火车站_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 15,
                name: "深圳市_机场",
                value: '深圳市shp_机场_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 16,
                name: "深圳市_交通设施",
                value: '深圳市shp_交通设施_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 17,
                name: "深圳市_交通运输",
                value: '深圳市shp_交通运输_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 18,
                name: "深圳市_金融服务",
                value: '深圳市shp_金融服务_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 19,
                name: "深圳市_居民小区点",
                value: '深圳市shp_居民小区点_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 20,
                name: "深圳市_居委会点",
                value: '深圳市shp_居委会点_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 21,
                name: "深圳市_科研教育",
                value: '深圳市shp_科研教育_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 22,
                name: "深圳市_旅游",
                value: '深圳市shp_旅游_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 23,
                name: "深圳市_其他设施",
                value: '深圳市shp_其他设施_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 24,
                name: "深圳市_汽车站",
                value: '深圳市shp_汽车站_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 25,
                name: "深圳市_山峰点",
                value: '深圳市shp_山峰点_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 26,
                name: "深圳市_兴趣点",
                value: '深圳市shp_兴趣点POI_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 27,
                name: "深圳市_休闲娱乐",
                value: '深圳市shp_休闲娱乐_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 28,
                name: "深圳市_政府机关",
                value: '深圳市shp_政府机关_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 29,
                name: "深圳市_住宿",
                value: '深圳市shp_住宿_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 30,
                name: "深圳市_宗教点",
                value: '深圳市shp_宗教点_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 31,
                name: "收费站",
                value: '收费站_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 32,
                name: "停车场",
                value: '停车场_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 33,
                name: "学校",
                value: '学校_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 34,
                name: "医疗",
                value: '医疗_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 35,
                name: "银行",
                value: '银行_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 36,
                name: "政府机构",
                value: '政府机构_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 37,
                name: "港口",
                value: 'gangkou_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 38,
                name: "汽车",
                value: 'guangdong_bus_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 39,
                name: "机场",
                value: 'guangdong_airport_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 40,
                name: "火车",
                value: 'guangdong_railway_real_names.json',
                active: false,
                isAdd: false
            }, {
                id: 41,
                name: "深圳",
                value: 'POI_coordinates_wgs84.json',
                active: false,
                isAdd: false
            }, {
                id: 42,
                name: "彩票店_POI",
                value: '彩票店_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 43,
                name: "大厦_POI",
                value: '大厦_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 44,
                name: "居民小区点_POI",
                value: '居民小区点_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 45,
                name: "科研教育_POI",
                value: '科研教育_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 46,
                name: "其他设施_POI",
                value: '其他设施_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 47,
                name: "收费站_POI",
                value: '收费站_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 48,
                name: "休闲娱乐_POI",
                value: '休闲娱乐_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 49,
                name: "政府机关_POI",
                value: '政府机关_POI.json',
                active: false,
                isAdd: false
            }, {
                id: 50,
                name: "住宿_POI",
                value: '住宿_POI.json',
                active: false,
                isAdd: false
            }],
            //路径的图例
            legendList1: [{
                id: 1,
                name: "广东省路网-城市快速路",
                value: "/guangdongsheng/guangdongshengluwang/chengshikuaisulu.shp",
                active: false,
            }, {
                id: 2,
                name: "广东省路网-地铁",
                value: "/guangdongsheng/guangdongshengluwang/ditie.shp",
                active: false,
            }, {
                id: 3,
                name: "广东省路网-高速",
                value: "/guangdongsheng/guangdongshengluwang/gaosu.shp",
                active: false,
            }, {
                id: 4,
                name: "广东省路网-高速引路",
                value: "/guangdongsheng/guangdongshengluwang/gaosuyinlu.shp",
                active: false,
            }, {
                id: 5,
                name: "广东省路网-国道",
                value: "/guangdongsheng/guangdongshengluwang/guodao.shp",
                active: false,
            }, {
                id: 6,
                name: "广东省路网-省道",
                value: "/guangdongsheng/guangdongshengluwang/shengdao.shp",
                active: false,
            }, {
                id: 7,
                name: "广东省路网-一级道路",
                value: "/guangdongsheng/guangdongshengluwang/yijidaolu.shp",
                active: false,
            }, {
                id: 8,
                name: "广东省路网-铁路",
                value: "/guangdongsheng/guangdongshengluwang/tielu.shp",
                active: false,
            }, {
                id: 9,
                name: "广东省路网-县道",
                value: "/guangdongsheng/guangdongshengluwang/xiandao.shp",
                active: false,
            }, {
                id: 10,
                name: "广东省路网-行人道路",
                value: "/guangdongsheng/guangdongshengluwang/xingrendaolu.shp",
                active: false,
            }, {
                id: 11,
                name: "全国港口-港口",
                value: "/quanqiu/quanqiugangkou/gangkou.shp",
                active: false,
            }, {
                id: 12,
                name: "全球国家边界-世界国家",
                value: "/quanqiu/quanqiuguojiabianjie/shijieguojia.shp",
                active: false,
            }, {
                id: 36,
                name: "全球路网-全球路网",
                value: "/quanqiu/quanqiuluwang/quanqiuluwang.shp",
                active: false,
            }, {
                id: 13,
                name: "深圳路网-城市快速路",
                value: "/shenzhenshi/luwang/chengshikuaisulu.shp",
                active: false,
            }, {
                id: 14,
                name: "深圳路网-地铁",
                value: "/shenzhenshi/luwang/ditie.shp",
                active: false,
            }, {
                id: 15,
                name: "深圳路网-地铁线",
                value: "/shenzhenshi/luwang/ditiexian.shp",
                active: false,
            }, {
                id: 16,
                name: "深圳路网-高速路",
                value: "/shenzhenshi/luwang/gaosu.shp",
                active: false,
            }, {
                id: 17,
                name: "深圳路网-高速引路",
                value: "/shenzhenshi/luwang/gaosuyinlu.shp",
                active: false,
            }, {
                id: 18,
                name: "深圳路网-国道",
                value: "/shenzhenshi/luwang/guodao.shp",
                active: false,
            }, {
                id: 19,
                name: "深圳路网-九级路",
                value: "/shenzhenshi/luwang/jiujilu.shp",
                active: false,
            }, {
                id: 20,
                name: "深圳路网-其他道路",
                value: "/shenzhenshi/luwang/qitadaolu.shp",
                active: false,
            }, {
                id: 21,
                name: "深圳路网-省道",
                value: "/shenzhenshi/luwang/shengdao.shp",
                active: false,
            }, {
                id: 22,
                name: "深圳路网-市区一级道路",
                value: "/shenzhenshi/luwang/shiquyijidaolu.shp",
                active: false,
            }, {
                id: 23,
                name: "深圳路网-铁路",
                value: "/shenzhenshi/luwang/tielu.shp",
                active: false,
            }, {
                id: 24,
                name: "深圳路网-县道",
                value: "/shenzhenshi/luwang/xiandao.shp",
                active: false,
            }, {
                id: 25,
                name: "深圳路网-行人道路",
                value: "/shenzhenshi/luwang/xingrendaolu.shp",
                active: false,
            }, {
                id: 26,
                name: "中国路网-城市二级道路",
                value: "/zhongguo/quanguoluwang/chengshierjidaolu.shp",
                active: false,
            }, {
                id: 27,
                name: "中国路网-城市三级道路",
                value: "/zhongguo/quanguoluwang/chengshisanjidaolu.shp",
                active: false,
            }, {
                id: 28,
                name: "中国路网-城市四级道路",
                value: "/zhongguo/quanguoluwang/chengshisijidaolu.shp",
                active: false,
            }, {
                id: 29,
                name: "中国路网-城市一级道路",
                value: "/zhongguo/quanguoluwang/chengshiyijidaolu.shp",
                active: false,
            }, {
                id: 30,
                name: "中国路网-高速",
                value: "/zhongguo/quanguoluwang/gaosu.shp",
                active: false,
            }, {
                id: 31,
                name: "中国路网-国道",
                value: "/zhongguo/quanguoluwang/guodao.shp",
                active: false,
            }, {
                id: 32,
                name: "中国路网-省道",
                value: "/zhongguo/quanguoluwang/shengdao.shp",
                active: false,
            }, {
                id: 33,
                name: "中国路网-铁路",
                value: "/zhongguo/quanguoluwang/tielu.shp",
                active: false,
            }, {
                id: 34,
                name: "中国路网-县道",
                value: "/zhongguo/quanguoluwang/xiandao.shp",
                active: false,
            }, {
                id: 35,
                name: "中国路网-乡道",
                value: "/zhongguo/quanguoluwang/xiangdao.shp",
                active: false,
            }, {
                id: 37,
                name: "中国路网水系-城市快速路",
                value: "/zhongguo/luwangshuixi/chengshikuaisulu.shp",
                active: false,
            }, {
                id: 38,
                name: "中国路网水系-地铁轻轨",
                value: "/zhongguo/luwangshuixi/ditieqinggui.shp",
                active: false,
            }, {
                id: 39,
                name: "中国路网水系-高速",
                value: "/zhongguo/luwangshuixi/gaosu.shp",
                active: false,
            }, {
                id: 40,
                name: "中国路网水系-国道",
                value: "/zhongguo/luwangshuixi/guodao.shp",
                active: false,
            }, {
                id: 41,
                name: "中国路网水系-海域",
                value: "/zhongguo/luwangshuixi/haiyu.shp",
                active: false,
            }, {
                id: 42,
                name: "中国路网水系-陆地",
                value: "/zhongguo/luwangshuixi/ludi.shp",
                active: false,
            }, {
                id: 43,
                name: "中国路网水系-其他路",
                value: "/zhongguo/luwangshuixi/qitalu.shp",
                active: false,
            }, {
                id: 44,
                name: "中国路网水系-省道",
                value: "/zhongguo/luwangshuixi/shengdao.shp",
                active: false,
            }, {
                id: 45,
                name: "中国路网水系-水系",
                value: "/zhongguo/luwangshuixi/shuixi.shp",
                active: false,
            }, {
                id: 46,
                name: "中国路网水系-铁路",
                value: "/zhongguo/luwangshuixi/tielu.shp",
                active: false,
            }, {
                id: 47,
                name: "中国路网水系-县道",
                value: "/zhongguo/luwangshuixi/xiandao.shp",
                active: false,
            }, {
                id: 48,
                name: "中国路网水系-乡镇村道",
                value: "/zhongguo/luwangshuixi/xiangzhencundao.shp",
                active: false,
            }, {
                id: 49,
                name: "省市县名称-村",
                value: "/zhongguo/shengshixianmingcheng/cun.shp",
                active: false,
            }, {
                id: 50,
                name: "省市县名称-道",
                value: "/zhongguo/shengshixianmingcheng/dao.shp",
                active: false,
            }, {
                id: 51,
                name: "省市县名称-地级市",
                value: "/zhongguo/shengshixianmingcheng/dijishi.shp",
                active: false,
            }, {
                id: 52,
                name: "省市县名称-省会",
                value: "/zhongguo/shengshixianmingcheng/shenghui.shp",
                active: false,
            }, {
                id: 53,
                name: "省市县名称-县",
                value: "/zhongguo/shengshixianmingcheng/xian.shp",
                active: false,
            }, {
                id: 54,
                name: "省市县名称-镇",
                value: "/zhongguo/shengshixianmingcheng/zhen.shp",
                active: false,
            }, {
                id: 55,
                name: "省市县区划-省界",
                value: "/zhongguo/shengshixianquhua/shengjie.shp",
                active: false,
            }, {
                id: 56,
                name: "省市县区划-市界",
                value: "/zhongguo/shengshixianquhua/shijie.shp",
                active: false,
            }, {
                id: 57,
                name: "省市县区划-县界",
                value: "/zhongguo/shengshixianquhua/xianjie.shp",
                active: false,
            }, {
                id: 58,
                name: "中国-路网",
                value: "/gonglushp/roa_4m.shp",
                active: false,
            }, {
                id: 59,
                name: "南山区-地铁",
                value: "/nanshanqu/ditie.shp",
                active: false,
            }, {
                id: 60,
                name: "南山区-高速",
                value: "/nanshanqu/gaosu.shp",
                active: false,
            }, {
                id: 61,
                name: "南山区-国道",
                value: "/nanshanqu/guodao.shp",
                active: false,
            }, {
                id: 62,
                name: "南山区-省道",
                value: "/nanshanqu/shengdao.shp",
                active: false,
            }],
            legendList2: [
                // {
                //     id: 1,
                //     name: "折叠",
                //     value: '折叠',
                //     active: false,
                //     isAdd: false
                // },
                {
                    id: 2,
                    name: "全球",
                    value: '全球',
                    active: false,
                    isAdd: false
                }, {
                    id: 3,
                    name: "中国",
                    value: '中国',
                    active: false,
                    isAdd: false
                }, {
                    id: 4,
                    name: "广东省",
                    value: '广东省',
                    active: false,
                    isAdd: false
                }, {
                    id: 5,
                    name: "深圳市",
                    value: '深圳市',
                    active: false,
                    isAdd: false
                }, {
                    id: 6,
                    name: "南山区",
                    value: '南山区',
                    active: false,
                    isAdd: false
                }, {
                    id: 7,
                    name: "深圳湾",
                    value: '深圳湾',
                    active: false,
                    isAdd: false
                }
            ],
            countryData: [],
            num: 0,
            chinaData: [],
            guangdongData: [],
            guangdongdata1: [],
            curCamera: 0,
            data2: 0
        },
        methods: {
            // 初始化加载图观三维场景服务
            init(token) {
                let _this = this;
                // 初始化图观App
                window.appInstance = new TGApp.App();
                window.appInstance.initService({
                        container: document.getElementById('container'),
                        mode: 'streaming',
                        token: "wG0psatV", //StreamingServer服务器获取token
                        url: "http://172.16.1.52:9090", //StreamingServer服务器接口地址和端口，需要进行替换为实际地址

                    },
                    (result) => {
                        window.appInstance.uniCall(
                            'addEventListener', {
                                eventName: 'onServiceInit',
                                callback: (res) => {
                                    //_this.isZZ = false;
                                    _this.setSceneEffectInfo(false);
                                    //初始化图层
                                    _this.initLayer();
                                    document.addEventListener('keydown', function(event) {
                                        // 检查是否按下了 Alt 键和 D 键
                                        if (event.altKey && event.key === 'd') {
                                            if (_this.isFold) {
                                                _this.isFold = false;
                                            } else {
                                                _this.isFold = true;

                                            }

                                        }
                                    });
                                    appInstance.uniCall('getStates', {}, res => {
                                            res.states
                                                .forEach(item => {
                                                    this.legendList3.push(item)
                                                })
                                        })
                                        //_this.getEarthData();
                                        // _this.addPath();
                                    appInstance.uniCall(
                                        'addEventListener', {
                                            eventName: 'onCameraRotateEnd',
                                            callback: res => {
                                                _this.legendList4[0].active = false;
                                            }
                                        },
                                        result => {}
                                    )
                                    appInstance.uniCall(
                                        'addEventListener', {
                                            eventName: 'onCameraRotateStart',
                                            callback: res => {
                                                _this.legendList4[0].active = true;
                                            }
                                        },
                                        result => {}
                                    )
                                    appInstance.uniCall(
                                        'addEventListener', {
                                            eventName: 'onCameraMove',
                                            callback: function(event) {
                                                //console.log(event);
                                                _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;
                                                if (event.distance > 2956823.68) {
                                                    if (_this.curCamera != 2) {
                                                        _this.addSatel(_this.legendList2[0])
                                                        let jsonData = {
                                                            id: "path",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathquanqiu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;
                                                    }
                                                    _this.pathnumber = 10000
                                                } else if (event.distance <= 2956823.68 && event.distance > 287498.76) {
                                                    if (_this.curCamera != 3) {
                                                        _this.addSatel(_this.legendList2[1])
                                                        _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;
                                                    }
                                                    if (event.distance > 1082715.2) {
                                                        let jsonData = {
                                                            id: "pathquanqiu",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                    } else {
                                                        let jsonData = {
                                                            id: "path",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathquanqiu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                    }
                                                    if (event.distance > 2271784.64 && _this.pathnumber != 8000) {

                                                        let jsonData = {
                                                            id: "pathtielu",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });

                                                        jsonData = {
                                                            id: "pathzhongguo1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        _this.pathnumber = 8000;
                                                    }
                                                    if (event.distance < 2271784.64 && event.distance > 979129.76 && _this.pathnumber != 6000) {
                                                        let jsonData = {
                                                            id: "pathtielu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });

                                                        jsonData = {
                                                            id: "pathzhongguo1",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu1",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        _this.pathnumber = 6000;

                                                    }
                                                    if (event.distance > 801555.76 && event.distance < 979129.76 && _this.pathnumber != 4000) {
                                                        _this.pathnumber = 4000;
                                                        let jsonData = {
                                                            id: "pathtielu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });

                                                        jsonData = {
                                                            id: "pathzhongguo1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo2",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu2",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                    }
                                                    if (event.distance <= 801555.76 && _this.pathnumber != 2000) {

                                                        _this.pathnumber = 2000;
                                                        let jsonData = {
                                                            id: "pathtielu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });

                                                        jsonData = {
                                                            id: "pathzhongguo1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu3",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                    }
                                                    // // if (event.distance > 956328.48 && event.distance < 1256328.48 && _this.pathnumber != 4000) {
                                                    // //     _this.pathnumber = 4000;
                                                    // //     let jsonData1 = {
                                                    // //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    // //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    // //         width: 4000
                                                    // //     };
                                                    // //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    // //         console.log(result);
                                                    // //     })
                                                    // //     jsonData1 = {
                                                    // //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    // //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    // //         width: 6000
                                                    // //     };
                                                    // //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    // //         console.log(result);
                                                    // //     })
                                                    // // }
                                                    // if (event.distance > 856328.48 && event.distance < 1396328.48 && _this.pathnumber != 3000) {
                                                    //     _this.pathnumber = 3000;
                                                    //     let jsonData1 = {
                                                    //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 3000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    //     jsonData1 = {
                                                    //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 5000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    // }
                                                    // // if (event.distance <= 956328.48 && event.distance > 856328.48 && _this.pathnumber != 2500) {
                                                    // //     _this.pathnumber = 2500;
                                                    // //     let jsonData1 = {
                                                    // //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    // //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    // //         width: 2500
                                                    // //     };
                                                    // //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    // //         console.log(result);
                                                    // //     })
                                                    // //     jsonData1 = {
                                                    // //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    // //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    // //         width: 4000
                                                    // //     };
                                                    // //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    // //         console.log(result);
                                                    // //     })
                                                    // // }
                                                    // if (event.distance <= 856328.48 && event.distance > 656328.48 && _this.pathnumber != 1500) {
                                                    //     let jsonData1 = {
                                                    //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 1500
                                                    //     };
                                                    //     _this.pathnumber = 1500;
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    //     jsonData1 = {
                                                    //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 2000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    // }
                                                    // if (event.distance <= 656328.48 && _this.pathnumber != 1000) {
                                                    //     let jsonData1 = {
                                                    //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 1000
                                                    //     };
                                                    //     _this.pathnumber = 1000;
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    //     jsonData1 = {
                                                    //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 1500
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    // }
                                                    // //&& event.distance > 656328.48
                                                    // if (event.distance <= 756328.48) {
                                                    //     let jsonData1 = {
                                                    //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 2000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    //     jsonData1 = {
                                                    //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 2500
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    // }
                                                    // if (event.distance <= 656328.48 && event.distance > 564233.48) {
                                                    //     let jsonData1 = {
                                                    //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 5000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    //      jsonData1 = {
                                                    //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 10000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    // }
                                                    // if (event.distance <= 564233.48 && event.distance > 507747) {
                                                    //     let jsonData1 = {
                                                    //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 3500
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    //      jsonData1 = {
                                                    //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 10000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    // }
                                                    // if (event.distance < 507747) {
                                                    //     let jsonData1 = {
                                                    //         id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 2500
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    //      jsonData1 = {
                                                    //         id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                    //         name: "layerName", // 图层名称，支持为图层自定义名称
                                                    //         width: 10000
                                                    //     };
                                                    //     appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                                                    //         console.log(result);
                                                    //     })
                                                    // }

                                                } else if (event.distance <= 287498.76 && event.distance > 23827.2875) {
                                                    _this.pathnumber = 1000;
                                                    if (_this.curCamera != 4) {

                                                        let jsonData = {
                                                            id: "pathtielu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathquanqiu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });

                                                        jsonData = {
                                                            id: "pathzhongguo1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        _this.addSatel(_this.legendList2[2])
                                                        _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;
                                                    }
                                                } else if (event.distance <= 23827.2875 && event.distance > 3871.595625) {
                                                    _this.pathnumber = 1000;
                                                    if (_this.curCamera != 5) {
                                                        let jsonData = {
                                                            id: "pathtielu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathquanqiu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });

                                                        jsonData = {
                                                            id: "pathzhongguo1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        _this.addSatel(_this.legendList2[3])
                                                        _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;
                                                    }
                                                } else if (event.distance < 3871.595625) {
                                                    _this.pathnumber = 1000;
                                                    if (_this.curCamera != 6) {
                                                        let jsonData = {
                                                            id: "pathtielu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathquanqiu",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu1",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu2",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        jsonData = {
                                                            id: "pathzhongguotielu3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        _this.addSatel(_this.legendList2[4])
                                                        _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;
                                                    }
                                                }
                                                if (event.distance < 100) {
                                                    let jsonData = {
                                                        id: 1,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: true,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 44,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: true,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 42,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: true,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 46,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: true,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 2,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: true,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 3,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: true,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                } else {
                                                    let jsonData = {
                                                        id: 1,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: false,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 44,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: false,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 42,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: false,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 46,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: false,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 2,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: false,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                    jsonData = {
                                                        id: 3,
                                                        overlayType: 'subLandmarkLayer',
                                                        visible: false,
                                                    };

                                                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                        console.log(result);
                                                    });
                                                }
                                            },
                                        },
                                        (result) => {
                                            console.log(result);
                                        }
                                    );
                                },
                            },
                            (result) => {
                                console.log(result);
                            }
                        );
                    }
                );
            },
            automaticRotation(item) {
                if (item.id == -1) {
                    item.active = !item.active;
                    let jsonData = {
                        enabled: item.active, // 是否启用相机围绕目标飞行
                        duration: 60, // 飞行一周所需要的秒数，数值越大飞行越慢
                        interruptable: true, // 是否可以被打断，默认为true
                        direction: 'clockwise', // 飞行方向，clockwise 为顺时针，counterclockwise 为逆时针
                    };
                    appInstance.uniCall('rotateCamera', jsonData, (result) => {
                        console.log('rotateCamera', result);
                    });
                } else {
                    item.active = !item.active;
                    if (item.active) {
                        item.action = "取消全屏"
                        const element = document.documentElement;

                        // 检查浏览器是否支持全屏 API
                        if (element.requestFullscreen) {
                            element.requestFullscreen();
                        } else if (element.mozRequestFullScreen) { // Firefox
                            element.mozRequestFullScreen();
                        } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
                            element.webkitRequestFullscreen();
                        } else if (element.msRequestFullscreen) { // IE/Edge
                            element.msRequestFullscreen();
                        } else {
                            console.error("浏览器不支持全屏 API");
                        }
                    } else {
                        item.action = "全屏"
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) { // Firefox
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) { // IE/Edge
                            document.msExitFullscreen();
                        } else {
                            console.error("浏览器不支持退出全屏 API");
                        }

                    }
                }

            },
            //初始化图层
            initLayer() {
                //全球
                //添加卫星
                // });
                let _this = this;
                _this.addpath();
                let jsonData = {
                    id: "path", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                    name: "layerName", // 图层名称，支持为图层自定义名称
                    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                    coordZ: 10000, // 高度（单位：米）
                    type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                    color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
                    colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                    width: 8000, // 路径宽度（单位：米）
                    tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                    autoScale: true,

                    shpPath: "/ne_10m_roads/ne_10m_roads_Road_3.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"

                };

                appInstance.uniCall("addPathShp", jsonData, (result) => {
                    jsonData = {
                        id: "path",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    let jsonData1 = {
                        id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                        name: "layerName", // 图层名称，支持为图层自定义名称
                        coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                        coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                        coordZ: 10000, // 高度（单位：米）
                        type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                        color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
                        colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                        width: 10000, // 路径宽度（单位：米）
                        tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                        autoScale: true,

                        shpPath: "/gonglushp/roa_4m.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                    };

                    appInstance.uniCall("addPathShp", jsonData1, (result) => {
                        console.log(result);

                        jsonData = {
                            id: "path0",
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                            let jsonData1 = {
                                id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                name: "layerName", // 图层名称，支持为图层自定义名称
                                coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                                coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                                coordZ: 10000, // 高度（单位：米）
                                type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                                color: "#ffff00", // 路线颜色，"" 颜色透明（HEX 颜色值）
                                colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                                width: 8000, // 路径宽度（单位：米）
                                tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                                autoScale: true,

                                shpPath: "/quanguotielu/tielu.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                            };
                            appInstance.uniCall("addPathShp", jsonData1, (result) => {
                                console.log(result);
                                jsonData = {
                                    id: "pathtielu",
                                    overlayType: 'path',
                                    visible: false,
                                };

                                appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                    console.log(result);
                                    _this.setSceneEffectInfo(true);


                                    this.connectModelServer();
                                    // 添加国家，首都重要城市
                                    this.getLandmarkLayerJsonData();
                                    //添加抽稀地标图
                                    this.controlChecked(this.legendList[36])
                                        // this.addPath();

                                    //中国
                                    //中国的铁路

                                    // 省份城市
                                    this.addCity();

                                    setTimeout(() => {
                                        //广东
                                        //广东的路网
                                        this.controlPathChecked(this.legendList1[2]);
                                        this.controlPathChecked(this.legendList1[0]);
                                        this.controlPathChecked(this.legendList1[1]);
                                        this.controlPathChecked(this.legendList1[3]);
                                        this.controlPathChecked(this.legendList1[4]);
                                        // 省份城市
                                        this.addGuangdongCity();
                                        // //抽稀地标图
                                        this.addguangdong();
                                        //高校和医院
                                        setTimeout(() => {
                                            this.controlChecked(this.legendList[32])
                                        }, 1000)
                                        setTimeout(() => {
                                            this.controlChecked(this.legendList[33])
                                        }, 2000)

                                    }, 2000);
                                    setTimeout(() => {
                                        // 深圳
                                        //深圳的路网
                                        this.controlPathChecked(this.legendList1[18]);
                                        this.controlPathChecked(this.legendList1[16]);
                                        this.controlPathChecked(this.legendList1[23]);
                                        this.controlPathChecked(this.legendList1[14]);
                                        this.controlPathChecked(this.legendList1[21]);
                                        this.controlPathChecked(this.legendList1[13]);
                                        this.controlPathChecked(this.legendList1[24]);
                                        // 省份城市
                                        this.addshenzhen();
                                        //一个类型一个图层
                                        setTimeout(() => {
                                            this.controlChecked(this.legendList[14])
                                        }, 1000)
                                        setTimeout(() => {
                                            this.controlChecked(this.legendList[13])
                                        }, 2000)
                                        setTimeout(() => {
                                            this.controlChecked(this.legendList[23])
                                        }, 3000)


                                    }, 5000)
                                    setTimeout(() => {
                                            // 南山区
                                            //南山区的路网
                                            // this.controlPathChecked(this.legendList1[58]);
                                            // this.controlPathChecked(this.legendList1[59]);
                                            // this.controlPathChecked(this.legendList1[60]);
                                            //this.controlPathChecked(this.legendList1[61]);


                                            //this.nanshanqu();

                                            // //抽稀地标图
                                            for (let index = 0; index < 13; index++) {
                                                setTimeout(() => {
                                                    let num = index
                                                    this.controlChecked(this.legendList[num])
                                                }, 500 * index)


                                            }
                                            for (let index = 41; index < 50; index++) {
                                                setTimeout(() => {
                                                    let num = index
                                                    this.controlChecked(this.legendList[num])
                                                    if (num == 49) {
                                                        _this.isZZ = false;
                                                        _this.addSatel(_this.legendList2[0])
                                                        let jsonData = {
                                                            id: "path0",
                                                            overlayType: 'path',
                                                            visible: true,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                        });
                                                        _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;

                                                    }

                                                }, 500 * (index - 27))


                                            }
                                        }, 9000)
                                        //添加道路名称抽稀地标图
                                        // var p1 = new Promise((resolve, reject) => {
                                        //     axios
                                        //         .get('./json/nanshanqu_shapefiles_json/nanshanqu_ditie_lines.json')
                                        //         .then((res) => {
                                        //             resolve(res.data);
                                        //         })
                                        //         .catch((err) => {
                                        //             reject(err);
                                        //         });
                                        // });
                                        // Promise.all([p1]).then((res) => {
                                        //     let _this = this;
                                        //     //将数据推到图层
                                        //     res.forEach((el, index) => {
                                        //         let n = 0;
                                        //         if (index == 0) {
                                        //             el.features.forEach((item) => {
                                        //                 //添加数据
                                        //                 item.geometry.coordinates[0].forEach(item1 => {
                                        //                     if (n % 15 == 0) {
                                        //                         this.nanshanquditie.push({
                                        //                             id: 'ditie' + n,
                                        //                             type: '地铁',
                                        //                             label: "",
                                        //                             coord: item1,
                                        //                             coordZ: 0,
                                        //                         })
                                        //                         _this.nanshanqudata.push({
                                        //                             id: 'ditie' + n,
                                        //                             type: '地铁',
                                        //                             label: "",
                                        //                             coord: item1,
                                        //                             coordZ: 0,
                                        //                         })
                                        //                     }

                                    //                     n++;
                                    //                 })
                                    //             });
                                    //             let jsonData = {
                                    //                 id: "idPointDataSXTCnanshanquditie",
                                    //             };
                                    //             window.appInstance.uniCall("removeAllData", jsonData, result => {

                                    //                 let jsondata = {
                                    //                     id: "idPointDataSXTCnanshanquditie", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                    //                     attribute: ["type"],
                                    //                     data: _this.nanshanquditie
                                    //                 }
                                    //                 appInstance.uniCall('addPointData', jsondata, (result) => {
                                    //                     console.log(result);
                                    //                     let jsonData = {
                                    //                         id: "nanshanquditie",
                                    //                         name: "idLayerSXT",
                                    //                         coordZ: "0",
                                    //                         coordTypeZ: 2,
                                    //                         visible: false,
                                    //                         subMaxMapLevel: 18,
                                    //                         subRadius: 500,
                                    //                         drawMax: 50,
                                    //                         iconName: "event_02",
                                    //                         iconScale: 0.7,
                                    //                         labelScale: 1,
                                    //                         autoScale: false,
                                    //                         legends: [{
                                    //                             name: '地铁',
                                    //                             color: '#FFFFFF',
                                    //                             iconName: 'custom-地铁',
                                    //                             labelScale: 1,
                                    //                             iconScale: 0.7,
                                    //                         }],
                                    //                         legendAttr: "type",
                                    //                         aggDataId: "idPointDataSXTCnanshanquditie",
                                    //                     };
                                    //                     appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                    //                         console.log(result);
                                    //                     });

                                    //                 });
                                    //             });
                                    //         }

                                    //     });

                                    // });
                                    // var p1 = new Promise((resolve, reject) => {
                                    //     axios
                                    //         .get('./json/nanshanqu_shapefiles_json/nanshanqu_gaosu_lines_with_numbers.json')
                                    //         .then((res) => {
                                    //             resolve(res.data);
                                    //         })
                                    //         .catch((err) => {
                                    //             reject(err);
                                    //         });
                                    // });
                                    // Promise.all([p1]).then((res) => {
                                    //     let _this = this;
                                    //     //将数据推到图层
                                    //     res.forEach((el, index) => {
                                    //         let n = 0;
                                    //         if (index == 0) {
                                    //             el.features.forEach((item) => {
                                    //                 //添加数据
                                    //                 item.geometry.coordinates[0].forEach(item1 => {
                                    //                     if (n % 15 == 0) {
                                    //                         this.nanshanqugaosu.push({
                                    //                             id: 'gaosu' + n,
                                    //                             type: '高速',
                                    //                             label: item.properties.road_number,
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                         _this.nanshanqudata.push({
                                    //                             id: 'gaosu' + n,
                                    //                             type: '高速',
                                    //                             label: "",
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                     }
                                    //                     n++;
                                    //                 })
                                    //             });
                                    //             let jsonData = {
                                    //                 id: "idPointDataSXTCnanshanqugaosu",
                                    //             };
                                    //             window.appInstance.uniCall("removeAllData", jsonData, result => {

                                    //                 let jsondata = {
                                    //                     id: "idPointDataSXTCnanshanqugaosu", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                    //                     attribute: ["type"],
                                    //                     data: _this.nanshanqugaosu
                                    //                 }
                                    //                 appInstance.uniCall('addPointData', jsondata, (result) => {
                                    //                     console.log(result);
                                    //                     let jsonData = {
                                    //                         id: "nanshanqugaosu",
                                    //                         name: "idLayerSXT",
                                    //                         coordZ: "0",
                                    //                         coordTypeZ: 2,
                                    //                         visible: false,
                                    //                         subMaxMapLevel: 18,
                                    //                         subRadius: 500,
                                    //                         drawMax: 50,
                                    //                         iconName: "event_02",
                                    //                         iconScale: 1,
                                    //                         labelScale: 1,
                                    //                         autoScale: false,
                                    //                         legends: [{
                                    //                             name: '高速',
                                    //                             color: '#FFFFFF',
                                    //                             iconName: 'custom-高速',
                                    //                             labelScale: 0.7,
                                    //                             iconScale: 1,
                                    //                         }],
                                    //                         legendAttr: "type",
                                    //                         aggDataId: "idPointDataSXTCnanshanqugaosu",
                                    //                     };
                                    //                     appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                    //                         console.log(result);
                                    //                     });

                                    //                 });
                                    //             });
                                    //         }

                                    //     });

                                    // });
                                    // var p1 = new Promise((resolve, reject) => {
                                    //     axios
                                    //         .get('./json/nanshanqu_shapefiles_json/nanshanqu_guodao_lines.json')
                                    //         .then((res) => {
                                    //             resolve(res.data);
                                    //         })
                                    //         .catch((err) => {
                                    //             reject(err);
                                    //         });
                                    // });
                                    // Promise.all([p1]).then((res) => {
                                    //     let _this = this;
                                    //     //将数据推到图层
                                    //     res.forEach((el, index) => {
                                    //         let n = 0;
                                    //         if (index == 0) {
                                    //             el.features.forEach((item) => {
                                    //                 //添加数据
                                    //                 item.geometry.coordinates[0].forEach(item1 => {
                                    //                     if (n % 10 == 0) {
                                    //                         this.nanshanquguodao.push({
                                    //                             id: 'guodao' + n,
                                    //                             type: '国道',
                                    //                             label: "",
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                         _this.nanshanqudata.push({
                                    //                             id: 'guodao' + n,
                                    //                             type: '国道',
                                    //                             label: "",
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                     }
                                    //                     n++;
                                    //                 })
                                    //             });
                                    //             let jsonData = {
                                    //                 id: "idPointDataSXTCnanshanquguodao",
                                    //             };
                                    //             window.appInstance.uniCall("removeAllData", jsonData, result => {

                                    //                 let jsondata = {
                                    //                     id: "idPointDataSXTCnanshanquguodao", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                    //                     attribute: ["type"],
                                    //                     data: _this.nanshanquguodao
                                    //                 }
                                    //                 appInstance.uniCall('addPointData', jsondata, (result) => {
                                    //                     console.log(result);
                                    //                     let jsonData = {
                                    //                         id: "nanshanquguodao",
                                    //                         name: "idLayerSXT",
                                    //                         coordZ: "0",
                                    //                         coordTypeZ: 0,
                                    //                         visible: false,
                                    //                         subMaxMapLevel: 18,
                                    //                         subRadius: 500,
                                    //                         drawMax: 100,
                                    //                         iconName: "event_02",
                                    //                         iconScale: 1,
                                    //                         labelScale: 1,
                                    //                         autoScale: false,
                                    //                         legends: [{
                                    //                             name: '国道',
                                    //                             color: '#73FFFF',
                                    //                             iconName: 'custom-高速',
                                    //                             labelScale: 1,
                                    //                             iconScale: 1,
                                    //                         }],
                                    //                         legendAttr: "type",
                                    //                         aggDataId: "idPointDataSXTCnanshanquguodao",
                                    //                     };
                                    //                     appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                    //                         console.log(result);
                                    //                     });

                                    //                 });
                                    //             });
                                    //         }

                                    //     });

                                    // });
                                    // var p1 = new Promise((resolve, reject) => {
                                    //     axios
                                    //         .get('./json/nanshanqu_shapefiles_json/nanshanqu_shengdao_lines_with_numbers.json')
                                    //         .then((res) => {
                                    //             resolve(res.data);
                                    //         })
                                    //         .catch((err) => {
                                    //             reject(err);
                                    //         });
                                    // });
                                    // Promise.all([p1]).then((res) => {
                                    //     let _this = this;
                                    //     //将数据推到图层
                                    //     res.forEach((el, index) => {
                                    //         let n = 0;
                                    //         if (index == 0) {
                                    //             el.features.forEach((item) => {
                                    //                 //添加数据
                                    //                 item.geometry.coordinates[0].forEach(item1 => {
                                    //                     if (n % 15 == 0) {
                                    //                         this.nanshanqushengdao.push({
                                    //                             id: 'shengdao' + n,
                                    //                             type: '省道',
                                    //                             label: item.properties.road_number,
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                         _this.nanshanqudata.push({
                                    //                             id: 'shengdao' + n,
                                    //                             type: '省道',
                                    //                             label: "",
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                     }
                                    //                     n++;
                                    //                 })
                                    //             });
                                    //             let jsonData = {
                                    //                 id: "idPointDataSXTCnanshanqushengdao",
                                    //             };
                                    //             window.appInstance.uniCall("removeAllData", jsonData, result => {

                                    //                 let jsondata = {
                                    //                     id: "idPointDataSXTCnanshanqushengdao", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                    //                     attribute: ["type"],
                                    //                     data: _this.nanshanqushengdao
                                    //                 }
                                    //                 appInstance.uniCall('addPointData', jsondata, (result) => {
                                    //                     console.log(result);
                                    //                     let jsonData = {
                                    //                         id: "nanshanqushengdao",
                                    //                         name: "idLayerSXT",
                                    //                         coordZ: "0",
                                    //                         coordTypeZ: 2,
                                    //                         visible: false,
                                    //                         subMaxMapLevel: 18,
                                    //                         subRadius: 500,
                                    //                         drawMax: 50,
                                    //                         iconName: "event_02",
                                    //                         iconScale: 1,
                                    //                         labelScale: 1,
                                    //                         autoScale: false,
                                    //                         legends: [{
                                    //                             name: '省道',
                                    //                             color: '#FFFFFF',
                                    //                             iconName: 'custom-省道',
                                    //                             labelScale: 0.7,
                                    //                             iconScale: 1,
                                    //                         }],
                                    //                         legendAttr: "type",
                                    //                         aggDataId: "idPointDataSXTCnanshanqushengdao",
                                    //                     };
                                    //                     appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                    //                         console.log(result);
                                    //                     });

                                    //                 });
                                    //             });
                                    //         }

                                    //     });

                                    // });
                                    //添加深圳的道路名称
                                    var p1 = new Promise((resolve, reject) => {
                                        axios
                                            .get('./json/shenzhenshi_shapefiles_json/shenzhenshi_ditie_lines.json')
                                            .then((res) => {
                                                resolve(res.data);
                                            })
                                            .catch((err) => {
                                                reject(err);
                                            });
                                    });
                                    Promise.all([p1]).then((res) => {
                                        let _this = this;
                                        //将数据推到图层
                                        res.forEach((el, index) => {
                                            let n = 0;
                                            if (index == 0) {
                                                el.features.forEach((item) => {
                                                    //添加数据
                                                    item.geometry.coordinates[0].forEach(item1 => {
                                                        if (n % 15 == 0) {
                                                            _this.shenzhenditie.push({
                                                                id: 'ditie' + n,
                                                                type: '地铁',
                                                                label: "",
                                                                coord: item1,
                                                                coordZ: 0,
                                                            })
                                                            _this.shenzhendata.push({
                                                                id: 'ditie' + n,
                                                                type: '地铁',
                                                                label: "",
                                                                coord: item1,
                                                                coordZ: 0,
                                                            })
                                                        }
                                                        n++;
                                                    })
                                                });
                                                let jsonData = {
                                                    id: "idPointDataSXTCshenzhenditie",
                                                };
                                                window.appInstance.uniCall("removeAllData", jsonData, result => {

                                                    let jsondata = {
                                                        id: "idPointDataSXTCshenzhenditie", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                        attribute: ["type"],
                                                        data: _this.shenzhenditie
                                                    }
                                                    appInstance.uniCall('addPointData', jsondata, (result) => {
                                                        console.log(result);
                                                        let jsonData = {
                                                            id: "shenzhenditie",
                                                            name: "idLayerSXT",
                                                            coordZ: "0",
                                                            coordTypeZ: 2,
                                                            visible: false,
                                                            subMaxMapLevel: 18,
                                                            subRadius: 500,
                                                            drawMax: 50,
                                                            iconName: "event_02",
                                                            iconScale: 0.7,
                                                            labelScale: 1,
                                                            autoScale: false,
                                                            legends: [{
                                                                name: '地铁',
                                                                color: '#FFFFFF',
                                                                iconName: 'custom-地铁',
                                                                labelScale: 1,
                                                                iconScale: 0.7,
                                                            }],
                                                            legendAttr: "type",
                                                            aggDataId: "idPointDataSXTCshenzhenditie",
                                                        };
                                                        appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                                            console.log(result);
                                                        });

                                                    });
                                                });
                                            }

                                        });

                                    });
                                    var p1 = new Promise((resolve, reject) => {
                                        axios
                                            .get('./json/shenzhenshi_shapefiles_json/shenzhenshi_gaosu_lines_with_numbers.json')
                                            .then((res) => {
                                                resolve(res.data);
                                            })
                                            .catch((err) => {
                                                reject(err);
                                            });
                                    });
                                    Promise.all([p1]).then((res) => {
                                        let _this = this;
                                        //将数据推到图层
                                        res.forEach((el, index) => {
                                            let n = 0;
                                            if (index == 0) {
                                                el.features.forEach((item) => {
                                                    //添加数据
                                                    item.geometry.coordinates[0].forEach(item1 => {
                                                        if (n % 15 == 0 && item.properties.road_number != "UNKNOWN") {
                                                            this.shenzhengaosu.push({
                                                                id: 'gaosu' + n,
                                                                type: '高速',
                                                                label: item.properties.road_number,
                                                                coord: item1,
                                                                coordZ: 0,
                                                            })
                                                            _this.shenzhendata.push({
                                                                id: 'gaosu' + n,
                                                                type: '高速',
                                                                label: "",
                                                                coord: item1,
                                                                coordZ: 0,
                                                            })
                                                        }
                                                        n++;
                                                    })
                                                });
                                                let jsonData = {
                                                    id: "idPointDataSXTCshenzhengaosu",
                                                };
                                                window.appInstance.uniCall("removeAllData", jsonData, result => {

                                                    let jsondata = {
                                                        id: "idPointDataSXTCshenzhengaosu", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                        attribute: ["type"],
                                                        data: _this.shenzhengaosu
                                                    }
                                                    appInstance.uniCall('addPointData', jsondata, (result) => {
                                                        console.log(result);
                                                        let jsonData = {
                                                            id: "shenzhengaosu",
                                                            name: "idLayerSXT",
                                                            coordZ: "0",
                                                            coordTypeZ: 2,
                                                            visible: false,
                                                            subMaxMapLevel: 18,
                                                            subRadius: 500,
                                                            drawMax: 25,
                                                            iconName: "event_02",
                                                            iconScale: 1,
                                                            labelScale: 1,
                                                            autoScale: false,
                                                            legends: [{
                                                                name: '高速',
                                                                color: '#FFFFFF',
                                                                iconName: 'custom-高速',
                                                                labelScale: 0.7,
                                                                iconScale: 1,
                                                            }],
                                                            legendAttr: "type",
                                                            aggDataId: "idPointDataSXTCshenzhengaosu",
                                                        };
                                                        appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                                            console.log(result);
                                                        });

                                                    });
                                                });
                                            }

                                        });

                                    });
                                    // var p1 = new Promise((resolve, reject) => {
                                    //     axios
                                    //         .get('./json/shenzhenshi_shapefiles_json/shenzhenshi_guodao_lines.json')
                                    //         .then((res) => {
                                    //             resolve(res.data);
                                    //         })
                                    //         .catch((err) => {
                                    //             reject(err);
                                    //         });
                                    // });
                                    // Promise.all([p1]).then((res) => {
                                    //     let _this = this;
                                    //     //将数据推到图层
                                    //     res.forEach((el, index) => {
                                    //         let n = 0;
                                    //         if (index == 0) {
                                    //             el.features.forEach((item) => {
                                    //                 //添加数据
                                    //                 item.geometry.coordinates[0].forEach(item1 => {
                                    //                     if (n % 10 == 0) {
                                    //                         this.shenzhenguodao.push({
                                    //                             id: 'guodao' + n,
                                    //                             type: '国道',
                                    //                             label: "",
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                         _this.shenzhendata.push({
                                    //                             id: 'guodao' + n,
                                    //                             type: '国道',
                                    //                             label: "",
                                    //                             coord: item1,
                                    //                             coordZ: 0,
                                    //                         })
                                    //                     }
                                    //                     n++;
                                    //                 })
                                    //             });
                                    //             let jsonData = {
                                    //                 id: "idPointDataSXTCshenzhenguodao",
                                    //             };
                                    //             window.appInstance.uniCall("removeAllData", jsonData, result => {

                                    //                 let jsondata = {
                                    //                     id: "idPointDataSXTCshenzhenguodao", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                    //                     attribute: ["type"],
                                    //                     data: _this.shenzhenguodao
                                    //                 }
                                    //                 appInstance.uniCall('addPointData', jsondata, (result) => {
                                    //                     console.log(result);
                                    //                     let jsonData = {
                                    //                         id: "shenzhenguodao",
                                    //                         name: "idLayerSXT",
                                    //                         coordZ: "0",
                                    //                         coordTypeZ: 0,
                                    //                         visible: false,
                                    //                         subMaxMapLevel: 18,
                                    //                         subRadius: 500,
                                    //                         drawMax: 100,
                                    //                         iconName: "event_02",
                                    //                         iconScale: 1,
                                    //                         labelScale: 1,
                                    //                         autoScale: false,
                                    //                         legends: [{
                                    //                             name: '国道',
                                    //                             color: '#73FFFF',
                                    //                             iconName: 'custom-高速',
                                    //                             labelScale: 1,
                                    //                             iconScale: 1,
                                    //                         }],
                                    //                         legendAttr: "type",
                                    //                         aggDataId: "idPointDataSXTCshenzhenguodao",
                                    //                     };
                                    //                     appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                    //                         console.log(result);
                                    //                     });

                                    //                 });
                                    //             });
                                    //         }

                                    //     });

                                    // });
                                    var p1 = new Promise((resolve, reject) => {
                                        axios
                                            .get('./json/shenzhenshi_shapefiles_json/shenzhenshi_shengdao_lines_with_numbers.json')
                                            .then((res) => {
                                                resolve(res.data);
                                            })
                                            .catch((err) => {
                                                reject(err);
                                            });
                                    });
                                    Promise.all([p1]).then((res) => {
                                        let _this = this;
                                        //将数据推到图层
                                        res.forEach((el, index) => {
                                            let n = 0;
                                            if (index == 0) {
                                                el.features.forEach((item) => {
                                                    //添加数据
                                                    item.geometry.coordinates[0].forEach(item1 => {
                                                        if (n % 350 == 0 && item.properties.road_number != "UNKNOWN") {
                                                            this.shenzhenshengdao.push({
                                                                id: 'shengdao' + n,
                                                                type: '省道',
                                                                label: item.properties.road_number,
                                                                coord: item1,
                                                                coordZ: 0,
                                                            })
                                                            _this.shenzhendata.push({
                                                                id: 'shengdao' + n,
                                                                type: '省道',
                                                                label: "",
                                                                coord: item1,
                                                                coordZ: 0,
                                                            })
                                                        }
                                                        n++;
                                                    })
                                                });
                                                let jsonData = {
                                                    id: "idPointDataSXTCshenzhenshengdao",
                                                };
                                                window.appInstance.uniCall("removeAllData", jsonData, result => {

                                                    let jsondata = {
                                                        id: "idPointDataSXTCshenzhenshengdao", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                        attribute: ["type"],
                                                        data: _this.shenzhenshengdao
                                                    }
                                                    appInstance.uniCall('addPointData', jsondata, (result) => {
                                                        console.log(result);
                                                        let jsonData = {
                                                            id: "shenzhenshengdao",
                                                            name: "idLayerSXT",
                                                            coordZ: "0",
                                                            coordTypeZ: 2,
                                                            visible: false,
                                                            subMaxMapLevel: 18,
                                                            subRadius: 500,
                                                            drawMax: 50,
                                                            iconName: "event_02",
                                                            iconScale: 1,
                                                            labelScale: 1,
                                                            autoScale: false,
                                                            legends: [{
                                                                name: '省道',
                                                                color: '#000000',
                                                                iconName: 'custom-省道',
                                                                labelScale: 0.7,
                                                                iconScale: 1,
                                                            }],
                                                            legendAttr: "type",
                                                            aggDataId: "idPointDataSXTCshenzhenshengdao",
                                                        };
                                                        appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                                            console.log(result);
                                                        });

                                                    });
                                                });
                                            }

                                        });

                                    });

                                })

                            })
                        });
                    });



                });


            },
            //添加多个地图
            addpath() {
                let _this = this;
                let jsonData = {
                    id: "pathquanqiu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                    name: "layerName", // 图层名称，支持为图层自定义名称
                    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                    coordZ: 10000, // 高度（单位：米）
                    type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                    color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
                    colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                    width: 6000, // 路径宽度（单位：米）
                    tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                    autoScale: true,

                    shpPath: "/ne_10m_roads/ne_10m_roads_Road_3.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"

                };

                appInstance.uniCall("addPathShp", jsonData, (result) => {
                    jsonData = {
                        id: "pathquanqiu",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    let jsonData1 = {
                        id: "pathzhongguo1", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                        name: "layerName", // 图层名称，支持为图层自定义名称
                        coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                        coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                        coordZ: 10000, // 高度（单位：米）
                        type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                        color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
                        colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                        width: 6000, // 路径宽度（单位：米）
                        tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                        autoScale: true,

                        shpPath: "/gonglushp/roa_4m.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                    };

                    appInstance.uniCall("addPathShp", jsonData1, (result) => {
                        console.log(result);

                        jsonData = {
                            id: "pathzhongguo1",
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                            let jsonData1 = {
                                id: "pathzhongguotielu1", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                name: "layerName", // 图层名称，支持为图层自定义名称
                                coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                                coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                                coordZ: 10000, // 高度（单位：米）
                                type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                                color: "#ffff00", // 路线颜色，"" 颜色透明（HEX 颜色值）
                                colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                                width: 5000, // 路径宽度（单位：米）
                                tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                                autoScale: true,

                                shpPath: "/quanguotielu/tielu.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                            };
                            appInstance.uniCall("addPathShp", jsonData1, (result) => {
                                console.log(result);
                                jsonData = {
                                    id: "pathzhongguotielu1",
                                    overlayType: 'path',
                                    visible: false,
                                };

                                appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                    console.log(result);
                                    let jsonData1 = {
                                        id: "pathzhongguo2", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                        name: "layerName", // 图层名称，支持为图层自定义名称
                                        coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                                        coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                                        coordZ: 10000, // 高度（单位：米）
                                        type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                                        color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
                                        colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                                        width: 4000, // 路径宽度（单位：米）
                                        tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                                        autoScale: true,

                                        shpPath: "/gonglushp/roa_4m.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                                    };

                                    appInstance.uniCall("addPathShp", jsonData1, (result) => {
                                        console.log(result);

                                        jsonData = {
                                            id: "pathzhongguo2",
                                            overlayType: 'path',
                                            visible: false,
                                        };

                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                            console.log(result);
                                            let jsonData1 = {
                                                id: "pathzhongguotielu2", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                name: "layerName", // 图层名称，支持为图层自定义名称
                                                coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                                                coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                                                coordZ: 10000, // 高度（单位：米）
                                                type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                                                color: "#ffff00", // 路线颜色，"" 颜色透明（HEX 颜色值）
                                                colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                                                width: 3000, // 路径宽度（单位：米）
                                                tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                                                autoScale: true,

                                                shpPath: "/quanguotielu/tielu.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                                            };
                                            appInstance.uniCall("addPathShp", jsonData1, (result) => {
                                                console.log(result);
                                                jsonData = {
                                                    id: "pathzhongguotielu2",
                                                    overlayType: 'path',
                                                    visible: false,
                                                };

                                                appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                    console.log(result);
                                                    let jsonData1 = {
                                                        id: "pathzhongguo3", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                        name: "layerName", // 图层名称，支持为图层自定义名称
                                                        coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                                                        coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                                                        coordZ: 10000, // 高度（单位：米）
                                                        type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                                                        color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
                                                        colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                                                        width: 2300, // 路径宽度（单位：米）
                                                        tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                                                        autoScale: true,

                                                        shpPath: "/gonglushp/roa_4m.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                                                    };

                                                    appInstance.uniCall("addPathShp", jsonData1, (result) => {
                                                        console.log(result);

                                                        jsonData = {
                                                            id: "pathzhongguo3",
                                                            overlayType: 'path',
                                                            visible: false,
                                                        };

                                                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                            console.log(result);
                                                            let jsonData1 = {
                                                                id: "pathzhongguotielu3", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                                                name: "layerName", // 图层名称，支持为图层自定义名称
                                                                coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                                                                coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                                                                coordZ: 10000, // 高度（单位：米）
                                                                type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                                                                color: "#ffff00", // 路线颜色，"" 颜色透明（HEX 颜色值）
                                                                colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                                                                width: 1300, // 路径宽度（单位：米）
                                                                tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                                                                autoScale: true,

                                                                shpPath: "/quanguotielu/tielu.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                                                            };
                                                            appInstance.uniCall("addPathShp", jsonData1, (result) => {
                                                                console.log(result);
                                                                jsonData = {
                                                                    id: "pathzhongguotielu3",
                                                                    overlayType: 'path',
                                                                    visible: false,
                                                                };

                                                                appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                                                    console.log(result);

                                                                })

                                                            })
                                                        });
                                                    });
                                                })

                                            })
                                        });
                                    });
                                })

                            })
                        });
                    });



                });
            },
            fold() { this.isFold = false },
            //切换视角
            switchCreama(item, index) {
                let jsonData2 = {
                    state: 'free',
                };
                appInstance.uniCall('setCameraRestrictionState', jsonData2, (result) => {
                    console.log(result);
                });
                if (item.id == 2) {
                    let jsonData1 = {
                        coordType: 0,
                        coordTypeZ: 0,
                        centerCoord: [110.15251278239,  38.11281204143],
                        coordZ: -246527.17332165316,
                        distance: 9948550.4,
                        pitch: 89,
                        heading: 343.2019,
                        fly: true,
                        duration: 1,
                    };

                    appInstance.uniCall('setCamera', jsonData1, (result) => {
                        console.log(result);
                        //this.data2 = this.quanqiudata;
                    });
                } else if (item.id == 3) {
                    let jsonData1 = {
                        coordType: 0,
                        coordTypeZ: 0,
                        centerCoord: [111.1090884948,  30.25210892924],
                        coordZ: 93075.22183579612,
                        distance: 2936823.68,
                        pitch: 66.863327,
                        heading: 346.723988,
                        fly: true,
                        duration: 1,
                    };

                    appInstance.uniCall('setCamera', jsonData1, (result) => {
                        console.log(result);
                        //this.data2 = this.zhongguodata;
                    });
                } else if (item.id == 4) {
                    // let jsonData1 = {
                    //     id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                    //     name: "layerName", // 图层名称，支持为图层自定义名称
                    //     width: 2500
                    // };
                    // appInstance.uniCall("updatePathStyle", jsonData1, (result) => {
                    //     console.log(result);
                    // })
                    jsonData1 = {
                        coordType: 0,
                        coordTypeZ: 0,
                        centerCoord: [113.11130624709,  22.89168815367],
                        coordZ: -15068.64885974395,
                        distance: 162213.07,
                        pitch: 26.724567,
                        heading: 329.974009,
                        fly: true,
                        duration: 1,
                    };

                    appInstance.uniCall('setCamera', jsonData1, (result) => {
                        console.log(result);
                        //this.data2 = this.guangdongdata;
                    });
                } else if (item.id == 5) {
                    // appInstance.uniCall(
                    //     'switchState', {
                    //         name: "L2默认状态",
                    //         sceneName: "L3深圳湾",
                    //     },
                    //     (result) => {
                    //         console.log(result);
                    //         this.data2 = this.shenzhendata;
                    //     }
                    // );
                    let jsonData1 = {
                        coordType: 0,
                        coordTypeZ: 0,
                        centerCoord: [114.04644043592, 22.52969142421],
                        coordZ: 2404.3951215968,
                        distance: 12768.83125,
                        pitch: 23.07523,
                        heading: 357.305475,
                        fly: true,
                        duration: 1,
                    };

                    appInstance.uniCall('setCamera', jsonData1, (result) => {
                        console.log(result);
                        //this.data2 = this.shenzhendata;
                    });
                } else if (item.id == 6) {
                    let jsonData1 = {
                        coordType: 0,
                        coordTypeZ: 0,
                        centerCoord: [113.93177754135, 22.52417811042],
                        coordZ: 170.91254834522,
                        distance: 1871.595625,
                        pitch: 24.760433,
                        heading: 9.052576,
                        fly: true,
                        duration: 1,
                    };

                    appInstance.uniCall('setCamera', jsonData1, (result) => {
                        console.log(result);
                        console.log("南山区数量:" + this.nanshanqudata.length)
                            //this.data2 = this.nanshanqudata;
                    });

                } else if (item.id == 7) {
                    let jsonData1 = {
                        coordType: 0,
                        coordTypeZ: 0,
                        centerCoord: [113.94743502909, 22.51949808839],
                        coordZ: 217.20935559609,
                        distance: 554.326211,
                        pitch: 13.05797,
                        heading: 308.342789,
                        fly: true,
                        duration: 1,
                    };

                    appInstance.uniCall('setCamera', jsonData1, (result) => {
                        console.log(result);
                        //this.data2 = this.nanshanqudata;
                    });
                }
                // this.addSatel(item)
            },
            switchstatus(item, index) {
                appInstance.uniCall(
                    'switchState', {
                        name: item.name,
                        sceneName: item.sceneName,
                    },
                    (result) => {
                        console.log(result);
                    }
                );
            },
            // addPath() {
            //     let _this = this;
            //     let jsonData = {
            //         id: "path", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            //         name: "layerName", // 图层名称，支持为图层自定义名称
            //         coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            //         coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            //         coordZ: 10000, // 高度（单位：米）
            //         type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
            //         color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
            //         colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
            //         width: 2, // 路径宽度（单位：米）
            //         tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            //         autoScale: false,

            //         shpPath: "/ne_10m_roads/ne_10m_roads_road.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"

            //     };

            //     appInstance.uniCall("addPathShp", jsonData, (result) => {
            //         jsonData = {
            //             id: "path",
            //             overlayType: 'path',
            //             visible: false,
            //         };

            //         appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
            //             console.log(result);
            //         });
            //         let jsonData1 = {
            //             id: "path0", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            //             name: "layerName", // 图层名称，支持为图层自定义名称
            //             coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            //             coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            //             coordZ: 10000, // 高度（单位：米）
            //             type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
            //             color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
            //             colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
            //             width: 2, // 路径宽度（单位：米）
            //             tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            //             autoScale: false,

            //             shpPath: "/gonglushp/roa_4m.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
            //         };

            //         appInstance.uniCall("addPathShp", jsonData1, (result) => {
            //             console.log(result);

            //             jsonData = {
            //                 id: "path0",
            //                 overlayType: 'path',
            //                 visible: false,
            //             };

            //             appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
            //                 console.log(result);
            //                 let jsonData1 = {
            //                     id: "pathtielu", // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            //                     name: "layerName", // 图层名称，支持为图层自定义名称
            //                     coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            //                     coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            //                     coordZ: 10000, // 高度（单位：米）
            //                     type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
            //                     color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
            //                     colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
            //                     width: 2, // 路径宽度（单位：米）
            //                     tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            //                     autoScale: false,

            //                     shpPath: "/quanguotielu/tielu.shp", // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
            //                 };
            //                 appInstance.uniCall("addPathShp", jsonData1, (result) => {
            //                     console.log(result);
            //                     jsonData = {
            //                         id: "pathtielu",
            //                         overlayType: 'path',
            //                         visible: false,
            //                     };

            //                     appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
            //                         console.log(result);
            //                         _this.setSceneEffectInfo(true);

            //                         _this.isZZ = false;
            //                         _this.addSatel(_this.legendList2[0])
            //                         _this.data2 = _this.quanqiudata.length + _this.guangdongdata.length + _this.shenzhendata.length + _this.nanshanqudata.length;
            //                         return true;
            //                     })

            //                 })
            //             });
            //         });



            //     });
            // },
            addSatel(item, index) {
                item.active = true;
                if (item.id == 1) {
                    this.isFold = true;
                    return;
                }
                this.curCamera = item.id;
                _this = this;
                // let jsonData = {
                //     id: "guangdongCitys",
                //     overlayType: 'LandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });

                // jsonData = {
                //     id: 39,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: 33,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: 34,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: 24,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: 14,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: 15,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // for (let n = 1; n < 6; n++) {
                //     jsonData = {
                //         id: "path" + n,
                //         overlayType: 'path',
                //         visible: false,
                //     };

                //     appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //         console.log(result);
                //     });
                // }

                // jsonData = {
                //     id: 41,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });

                // this.isvisible = false;
                // jsonData = {
                //     id: "modelTrailLayerId",
                //     overlayType: 'modelTrailLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "nanshannqu",
                //     overlayType: 'LandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "path16",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "path18",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "path21",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "path23",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "path14",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "shenzhen",
                //     overlayType: 'LandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: 37,
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // for (let n = 58; n < 62; n++) {
                //     let jsonData = {
                //         id: 'path' + this.legendList1[n].id,
                //         overlayType: 'path',
                //         visible: false,
                //     };

                //     appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //         console.log(result);
                //     });
                // }
                // for (let index = 0; index < 13; index++) {
                //     let num = index + 1;
                //     let jsonData5 = {
                //         id: num,
                //         overlayType: 'subLandmarkLayer',
                //         visible: false,
                //     };

                //     appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                //         console.log(result);
                //     });
                // }
                // for (let index = 41; index < 50; index++) {
                //     let num = index + 1;
                //     let jsonData5 = {
                //         id: num,
                //         overlayType: 'subLandmarkLayer',
                //         visible: false,
                //     };

                //     appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                //         console.log(result);
                //     });
                // }
                // jsonData = {
                //     id: "path",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "path0",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "pathtielu",
                //     overlayType: 'path',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });

                // jsonData = {
                //     id: "countries",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "nanshanquditie",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "nanshanqugaosu",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "nanshanquguodao",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "nanshanqushengdao",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "shenzhenditie",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "shenzhenguodao",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "shenzhenshengdao",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "shenzhengaosu",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                // jsonData = {
                //     id: "chinaCitys",
                //     overlayType: 'subLandmarkLayer',
                //     visible: false,
                // };

                // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                //     console.log(result);
                // });
                item.isAdd = true
                if (item.id == 2) {
                    this.isRunning = true;
                    let jsonData = {
                        id: "guangdongCitys",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: 39,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 33,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 34,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 24,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 14,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 15,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let n = 1; n < 6; n++) {
                        jsonData = {
                            id: "path" + n,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }

                    jsonData = {
                        id: 41,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    this.isvisible = false;
                    jsonData = {
                        id: "nanshannqu",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path16",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path18",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path13",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path24",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path21",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path23",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhen",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    for (let n = 58; n < 62; n++) {
                        jsonData = {
                            id: 'path' + this.legendList1[n].id,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 0; index < 13; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 41; index < 50; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }


                    jsonData = {
                        id: "pathtielu",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquditie",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqugaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqushengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenditie",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenshengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhengaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "chinaCitys",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 37,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    // jsonData = {
                    //     id: "path0",
                    //     overlayType: 'path',
                    //     visible: true,
                    // };

                    // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                    //     console.log(result);
                    // });
                    jsonData = {
                        id: "countries",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "modelTrailLayerId",
                        overlayType: 'modelTrailLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                } else if (item.id == 3) {
                    this.isRunning = false;
                    let jsonData = {
                        id: "guangdongCitys",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path13",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path24",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });


                    jsonData = {
                        id: 39,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 33,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 34,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 24,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 14,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 15,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let n = 1; n < 6; n++) {
                        jsonData = {
                            id: "path" + n,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }

                    jsonData = {
                        id: 41,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    this.isvisible = false;
                    jsonData = {
                        id: "modelTrailLayerId",
                        overlayType: 'modelTrailLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshannqu",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path16",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path18",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path21",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path23",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhen",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    for (let n = 58; n < 62; n++) {
                        jsonData = {
                            id: 'path' + this.legendList1[n].id,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 0; index < 13; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 41; index < 50; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }
                    jsonData = {
                        id: "path",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path0",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });


                    jsonData = {
                        id: "countries",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquditie",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqugaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqushengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenditie",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenshengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhengaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: 37,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "chinaCitys",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    // jsonData = {
                    //     id: "path0",
                    //     overlayType: 'path',
                    //     visible: false,
                    // };

                    // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                    //     console.log(result);
                    // });
                    // jsonData = {
                    //     id: "pathtielu",
                    //     overlayType: 'path',
                    //     visible: false,
                    // };

                    // appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                    //     console.log(result);
                    // });
                } else if (item.id == 4) {
                    this.isRunning = false;
                    let jsonData = {
                        id: 24,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path13",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path24",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 14,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 15,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 41,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    this.isvisible = false;
                    jsonData = {
                        id: "modelTrailLayerId",
                        overlayType: 'modelTrailLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshannqu",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path16",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path18",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path21",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path23",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhen",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 37,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let n = 58; n < 62; n++) {
                        jsonData = {
                            id: 'path' + this.legendList1[n].id,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 0; index < 13; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 41; index < 50; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }
                    jsonData = {
                        id: "path",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path0",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "pathtielu",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "countries",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquditie",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqugaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqushengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenditie",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenshengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhengaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "chinaCitys",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });


                    jsonData = {
                        id: "guangdongCitys",
                        overlayType: 'LandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 33,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 34,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 39,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let n = 1; n < 6; n++) {
                        jsonData = {
                            id: "path" + n,
                            overlayType: 'path',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }

                } else if (item.id == 5) {
                    this.isRunning = false;
                    let jsonData = {
                        id: "guangdongCitys",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path13",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path24",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 39,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    for (let n = 1; n < 6; n++) {
                        jsonData = {
                            id: "path" + n,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }

                    jsonData = {
                        id: 41,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    this.isvisible = false;
                    jsonData = {
                        id: "modelTrailLayerId",
                        overlayType: 'modelTrailLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshannqu",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: 37,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let n = 58; n < 62; n++) {
                        jsonData = {
                            id: 'path' + this.legendList1[n].id,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 0; index < 13; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 41; index < 50; index++) {
                        let num = index + 1;
                        let jsonData5 = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData5, (result) => {
                            console.log(result);
                        });
                    }
                    jsonData = {
                        id: "path",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path0",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "pathtielu",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "countries",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquditie",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqugaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqushengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });




                    jsonData = {
                        id: "chinaCitys",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 33,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 34,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "shenzhen",
                        overlayType: 'LandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path16",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path18",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path21",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path23",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 24,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 14,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 15,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenditie",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenshengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhengaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                } else if (item.id == 6) {
                    this.isRunning = false;
                    let jsonData = {
                        id: "guangdongCitys",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path13",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path24",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 39,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });



                    for (let n = 1; n < 6; n++) {
                        jsonData = {
                            id: "path" + n,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }


                    this.isvisible = false;
                    jsonData = {
                        id: "modelTrailLayerId",
                        overlayType: 'modelTrailLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });



                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: 37,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });



                    jsonData = {
                        id: "path",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path0",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "pathtielu",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "countries",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "chinaCitys",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 33,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 34,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "shenzhen",
                        overlayType: 'LandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path16",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path18",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path21",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path23",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 24,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 14,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 15,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenditie",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenshengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhengaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let n = 58; n < 62; n++) {
                        jsonData = {
                            id: 'path' + this.legendList1[n].id,
                            overlayType: 'path',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    jsonData = {
                        id: "nanshannqu",
                        overlayType: 'LandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 41,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let index = 0; index < 13; index++) {
                        let num = index + 1;
                        jsonData = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 41; index < 50; index++) {
                        let num = index + 1;
                        jsonData = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    jsonData = {
                        id: "nanshanquditie",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqugaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqushengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                } else if (item.id == 7) {
                    this.isRunning = false;
                    this.isRunning = false;
                    this.curCamera = 6;
                    let jsonData = {
                        id: "guangdongCitys",
                        overlayType: 'LandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path13",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path24",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 39,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });



                    for (let n = 1; n < 6; n++) {
                        jsonData = {
                            id: "path" + n,
                            overlayType: 'path',
                            visible: false,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }


                    this.isvisible = false;
                    jsonData = {
                        id: "modelTrailLayerId",
                        overlayType: 'modelTrailLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });



                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: 37,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });



                    jsonData = {
                        id: "path",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path0",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "pathtielu",
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "countries",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "chinaCitys",
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 33,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 34,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                    jsonData = {
                        id: "shenzhen",
                        overlayType: 'LandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path16",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path18",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path21",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path23",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "path14",
                        overlayType: 'path',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 24,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 14,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 15,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenditie",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhenshengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "shenzhengaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let n = 58; n < 62; n++) {
                        jsonData = {
                            id: 'path' + this.legendList1[n].id,
                            overlayType: 'path',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    jsonData = {
                        id: "nanshannqu",
                        overlayType: 'LandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: 41,
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    for (let index = 0; index < 13; index++) {
                        let num = index + 1;
                        jsonData = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    for (let index = 41; index < 50; index++) {
                        let num = index + 1;
                        jsonData = {
                            id: num,
                            overlayType: 'subLandmarkLayer',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }
                    jsonData = {
                        id: "nanshanquditie",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqugaosu",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanquguodao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    jsonData = {
                        id: "nanshanqushengdao",
                        overlayType: 'subLandmarkLayer',
                        visible: true,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                }
            },
            nanshanqu() {
                let jsonData = {
                    id: 'nanshannqu',
                    name: '南山区县',
                    coordType: 0,
                    coordTypeZ: 0,
                    autoScale: false,
                    visible: false,
                    legends: [{
                        name: '省',
                        color: '#73FFFF',
                        iconName: 'site_02',
                        labelScale: 1,
                        iconScale: 1,
                    }, {
                        name: '区',
                        color: '#FFF',
                        iconName: 'site_03',
                        labelScale: 1,
                        iconScale: 1,
                    }],
                    data: [{
                        id: '南山区',
                        type: '区',
                        label: '南山区',
                        coord: [113.925525, 22.536341],
                        coordZ: 0,
                    }],
                };

                appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
                    console.log(result);
                });
            },
            addshenzhen() {
                var p1 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/乡.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                Promise.all([p1]).then((res) => {
                    let _this = this;
                    //将数据推到图层
                    res.forEach((el, index) => {

                        if (index == 0) {
                            el.district.forEach((item) => {
                                if (item.父节点编码 == "440300") {
                                    _this.guangdongData.push({
                                        id: '区' + item.ID,
                                        type: '区',
                                        label: item.districtName,
                                        coord: [item.中心经度, item.中心纬度],
                                        coordZ: 0,
                                    })
                                }

                            });
                            let jsonData = {
                                id: 'shenzhen',
                                name: '深圳区县',
                                coordType: 0,
                                coordTypeZ: 0,
                                autoScale: false,
                                legends: [{
                                    name: '省',
                                    color: '#73FFFF',
                                    iconName: 'site_02',
                                    labelScale: 1,
                                    iconScale: 1,
                                }, {
                                    name: '区',
                                    color: '#FFF',
                                    iconName: 'site_03',
                                    labelScale: 1,
                                    iconScale: 1,
                                }],
                                data: _this.guangdongData,
                                visible: false,
                            };

                            appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
                                console.log(result);
                            });
                        }
                    });

                });
            },
            addGuangdongCity() {
                var p1 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/市.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                Promise.all([p1]).then((res) => {
                    let _this = this;
                    //将数据推到图层
                    res.forEach((el, index) => {

                        if (index == 0) {
                            el.city.forEach((item) => {
                                if (item.父节点编码 == "440000") {
                                    _this.guangdongData.push({
                                        id: '市' + item.ID,
                                        type: '市',
                                        label: item.cityName,
                                        coord: [item.中心经度, item.中心纬度],
                                        coordZ: 0,
                                    })
                                    _this.guangdongdata.push({
                                        id: '市' + item.ID,
                                        type: '市',
                                        label: item.cityName,
                                        coord: [item.中心经度, item.中心纬度],
                                        coordZ: 0,
                                    })
                                }

                            });
                            let jsonData = {
                                id: 'guangdongCitys',
                                name: '广东城市',
                                coordType: 0,
                                coordTypeZ: 0,
                                autoScale: false,
                                visible: false,
                                legends: [{
                                    name: '省',
                                    color: '#73FFFF',
                                    iconName: 'site_02',
                                    labelScale: 1,
                                    iconScale: 1,
                                }, {
                                    name: '市',
                                    color: '#FFF',
                                    iconName: 'site_02',
                                    labelScale: 1,
                                    iconScale: 1,
                                }],
                                data: _this.guangdongData,
                            };
                            console.log("广东的城市：" + _this.guangdongData.length)
                            appInstance.uniCall('addLandmarkLayer', jsonData, (result) => {
                                console.log(result);
                            });
                        }
                    });

                });
            },
            addCity() {
                var p1 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/省.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                var p2 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/市.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });

                Promise.all([p1, p2]).then((res) => {
                    let _this = this;
                    //将数据推到图层
                    res.forEach((el, index) => {
                        //整理省市文件数据
                        if (index == 0) {
                            el.province.forEach((item) => {
                                _this.chinaData.push({
                                    id: '省' + item.ID,
                                    type: '省',
                                    label: item.provinceName,
                                    coord: [item.中心经度, item.中心纬度],
                                    coordZ: 0,
                                })
                                _this.zhongguodata.push({
                                    id: '省' + item.ID,
                                    type: '省',
                                    label: item.provinceName,
                                    coord: [item.中心经度, item.中心纬度],
                                    coordZ: 0,
                                })
                            });
                        }
                        if (index == 1) {
                            el.city.forEach((item) => {
                                _this.chinaData.push({
                                    id: '市' + item.ID,
                                    type: '市',
                                    label: item.cityName,
                                    coord: [item.中心经度, item.中心纬度],
                                    coordZ: 0,
                                })
                                _this.zhongguodata.push({
                                    id: '市' + item.ID,
                                    type: '市',
                                    label: item.cityName,
                                    coord: [item.中心经度, item.中心纬度],
                                    coordZ: 0,
                                })
                            });
                            let jsonData = {
                                id: "idPointDataSXTC2chinaData",
                            };
                            window.appInstance.uniCall("removeAllData", jsonData, result => {
                                let _this = this
                                let jsondata = {
                                    id: "idPointDataSXTC2chinaData", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                                    attribute: ["type"],
                                    data: _this.chinaData
                                }
                                console.log("中国的城市：" + _this.chinaData.length);
                                appInstance.uniCall('addPointData', jsondata, (result) => {
                                    console.log(result);
                                    let jsonData = {
                                        id: "chinaCitys",
                                        name: "chinaCitys1",
                                        coordZ: "0",
                                        coordTypeZ: 2,
                                        visible: false,
                                        subMaxMapLevel: 18,
                                        subRadius: 500,
                                        drawMax: 100,
                                        iconName: "event_02",
                                        iconScale: 1,
                                        labelScale: 1,
                                        autoScale: false,
                                        legends: [{
                                            name: '省',
                                            color: '#FFFFFF',
                                            iconName: 'site_02',
                                            labelScale: 1,
                                            iconScale: 1,
                                        }, {
                                            name: '市',
                                            color: '#FFF',
                                            iconName: 'site_02',
                                            labelScale: 1,
                                            iconScale: 1,
                                        }],
                                        legendAttr: "type",
                                        aggDataId: "idPointDataSXTC2chinaData",
                                    };
                                    appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                                        console.log(result);

                                    });
                                });
                            });

                        }
                    });

                });
            },
            // 请求json数据
            getLandmarkLayerJsonData() {
                var p1 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/全球国家.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                var p2 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/全球首都.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                var p3 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/全球重要城市_中文版.geojson')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                Promise.all([p1, p2, p3]).then((res) => {
                    let _this = this;
                    //将数据推到图层
                    res.forEach((el, index) => {
                        _this.transDataLandmarkLayer(el, index);
                    });
                });
            },
            //将数据推到图层
            transDataLandmarkLayer(inJsonArr, index) {
                let _this = this;
                if (index == 0) {
                    inJsonArr.country.forEach((item) => {
                        _this.countryData.push({
                            id: item.ID,
                            type: '国家',
                            label: item.name,
                            coord: [item.lon, item.lat],
                            coordZ: 0,
                        })
                        _this.quanqiudata.push({
                            id: item.ID,
                            type: '国家',
                            label: item.name,
                            coord: [item.lon, item.lat],
                            coordZ: 0,
                        })
                    });
                }
                if (index == 1) {
                    inJsonArr.capital.forEach((item) => {
                        _this.countryData.push({
                            id: item.ID,
                            type: '首都',
                            label: item.name,
                            coord: [item.lon, item.lat],
                            coordZ: 0,
                        })
                        _this.quanqiudata.push({
                            id: item.ID,
                            type: '首都',
                            label: item.name,
                            coord: [item.lon, item.lat],
                            coordZ: 0,
                        })
                    });

                }
                if (index == 2) {
                    let _this = this
                    inJsonArr.features.forEach((item) => {
                        _this.countryData.push({
                            id: item.properties.FID,
                            type: '主要城市',
                            label: item.properties.CITY_NAME,
                            coord: item.geometry.coordinates,
                            coordZ: 0,
                        })
                        _this.quanqiudata.push({
                            id: item.properties.FID,
                            type: '主要城市',
                            label: item.properties.CITY_NAME,
                            coord: item.geometry.coordinates,
                            coordZ: 0,
                        })
                    });

                    let jsonData = {
                        id: "idPointDataSXTC2countryData",
                    };
                    window.appInstance.uniCall("removeAllData", jsonData, result => {

                        let jsondata = {
                            id: "idPointDataSXTC2countryData", // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                            attribute: ["type"],
                            data: _this.countryData
                        }
                        console.log("全球的城市:" + _this.countryData.length)
                        appInstance.uniCall('addPointData', jsondata, (result) => {
                            console.log(result);
                            _this.addCountry();
                        });
                    });

                }
            },
            addCountry(inJsonArr) {
                let _this = this
                let jsonData = {
                    id: "countries",
                    name: "idLayerSXT",
                    coordZ: "0",
                    coordTypeZ: 2,
                    visible: true,
                    subMaxMapLevel: 18,
                    subRadius: 500,
                    drawMax: 100,
                    iconName: "event_02",
                    iconScale: 1,
                    labelScale: 1,
                    autoScale: false,
                    legends: [{
                        name: '首都',
                        color: '#73FFFF',
                        iconName: 'site_02',
                        labelScale: 1,
                        iconScale: 1,
                    }, {
                        name: '国家',
                        color: '#FFF',
                        iconName: 'site_02',
                        labelScale: 1,
                        iconScale: 1,
                    }, {
                        name: '主要城市',
                        color: '#FFFFFF',
                        iconName: 'site_02',
                        labelScale: 1,
                        iconScale: 1,
                    }, ],
                    legendAttr: "type",
                    aggDataId: "idPointDataSXTC2countryData",
                };
                appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                    console.log(result);


                });

            },

            controlPathChecked(item, index) {
                item.active = !item.active;
                if (item.active) {
                    if (item.isAdd == undefined) {
                        let color = "#FF0000"
                        let width = 5;
                        let isautoScale = false;
                        let height = 0;
                        if (item.id == 16 || item.id == 18 || item.id == 21 || item.id == 60 || item.id == 61 || item.id == 62) {
                            color = "#FFBF00";
                            width = 5;
                        }
                        //高速
                        if (item.id == 60 || item.id == 16) {
                            color = "#FF8C00";
                            width = 5;
                            height = 5
                        }
                        //国道
                        if (item.id == 61 || item.id == 18) {
                            width = 4;
                            height = 8
                        }
                        //省道
                        if (item.id == 62 || item.id == 21) {
                            width = 3;
                            height = 10
                        }
                        if (item.id == 1 || item.id == 2 || item.id == 3 || item.id == 4 || item.id == 5) {
                            //width = 200;
                            width = 2;
                            isautoScale = false;
                            color = "#FF0000"
                                //height = 10000;
                        }
                        if (item.id == 14) {
                            color = "#D00000"
                        }
                        if (item.id == 14 || item.id == 59) {
                            width = 1.5;
                            height = 12
                        }
                        if (item.id == 23) {
                            width = 2;
                            color = "#00c755";
                            height = 3
                        }
                        if (item.id == 13 || item.id == 24) {
                            height = 83.84585524501;
                            width = 2.5;
                            color = "#D9C022"
                        }
                        // if (item.id == 59 || item.id == 60 || item.id == 61 || item.id == 62) {
                        //     height = 84.04585524501;
                        // }
                        if (item.id == 14) {
                            height = 84.04585524501;
                        }
                        if (item.id == 16) {
                            height = 84.24585524501;
                        }
                        if (item.id == 18) {
                            height = 84.44585524501;
                        }
                        if (item.id == 21) {
                            height = 84.64585524501;
                        }
                        if (item.id == 23) {
                            height = 84.84585524501;
                        }

                        let jsonData = {
                            id: "path" + item.id, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                            name: "layerName", // 图层名称，支持为图层自定义名称
                            coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                            coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                            coordZ: height, // 高度（单位：米）
                            type: "Segment06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
                            color: color, // 路线颜色，"" 颜色透明（HEX 颜色值）
                            colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
                            width: width, // 路径宽度（单位：米）
                            tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
                            autoScale: isautoScale,
                            shpPath: item.value, // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"
                            visible: false,
                        };

                        appInstance.uniCall("addPathShp", jsonData, (result) => {
                            console.log(result);
                            jsonData = {
                                id: "path" + item.id,
                                overlayType: 'path',
                                visible: false,
                            };

                            appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                                console.log(result);
                            });
                            item.isAdd = true;
                        });
                    } else {
                        let jsonData = {
                            id: "path" + item.id,
                            overlayType: 'path',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }

                } else {
                    let jsonData = {
                        id: "path" + item.id,
                        overlayType: 'path',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });

                }

            },
            //控制地标图的修改
            controlChecked(item, index) {
                item.active = !item.active;
                if (item.active) {
                    if (!item.isAdd) {
                        this.getEarthData(item);
                        item.isAdd = true;
                    } else {
                        let jsonData = {
                            id: item.id,
                            overlayType: 'subLandmarkLayer',
                            visible: true,
                        };

                        appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                            console.log(result);
                        });
                    }


                } else {

                    let jsonData = {
                        id: item.id,
                        overlayType: 'subLandmarkLayer',
                        visible: false,
                    };

                    appInstance.uniCall('setOverlayVisibility', jsonData, (result) => {
                        console.log(result);
                    });
                    // //清除图层
                    // let jsonData = {
                    //     id: item.id,
                    //     overlayType: "subLandmarkLayer"
                    // }
                    // appInstance.uniCall("removeOverlay", jsonData, (result) => {
                    //     console.log(result);
                    // });
                }
                //_this.getEarthData();
            },
            //全球的路径isLayerTopMost用false
            // 显示场景信息
            setSceneEffectInfo(isLayerTopMost) {
                let jsonData = {
                    lightPower: 1.0,
                    lightPowerTip: 1.0,
                    isLayerTopMost: isLayerTopMost,
                    divTipMovingDelay: 200,
                    focusDuration: 0.6,
                    gis3dtileShadow: true,
                    clickColor: '#ffff00',
                    clickEdgeWidth: 1,
                    tipMoveOnEdge: true,
                    labelColorStyle: 'default',
                };
                appInstance.uniCall('setSceneEffect', jsonData, (result) => {
                    console.log(result);
                });
            },
            addguangdong() {
                var p1 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/guangdong_bus_real_names.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                var p2 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/guangdong_airport_real_names.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                var p3 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/guangdong_railway_real_names.json')
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                Promise.all([p1, p2, p3]).then((res) => {
                    let _this = this;
                    res.forEach((el, index) => {
                        // if (index != 1) {
                        _this.transData2(el, index);
                        //}

                    });
                });
            },
            //处理数据
            transData2(earthArr, index) {
                let _this = this;
                let n = 0;

                earthArr.forEach(item => {
                    if (item.file_name == "深圳市shp_彩票店.shp") {
                        item.type = "legendName1"
                    } else if (item.file_name == "深圳市shp_餐饮.shp") {
                        item.type = "legendName2"
                    } else if (item.file_name == "深圳市shp_大厦.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "深圳市shp_购物.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "深圳市shp_购物场所.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "深圳市shp_火车站.shp") {
                        item.type = "legendName5"
                    } else if (item.file_name == "广东省机场火车站汽车站shp_机场.SHP") {
                        item.type = "legendName6"
                    } else if (item.file_name == "深圳市shp_交通设施.shp") {
                        item.type = "legendName7"
                    } else if (item.file_name == "深圳市shp_交通运输.shp") {
                        item.type = "legendName8"
                    } else if (item.file_name == "深圳市shp_金融服务.shp") {
                        item.type = "legendName9"
                    } else if (item.file_name == "深圳市shp_居民小区点.shp") {
                        item.type = "legendName10"
                    } else if (item.file_name == "深圳市shp_居委会点.shp") {
                        item.type = "legendName11"
                    } else if (item.file_name == "深圳市shp_科研教育.shp") {
                        item.type = "legendName12"
                    } else if (item.file_name == "深圳市shp_旅游.shp") {
                        item.type = "legendName13"
                    } else if (item.file_name == "深圳市shp_其他设施.shp") {
                        item.type = "legendName14"
                    } else if (item.file_name == "广东省机场火车站汽车站shp_汽车站.SHP") {
                        item.type = "legendName15"
                    } else if (item.file_name == "深圳市shp_山峰点.shp") {
                        item.type = "legendName16"
                    } else if (item.file_name == "深圳市shp_兴趣点（POI）.shp") {
                        item.type = "legendName17"
                    } else if (item.file_name == "深圳市shp_休闲娱乐.shp") {
                        item.type = "legendName18"
                    } else if (item.file_name == "深圳市shp_政府机关.shp") {
                        item.type = "legendName19"
                    } else if (item.file_name == "深圳市shp_住宿.shp") {
                        item.type = "legendName20"
                    } else if (item.file_name == "深圳市shp_宗教点.shp") {
                        item.type = "legendName21"
                    }
                    if (item.file_name == "深圳市shp_彩票店.shp") {
                        item.type = "legendName1"
                    } else if (item.file_name == "餐饮.SHP") {
                        item.type = "legendName2"
                    } else if (item.file_name == "大厦.SHP") {
                        item.type = "legendName3"
                    } else if (item.file_name == "超市商城.SHP") {
                        item.type = "legendName3"
                    } else if (item.file_name == "深圳市shp_购物场所.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "广东省机场火车站汽车站shp_火车站.SHP") {
                        item.type = "legendName5"
                    } else if (item.file_name == "深圳市shp_机场.shp" || item.file_name == "2025全球机场分布数据.SHP") {
                        item.type = "legendName6"
                    } else if (item.file_name == "深圳市shp_交通设施.shp") {
                        item.type = "legendName7"
                    } else if (item.file_name == "深圳市shp_交通运输.shp") {
                        item.type = "legendName8"
                    } else if (item.file_name == "银行.SHP") {
                        item.type = "legendName9"
                    } else if (item.file_name == "深圳市shp_居民小区点.shp") {
                        item.type = "legendName10"
                    } else if (item.file_name == "深圳市shp_居委会点.shp") {
                        item.type = "legendName11"
                    } else if (item.file_name == "深圳市shp_科研教育.shp") {
                        item.type = "legendName12"
                    } else if (item.file_name == "深圳市shp_旅游.shp") {
                        item.type = "legendName13"
                    } else if (item.file_name == "其他信息.SHP") {
                        item.type = "legendName14"
                    } else if (item.file_name == "公交站.SHP") {
                        item.type = "legendName15"
                    } else if (item.file_name == "深圳市shp_山峰点.shp") {
                        item.type = "legendName16"
                    } else if (item.file_name == "深圳市shp_兴趣点（POI）.shp") {
                        item.type = "legendName17"
                    } else if (item.file_name == "深圳市shp_休闲娱乐.shp") {
                        item.type = "legendName18"
                    } else if (item.file_name == "政府机构.SHP") {
                        item.type = "legendName19"
                    } else if (item.file_name == "宾馆酒店.SHP") {
                        item.type = "legendName20"
                    } else if (item.file_name == "公园.SHP") {
                        item.type = "legendName21"
                    } else if (item.file_name == "停车场.SHP") {
                        item.type = "legendName22"
                    } else if (item.file_name == "出入口.SHP") {
                        item.type = "legendName23"
                    } else if (item.file_name == "轮渡.SHP") {
                        item.type = "legendName24"
                    } else if (item.file_name == "收费站.SHP") {
                        item.type = "legendName25"
                    } else if (item.file_name == "药店.SHP" || item.file_name == "医疗.SHP") {
                        item.type = "legendName26"
                    } else if (item.file_name == "学校.SHP") {
                        item.type = "legendName27"
                    } else if (item.file_name == "gangkou.SHP") {
                        item.type = "legendName29"
                    }
                    item.label = "";
                    item.label = item.name;
                    item.coord = [item.longitude, item.latitude];
                    item.coordZ = 0;
                    item.id = n;
                    this.guangdongdata1.push(item);
                    this.guangdongdata.push(item);
                    n++;
                })


                // this.data = earthArr //.splice(0, 2000);
                if (index == 2) {

                    this.addData2(this.legendList[38]);
                }



            },
            // 请求数据
            getEarthData(item) {
                var p1 = new Promise((resolve, reject) => {
                    axios
                        .get('./json/' + item.value)
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });

                Promise.all([p1]).then((res) => {
                    let _this = this;
                    res.forEach((el, index) => {
                        _this.transData(el, index, item);
                    });
                });
            },
            //处理数据
            transData(earthArr, index, item1) {
                let _this = this;
                let n = 0;
                // if (item1.id == 33 || item1.id == 34) {
                //     _this.data = []
                // }
                earthArr.forEach(item => {
                    if (item.file_name == "南山区_公安交警.shp") {
                        item.type = "legendName11"
                    } else if (item.file_name == "南山区_餐饮.shp") {
                        item.type = "legendName2"
                    } else if (item.file_name == "深圳市shp_大厦.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "南山区_购物.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "南山区_购物场所.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "南山区_火车站.shp") {
                        item.type = "legendName5"
                    } else if (item.file_name == "南山区_机场.shp") {
                        item.type = "legendName6"
                    } else if (item.file_name == "南山区_加油站.shp") {
                        item.type = "legendName7"
                    } else if (item.file_name == "深圳市shp_交通运输.shp") {
                        item.type = "legendName8"
                    } else if (item.file_name == "南山区_金融服务.shp") {
                        item.type = "legendName9"
                    } else if (item.file_name == "深圳市shp_居民小区点.shp") {
                        item.type = "legendName10"
                    } else if (item.file_name == "南山区_居委会点.shp") {
                        item.type = "legendName11"
                    } else if (item.file_name == "深圳市shp_科研教育.shp") {
                        item.type = "legendName12"
                    } else if (item.file_name == "南山区_旅游.shp") {
                        item.type = "legendName13"
                    } else if (item.file_name == "深圳市shp_其他设施.shp") {
                        item.type = "legendName14"
                    } else if (item.file_name == "南山区_汽车站.shp" || item.file_name == "深圳市shp_汽车站.shp") {
                        item.type = "legendName15"
                    } else if (item.file_name == "深圳市shp_山峰点.shp") {
                        item.type = "legendName16"
                    } else if (item.file_name == "深圳市shp_兴趣点（POI）.shp") {
                        item.type = "legendName17"
                    } else if (item.file_name == "深圳市shp_休闲娱乐.shp") {
                        item.type = "legendName18"
                    } else if (item.file_name == "深圳市shp_政府机关.shp") {
                        item.type = "legendName19"
                    } else if (item.file_name == "深圳市shp_住宿.shp") {
                        item.type = "legendName20"
                    } else if (item.file_name == "深圳市shp_宗教点.shp") {
                        item.type = "legendName21"
                    }
                    if (item.file_name == "深圳市shp_彩票店.shp") {
                        item.type = "legendName35"
                    } else if (item.file_name == "餐饮.SHP") {
                        item.type = "legendName2"
                    } else if (item.file_name == "大厦.SHP") {
                        item.type = "legendName36"
                    } else if (item.file_name == "超市商城.SHP") {
                        item.type = "legendName3"
                    } else if (item.file_name == "深圳市shp_购物场所.shp") {
                        item.type = "legendName3"
                    } else if (item.file_name == "深圳市shp_火车站.shp") {
                        item.type = "legendName5"
                    } else if (item.file_name == "深圳市shp_机场.shp" || item.file_name == "2025全球机场分布数据.SHP") {
                        item.type = "legendName6"
                    } else if (item.file_name == "深圳市shp_交通设施.shp") {
                        item.type = "legendName7"
                    } else if (item.file_name == "深圳市shp_交通运输.shp") {
                        item.type = "legendName8"
                    } else if (item.file_name == "银行.SHP") {
                        item.type = "legendName9"
                    } else if (item.file_name == "深圳市shp_居民小区点.shp") {
                        item.type = "legendName10"
                    } else if (item.file_name == "深圳市shp_居委会点.shp") {
                        item.type = "legendName11"
                    } else if (item.file_name == "深圳市shp_科研教育.shp") {
                        item.type = "legendName12"
                    } else if (item.file_name == "深圳市shp_旅游.shp") {
                        item.type = "legendName13"
                    } else if (item.file_name == "其他信息.SHP") {
                        item.type = "legendName14"
                    } else if (item.file_name == "公交站.SHP" || item.file_name == "深圳市shp_汽车站.shp") {
                        item.type = "legendName15"
                    } else if (item.file_name == "深圳市shp_山峰点.shp") {
                        item.type = "legendName16"
                    } else if (item.file_name == "深圳市shp_兴趣点（POI）.shp") {
                        item.type = "legendName17"
                    } else if (item.file_name == "深圳市shp_休闲娱乐.shp") {
                        item.type = "legendName18"
                    } else if (item.file_name == "政府机构.SHP") {
                        item.type = "legendName19"
                    } else if (item.file_name == "宾馆酒店.SHP") {
                        item.type = "legendName20"
                    } else if (item.file_name == "公园.SHP") {
                        item.type = "legendName21"
                    } else if (item.file_name == "南山区_停车场.shp") {
                        item.type = "legendName23"
                    } else if (item.file_name == "出入口.SHP") {
                        item.type = "legendName23"
                    } else if (item.file_name == "轮渡.SHP") {
                        item.type = "legendName24"
                    } else if (item.file_name == "收费站.SHP") {
                        item.type = "legendName25"
                    } else if (item.file_name == "学校.SHP") {
                        item.type = "legendName27"
                    } else if (item.file_name == "药店.SHP" || item.file_name == "医疗.SHP") {
                        item.type = "legendName28"
                    } else if (item.file_name == "gangkou.SHP") {
                        item.type = "legendName29"
                    } else if (item.file_name == "南山区_彩票店.shp") {
                        item.type = "legendName35"
                    } else if (item.file_name == "南山区_大厦.shp") {
                        item.type = "legendName30"
                    } else if (item.file_name == "南山区_居民小区点.shp") {
                        item.type = "legendName37"
                    } else if (item.file_name == "南山区_科研教育.shp") {
                        item.type = "legendName27"
                    } else if (item.file_name == "南山区_其他设施.shp") {
                        item.type = "legendName38"
                    } else if (item.file_name == "南山区_收费站.shp") {
                        item.type = "legendName39"
                    } else if (item.file_name == "南山区_休闲娱乐.shp") {
                        item.type = "legendName40"
                    } else if (item.file_name == "南山区_政府机关.shp") {
                        item.type = "legendName41"
                    } else if (item.file_name == "南山区_住宿.shp") {
                        item.type = "legendName42"
                    }
                    item.label = "";
                    if (item1.id < 14 || (item1.id > 41 && item1.id < 51)) {
                        item.label = item.name;
                    }
                    item.label = item.name;
                    if (item1.id == 39 || item1.id == 37 || item1.id == 41 || item1.id == 24 || item1.id == 14 || item1.id == 15) {
                        item.label = "";
                    }
                    item.coord = [item.longitude, item.latitude];
                    item.coordZ = 0;
                    item.id = n;

                    if (item1.id == 37) {
                        if (n % 1 == 0) {
                            this.quanqiudata.push(item);
                            this.zhongguodata.push(item);
                        }
                    }
                    if (item1.id == 33 || item1.id == 34) {
                        //item.label = "";
                        if (n % 1 == 0) {
                            this.guangdongdata.push(item);

                        }


                    }
                    if (item1.id == 14 || item1.id == 15 || item1.id == 24) {
                        this.shenzhendata.push(item);
                    }
                    if (item1.id < 14 || (item1.id > 41 && item1.id < 51)) {
                        this.nanshanqudata.push(item);
                    }
                    n++;
                })

                //if (item1.id != 33 && item1.id != 34) {

                this.data = earthArr //.splice(0, 2000);

                //}

                this.addData(item1);


            },
            addData(item) {
                let _this = this
                let jsonData = {
                    id: "idPointDataSXTC2" + item.id,
                };
                window.appInstance.uniCall("removeAllData", jsonData, result => {
                    let _this = this
                    let jsondata = {
                        id: "idPointDataSXTC2" + item.id, // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                        attribute: ["type"],
                        data: _this.data
                    }

                    appInstance.uniCall('addPointData', jsondata, (result) => {
                        console.log(result);
                        _this.addEvent(item);
                    });
                });
            },
            addData2(item) {
                let _this = this
                let jsonData = {
                    id: "idPointDataSXTC2" + item.id,
                };
                window.appInstance.uniCall("removeAllData", jsonData, result => {
                    let _this = this
                    let jsondata = {
                        id: "idPointDataSXTC2" + item.id, // 数据 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                        attribute: ["type"],
                        data: _this.guangdongdata1
                    }

                    appInstance.uniCall('addPointData', jsondata, (result) => {
                        console.log(result);
                        _this.addEvent(item);
                    });
                });
            },
            //添加图层
            addEvent(item) {
                let _this = this
                let num = 500;
                let visible = false;
                if (item.id < 31 || item.id > 37) {
                    num = 20;
                }
                if (item.id == 33 || item.id == 34 || item.id == 39) {
                    num = 50;
                }
                if (item.id == 37) {
                    visible = true;
                }
                let jsonData = {
                    id: item.id,
                    name: "idLayerSXT",
                    coordZ: "0",
                    coordTypeZ: 2,
                    visible: visible,
                    subMaxMapLevel: 18,
                    subRadius: 500,
                    drawMax: num,
                    iconName: "event_02",
                    iconScale: 1,
                    labelScale: 1,
                    autoScale: false,
                    legends: [{
                        name: "legendName1",
                        color: "#ffffff",
                        iconName: "custom-商店",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName2",
                        color: "#ffffff",
                        iconName: "custom-餐厅",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName3",
                        color: "#ffffff",
                        iconName: "custom-写字楼",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName4",
                        color: "#ffffff",
                        iconName: "custom-商店",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName5",
                        color: "#ffffff",
                        iconName: "custom-火车站",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName6",
                        color: "#ffffff",
                        iconName: "custom-飞机场",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName7",
                        color: "#ffffff",
                        iconName: "custom-加油站",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName8",
                        color: "#ffffff",
                        iconName: "custom-小客车",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName9",
                        color: "#ffffff",
                        iconName: "custom-金融网点",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName10",
                        color: "#ffffff",
                        iconName: "custom-住宅",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName11",
                        color: "#ffffff",
                        iconName: "custom-办事处",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName12",
                        color: "#ffffff",
                        iconName: "custom-数据中心",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName13",
                        color: "#ffffff",
                        iconName: "custom-景区",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName14",
                        color: "#ffffff",
                        iconName: "custom-通用建筑1",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName15",
                        color: "#ffffff",
                        iconName: "custom-汽车站",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName16",
                        color: "#ffffff",
                        iconName: "custom-通用建筑2",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName17",
                        color: "#ffffff",
                        iconName: "custom-营业厅",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName18",
                        color: "#ffffff",
                        iconName: "custom-工厂",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName19",
                        color: "#ffffff",
                        iconName: "custom-政府机关",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName20",
                        color: "#ffffff",
                        iconName: "custom-宾馆",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName21",
                        color: "#ffffff",
                        iconName: "custom-公园",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName22",
                        color: "#ffffff",
                        iconName: "custom-公园",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName23",
                        color: "#ffffff",
                        iconName: "custom-停车场",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName24",
                        color: "#ffffff",
                        iconName: "custom-车行闸机",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName25",
                        color: "#ffffff",
                        iconName: "custom-码头",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName26",
                        color: "#ffffff",
                        iconName: "custom-收费站",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName27",
                        color: "#ffffff",
                        iconName: "custom-学校",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName28",
                        color: "#ffffff",
                        iconName: "custom-医院",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName29",
                        color: "#ffffff",
                        iconName: "custom-港口",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName30",
                        color: "#ffffff",
                        iconName: "custom-图书馆",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName31",
                        color: "#ffffff",
                        iconName: "custom-超市",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName32",
                        color: "#ffffff",
                        iconName: "custom-体育馆",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName33",
                        color: "#ffffff",
                        iconName: "custom-办事处",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName34",
                        color: "#ffffff",
                        iconName: "custom-避难所",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName35",
                        color: "#ffffff",
                        iconName: "custom-彩票店",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName36",
                        color: "#ffffff",
                        iconName: "custom-大厦",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName37",
                        color: "#ffffff",
                        iconName: "custom-居民小区",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName38",
                        color: "#ffffff",
                        iconName: "custom-其他设施",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName39",
                        color: "#ffffff",
                        iconName: "custom-收费站",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName40",
                        color: "#ffffff",
                        iconName: "custom-休闲娱乐",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName41",
                        color: "#ffffff",
                        iconName: "custom-政府机关",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, {
                        name: "legendName42",
                        color: "#ffffff",
                        iconName: "custom-住宿",
                        iconScale: 0.7,
                        labelScale: 0.8,
                    }, ],
                    legendAttr: "type",
                    aggDataId: "idPointDataSXTC2" + item.id,
                };
                appInstance.uniCall("addSubLandmarkLayer", jsonData, result => {
                    console.log(result);


                });


            },

            //添加路径图层
            // addPath() {
            //     let _this = this
            //     let list = ["/guangdongsheng/guangdongshengluwang/chengshikuaisulu.shp",
            //             "/guangdongsheng/guangdongshengluwang/ditie.shp",
            //             "/guangdongsheng/guangdongshengluwang/gaosu.shp",
            //             "/guangdongsheng/guangdongshengluwang/gaosuyinlu.shp",
            //             "/guangdongsheng/guangdongshengluwang/guodao.shp",
            //             "/guangdongsheng/guangdongshengluwang/shengdao.shp",
            //             "/guangdongsheng/guangdongshengluwang/yijidaolu.shp",
            //             "/guangdongsheng/guangdongshengluwang/tielu.shp",
            //             "/guangdongsheng/guangdongshengluwang/xiandao.shp",
            //             "/guangdongsheng/guangdongshengluwang/xingrendaolu.shp",
            //             "/quanqiu/quanqiugangkou/gangkou.shp",
            //             "/quanqiu/quanqiuguojiabianjie/shijieguojia.shp",
            //             "/shenzhenshi/luwang/chengshikuaisulu.shp",
            //             "/shenzhenshi/luwang/ditie.shp",
            //             "/shenzhenshi/luwang/ditiexian.shp",
            //             "/shenzhenshi/luwang/gaosulu.shp",
            //             "/shenzhenshi/luwang/gaosuyinlu.shp",
            //             "/shenzhenshi/luwang/guodao.shp",
            //             "/shenzhenshi/luwang/jiujilu.shp",
            //             "/shenzhenshi/luwang/qitadaolu.shp",
            //             "/shenzhenshi/luwang/shengdao.shp",
            //             "/shenzhenshi/luwang/shiquyijidaolu.shp",
            //             "/shenzhenshi/luwang/tielu.shp",
            //             "/shenzhenshi/luwang/xiandao.shp",
            //             "/shenzhenshi/luwang/xingrendaolu.shp",
            //             "/zhongguo/quanguoluwang/chengshierjidaolu.shp",
            //             "/zhongguo/quanguoluwang/chengshisanjidaolu.shp",
            //             "/zhongguo/quanguoluwang/chengshisijidaolu.shp",
            //             "/zhongguo/quanguoluwang/chengshiyijidaolu.shp",
            //             "/zhongguo/quanguoluwang/gaosu.shp",
            //             "/zhongguo/quanguoluwang/guodao.shp",
            //             "/zhongguo/quanguoluwang/shengdao.shp",
            //             "/zhongguo/quanguoluwang/tielu.shp",
            //             "/zhongguo/quanguoluwang/xiandao.shp",
            //             "/zhongguo/quanguoluwang/xiangdao.shp",
            //         ]
            //         //for (let n = 0; n < list.length; n++) {
            //     let jsonData = {
            //         id: "path" + this.num, // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
            //         name: "layerName", // 图层名称，支持为图层自定义名称
            //         coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
            //         coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
            //         coordZ: 100, // 高度（单位：米）
            //         type: "Arrow06", // 路线样式类别 Arrow01 Arrow02 Arrow03 Arrow04 Arrow05 Arrow06 Segment01 Segment02 Segment03 Segment04 Segment05 Arrow06
            //         color: "#FF0000", // 路线颜色，"" 颜色透明（HEX 颜色值）
            //         colorPass: "#ffff00", // 模型对象 移动经过后的 路径颜色（HEX 颜色值）
            //         width: 500, // 路径宽度（单位：米）
            //         tag: "custominfo", // 用户自定标签，用户保存用户的扩展数据
            //         autoScale: true,
            //         shpPath: list[this.num], // shp 文件地址，端渲染，可以传入和TGAPI.min.js相对的URL路径，或者URL的绝对路径；流渲染，可以是本地 CustomShps 下的相对路径，根目录直接填 “test.shp”，如果是子文件夹填写"\test\test.shp"，如果是在线地址，需填写完整的URL，例如："http://xxx.xx/xx/test.shp"

            //     };

            //     appInstance.uniCall("addPathShp", jsonData, (result) => {
            //         console.log(result);
            //         _this.isZZ = false;
            //     });
            //     //}
            //     this.num++;
            // },
            //连接模型服务器
            connectModelServer() {
                let _this = this
                let jsonData = {
                    name: "streamingModelServer", // 资产服务器名称
                    address: streamingConfig.url, // 资产服务器地址 例如:
                    token: streamingConfig.dataServerToken, // token
                };

                appInstance.uniCall("connectDataServer", jsonData, (result) => {
                    console.log(result);
                    _this.getJsonData();
                });
            },
            // 请求json数据
            getJsonData() {
                var p1 = new Promise((resolve, reject) => {
                    axios
                        .get("./json/TLEData.json")
                        .then((res) => {
                            resolve(res.data);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
                Promise.all([p1]).then((res) => {
                    let _this = this;
                    //将数据推到图层
                    res.forEach((el, index) => {
                        _this.transData1(el, index);
                    });
                });
            },

            //将数据推到图层
            transData1(inJsonArr, index) {
                let _this = this;
                if (index == 0) {
                    _this.addStart(inJsonArr);
                }
            },

            addStart(inJsonArr) {

                let _this = this;
                let data = []
                for (let n = 0; n < inJsonArr.data[0].data.length; n++) {
                    let d = []
                    inJsonArr.data.forEach(item => {
                        d.push({
                            id: item.id,
                            coord: item.data[n].coord, // XY 轴坐标，X：经度；Y：纬度
                            coordZ: item.data[n].coordZ, // Z 轴高度（单位：米）
                            type: "legendName1", // 数据点图例类别
                            label: item.id,
                            rotation: [0, 0, 0],
                        })
                    })
                    data.push(d)
                }
                let jsonData = {
                    id: 'modelTrailLayerId', // 图层对象 id，新建时调用者自己传入的唯一标识，用于各种操作的对象识别
                    name: 'layerName', // 图层名称，支持为图层自定义名称
                    coordType: 0, // XY 轴坐标类别，0：X 经度，Y 纬度；1：X 米，Y米，相对世界00点
                    coordTypeZ: 0, // Z 轴坐标类别，0：相对 3D 世界 0 海拔；1：相对 3D 世界地表；2：相对 3D 模型表面（单位：米）
                    snapSurface: 0, // 启用自动贴地。0：不贴地；1：贴地
                    duration: 1.5, // 从上一位置运动到新位置花费的时间（单位：秒），如果启用modelTrailData数据服务，同时表示同步数据的时间周期
                    modelMaxDistance: 3000000, // 模型最大可见距离（单位：米），不可见后显示icon
                    iconMaxDistance: 1000000000, // icon最大可见距离（单位：米），不可见后隐藏
                    isAutoRotation: true, // 是否自动根据当前位置和上一位置计算运动方向，如果为true的话，data中的rotation将不起作用。
                    trackStyle: 'vector', // 尾迹内置风格，详见注释
                    trackDuration: 0, // 尾迹粒子生命周期
                    trackWidth: 5000, // 尾迹粒子的宽度
                    trackVisible: 'ShowAll', // 尾迹显示状态，"ShowAll"：显示所有对象尾迹，"HideAll"：隐藏所有对象尾迹，"对象Id"：只显示当前图层特定对象Id的尾迹
                    objLife: 60, // 批号消批时间长度
                    modelTrailDataId: '', // 对应本服务器上modelTrail数据Id，如果找到id，则下方的data不起作用
                    isReferenceType: false, // 模型是引用类型还是复制类型，引用类型的对象占用更少的显存和绘制调用次数，但是端渲染无法自定义修改材质和粒子效果，且不支持设置单个实例的透明度，流渲染不支持关节和动画。默认是复制类型。false: 复制类型，true: 引用类型。
                    visible: false, // 添加当前图层时默认显示还是隐藏
                    modelSource: "dataServer",
                    legends: [{
                        name: 'legendName1', // 图层内图例名称，新建时调用者自己传入的唯一名称，用于各种操作的图例识别
                        modelType: '低代码案例/通用卫星', // 模型类型
                        scale: 10000, // 整体放缩倍数（单位：倍）
                        iconName: 'satellite', // 内置图标名称，详见下表：内置图标；或根据项目，在场景中预置好的图标对象的名称，包含文字样式定义
                        trackColor: '#ff0000', // 尾迹颜色
                        labelColor: '#ffffff', // 标签文本颜色，可选值，默认白色
                        labelScale: 1000, // 标签文本的缩放，默认值是1表示原大，0 - 1：表示缩小倍率，大于1：表示放大倍率
                        labelOffset: [0, 0, 0], // 标签文本的位置偏移，默认值是[0, 0, 0]，表示相对于模型中心点的x、y、z偏移位置（单位：米）
                        labelBackgroundColor: '#333333', // 标签文本背景颜色，可选值，默认灰色
                    }],
                    data: [],
                };
                appInstance.uniCall("addModelTrailLayer", jsonData, (result) => {
                    console.log(result);
                    // 隐藏遮罩

                    _this.addTrail(data);
                });
            },
            addTrail(inJsonArr) {
                let _this = this;
                let jsonData = {
                    id: 'modelTrailLayerId',
                    name: 'layerName',
                    coordType: 0,
                    coordTypeZ: 0,
                    isAppend: true,
                    duration: 4,
                    data: inJsonArr,
                };
                let num = 1;
                inJsonArr.forEach(item => {

                    let data = item

                    setTimeout(() => {
                        jsonData.data = data
                        if (_this.isRunning) {
                            appInstance.uniCall("updateModelTrailLayerCoord", jsonData, (result) => {
                                console.log(result);
                            });
                        }

                    }, 4000 * num);
                    num++
                })



                setTimeout(() => {
                    let jsonData = {
                        id: "modelTrailLayerId",
                        overlayType: "modelTrailLayer"
                    }
                    appInstance.uniCall("removeOverlay", jsonData, (result) => {
                        console.log(result);
                    });
                    this.getJsonData();
                }, 4000 * inJsonArr.length);
            },
        },

        mounted() {
            this.init();
        },
    });
}