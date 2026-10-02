const mineflayer = require('mineflayer');
const http = require('http');

// 1. Render 웹 서비스용 간단한 HTTP 서버 (포트 바인딩 에러 방지용)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP server is listening on port ${PORT}`);
});

// 2. 마인크래프트 AFK 봇 로직
function createBot() {
  const bot = mineflayer.createBot({
    host: 'yoonho1104.aternos.me',
    port: 12532,
    username: '.AFK_BOT',
    version: false
  });

  bot.on('spawn', () => {
    console.log('.AFK_BOT이 서버에 성공적으로 접속했습니다!');
    
    // 5분마다 점프해서 튕김 방지
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
