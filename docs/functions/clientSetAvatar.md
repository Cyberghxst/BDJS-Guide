# $clientSetAvatar
Set the avatar for the client.
## Usage
> `$clientSetAvatar[url]`
## Parameters
| Name |      Description       |  Type  | Default value |
|------|------------------------|--------|---------------|
| URL  | URL of the new avatar. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Set the avatar for the client.',
    parameters: [
        {
            name: 'URL',
            description: 'URL of the new avatar.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [url]) {
        if (url === undefined) throw new d.error(d, 'required', 'URL', d.function?.name!)
        
        await d.bot?.user.setAvatar(url)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/clientSetAvatar.ts)