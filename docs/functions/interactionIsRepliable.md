# $interactionIsRepliable
Check whether interaction is repliable or not.
## Usage
> `$interactionIsRepliable`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether interaction is repliable or not.',
    code: async function(d) {
        if (!(d.ctx?.data instanceof BaseInteraction)) throw new d.error(d, 'disallowed', d.function?.name!, 'interactions')
        return d.ctx.data.isRepliable()
    }
})

```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/interactionIsRepliable.ts)