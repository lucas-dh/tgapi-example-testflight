/**
 * game 对象，用来组织游戏涉及的所有对象。
 */
const game = {
  // 常量定义
  FIRING_INTERVAL: 2000, // 开火间隔。
  HIT_RADIUS: 30, // 炮弹溅射范围。
  DAMAGE_MAX: 20, // 单发炮弹最大伤害。

  // 变量定义
  selected: undefined, // 当前选中的甲虫。
  beetles: [], // 所有甲虫。
  beetleDefs: [
    { name: "SpiderA", position: [80, 120], rotation: 180, ai: true },
    { name: "SpiderB", position: [120, -80], rotation: 270, ai: true },
    { name: "SpiderC", position: [-80, -120], rotation: 0, ai: true },
    { name: "SpiderD", position: [-120, 80], rotation: 90, ai: true },
  ], // 所有甲虫的定义，与场景中配置的甲虫数量相对应。

  // UI 相关的对象
  ui: {
    progressBar: new ProgressBar({
      container: document.getElementById("container"),
    }),
    showButtonStart: () => {
      game.ui.buttonMask = document.createElement("div");
      game.ui.buttonMask.style.backgroundColor = "#000000cc";
      game.ui.buttonMask.style.display = "block";
      game.ui.buttonMask.style.position = "absolute";
      game.ui.buttonMask.style.top = "0px";
      game.ui.buttonMask.style.bottom = "0px";
      game.ui.buttonMask.style.left = "0px";
      game.ui.buttonMask.style.right = "0px";
      game.ui.buttonMask.addEventListener("click", (e) => {
        e.preventDefault();
      });

      game.ui.buttonStart = document.createElement("input");
      game.ui.buttonStart.type = "button";
      game.ui.buttonStart.className = "game-button";
      game.ui.buttonStart.value = "START";
      game.ui.buttonStart.style.position = "absolute";
      game.ui.buttonStart.style.top = "120px";
      game.ui.buttonStart.style.left = "50%";
      game.ui.buttonStart.style.transform = "translateX(-50%) translateY(-50%)";
      game.ui.buttonStart.addEventListener("click", game.ui.onClickButtonStart);

      document.body.appendChild(game.ui.buttonMask);
      game.ui.buttonMask.appendChild(game.ui.buttonStart);
    },
    onClickButtonStart: () => {
      document.body.removeChild(game.ui.buttonMask);
      game.start();
    },
    showButtonReset: () => {
      game.ui.buttonReset = document.createElement("input");
      game.ui.buttonReset.type = "button";
      game.ui.buttonReset.className = "game-button";
      game.ui.buttonReset.value = "RESET";
      game.ui.buttonReset.style.position = "absolute";
      game.ui.buttonReset.style.top = "120px";
      game.ui.buttonReset.style.left = "50%";
      game.ui.buttonReset.style.transform = "translateX(-50%) translateY(-50%)";
      game.ui.buttonReset.addEventListener("click", game.ui.onClickButtonReset);

      document.body.appendChild(game.ui.buttonReset);
    },
    onClickButtonReset: () => {
      document.body.removeChild(game.ui.buttonReset);
      game.reset();
    },
  },

  // 背景音乐
  sfx: {
    bgm: new Audio("./sounds/bgm-01.mp3"),
  },

  // 游戏是否就绪
  ready: false,

  // 游戏循环函数，由 RAF 调度
  loop: (delta) => {
    for (let beetle of game.beetles) {
      if (beetle.hp <= 0) {
        beetle.down();
      }
      beetle.update(delta);
    }
    if (game.finish) {
      return;
    }
    const winner = game.checkWinner();
    if (winner) {
      game.finish = true;

      // TODO 14.a 图观接口调用：将相机聚焦到获胜的甲虫模型。
      // appInstance.uniCall('focusModel', { id: winner.name, modelType: 'model', distance: 100 }, () => {
      //   appInstance.uniCall('rotateCamera', { enabled: true, duration: 120 });
      // });
      // 结束 - 图观接口调用：将相机聚焦到获胜的甲虫模型。
      game.ui.showButtonReset();
      ws.finish(winner.name);
    }
  },

  // 函数：开始游戏
  start: () => {
    if (!game.ready) {
      game.sfx.bgm.loop = true;
      game.sfx.bgm.volume = 0.25;
      game.sfx.bgm.play();

      game.beetles = [];
      for (let beetleDef of game.beetleDefs) {
        const beetle = new Beetle(beetleDef.name, appInstance, {
          def: beetleDef,
          position: beetleDef.position,
          speed: 10,
          rotation: beetleDef.rotation,
          arenaSize: arena.halfSize,
          hp: 100,
          ai: beetleDef.ai,
        });
        beetle.init();
        game.beetles.push(beetle);
      }
      game.ready = true;
      game.finish = false;
      // TODO 14.b 设置相机至俯瞰竞技场的位置（同时自动终止相机环绕）。
      // appInstance.uniCall('setCamera', {
      //   coordType: 1,
      //   coordTypeZ: 0,
      //   centerCoord: [0, 0],
      //   coordZ: 0,
      //   distance: 400,
      //   pitch: 45,
      //   heading: 0,
      //   fly: true,
      //   duration: 1,
      // });
      // 结束 - 设置相机至俯瞰竞技场的位置（同时自动终止相机环绕）。
      ws.start();
    }
  },

  // 函数：重置游戏
  reset: () => {
    game.selected = undefined;
    game.finish = false;

    for (let beetle of game.beetles) {
      beetle.reset();
    }
    // TODO 14.c 重置相机至俯瞰竞技场的位置（同时自动终止相机环绕）。
    // appInstance.uniCall('setCamera', {
    //   coordType: 1,
    //   coordTypeZ: 0,
    //   centerCoord: [0, 0],
    //   coordZ: 0,
    //   distance: 400,
    //   pitch: 45,
    //   heading: 0,
    //   fly: true,
    //   duration: 1,
    // });
    // 结束 - 重置相机至俯瞰竞技场的位置（同时自动终止相机环绕）。
    ws.reset();
  },
  // 函数：拾取甲虫
  pickBeetles(position, radius) {
    let result = [];
    for (let beetle of game.beetles) {
      const distance = beetle.walkState.distanceTo(position);
      if (distance <= radius) {
        result.push({ beetle, distance });
      }
    }
    return result.sort((s1, s2) => {
      return s2.distance - s1.distance;
    });
  },
  // 函数：确定获胜者
  checkWinner: () => {
    const candidates = [];
    for (let beetle of game.beetles) {
      if (!beetle.isDown) {
        candidates.push(beetle);
      }
    }
    if (candidates.length === 1) {
      return candidates[0];
    }
  },
  // 函数：作弊码
  cheat: (code, param) => {
    switch (code) {
      case "win":
        if (!game.ready || game.finish) {
          return;
        }
        let winner = game.beetles.find((s) => {
          return s.name === param;
        });
        if (winner) {
          for (let beetle of game.beetles) {
            if (beetle.name !== winner.name) {
              beetle.hp = 0;
            }
          }
        }
        break;
    }
  },
};
