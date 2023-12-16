# $clientSetName
Set the name for the client.
## Usage
> `$clientSetName[name]`
## Parameters
| Name |         Description          |  Type  | Default value |
|------|------------------------------|--------|---------------|
| Name | The new name for the client. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Set the name for the client.',
    parameters: [
        {
            name: 'Name',
            description: 'The new name for the client.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name]) {
        if (name === undefined) throw new d.error(d, 'required', 'URL', d.function?.name!)
        
        await d.bot?.user.setUsername(name)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/clientSetName.ts)