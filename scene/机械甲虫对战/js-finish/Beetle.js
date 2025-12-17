/**
 * Beetle 类，表示单个机械甲虫。
 */
class Beetle {
  /**
   * @constructor
   * Beetle 构造函数。
   * @param {string} name - 所属甲虫的名称。
   * @param {Object} tgInstance - TGApp 对象实例。
   * @param {Object} params - 甲虫参数。
   */
  constructor(name, tgInstance, params = {}) {
    this.name = name;
    this.def = params.def;
    this.clientID = undefined;
    this.tgInstance = tgInstance;
    this.walkState = new WalkState(name);
    this.walkState.init(params.position, params.speed, params.rotation);
    this.fightState = new FightState(name, tgInstance);
    this.arenaSize = params.arenaSize || 100;
    this.firingRange = params.firingRange || 200;
    this.hp = typeof params.hp === 'number' ? params.hp : 100;
    this.ai = !!params.ai;
    this.aiDelta = 0;
    this.aiInterval = 5;
    this.sfx = {
      hum: new Audio('./sounds/hum.ogg'),
      selected: [
        new Audio('./sounds/goliath-selected.mp3'),
        new Audio('./sounds/corsair-selected.mp3'),
        new Audio('./sounds/vulture-selected.mp3'),
        new Audio('./sounds/scv-selected.mp3'),
      ],
      move: [
        new Audio('./sounds/goliath-move.mp3'),
        new Audio('./sounds/dropship-move.mp3'),
        new Audio('./sounds/marine-move.mp3'),
        new Audio('./sounds/scv-move.mp3'),
      ],
      walking: new Audio('./sounds/beetle-walking.mp3'),
      down: [new Audio('./sounds/goliath-down.mp3'), new Audio('./sounds/dragoon-down.mp3')],
    };
    this.sfx.walking.loop = true;
    this.sfx.walking.volume = 0.3;
    this.ready = false;
    this.isDown = false;
  }

  /**
   * 初始化。
   */
  init() {
    // 播放轰鸣音效
    this.sfx.hum.loop = true;
    this.sfx.hum.volume = 0.12;
    this.sfx.hum.play();
    this.ready = true;
  }

  /**
   * 每一局结束之后的重置。需要把每个甲虫放置到各自的初始位置，并恢复动画、旋转方位等状态为初始状态。
   */
  reset() {
    this.release(true);
    this.walkState.break();
    this.walkState.currentPosition = [...this.def.position];
    this.walkState.originPosition = [...this.def.position];
    this.walkState.currentRotation = this.def.rotation;
    this.walkState.rotation = this.def.rotation;
    this.tgInstance.uniCall('setModelTransform', {
      id: this.name,
      coordType: 1,
      coordTypeZ: 0,
      coord: this.def.position,
      coordZ: 0,
      rotation: [0, this.def.rotation, 0],
    });
    this.tgInstance.uniCall('setModelArticulation', {
      id: this.name,
      data: [
        { articulation: '左1-竖向运动', type: 'float', value: 50 },
        { articulation: '左1-横向运动', type: 'float', value: 50 },
        { articulation: '右1-竖向运动', type: 'float', value: 50 },
        { articulation: '右1-横向运动', type: 'float', value: 50 },
        { articulation: '左2-竖向运动', type: 'float', value: 50 },
        { articulation: '左2-横向运动', type: 'float', value: 50 },
        { articulation: '右2-竖向运动', type: 'float', value: 50 },
        { articulation: '右2-横向运动', type: 'float', value: 50 },
        { articulation: '左3-竖向运动', type: 'float', value: 50 },
        { articulation: '左3-横向运动', type: 'float', value: 50 },
        { articulation: '右3-竖向运动', type: 'float', value: 50 },
        { articulation: '右3-横向运动', type: 'float', value: 50 },
        { articulation: '身体-摇摆', type: 'float', value: 50 },
        { articulation: '身体-俯仰', type: 'float', value: 50 },
        { articulation: '身体-翻滚', type: 'float', value: 50 },
        { articulation: '身体-上下', type: 'float', value: 50 },
        { articulation: '身体-前后', type: 'float', value: 50 },
      ],
    });
    this.setHP(100);
    this.isDown = false;
    this.ready = true;
  }

  /**
   * 获取生命值。
   */
  getHP() {
    return this.hp;
  }

  /**
   * 设置生命值。
   * @param {number} hp - 新的生命值。
   */
  setHP(hp) {
    this.hp = hp;
    // 向客户端发出生命值变化的反馈
    ws.hpchanged(this.clientID, this.hp);
  }

  /**
   * 获取行走状态。
   */
  isWalking() {
    return this.walkState.walking;
  }

  /**
   * 发起一次行走。
   * @param {Array} position - 行走目标位置。
   */
  walk(position) {
    if (this.isDown) {
      return;
    }
    return this.walkState.walk(position);
  }

  /**
   * 获取当前甲虫是否正在被玩家操控。
   */
  isOccupied() {
    return !!this.clientID;
  }

  /**
   * 玩家操控当前甲虫。
   * @param {number} clientID - 玩家 ID。
   */
  occupy(clientID) {
    if (this.clientID) {
      return false;
    }

    if (this.isDown) {
      return false;
    }

    if (typeof clientID === 'string' && clientID !== '') {
      this.clientID = clientID;
    } else {
      return false;
    }

    this.ai = false;
    this.walkState.break();

    this.playSFX('selected');

    let beetleUI = document.createElement('div');
    beetleUI.id = `ui${this.name}`;
    document.body.appendChild(beetleUI);
    beetleUI.style.height = '100%';
    beetleUI.style.textAlign = 'center';
    beetleUI.style.lineHeight = '32px';
    beetleUI.style.padding = '2px';
    beetleUI.style.backgroundColor = '#00113366';
    beetleUI.innerHTML = `<hr style="width: ${Math.min(this.getHP(), 100)}%; height: 4px; background-color: ${
      this.getHP() < 32 ? '#ef2f00' : this.getHP() < 80 ? '#efaf00' : '#00ef2f'
    }; border-width: 0px">${this.clientID}`;

    // 在被操控的甲虫上方显示标牌。
    this.tgInstance.uniCall(
      'addModelTip',
      {
        id: this.name,
        divId: `ui${this.name}`,
        isShowClose: false,
        size: [200, 36],
        offset: [-100, 50],
      },
      (result) => {
        console.log('addModelTip', result);
      }
    );
    return true;
  }

  /**
   * 玩家释放当前甲虫。
   * @param {boolean} aiTakeOver - 释放后是否被 AI 接管，可选参数。
   */
  release(aiTakeOver) {
    this.clientID = undefined;
    // 在甲虫被取消操控时移除标牌。
    appInstance.uniCall(
      'removeModelTip',
      {
        id: this.name,
      },
      (result) => {
        console.log('removeModelTip', result);
      }
    );
    if (typeof aiTakeOver === 'boolean') {
      this.ai = aiTakeOver;
    } else {
      this.ai = this.def.ai;
    }
  }

  /**
   * 被击中。
   * @param {number} hp - 损失的生命值。
   */
  beenHit(hp) {
    if (this.isDown) {
      return;
    }
    if (hp > game.DAMAGE_MAX || hp <= 0) {
      return;
    }

    let currentHP = this.getHP();
    currentHP -= Math.floor(hp);
    currentHP = Math.max(currentHP, 0);
    this.setHP(currentHP);
    let beetleUI = document.getElementById(`ui${this.name}`);
    if (beetleUI) {
      beetleUI.innerHTML = `<hr style="width: ${Math.min(currentHP, 100)}%; height: 4px; background-color: ${
        currentHP < 32 ? '#ef2f00' : currentHP < 80 ? '#efaf00' : '#00ef2f'
      }; border-width: 0px">${this.clientID}`;
    }
  }

  /**
   * 被击倒。
   */
  down() {
    if (this.isDown) {
      return;
    }
    this.walkState.break();
    this.playSFX('down');
    this.isDown = true;
    this.ai = false;
    // 被击倒后显示失去平衡的状态。
    this.tgInstance.uniCall('setModelArticulation', {
      id: this.name,
      duration: 0.2,
      data: [
        { articulation: '左1-竖向运动', type: 'float', value: 0 },
        { articulation: '左1-横向运动', type: 'float', value: 0 },
        { articulation: '右1-竖向运动', type: 'float', value: 0 },
        { articulation: '右1-横向运动', type: 'float', value: 0 },
        { articulation: '左2-竖向运动', type: 'float', value: 0 },
        { articulation: '左2-横向运动', type: 'float', value: 0 },
        { articulation: '右2-竖向运动', type: 'float', value: 0 },
        { articulation: '右2-横向运动', type: 'float', value: 0 },
        { articulation: '左3-竖向运动', type: 'float', value: 0 },
        { articulation: '左3-横向运动', type: 'float', value: 0 },
        { articulation: '右3-竖向运动', type: 'float', value: 0 },
        { articulation: '右3-横向运动', type: 'float', value: 0 },
        { articulation: '身体-摇摆', type: 'float', value: 0 },
        { articulation: '身体-俯仰', type: 'float', value: 0 },
        { articulation: '身体-翻滚', type: 'float', value: 0 },
        { articulation: '身体-上下', type: 'float', value: 0 },
        { articulation: '身体-前后', type: 'float', value: 0 },
      ],
    });
    // 结束 - 被击倒后显示失去平衡的状态。
    ws.down(this.clientID);
  }

  /**
   * 播放音效。
   * @param {string} sfx - 音效名称。
   */
  playSFX(sfx) {
    if (!this.sfx[sfx]) {
      return;
    }
    if (typeof this.sfx[sfx].play === 'function') {
      this.sfx[sfx].play();
      return;
    }
    if (this.sfx[sfx] instanceof Array) {
      const index = Math.floor(Math.random() * this.sfx[sfx].length);
      if (index === this.sfx[sfx].length) {
        index = this.sfx[sfx].length - 1;
      }
      if (typeof this.sfx[sfx][index].play === 'function') {
        this.sfx[sfx][index].play();
      }
      return;
    }
  }

  /**
   * 停止音效。
   * @param {string} sfx - 音效名称。
   */
  stopSFX(sfx) {
    if (!this.sfx[sfx]) {
      return;
    }
    if (typeof this.sfx[sfx].pause === 'function') {
      this.sfx[sfx].pause();
      this.sfx[sfx].currentTime = 0;
      return;
    }
    if (this.sfx[sfx] instanceof Array) {
      const index = Math.floor(Math.random() * this.sfx[sfx].length);
      if (index === this.sfx[sfx].length) {
        index = this.sfx[sfx].length - 1;
      }
      if (typeof this.sfx[sfx][index].pause === 'function') {
        this.sfx[sfx][index].pause();
        this.sfx[sfx][index].currentTime = 0;
      }
      return;
    }
  }

  /**
   * 获取允许被其他玩家访问的公开信息，如名称、HP、是否为 AI、位置、尺寸等信息。
   * @returns {Object}
   */
  getPublicInfo() {
    return {
      name: this.name,
      hp: this.getHP(),
      ai: this.ai,
      position: [...this.walkState.currentPosition],
      size: this.walkState.safezoneSize,
    };
  }

  /**
   * 获取当前甲虫的所有对手的公开信息。
   * @returns {Array}
   */
  getRivals() {
    let result = [];
    for (let beetle of game.beetles) {
      if (beetle.name !== this.name) {
        result.push(beetle.getPublicInfo());
      }
    }
    return result;
  }

  /**
   * 开启当前甲虫 AI。
   */
  startAI() {
    this.ai = true;
  }

  /**
   * 停止当前甲虫 AI。
   */
  stopAI() {
    this.ai = false;
  }

  /**
   * 受游戏循环调度的 AI 更新操作，通过传入的流逝时间，计算出新的值，从而驱动甲虫 AI 方面的状态更新。
   * @param {number} delta - 自从上一次更新以来的流逝时间，一般为 1/60 秒，根据计算机性能和屏幕刷新率等因素有可能更长或更短。
   */
  updateAI(delta = 1 / 60) {
    if (this.aiDelta < this.aiInterval) {
      this.aiDelta += delta;
      return;
    }

    this.aiDelta = 0;
    this.aiInterval += this.aiInterval * (Math.random() * 0.2 - 0.1);

    let randomPosition = [this.arenaSize * 0.9 * (Math.random() * 2 - 1), this.arenaSize * 0.9 * (Math.random() * 2 - 1)];

    let rest = false;
    if (this.aiInterval < 2 || this.aiInterval > 10) {
      rest = true;
      this.aiInterval = 5;
    }

    if (Math.random() < 0.1 || Math.random() > 0.9) {
      rest = true;
    }

    if (rest) {
      this.walkState.break();
      return;
    }

    if (!this.isWalking()) {
      this.tgInstance.uniCall('playModelAnimation', { id: this.name, name: '行走-前进02', state: 'begin' });
      this.playSFX('walking');
    } else {
      this.walkState.break();
    }
    this.walk(randomPosition);
  }

  /**
   * 开火。
   */
  fire() {
    if (this.isDown) {
      return;
    }
    let rivals = this.getRivals();
    let position = this.walkState.calcImpactPoint(this.firingRange + (this.firingRange / 10) * (Math.random() - 2), this.arenaSize, rivals);
    if (!this.fightState.fire(position)) {
      return;
    }
    const beetleHits = game.pickBeetles(position, game.HIT_RADIUS);
    for (let hit of beetleHits) {
      if (hit.beetle.name === this.name) {
        this.beenHit(5);
      } else {
        const randomRatio = 1 + (Math.random() * 0.2 - 0.1);
        const distanceRatio = (game.HIT_RADIUS - hit.distance) / game.HIT_RADIUS;
        hit.beetle.beenHit(Math.min(randomRatio * distanceRatio * game.DAMAGE_MAX, game.DAMAGE_MAX));
      }
    }
  }

  /**
   * 受游戏循环调度的更新操作，通过传入的流逝时间，计算出新的值，从而驱动甲虫各方面的状态更新。
   * @param {number} delta - 自从上一次更新以来的流逝时间，一般为 1/60 秒，根据计算机性能和屏幕刷新率等因素有可能更长或更短。
   */
  update(delta = 1 / 60) {
    if (!this.ready) {
      return;
    }

    if (this.ai) {
      this.updateAI(delta);
    }

    if (this.isWalking()) {
      // const rivals = this.getRivals();
      // for (let rival of rivals) {
      //   if (this.walkState.distanceTo(rival.position) < this.walkState.safezoneSize) {
      //     this.walkState.break();
      //     this.walk([
      //       this.walkState.currentPosition[0] - 25 * Math.sign(rival.position[0] - this.walkState.currentPosition[0]),
      //       this.walkState.currentPosition[1] - 25 * Math.sign(rival.position[1] - this.walkState.currentPosition[1]),
      //     ]);

      //     this.tgInstance.uniCall('setModelTransform', {
      //       id: this.name,
      //       coordType: 1,
      //       coordTypeZ: 0,
      //       coord: [
      //         this.walkState.currentPosition[0] - 5 * Math.sign(rival.position[0] - this.walkState.currentPosition[0]),
      //         this.walkState.currentPosition[1] - 5 * Math.sign(rival.position[1] - this.walkState.currentPosition[1]),
      //       ],
      //       coordZ: 0,
      //       rotation: [0, this.walkState.currentRotation, 0],
      //     });
      //     break;
      //   }
      // }

      this.walkState.update(delta);

      // 设置甲虫在新一帧中的位置和旋转。
      this.tgInstance.uniCall('setModelTransform', {
        id: this.name,
        coordType: 1,
        coordTypeZ: 0,
        coord: this.walkState.currentPosition,
        coordZ: 0,
        rotation: [0, this.walkState.currentRotation, 0],
      });
    } else {
      if (!this.walkState.stopped) {
        // 停止甲虫行走的动画。
        this.tgInstance.uniCall('playModelAnimation', { id: this.name, name: '行走-前进02', state: 'stop' }, (result) => {
          this.stopSFX('walking');
          this.walkState.stopped = true;
          if (this.isDown) {
            return;
          }
          // 甲虫停止行走之后的复位。
          this.tgInstance.uniCall('setModelArticulation', {
            id: this.name,
            duration: 0.2,
            data: [
              { articulation: '左1-竖向运动', type: 'float', value: 50 },
              { articulation: '左1-横向运动', type: 'float', value: 50 },
              { articulation: '右1-竖向运动', type: 'float', value: 50 },
              { articulation: '右1-横向运动', type: 'float', value: 50 },
              { articulation: '左2-竖向运动', type: 'float', value: 50 },
              { articulation: '左2-横向运动', type: 'float', value: 50 },
              { articulation: '右2-竖向运动', type: 'float', value: 50 },
              { articulation: '右2-横向运动', type: 'float', value: 50 },
              { articulation: '左3-竖向运动', type: 'float', value: 50 },
              { articulation: '左3-横向运动', type: 'float', value: 50 },
              { articulation: '右3-竖向运动', type: 'float', value: 50 },
              { articulation: '右3-横向运动', type: 'float', value: 50 },
              { articulation: '身体-摇摆', type: 'float', value: 50 },
              { articulation: '身体-俯仰', type: 'float', value: 50 },
              { articulation: '身体-翻滚', type: 'float', value: 50 },
              { articulation: '身体-上下', type: 'float', value: 50 },
              { articulation: '身体-前后', type: 'float', value: 50 },
            ],
          });
        });
      }
    }
  }
}
