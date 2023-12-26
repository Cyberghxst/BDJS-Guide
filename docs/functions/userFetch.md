# $userFetch
Fetch an user property.
## Usage
> `$userFetch[property;user id]`
## Parameters
|   Name   |             Description             |  Type  |   Default value   |
|----------|-------------------------------------|--------|-------------------|
| Property | User property name.                 | String | none              |
| User ID  | User ID to fetch the property from. | String | d.ctx?.author?.id |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { User } from 'discord.js'
import { inspect } from 'util'

export function getUserProperty(user: User & Record<string, any>, property: string) {
    const data = JSON.parse(JSON.stringify(user))
    switch (property) {
        case 'isBot':
            return user.bot + ''
        default:
            return Array.isArray(data[property]) ? data[property].join(',') : typeof user[property] === 'string' ? user[property] : inspect(user[property])
    }
}

export default new BaseFunction({
    description: 'Fetch an user property.',
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
            description: 'User ID to fetch the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.author?.id'
        }
    ],
    code: async function(d, [property, memberID = d.ctx?.author?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'User ID', d.function?.name!)

        const user = await d.bot?.users.fetch(memberID) as User & Record<string, string>
        if (!user) throw new d.error(d, 'invalid', 'user', d.function?.name!)

        const types = Object.keys(JSON.parse(JSON.stringify(user))).concat(['isBot'])
        if (!types.includes(property)) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return getUserProperty(user, property)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/userFetch.ts)