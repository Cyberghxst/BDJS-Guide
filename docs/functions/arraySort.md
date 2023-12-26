# $arraySort
Creates an array.
## Usage
> `$arraySort[name;method?;separator?]`
## Parameters
|   Name    |                 Description                  |  Type  | Default value |
|-----------|----------------------------------------------|--------|---------------|
| Name      | The name for this array.                     | String | none          |
| Method    | Method to sort the array. (alpha|asc|desc)   | String | alpha         |
| Separator | The element separator to split the elements. | String | ,             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Creates an array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Method',
            description: 'Method to sort the array. (alpha\|asc\|desc)',
            required: false,
            resolver: 'String',
            value: 'alpha'
        },
        {
            name: 'Separator',
            description: 'The element separator to split the elements.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [name, method = 'alpha', separator = ',']) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)
        if (method === undefined) throw new d.error(d, 'required', 'Method', d.function?.name!)
        if (!['alpha', 'asc', 'desc'].includes(method.toLowerCase()))
            throw new d.error(d, 'invalid', 'Method', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)

        method = method.toLowerCase()

        return (method === 'alpha'
            ? args.sort() : method === 'asc'
                ? args.sort((a: string, b: string) => b.length - a.length)
                : args.sort((a: string, b: string) => a.length - b.length))
            .join(separator)
        
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/arraySort.ts)