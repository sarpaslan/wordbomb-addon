<p align="center">
  <img src="assets/wb.png" alt="wordbomb-addon" width="500">
</p>

# Word Bomb Addon

Create your own addon for Word Bomb and:

- Create your own /commands
- Send chat messages and embeds to players
- React to game events (turns, word submissions, etc.)
- Send Discord DMs and files to players (requires permission)

New to this? [Click here to get started](docs/setup.md)

See [Reference](docs/reference.md) for game modes, scenarios, and events.

## Examples

| Addon | Description |
|-------|-------------|
| [Word History](https://github.com/sarpaslan/wordbomb-word-history) | Track your words and export to Discord |
| [Hyphen Champions](https://github.com/sarpaslan/wordbomb-hyphen-addon) | Track hyphenated words and compete with others |

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
  practice: false
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
  practice: false,
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
  // data.locale - language
  console.log(`${client.name}'s turn: ${data.letter}`);
});

addon.on('submit', (data, client) => {
  // data.word - submitted word
  // data.correct - true/false
  // data.letter - the prompt
  // data.locale - language
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
addon.on('unregister', (client) => { }); // user unsubscribed
addon.on('connect', (client) => { });    // user connected
addon.on('disconnect', (client) => { }); // user disconnected
addon.on('error', (err) => { });         // something went wrong
```

## Permissions

Addons can request special permissions from users. When a user enables your addon, they'll see a permission dialog.

### Available Permissions

| Permission | Description |
|------------|-------------|
| `io.wordbomb.sendmessage` | Send Discord DMs and files to the user |

### Requesting Permissions

```javascript
const addon = new WordBombAddon('YOUR_TOKEN', {
  name: 'My Addon',
  desc: 'Description here',
  practice: false,
  permissions: ['io.wordbomb.sendmessage']
});
```

### Sending Discord Messages

```javascript
// Send a text message
addon.sendDiscordMessage(client.id, 'Hello from Word Bomb!')
  .then(() => console.log('Message sent!'))
  .catch(err => console.log('Failed:', err));

// Send a file
const content = 'Line 1\nLine 2\nLine 3';
addon.sendDiscordFile(client.id, 'export.txt', content)
  .then(() => console.log('File sent!'))
  .catch(err => console.log('Failed:', err));
```

### Error Handling

```javascript
addon.sendDiscordMessage(client.id, 'Hello!')
  .catch(err => {
    if (err === 'Permission denied') {
      addon.sendChat(client.id, 'Please grant Discord permission first.');
    } else if (err === 'Rate limited') {
      addon.sendChat(client.id, 'Too many requests, try again later.');
    } else {
      addon.sendChat(client.id, 'Failed to send message.');
    }
  });
```

## Rate Limits

To prevent abuse, there are rate limits on Discord messages:

**Per Addon:**
- 1 message per second
- 20 messages per minute
- 120 messages per hour

**Global (all addons combined):**
- 4 messages per second
- 50 messages per minute
- 500 messages per hour

You should implement your own user-level rate limiting to provide a good experience:

```javascript
const userCooldowns = new Map();
const COOLDOWN = 60000; // 60 seconds

addon.registerCommand('export', async (client, args) => {
  const lastUse = userCooldowns.get(client.id) || 0;
  const remaining = Math.ceil((COOLDOWN - (Date.now() - lastUse)) / 1000);

  if (Date.now() - lastUse < COOLDOWN) {
    addon.sendChat(client.id, `Wait ${remaining}s before using this again.`);
    return;
  }

  try {
    await addon.sendDiscordFile(client.id, 'data.txt', 'Your data here');
    userCooldowns.set(client.id, Date.now());
    addon.sendChat(client.id, 'Sent to your Discord DMs!');
  } catch (err) {
    addon.sendChat(client.id, 'Failed: ' + err);
  }
});
```

## Need Help?

For questions or help, join our Discord: https://discord.gg/wordbomb

## License

MIT
