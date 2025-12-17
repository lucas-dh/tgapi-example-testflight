/**
 * FightState 类，归属于单个甲虫，用于管理该甲虫的战斗状态。
 */
class FightState {
  /**
   * @constructor
   * FightState 构造函数。
   * @param {string} name - 所属甲虫的名称。
   * @param {Object} tgInstance - TGApp 对象实例。
   */
  constructor(name, tgInstance) {
    // 私有成员，上次开火的时间戳。
    let _lastFiring = 0;

    this.name = name;
    this.tgInstance = tgInstance;
    // 战斗相关的音效。
    this.sfx = { fire: new Audio('./sounds/canon.ogg') };

    /**
     * 向指定的的位置开火。
     * @param {Array} position - 本次开火要击中的位置。
     * @returns {boolean} 是否击中。
     */
    this.fire = (position) => {
      // 判断距离上次开火的时间是否已经大于开火间隔时间。
      const timestamp = new Date().getTime();
      if (timestamp - _lastFiring < game.FIRING_INTERVAL) {
        // 如果尚未到达开火间隔时间，则什么都不做。
        return false;
      } else {
        _lastFiring = timestamp;
      }

      // 图观接口调用：播放模型动画“开炮”。
      this.tgInstance.uniCall('playModelAnimation', { id: this.name, name: '开炮', state: 'begin' }, () => {});

      // 播放开火音效
      this.sfx.fire.play();

      // 图观接口调用：添加 3D 特效“爆炸”。
      // 与大多数 3D 特效不同，爆炸特效会自动消失，因此无需调用删除爆炸特效的接口。
      this.tgInstance.uniCall(
        'add3DMarker',
        {
          id: 'exp' + Math.random(),
          coordType: 1,
          coordTypeZ: 0,
          alpha: 0.5,
          scale: 10, // 3D 特效尺寸。
          type: 'explosion', // 3D 特效类型（爆炸）。
          coord: [position[0] + 2 * (Math.random() - 2), position[1] + 2 * (Math.random() - 2)], // 位置加入一点随机偏移。
          coordZ: 2,
          duration: 1, // 持续时间。
        },
        () => {}
      );
      return true;
    };
  }
}
