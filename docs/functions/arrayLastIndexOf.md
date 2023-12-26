# $arrayLastIndexOf
Returns the last index of the provided element.
## Usage
> `$arrayLastIndexOf[name;element]`
## Parameters
|  Name   |       Description       |  Type  | Default value |
|---------|-------------------------|--------|---------------|
| Name    | The name for the array. | String | none          |
| Element | Elements to be found.   | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the last index of the provided element.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Element',
            description: 'Elements to be found.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, element]) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)
        if (element === undefined) throw new d.error(d, 'required', 'Element', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)
        
        return args.lastIndexOf(element).toString()
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/arrayLastIndexOf.ts)