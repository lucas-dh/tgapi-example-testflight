/**
 * WalkState 类，归属于单个甲虫，用于管理该甲虫的行走状态。
 */
class WalkState {
  /**
   * @constructor
   * WalkState 构造函数。
   * @param {string} name - 所属甲虫的名称。
   */
  constructor(name) {
    this.name = name;
    this.walking = false;
    this.stopped = true;
    this.speed = 1;
    this.elapsedTime = 0;
    this.progress = 0;
    this.duration = 0;
    this.rotation = 0;
    this.currentRotation = 0;
    this.turnningSteps = 0;
    this.turnningSpeed = 0.95;
    this.turnningDirection = 0;
    this.originPosition = [0, 0];
    this.targetPosition = [0, 0];
    this.currentPosition = [0, 0];
    this.safezoneSize = 15;

    /**
     * 初始化，设置最初位置、行走速度，当前旋转角度等信息。
     * @param {Array} originPosition - 最初位置。
     * @param {number} speed - 行走速度，将作为每次行走的默认速度（除非在每次行走时另行指定速度）。
     * @param {number} currentRotation - 当前旋转角度。
     */
    this.init = (originPosition = [0, 0], speed = 1, currentRotation = 0) => {
      if (this.walking) {
        return;
      }
      this.originPosition = [...originPosition];
      this.currentPosition = [...originPosition];
      this.speed = speed;
      this.currentRotation = currentRotation;
    };

    /**
     * 发起一次行走。
     * @param {Array} targetPosition - 行走目标位置。
     * @param {number} speed - 行走速度。
     */
    this.walk = (targetPosition = [0, 0], speed) => {
      if (this.walking) {
        console.warn('walking');
        return;
      }
      this.stopped = false;
      this.targetPosition[0] = targetPosition[0];
      this.targetPosition[1] = targetPosition[1];
      this.speed = speed || this.speed;
      if (speed === 0) {
        this.duration = 0;
      } else {
        this.duration = this.calcDistance(this.originPosition, this.targetPosition) / this.speed;
      }
      this.rotation = this.calcRotation(this.originPosition, this.targetPosition);
      let anglesDiff = this.caclAnglesMinDiff(this.rotation, this.currentRotation);
      this.turnningDirection = Math.sign(anglesDiff);
      this.turnningSteps = Math.floor(Math.abs(anglesDiff / this.turnningSpeed));
      this.walking = true;
    };

    /**
     * 受游戏循环调度的更新操作，通过传入的流逝时间，为本对象的各个状态计算出新的值，从而驱动甲虫的行走方面的状态更新。
     * @param {number} delta - 自从上一次更新以来的流逝时间，一般为 1/60 秒，根据计算机性能和屏幕刷新率等因素有可能更长或更短。
     */
    this.update = (delta = 1 / 60) => {
      // 如果不在行走状态，或行走时长小于等于 0，直接返回。
      if (!this.walking || this.duration <= 0) {
        return;
      }
      if (this.turnningSteps > 0) {
        // 如果转身步数大于 0，则通过改变甲虫的当前旋转来达到转身效果。
        if (this.turnningSteps === 1) {
          this.currentRotation = this.rotation;
        } else {
          this.currentRotation -= this.turnningSpeed * this.turnningDirection;
        }
        this.turnningSteps--;
      }
      if (!arena.covers(this.currentPosition, this.rotation)) {
        // 如果甲虫当前位置超出竞技场位置，则打断当前行走。
        this.break();
      }
      // 更新本次行走的进度，通过本次行走的流逝时间和行走时长得出。
      this.progress = this.elapsedTime / this.duration;
      if (this.progress > 1) {
        // 如果进度大于 1，说明本次行走已经到达目标位置，用目标位置去更新当前位置，并停止本次行走。
        this.currentPosition = [...this.targetPosition];
        this.reset();
      } else {
        // 否则，更新当前位置和本次行走的流逝时间。
        this.currentPosition[0] = this.originPosition[0] + (this.targetPosition[0] - this.originPosition[0]) * this.progress;
        this.currentPosition[1] = this.originPosition[1] + (this.targetPosition[1] - this.originPosition[1]) * this.progress;
        this.elapsedTime += delta;
      }
    };

    /**
     * 打断本次行走。
     */
    this.break = () => {
      this.reset();
    };

    /**
     * 重置行走状态。
     */
    this.reset = () => {
      this.originPosition[0] = this.currentPosition[0];
      this.originPosition[1] = this.currentPosition[1];
      this.walking = false;
      this.elapsedTime = 0;
    };

    /**
     * 计算两个点之间的直线距离。
     * @param {Array} p1 - 点 1 的位置。
     * @param {Array} p2 - 点 2 的位置。
     */
    this.calcDistance = (p1, p2) => {
      return Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
    };

    /**
     * 计算当前甲虫与指定点之间的直线距离。
     * @param {Array} p - 点的位置。
     */
    this.distanceTo = (p) => {
      return this.calcDistance(this.currentPosition, p);
    };

    /**
     * 计算点 1 和点 2 的连线构成的直线，与竞技场坐标 -Y 轴（正南方向）的夹角。
     * @param {Array} p1 - 点 1 的位置。
     * @param {Array} p2 - 点 2 的位置。
     */
    this.calcRotation = (p1, p2) => {
      return (Math.atan2(p1[1] - p2[1], p2[0] - p1[0]) / Math.PI) * 180 + 90;
    };

    /**
     * 根据当前位置和自身旋转角度，计算开火后的撞击点。
     * @param {number} distance - 炮弹射程。
     * @param {number} arenaSize - 竞技场的尺寸。
     * @param {Array} rivals - 所有对手的信息。
     */
    this.calcImpactPoint = (distance, arenaSize, rivals = []) => {
      // 竞技场的实际尺寸（半数），含义是竞技场尺寸（半数）减去炮火的尺寸（半数）
      // 计算这个尺寸的目的是避免炮火的爆炸效果和竞技场的墙壁立面穿模
      const actualSize = arenaSize - this.safezoneSize;

      // 计算发射方向的弧度，注意这里从竞技场的坐标系（X 向右，Y 向下），转换为便于三角函数计算的平面直角坐标系（X 向右，Y 向上）
      let angleInRadian = ((this.currentRotation - 90) / 180) * Math.PI;

      // 计算最初的炮火撞击点
      let impactPoint = [this.currentPosition[0] + distance * Math.cos(angleInRadian), this.currentPosition[1] - distance * Math.sin(angleInRadian)];

      if (Math.abs(impactPoint[0]) > actualSize) {
        // 如果撞击点在竞技场外（横轴），将其修正到竞技场墙壁内沿
        impactPoint[1] =
          ((Math.abs(impactPoint[0]) - actualSize) * (this.currentPosition[1] - impactPoint[1])) / (Math.abs(impactPoint[0]) - this.currentPosition[0]) +
          impactPoint[1];
        impactPoint[0] = Math.sign(impactPoint[0]) * actualSize;
      }
      if (Math.abs(impactPoint[1]) > actualSize) {
        // 如果撞击点在竞技场外（纵轴），将其修正到竞技场墙壁内沿
        impactPoint[0] =
          ((Math.abs(impactPoint[1]) - actualSize) * (this.currentPosition[0] - impactPoint[0])) / (Math.abs(impactPoint[1]) - this.currentPosition[1]) +
          impactPoint[0];
        impactPoint[1] = Math.sign(impactPoint[1]) * actualSize;
      }
      // 如果炮火射击路径上存在对手，将其修正到对手的位置
      let hitCandidates = [];
      for (let rival of rivals) {
        // 计算当前对手距离炮火射击路线的垂直距离
        const d = this.calcDistancePointToLine(rival.position, this.currentPosition, impactPoint);

        if (d < rival.size) {
          // 如果该距离小于对手尺寸，进一步检查对手是否在射击的起点和终点之间
          if (
            Math.sign(rival.position[0] - this.currentPosition[0]) === Math.sign(impactPoint[0] - this.currentPosition[0]) &&
            Math.sign(rival.position[1] - this.currentPosition[1]) === Math.sign(impactPoint[1] - this.currentPosition[1])
          ) {
            // 如果也满足，判定击中，放置到待击中的列表中
            hitCandidates.push(rival);
          }
        }
      }
      // 对待击中的列表进行排序，找出距发射点最近的对手，确保对于同时有多个在对手在射击路径上的时候，击中的是最近的对手
      if (hitCandidates.length > 0) {
        for (const rival of hitCandidates) {
          rival.distance = this.distanceTo(rival.position);
        }
        hitCandidates.sort((r1, r2) => {
          return r1.distance - r2.distance;
        });
        // 修正为最近的击中点
        impactPoint = [...hitCandidates[0].position];
      }

      return impactPoint;
    };

    /**
     * 计算两个角度之间的最小夹角。
     * @param {number} a1 - 角度 1。
     * @param {number} a2 - 角度 2。
     */
    this.caclAnglesMinDiff = (a1, a2) => {
      return (a2 - a1) % 360 > 180 ? ((a2 - a1) % 360) - 360 : (a2 - a1) % 360 < -180 ? ((a2 - a1) % 360) + 360 : (a2 - a1) % 360;
    };

    /**
     * 计算点 1 和点 2 的连线构成的直线，与指定点之间的垂直距离。
     * @param {Array} p - 指定的点。
     * @param {Array} l1 - 直线上的点 1 。
     * @param {Array} l2 - 直线上的点 2。
     */
    this.calcDistancePointToLine = (p, l1, l2) => {
      if (l2[0] === l1[0]) {
        // 斜率为无穷大时，避免计算斜率时被 0 除
        return Math.abs(p[0] - l2[0]);
      }
      // 先确定直线的 y = kx + m 形式的方程中，k 和 m 的值
      const k = (l2[1] - l1[1]) / (l2[0] - l1[0]);
      const m = l2[1] - k * l2[0];

      // 对应 Ax + By + C = 0 形式的直线方程，A = k, B = -1, C = m
      // 点 P 到直线的距离公式：
      //      abs(A*Px + B*Py + C)
      // d = ----------------------
      //        sqrt(A*A + B*B)
      const n1 = Math.abs(k * p[0] - p[1] + m);
      const n2 = Math.sqrt(k * k + 1);
      return n1 / n2;
    };
  }
}
