# $var
Add a new variable into the environment data.
## Usage
> `$var[name;value]`
## Parameters
| Name  |   Description   |  Type  | Default value |
|-------|-----------------|--------|---------------|
| Name  | Variable name.  | String | none          |
| Value | Variable value. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Add a new variable into the environment data.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Value',
            description: 'Variable value.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, value]) {
        if (name === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        if (value === undefined) throw new d.error(d, 'required', 'value', d.function?.name!)
        
        d.setEnvironmentVariable(name, value)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/var.ts)