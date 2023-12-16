# Application Commands
Using applications commands in BDJS let you sync your specifications in a really easy way.

## Setup
```js
// ...bot declaration

// Loading command specifications from folders.
bot.appManager.load('commands').then(async () => {
    await bot.login() // Let the bot connect to the Discord Gateway.

    // Waiting 5 seconds to let the bot be ready and sync all commands.
    setTimeout(() => {
        if (bot.isReady()) {
            bot.appManager.sync()
            // or bot.appManager.sync(['guildID', 'guildID', 'guildID'])
        }
    }, 5000)
})
```

## Files
You must use SlashCommandBuilder class to form the commands, else, commands won't be loaded.
```js
const { SlashCommandBuilder } = require('bdjs')

module.exports['data'] = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Returns the client websocket latency.')
}
```

### ⚠️ Currently "SUBCOMMANDS" and "SUBCOMMAND GROUPS" aren't supported.