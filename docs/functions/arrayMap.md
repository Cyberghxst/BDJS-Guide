# $arrayMap
Execute a code for each array element.
## Usage
> `$arrayMap[name;variable;code;separator?]`
## Parameters
|   Name    |             Description             |  Type  | Default value |
|-----------|-------------------------------------|--------|---------------|
| Name      | The name for the array.             | String | none          |
| Variable  | Variable to load the results to.    | String | none          |
| Code      | Code to be applied to each element. | String | none          |
| Separator | Result separator.                   | String | ,             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Execute a code for each array element.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for the array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Variable to load the results to.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'Code to be applied to each element.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'Result separator.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [name, variable, code, separator = ',']) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)
        if (variable === undefined) throw new d.error(d, 'required', 'Variable Name', d.function?.name!)
        if (code === undefined) throw new d.error(d, 'required', 'Code', d.function?.name!)

        const args = d.getEnvironmentVariable(name)
        if (!d.hasEnvironmentVariable(name) || !Array.isArray(args)) 
            throw new d.error(d, 'invalid', 'Array Name', d.function?.name!)
        
        const results: string[] = []
        for (const element of args) {
            const data = d.extend(d)
            data.setEnvironmentVariable('element', element)
            const compiled = await data.reader.compile(code, data)
            if (compiled.code !== '') results.push(compiled.code)
        }

        d.setEnvironmentVariable(variable, results.join(separator))
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/arrayMap.ts)