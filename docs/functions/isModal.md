# $isModal
Check whether current interaction belongs to a modal or not.
## Usage
> `$isModal`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { ModalSubmitInteraction } from 'discord.js'

export default new BaseFunction({
    description: 'Check whether current interaction belongs to a modal or not.',
    code: async function(d) {
        if (d.commandType !== 'anyInteraction') throw new d.error(d, 'disallowed', d.function?.name!, '"anyInteraction" commands')
        return d.ctx?.raw instanceof ModalSubmitInteraction
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/isModal.ts)