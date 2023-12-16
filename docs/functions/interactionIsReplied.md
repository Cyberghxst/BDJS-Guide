# $interactionIsReplied
Check whether interaction is replied or not.
## Usage
> `$interactionIsReplied`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether interaction is replied or not.',
    code: async function(d) {
        if (!(d.ctx?.data instanceof BaseInteraction)) throw new d.error(d, 'disallowed', d.function?.name!, 'interactions')
        return d.ctx.data.isRepliable() && d.ctx.data.replied
    }
})

```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/interactionIsReplied.ts)