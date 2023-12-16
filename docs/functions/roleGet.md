# $roleGet
Get a guild role property.
## Usage
> `$roleGet[property;role id;guild id?]`
## Parameters
|   Name   |                     Description                     |  Type  |  Default value   |
|----------|-----------------------------------------------------|--------|------------------|
| Property | Role property name.                                 | String | none             |
| Role ID  | Guild role ID to get the property from.             | String | none             |
| Guild ID | The ID of the guild where role should be retrieved. | String | d.ctx?.guild?.id |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { Role } from 'discord.js'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Get a guild role property.',
    parameters: [
        {
            name: 'Property',
            description: 'Role property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Role ID',
            description: 'Guild role ID to get the property from.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where role should be retrieved.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [property, roleID, guildID = d.ctx?.guild?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (roleID === undefined) throw new d.error(d, 'invalid', 'Role ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild', d.function?.name!)

        const role = await guild.roles.cache.get(roleID) as Role & Record<string, string>
        if (!role) throw new d.error(d, 'invalid', 'Role', d.function?.name!)

        const types = Object.keys(JSON.parse(JSON.stringify(role)))
        if (!types.includes(property)) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return typeof role[property] === 'string' ? role[property] : typeof role[property] === 'number' ? role[property].toString() : inspect(role[property])
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/roleGet.ts)