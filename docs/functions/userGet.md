# $userGet
Get an user property.
## Usage
> `$userGet[property;user id]`
## Parameters
|   Name   |            Description            |  Type  |  Default value  |
|----------|-----------------------------------|--------|-----------------|
| Property | User property name.               | String | none            |
| User ID  | User ID to get the property from. | String | d.ctx?.user?.id |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { getUserProperty } from './userFetch'
import { User } from 'discord.js'

export default new BaseFunction({
    description: 'Get an user property.',
    parameters: [
        {
            name: 'Property',
            description: 'User property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'User ID',
            description: 'User ID to get the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.user?.id'
        }
    ],
    code: async function(d, [property, memberID = d.ctx?.user?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'User ID', d.function?.name!)

        const user = d.bot?.users.cache.get(memberID) as User & Record<string, string>
        if (!user) throw new d.error(d, 'invalid', 'user', d.function?.name!)

        const types = Object.keys(JSON.parse(JSON.stringify(user))).concat(['isBot'])
        if (!types.includes(property)) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return getUserProperty(user, property)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/userGet.ts)