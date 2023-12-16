# $isAnySelectMenu
Check whether current interaction belongs to a select menu or not.
## Usage
> `$isAnySelectMenu`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { BaseInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to a select menu or not.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction') throw new d.error(d, 'disallowed', d.function?.name!, '"anyInteraction" commands')
        return d.ctx?.data instanceof BaseInteraction && d.ctx.data.isAnySelectMenu()
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/isAnySelectMenu.ts)