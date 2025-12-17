/**
 * arena 对象，表示竞技场相关信息。
 */
const arena = {
  // 竞技场尺寸（一半）。
  halfSize: 150,
  // 函数：确定指定的点是否在竞技场中。
  covers: (p, rotation) => {
    if (p[0] < -arena.halfSize && rotation > 180 && rotation < 360) {
      return false;
    }
    if (p[0] > arena.halfSize && rotation > 0 && rotation < 180) {
      return false;
    }

    if (p[1] < -arena.halfSize && rotation > 90 && rotation < 270) {
      return false;
    }
    if (p[1] > arena.halfSize && (rotation < 90 || rotation > 270)) {
      return false;
    }

    return true;
  },
  // 函数：将指定的点的位置钳制在竞技场范围内。
  clampToArena: (position, padding = 5) => {
    position[0] = Math.min(position[0], arena.halfSize - padding);
    position[0] = Math.max(position[0], -arena.halfSize + padding);
    position[1] = Math.min(position[1], arena.halfSize - padding);
    position[1] = Math.max(position[1], -arena.halfSize + padding);
    return position;
  },
};
