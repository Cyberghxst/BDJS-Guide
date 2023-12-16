# Plugins
BDJS let you add custom functions and events with ease. Just extend "Plugin" class and you're ready to go.

## Setup Example
```js
const { Bot, Plugin } = require('bdjs')
const { join } = require('path')

class BDJSCanvas extends Plugin {
    constructor() {
        super({
            name: 'BDJSCanvas',
            version: '0.0.1',
            description: 'Handle canvas with ease.'
        })

        this.load(join(__dirname, 'functions'), true)
    }
}

const bot = new Bot({
    ...
    plugins: [
        new BDJSCanvas()
    ],
    ...
})
```

## Modules
Every function/event export in your plugins must be under "default" property.
```js
const { BaseFunction } = require('bdjs')

module.exports['default'] = new BaseFunction({
    code: async (d, [message]) => {
        console.log('Using canvas? | ' + message)
    }
})
```

## Aditional Information
You must use BaseFunction and BaseEvent class to export your plugins.
RAW objects wont be loaded.
```js
const { BaseEvent, BaseFunction } = require('bdjs')

// Loaded
module.exports['default'] = new BaseFunction({
    code: async (d, [message]) => {
        console.log('Using canvas? | ' + message)
    }
})
// or
module.exports['default'] = new BaseEvent({
    name: 'onCustom',
    listener(bot, ...args) {
        // ...
    }
})



// NOT LOADED
module.exports['default'] = {
    code: async (d, [message]) => {
        console.log('Using canvas? | ' + message)
    }
}
// or
module.exports['default'] = {
    name: 'onCustom',
    listener(bot, ...args) {
        // ...
    }
}
```