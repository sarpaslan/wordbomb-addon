const { WordBombAddon } = require('./wordbomb-addon.js');

const addon = new WordBombAddon('YOUR_TOKEN_HERE', {
  name: 'Example Addon',
  desc: 'Example Word Bomb Addon',
  practiceOnly: false,
  welcome: `
    <h3>Example Addon</h3>
    <p>Commands: <b>/hello</b>, <b>/add</b>, <b>/leaderboard</b></p>
  `
});

addon.registerCommand('hello', (client, args) => {
  addon.sendChat(client.id, `Hello ${client.name}!`);
});

addon.registerCommand('add', (client, args) => {
  const nums = args.split('+').map(n => parseFloat(n.trim()));
  const sum = nums.reduce((a, b) => a + b, 0);
  addon.sendChat(client.id, `Result: ${sum}`);
});

addon.registerCommand('leaderboard', (client, args) => {
  const leaderboard = [
    { name: 'Player1', score: 1250 },
    { name: 'Player2', score: 1100 },
    { name: 'Player3', score: 980 },
    { name: 'Player4', score: 875 },
    { name: 'Player5', score: 720 },
    { name: 'Player6', score: 650 },
    { name: 'Player7', score: 590 },
    { name: 'Player8', score: 480 },
    { name: 'Player9', score: 350 },
    { name: 'Player10', score: 220 }
  ];
  const list = leaderboard.map((p, i) => `${i + 1}. ${p.name} - ${p.score}`).join('\n');
  addon.sendEmbed(client.id, {
    icon: '🏆',
    title: 'Leaderboard',
    content: list,
    color: '#f59e0b'
  });
});

addon.on('ready', (id) => console.log('Addon ready:', id));
addon.on('register', (client) => console.log('Registered:', client.name));
addon.on('unregister', (client) => console.log('Unregistered:', client.name));
addon.on('connect', (client) => console.log('Connected:', client.name));
addon.on('disconnect', (client) => console.log('Disconnected:', client.name));
addon.on('error', (err) => console.log('Error:', err));

addon.on('start', (data, client) => {
  console.log(`Game started: ${client.name}`);
});

addon.on('turn', (data, client) => {
  console.log(`Turn: ${client.name} | letter: ${data.letter} | mode: ${data.mode} | sc: ${data.sc} | cs: ${data.cs}`);
});

addon.on('submit', (data, client) => {
  console.log(`Submit: ${client.name} | word: ${data.word} | correct: ${data.correct}`);
  if (data.correct && data.word.length >= 10) {
    addon.sendEmbed(client.id, {
      icon: '🎉',
      title: 'Nice word!',
      content: `"${data.word}" is ${data.word.length} letters!`,
      color: '#10b981'
    });
  }
});

addon.on('end', (data, client) => {
  console.log(`Game ended: ${client.name}`);
});
