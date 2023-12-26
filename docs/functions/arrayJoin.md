# $arrayJoin
Joins an array.
## Usage
> `$arrayJoin[name;separator?]`
## Parameters
|   Name    |                 Description                 |  Type  | Default value |
|-----------|---------------------------------------------|--------|---------------|
| Name      | The name for the array.                     | String | none          |
| Separator | The element separator to join the elements. | String | ,             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Joins an array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'The element separator to join the elements.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [name, separator = ',']) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)
        
        return args.join(separator)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/arrayJoin.ts)