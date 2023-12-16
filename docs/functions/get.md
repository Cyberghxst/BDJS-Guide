# $get
Get a variable from the environment data.
## Usage
> `$get[name]`
## Parameters
| Name |  Description   |  Type  | Default value |
|------|----------------|--------|---------------|
| Name | Variable name. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Get a variable from the environment data.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name]) {
        if (name === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        
        return d.getEnvironmentVariable(name)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/get.ts)