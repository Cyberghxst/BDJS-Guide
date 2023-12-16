# $roleDelete
Deletes a guild role.
## Usage
> `$roleDelete[role id;guild id?;reason?]`
## Parameters
|   Name   |                     Description                      |  Type  |  Default value   |
|----------|------------------------------------------------------|--------|------------------|
| Role ID  | Guild role ID to be deleted.                         | String | none             |
| Guild ID | The ID of the guild where role will be deleted from. | String | d.ctx?.guild?.id |
| Reason   | Reason for role deletion.                            | String | none             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Deletes a guild role.',
    parameters: [
        {
            name: 'Role ID',
            description: 'Guild role ID to be deleted.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where role will be deleted from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Reason',
            description: 'Reason for role deletion.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [roleID, guildID = d.ctx?.guild?.id, reason]) {
        if (roleID === undefined) throw new d.error(d, 'invalid', 'Role ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = await d.bot?.guilds.fetch(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild', d.function?.name!)

        const role = await guild.roles.cache.get(roleID)
        if (!role) throw new d.error(d, 'invalid', 'Role', d.function?.name!)

        await role.delete(reason).catch((e) => {
            throw new d.error(d, 'custom', inspect(e))
        })
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/roleDelete.ts)