/**
 * WebSocket 对象，用来封装 WebSocket 操作。
 */
const ws = {
  socket: undefined,
  // 初始化
  init: () => {
    if (window.io) {
      ws.socket = window.io();
      ws.socket.on('game-signal', function (msg) {
        // 在控制台记录接收到的指令。
        console.log(new Date().toLocaleTimeString(), 'GAME SIGNAL: ', msg);
        const command = JSON.parse(msg);
        let clientBeetle = game.beetles.find((beetle) => {
          return beetle.clientID === command.clientID;
        });
        if (!clientBeetle && command.action !== 'occupy') {
          return;
        }
        switch (command.action) {
          case 'occupy':
            // 占据指令（玩家开始操控指定的甲虫）。
            let result = false;
            for (let beetle of game.beetles) {
              if (!beetle.isOccupied()) {
                result = beetle.occupy(command.clientID);
              }
              if (result) {
                ws.occupied(command.clientID, beetle.name);
                break;
              }
            }
            break;
          case 'fire':
            // 开火指令。
            clientBeetle.fire();
            break;
          case 'move':
            // 移动指令。
            if (clientBeetle.isDown) {
              return;
            }
            let coord = command.data;
            if (!(coord instanceof Array)) {
              break;
            }
            arena.clampToArena(coord);
            if (!clientBeetle.isWalking()) {
              appInstance.uniCall('playModelAnimation', { id: clientBeetle.name, name: '行走-前进02', state: 'begin' }, (result) => {});
              clientBeetle.playSFX('walking');
            } else {
              clientBeetle.walkState.break();
            }
            clientBeetle.walk(coord);
            break;
          case 'stop':
            // 停止指令。
            clientBeetle.walkState.break();
            break;
        }
      });
    }
  },
  send: (clientID, action, data) => {
    if (!ws.socket) {
      return;
    }
    ws.socket.emit(
      'game-feedback',
      JSON.stringify({
        clientID: clientID,
        action: action,
        data: data,
      })
    );
  },
  // ping 所有客户端
  ping: () => {
    ws.send('', 'ping', new Date().getTime());
  },
  // 通知所有客户端：游戏开始
  start: () => {
    ws.send('', 'start', '');
  },
  // 通知所有客户端：游戏重置
  reset: () => {
    ws.send('', 'reset', '');
  },
  // 通知所有客户端：游戏结束
  finish: (winnerClientID) => {
    ws.send('', 'finish', winnerClientID);
  },
  // 通知指定客户端：占据成功
  occupied: (clientID, beetleName) => {
    ws.send(clientID, 'occupied', beetleName);
  },
  // 通知指定客户端：生命值变化
  hpchanged: (clientID, hp) => {
    ws.send(clientID, 'hpchanged', hp);
  },
  // 通知指定客户端：已被击倒
  down: (clientID, rivalClientID) => {
    ws.send(clientID, 'down', rivalClientID);
  },
};
