# TGAPI 示例项目 (TestFlight)

基于图观™数字孪生应用开发引擎构建的API代码示例项目。

## 项目概述

本项目展示了图观引擎（TGApp）在不同场景下的应用示例，包括场景服务、性能测试、数据可视化等功能。

## 项目结构

```
tgapi-example-testflight/
├── ComprehensiveCase/           # 综合案例
│   └── 综合案例/
│       ├── index.html          # 主页面
│       └── index.js            # JavaScript逻辑
├── performance/                 # 性能测试模块
│   ├── TGAPI-端渲染模型型号地标图性能测试/
│   ├── TGAPI-端渲染人保机房性能测试/
│   └── TGAPI-流渲染模型型号轨迹图性能测试/
├── scene/                       # 场景功能模块
│   ├── 3DTile加载/             # 3DTile数据加载
│   ├── 场景服务-端流切换/      # 场景服务切换
│   ├── 场景服务-风格切换/      # 场景风格切换
│   ├── 地标图-区分图例/        # 地标图展示
│   ├── 轨迹图/                 # 轨迹图展示
│   ├── 关系图-网络攻击/        # 网络攻击关系图
│   ├── 对象控制-模型变换/      # 模型控制
│   └── ...
├── StreamConstruction/          # 流场景构建
│   ├── 导览路线设置/           # 导览路线配置
│   ├── 季节控制/               # 季节变化控制
│   ├── 时间控制/               # 时间控制功能
│   └── 天气控制/               # 天气效果控制
└── streaming2024/              # 2024流式构建功能
    ├── 场景服务-风格切换/
    ├── 对象控制-时间控制/
    ├── 建筑对象-功能演示/
    └── 连线对象-样式展示/
```

## 主要功能

### 1. 场景服务功能
- **场景加载**: 支持本地和远程场景加载
- **场景切换**: 支持端渲染和流渲染模式切换
- **风格切换**: 多种场景风格配置

### 2. 数据可视化
- **地标图**: 支持全球和全国范围的地标展示
- **轨迹图**: 运动轨迹可视化
- **关系图**: 网络拓扑、组织架构等关系可视化
- **点迹图**: 地理位置点标记

### 3. 模型控制
- **模型变换**: 位置、旋转、缩放控制
- **关节控制**: 布尔关节、浮点关节、枚举关节
- **动画控制**: 模型动画播放和控制

### 4. 建筑管理
- **建筑拆解**: 楼层拆解和展开
- **建筑高亮**: 建筑、楼层、房间高亮
- **建筑剖分**: 自由剖分和聚焦剖分

### 5. 性能测试
- **端渲染性能**: 模型型号地标图性能测试
- **流渲染性能**: 场景切换和加载性能
- **大规模数据**: 支持大规模数据加载测试

## 技术栈

- **前端框架**: HTML5 + JavaScript + Vue.js
- **3D引擎**: 图观引擎 (TGApp)
- **UI组件**: ElementUI
- **数据格式**: JSON, GeoJSON, 3DTiles

## 快速开始

### 环境要求
- 现代浏览器（支持WebGL）
- 网络连接（用于加载图观引擎SDK）

### 运行示例
1. 克隆项目到本地
2. 使用HTTP服务器启动项目（如：`python -m http.server 8000`）
3. 浏览器访问 `http://localhost:8000`
4. 选择相应的示例目录查看效果

### 示例访问
- **综合案例**: `ComprehensiveCase/综合案例/index.html`
- **性能测试**: `performance/TGAPI-端渲染模型型号地标图性能测试/index.html`
- **3DTile加载**: `scene/3DTile加载/index.html`
- **导览路线**: `StreamConstruction/导览路线设置/index.html`

## API使用

项目展示了图观引擎的主要API调用方式，包括：

```javascript
// 初始化场景
window.appInstance = new TGApp.App();
window.appInstance.initService(config, callback);

// 添加地标图层
appInstance.uniCall('addIconModelLandmarkLayer', layerConfig, callback);

// 场景状态控制
appInstance.uniCall('setCustomPathingState', stateConfig, callback);
```

## 注意事项

1. 项目依赖图观引擎SDK，需要从CDN加载
2. 部分功能需要有效的授权token
3. 性能测试示例需要连接特定的测试服务器
4. 建议在支持WebGL的现代浏览器中运行

## 版权信息

基于图观™数字孪生应用开发引擎构建 https://www.tuguan.net

版权所有 北京数字冰雹信息技术有限公司

## 更新日志

- **2024-12-15**: 项目初始化，包含完整的示例代码
- **2024**: 添加streaming2024模块，新增流式构建功能

## 联系我们

如有问题或建议，请访问图观引擎官网：https://www.tuguan.net