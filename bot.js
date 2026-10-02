const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'yoonho1104.aternos.me',
    port: 12532,
    username: '.AFK_BOT',
    version: false
  });

  bot.on('spawn', () => {
    console.log('.AFK_BOT이 서버에 성공적으로 접속했습니다!');
    
    // 5분마다 주기적으로 점프하거나 움직여서 AFK 방지 및 튕김 방지
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 300000);
  });

  bot.on('end', (reason) => {
    console.log(`연결이 끊어졌습니다 (${reason}). 10초 후 재접속합니다...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('에러 발생:', err);
  });
}

createBot();
