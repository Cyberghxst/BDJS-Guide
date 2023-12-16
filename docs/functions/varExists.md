# $varExists
Check if the variable name exists in the environment data.
## Usage
> `$varExists[name]`
## Parameters
| Name |  Description   |  Type  | Default value |
|------|----------------|--------|---------------|
| Name | Variable name. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the variable name exists in the environment data.',
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
        
        return d.hasEnvironmentVariable(name)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/varExists.ts)