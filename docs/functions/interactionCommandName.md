# $interactionCommandName
Returns the name of the chat input command.
## Usage
> `$interactionCommandName`
## Source Code
```ts
import { ChatInputCommandInteraction, MessageComponentInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the name of the chat input command.',
    code: async function(d) {
        if (!(d.ctx?.data instanceof ChatInputCommandInteraction)) 
            throw new d.error(d, 'disallowed', d.function?.name!, 'command interactions')
        return d.ctx.data.commandName
    }
})

```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/interactionCommandName.ts)