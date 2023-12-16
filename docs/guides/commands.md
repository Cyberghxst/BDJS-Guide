## Commands
With BDJS, you can define custom commands that can be used to perform complex data manipulation tasks with just a few lines of code. This makes it easy to create powerful and flexible data manipulation workflows without any hassle.
### Basic command setup
To define a command, you must use CommandManager#add like the following example.
```js
// ...bot declaration

bot.commands.add({
    name: 'ping',
    aliases: ['latency'],
    type: 'prefixed',
    code: `
        Pong!
    `
})

bot.login()
```

### Command Loader
CommandManager lets you load commands from a directory with ease.
```js
// ...bot declaration

bot.commands.load('commands').then(async () => {
    await bot.login() // Connecting the bot when commands are loaded.
})
```

### Allowed command types
|         Name          |                                  Description                                  |
|-----------------------|-------------------------------------------------------------------------------|
| ready                 | Executed when client user is ready.                                           |
| prefixed              | Executed when a prefixed message is created.                                  |
| unprefixed            | Executed when an unprefixed (command name without prefix) message is created. |
| always                | Executed when a message is created.                                           |
| anyInteraction        | Executed when an interaction is created.                                      |
| buttonInteraction     | Executed when a button interaction is created.                                |
| selectMenuInteraction | Executed when a select menu interaction is created.                           |
| commandInteraction    | Executed when a command interaction is created.                               |
| modalInteraction      | Executed when a modal interaction is created.                                 |
| interval              | Executed when an interval is emitted.                                         |
| timeout               | Executed when a timeout is emitted.                                           |
| typingStart           | Executed when someone starts typing in a guild channel.                       |
| memberJoin            | Executed when a new member joins a guild.                                     |
| memberLeave           | Executed when a member leaves a guild.                                        |
| botJoin               | Executed when bot joins a guild.                                              |
| botLeave              | Executed when bot leaves a guild.                                             |