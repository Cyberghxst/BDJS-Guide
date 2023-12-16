# $interactionReply
Replies an interaction.
## Usage
> `$interactionReply[message;return id?]`
## Parameters
|   Name    |            Description            |  Type   | Default value |
|-----------|-----------------------------------|---------|---------------|
| Message   | The message to be sent.           | String  | none          |
| Return ID | Returns the interaction reply ID. | Boolean | false         |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Replies an interaction.',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be sent.',
            required: true,
            compile: false,
            value: 'none'
        },
        {
            name: 'Return ID',
            description: 'Returns the interaction reply ID.',
            required: false,
            compile: true,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function(d, [message, returnId = 'false']) {
        if (!(d.ctx?.data instanceof BaseInteraction)) throw new d.error(d, 'disallowed', d.function?.name!, 'interactions')
        if (!d.ctx.data.isRepliable()) throw new d.error(d, 'custom', `${d.commandType} is not repliable.`)
        if (d.ctx.data.replied) throw new d.error(d, 'custom', 'Cannot reply an interaction that is already replied.')

        const result = await d.reader.compile(message, d)
        if (result?.code) d.container.pushContent(result.code)

        const data = await d.ctx.data.reply(d.container).then((res) => {
            d.container.clear()
            return res
        }).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 4 }))
        })

        if (data && data.id && returnId === 'true') return data.id
    }
})

```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/interactionReply.ts)