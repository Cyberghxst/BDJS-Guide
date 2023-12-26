# $arrayAppend
Appends an element to the given array.
## Usage
> `$arrayAppend[name;elements]`
## Parameters
|   Name   |       Description       |  Type  | Default value |
|----------|-------------------------|--------|---------------|
| Name     | The name for the array. | String | none          |
| Elements | Elements to be pushed   | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Appends an element to the given array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Elements',
            description: 'Elements to be pushed',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, ...elements]) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)
        if (elements[0] === undefined) throw new d.error(d, 'required', 'Elements', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)
        
        for (const element of elements) {
            args.push(element)
        }
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/arrayAppend.ts)