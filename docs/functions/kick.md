# $kick
Kicks an user from the provided guild.
## Usage
> `$kick[user id;guild id?;reason?]`
## Parameters
|   Name   |                   Description                    |  Type  |  Default value   |
|----------|--------------------------------------------------|--------|------------------|
| User ID  | The user ID to be kicked.                        | String | none             |
| Guild ID | The Guild ID where the user will be kicked from. | String | d.ctx?.guild?.id |
| Reason   | Kick reason.                                     | String | none             |

## Extra Data
> Supports Builders
## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    builders: true,
    description: 'Kicks an user from the provided guild.',
    parameters: [
        {
            name: 'User ID',
            description: 'The user ID to be kicked.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The Guild ID where the user will be kicked from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Reason',
            description: 'Kick reason.',
            required: false,
            compile: false,
            resolver:'String',
            value: 'none'
        }
    ],
    code: async function(d, [userID, guildID = d.ctx?.guild?.id, reason]) {
        if (userID === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)

        const member = await d.util.getMember(userID, d.ctx?.guild!)
        if (!member) throw new d.error(d, 'invalid', 'member', d.function?.name!)

        await member.kick(reason).catch(e => {
            throw new d.error(d, 'custom', inspect(e))
        })
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/kick.ts)