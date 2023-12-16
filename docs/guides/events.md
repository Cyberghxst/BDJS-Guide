# Events
To use your commands, you must declare its corresponding events to be listened. <br>
Events must be declared inside client constructor to be listened, 
else the event won't be executed. Events are case-sensitive, 
so take a look on how you define them.

## Setup
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    ...
    events: [
        'onMessageCreate',
        'onInteractionCreate',
        'onReady'
    ],
    ...
})
```

## Supported events
|        Name         |                Description                |
|---------------------|-------------------------------------------|
| onError             | Executed when an error is emitted.        |
| onGuildCreate       | Executed when bot joins a guild.          |
| onGuildDelete       | Executed when bot leaves a guild.         |
| onGuildMemberAdd    | Executed when a new member joins a guild. |
| onGuildMemberRemove | Executed when a new member joins a guild. |
| onInteractionCreate | Executed when an interaction is created.  |
| onInterval          | Executed when an interval is emitted.     |
| onMessageCreate     | Executed when a message is created.       |
| onReady             | Executed when client user is ready.       |
| onShardCreate       | Executed when a shard is created.         |
| onShardReady        | Executed when an interval is emitted.     |
| onTimeout           | Executed when a timeout is emitted.       |
| onTypingStart       | Executed when someone starts typing.      |