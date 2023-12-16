# $memberGet
Get a guild member property.
## Usage
> `$memberGet[property;member id;guild id?]`
## Parameters
|   Name    |                      Description                      |  Type  |  Default value   |
|-----------|-------------------------------------------------------|--------|------------------|
| Property  | Member property name.                                 | String | none             |
| Member ID | Guild member ID to get the property from.             | String | d.ctx?.user?.id  |
| Guild ID  | The ID of the guild where member should be retrieved. | String | d.ctx?.guild?.id |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { getMemberProperty } from './memberFetch'
import { GuildMember } from 'discord.js'

export default new BaseFunction({
    description: 'Get a guild member property.',
    parameters: [
        {
            name: 'Property',
            description: 'Member property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Member ID',
            description: 'Guild member ID to get the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.user?.id'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where member should be retrieved.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [property, memberID = d.ctx?.user?.id, guildID = d.ctx?.guild?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'member ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild', d.function?.name!)

        const member = await guild.members.cache.get(memberID) as GuildMember & Record<string, string>
        if (!member) throw new d.error(d, 'invalid', 'member', d.function?.name!)

        const types = Object.keys(JSON.parse(JSON.stringify(member))).concat(['isBot', 'isBannable', 'isMuted', 'username', 'id'])
        if (!types.includes(property)) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return getMemberProperty(member, property)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/memberGet.ts)