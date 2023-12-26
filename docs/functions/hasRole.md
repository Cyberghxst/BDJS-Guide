# $hasRole
Check if the provided member has a role.
## Usage
> `$hasRole[role id;member id?;guild id?]`
## Parameters
|   Name    |              Description               |  Type  |   Default value   |
|-----------|----------------------------------------|--------|-------------------|
| Role ID   | Guild role ID to be checked.           | String | none              |
| Member ID | The member to be checked.              | String | d.ctx?.author?.id |
| Guild ID  | The ID of the guild member belongs to. | String | d.ctx?.guild?.id  |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the provided member has a role.',
    parameters: [
        {
            name: 'Role ID',
            description: 'Guild role ID to be checked.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Member ID',
            description: 'The member to be checked.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.author?.id'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild member belongs to.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async (d, [roleID, memberID = d.ctx?.author?.id, guildID = d.ctx?.guild?.id]) => {
        if (roleID === undefined) throw new d.error(d, 'required', 'Role ID', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'Member ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const role = await d.util.getRole(roleID, guild)
        if (!role) throw new d.error(d, 'invalid', 'Role ID', d.function?.name!)

        const member = await d.util.getMember(memberID, guild)
        if (!member) throw new d.error(d, 'invalid', 'Member ID', d.function?.name!)

        return member.roles.cache.has(roleID)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/hasRole.ts)