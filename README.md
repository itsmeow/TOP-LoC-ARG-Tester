# TOP LoC ARG Tester

Tests codes for [The TOP LoC ARG](https://usb.twentyonepilots.com/) in Discord.

Testing server: https://discord.gg/C8fUp7

## Setup

1. Download or clone the repository
2. Go to [Discord developers panel](https://discord.com/developers/applications)
3. Create an application
4. Go to "Bot"
5. Create a bot
6. Press Copy to get your token
7. Create a `.env` file in the cloned folder containing `TOKEN=discord bot token here`
8. Run `npm install` in a terminal, shell, or command prompt to install bot dependencies
9. Run `npm run start` or `node index.js` to start the bot.
10. Invite the bot to a server. Go to `General Information` in the Discord Developers panel
11. Copy "Client ID"
12. Use this URL, replacing `CLIENT ID HERE` with your client ID: `https://discord.com/oauth2/authorize?client_id=CLIENT ID HERE&scope=bot&permissions=8`

### Extras

Set an icon and name if you wish

Make the bot private or public in the "Bot" menu, if you wish.

You can open `index.js` and update foundList with indexes for USBs (index is USB - 1, 0 is 1, 1 is 2), also update the Role ID in the "found" message with a role to ping, or remove it.
