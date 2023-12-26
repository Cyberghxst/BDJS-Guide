# $guildGet
Get a guild property.
## Usage
> `$guildGet[property;guild id?]`
## Parameters
|   Name   |            Description             |  Type  |  Default value   |
|----------|------------------------------------|--------|------------------|
| Property | Guild property name.               | String | none             |
| Guild ID | Guild ID to get the property from. | String | d.ctx?.guild?.id |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { getGuildProperty } from './guildFetch'

export default new BaseFunction({
    description: 'Get a guild property.',
    parameters: [
        {
            name: 'Property',
            description: 'Guild property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Guild ID',
            description: 'Guild ID to get the property from.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [property, guildID = d.ctx?.guild?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        if (property.toLowerCase() === 'exists') return d.bot?.guilds.cache.has(guildID)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        const types = Object.keys(JSON.parse(JSON.stringify(guild)))
        if (!types.includes(property)) throw new d.error(d, 'invalid', 'Property', d.function?.name!)
        
        return getGuildProperty(guild, property)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/guildGet.ts)