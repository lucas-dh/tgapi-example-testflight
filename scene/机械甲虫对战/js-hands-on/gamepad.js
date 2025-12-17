const gamepad = {
  activePad: undefined,
  deadzone: 0.15,
  elapsed: 0,
  interval: 0.2,
  pressed: false,
  update: (beetle, delta) => {
    gamepad.elapsed += delta;
    if (gamepad.elapsed < gamepad.interval) {
      return;
    }
    gamepad.elapsed = 0;
    gamepad.checkGamepad(beetle);
  },
  checkGamepad: (beetle) => {
    if (!beetle || !game.ready || !navigator.getGamepads || !navigator.getGamepads()) {
      return;
    }

    gamepad.activePad = undefined;

    for (let pad in navigator.getGamepads()) {
      if (!isNaN(Number(pad)) && navigator.getGamepads()[pad] !== null) {
        gamepad.activePad = navigator.getGamepads()[pad];
        break;
      }
    }

    if (!gamepad.activePad) {
      return;
    }
    if (
      (gamepad.activePad.buttons[0] && gamepad.activePad.buttons[0].value > 0.2) ||
      (gamepad.activePad.buttons[7] && gamepad.activePad.buttons[7].value > 0.2)
    ) {
      beetle.fire();
    }
    let direction = gamepad.getDirection(gamepad.activePad.axes[0], gamepad.activePad.axes[1]);
    if (direction) {
      gamepad.pressed = true;
    }

    if (typeof direction === 'number') {
      let coord = [...beetle.walkState.currentPosition];
      coord[0] += 150 * Math.cos(direction);
      coord[1] += -150 * Math.sin(direction);

      arena.clampToArena(coord);
      if (!beetle.isWalking()) {
        appInstance.uniCall('playModelAnimation', { id: beetle.name, name: '行走-前进02', state: 'begin' });
        beetle.playSFX('walking');
      } else {
        beetle.walkState.break();
      }
      beetle.walk(coord);
    } else {
      if (gamepad.pressed) {
        beetle.walkState.break();
        gamepad.pressed = false;
      }
    }
  },
  getDirection: (x, y) => {
    if (Math.abs(x) < gamepad.deadzone && Math.abs(y) < gamepad.deadzone) {
      return undefined;
    }
    if (x === 0) {
      if (y < 0) {
        return Math.PI / 2;
      } else {
        return Math.PI / -2;
      }
    }
    return Math.atan2(-y, x);
  },
};
