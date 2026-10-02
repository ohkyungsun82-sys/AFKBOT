const mineflayer = require('mineflayer');
const http = require('http');

// Render 웹 서비스 포트 바인딩 요구사항 충족
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('AFK Bot is running!\n');
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`HTTP server is listening on port ${PORT}`);
});

// 마인크래프트 AFK 봇 로직
function createBot() {
  console.log('서버에 접속을 시도합니다...');
  
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

// 이 부분이 있어야 봇 생성 함수가 실행됩니다!
createBot();
