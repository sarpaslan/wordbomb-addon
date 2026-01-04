<p align="center">
  <img src="assets/wb.png" alt="wordbomb-addon" width="300">
</p>

# Word Bomb Addon

Create your own addon for Word Bomb and:

- Create your own /commands
- Send chat messages and embeds to players
- React to game events (turns, word submissions, etc.)

## Step 1: Clone the Repository

```bash
git clone https://github.com/sarpaslan/wordbomb-addon
cd wordbomb-addon
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Get Your Addon Token

1. Open Word Bomb (https://wordbomb.io)
2. Press **F2** to open the console
3. Type `token` and press Enter
4. Copy your token

## Step 4: Add Your Token

Open `index.js` and replace `YOUR_TOKEN_HERE` with your token:

```javascript
const addon = new WordBombAddon('your_token_here', {
  name: 'My Addon',
  desc: 'My awesome addon',
  practiceOnly: false
});
```

## Step 5: Run Your Addon

```bash
node index.js
```

## How It Works

Once your addon is running, players can subscribe to it from the addons menu. Here's how to handle events:

### Basic Setup

```javascript
const { WordBombAddon } = require('./wordbomb-addon.js');

const addon = new WordBombAddon('YOUR_TOKEN', {
  name: 'My Addon',
  desc: 'Description here',
  practiceOnly: false,
  welcome: '<h3>Welcome!</h3><p>Commands: <b>/hello</b></p>'
});

addon.on('ready', (id) => console.log('Addon ready:', id));
```

### Registering Commands

```javascript
addon.registerCommand('hello', (client, args) => {
  addon.sendChat(client.id, `Hello ${client.name}!`);
});

addon.registerCommand('add', (client, args) => {
  const nums = args.split('+').map(n => parseFloat(n.trim()));
  const sum = nums.reduce((a, b) => a + b, 0);
  addon.sendChat(client.id, `Result: ${sum}`);
});
```

### Sending Embeds

```javascript
addon.sendEmbed(client.id, {
  icon: '🏆',
  title: 'Leaderboard',
  content: '1. Player1 - 100\n2. Player2 - 80',
  color: '#f59e0b'
});
```

### Game Events

```javascript
addon.on('start', (data, client) => {
  console.log(`Game started: ${client.name}`);
});

addon.on('turn', (data, client) => {
  // data.letter - the prompt
  // data.mode - game mode
  // data.sc - score mode
  // data.cs - chain mode
  console.log(`${client.name}'s turn: ${data.letter}`);
});

addon.on('submit', (data, client) => {
  // data.word - submitted word
  // data.correct - true/false
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
```

### Client Events

```javascript
addon.on('register', (client) => { });   // new user subscribed
addon.on('connect', (client) => { });    // user connected
addon.on('disconnect', (client) => { }); // user disconnected
addon.on('error', (err) => { });         // something went wrong
```

## Options

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | Addon name (required) |
| `desc` | string | Short description |
| `practiceOnly` | boolean | Only receive game events in practice mode |
| `welcome` | string | HTML welcome message shown to users |

## Need Help?

For questions or help, join our Discord: https://discord.gg/wordbomb

## License

MIT
