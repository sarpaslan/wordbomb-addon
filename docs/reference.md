# Reference

Game data sent in the `turn` event.

## Chain Settings (cs)

Only used in Chain mode (mode 1).

| Value | Mode |
|-------|------|
| 0 | Starts With |
| 1 | Contains |
| 2 | Random |
| 3 | Shiritori |

## Scenarios (sc)

| Value | Name |
|-------|------|
| 0 | Normal |
| 1 | No Fail |
| 2 | Single Prompt |
| 3 | Three Lives |
| 4 | Long Words (8+ letters) |
| 5 | All Syllables |
| 6 | Sub 8 |
| 7 | Sub 50 |
| 8 | Bullet |
| 9 | Blitz |
| 10 | Sub 500 |
| 11 | Four Letter |
| 12 | Hypo Prompts |
| 13 | Min 1 |
| 14 | Plate |
| 15 | Multi Word |
| 99 | Random |

## Game Modes (mode)

| Value | Mode |
|-------|------|
| 0 | Original |
| 1 | Chain |

Other game modes are not supported right now.

## Events

| Event | Data | Description |
|-------|------|-------------|
| `ready` | `id` | Addon connected |
| `register` | `client` | New user subscribed |
| `unregister` | `client` | User unsubscribed |
| `connect` | `client` | User connected |
| `disconnect` | `client` | User disconnected |
| `start` | `data, client` | Game started |
| `turn` | `data, client` | Player's turn |
| `submit` | `data, client` | Word submitted |
| `end` | `data, client` | Game ended |
| `error` | `err` | Error occurred |

## Turn Data

| Field | Description |
|-------|-------------|
| `letter` | The prompt to match |
| `mode` | Game mode |
| `sc` | Scenario |
| `cs` | Chain setting |

## Submit Data

| Field | Description |
|-------|-------------|
| `word` | Submitted word |
| `correct` | true/false |
