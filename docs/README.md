# BDJS
BDJS is a lightweight, yet potent package for creating Discord bots.
With a simple and intuitive API, BDJS makes it easy to build and deploy bots 
that can perform a wide range of tasks, from sending messages to managing 
roles and handling commands. Whether you're a seasoned developer or just 
starting out, BDJS is the perfect tool for creating bots.

## Installation commands
> npm: `npm install bdjs` <br>
> pnpm: `pnpm add bdjs` <br>
> yarn: `yarn add bdjs` <br>

## Basic setup
```js
const { Bot } = require('bdjs')

const bot = new Bot({
    auth: 'BOT TOKEN',
    events: [
        'onMessageCreate',
        'onReady'
    ],
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent'
    ],
    prefixes: [
        'PREFIX_1',
        'PREFIX_2'
    ]
})

bot.login()
```