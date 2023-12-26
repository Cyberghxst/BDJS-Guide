# $arrayRemove
Removes an element from the given array.
## Usage
> `$arrayRemove[name;index]`
## Parameters
| Name  |       Description       |  Type  | Default value |
|-------|-------------------------|--------|---------------|
| Name  | The name for the array. | String | none          |
| Index | The element index.      | Number | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Removes an element from the given array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Index',
            description: 'The element index.',
            required: true,
            resolver: 'Number',
            value: 'none'
        }
    ],
    code: async function(d, [name, index]) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)
        if (index === undefined) throw new d.error(d, 'required', 'Index', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)
        if (isNaN(Number(index)) || Number(index) < 0 || Number(index) > args.length)
            throw new d.error(d, 'invalid', 'Index', d.function?.name!)
        
        const removed = args.splice(Number(index), 1)?.[0]
        if (removed) return removed
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/arrayRemove.ts)