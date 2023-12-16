# $isCommand
Check whether current interaction belongs to a slash command or not.
## Usage
> `$isCommand`
## Source Code
```ts
import { ChatInputCommandInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to a slash command or not.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction') throw new d.error(d, 'disallowed', d.function?.name!, '"anyInteraction" commands')
        return d.ctx?.data instanceof ChatInputCommandInteraction
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/isCommand.ts)