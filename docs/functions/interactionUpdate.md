# $interactionUpdate
Updates an interaction.
## Usage
> `$interactionUpdate[message;return id?]`
## Parameters
|   Name    |            Description            |  Type   | Default value |
|-----------|-----------------------------------|---------|---------------|
| Message   | The message to be sent.           | String  | none          |
| Return ID | Returns the interaction reply ID. | Boolean | false         |

## Source Code
```ts
import { MessageComponentInteraction } from 'discord.js'
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Updates an interaction.',
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
        if (!(d.ctx?.data instanceof MessageComponentInteraction)) throw new d.error(d, 'disallowed', d.function?.name!, 'component interactions')
        if (!d.ctx.data.isRepliable()) throw new d.error(d, 'custom', `${d.commandType} is not repliable.`)
        if (!d.ctx.data.replied) throw new d.error(d, 'custom', 'Cannot update an interaction that is not replied.')

        const result = await d.reader.compile(message, d)
        if (result?.code) d.container.pushContent(result.code)

        const data = await d.ctx.data.update(d.container).then((res) => {
            d.container.clear()
            return res
        }).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 4 }))
        })

        if (data && data.id && returnId === 'true') return data.id
    }
})

```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/interactionUpdate.ts)