# $objectMap
Execute a code for each key/value pair.
## Usage
> `$objectMap[name;variable;code;separator?]`
## Parameters
|   Name    |                Description                 |  Type  | Default value |
|-----------|--------------------------------------------|--------|---------------|
| Name      | The name for this object.                  | String | none          |
| Variable  | Variable to load the results to.           | String | none          |
| Code      | Code to be applied to each key/value pair. | String | none          |
| Separator | Result separator.                          | String | ,             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Execute a code for each key/value pair.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
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
            description: 'Code to be applied to each key/value pair.',
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
        if (name === undefined) throw new d.error(d, 'required', 'Object Name', d.function?.name!)
        if (variable === undefined) throw new d.error(d, 'required', 'Variable Name', d.function?.name!)
        if (code === undefined) throw new d.error(d, 'required', 'Code', d.function?.name!)

        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function?.name!)

        let object = d.getEnvironmentVariable(name) as Record<string, any>

        if (typeof object !== 'object' || (typeof object === 'object' && !(JSON.stringify(object).startsWith('{')) && !(JSON.stringify(object).endsWith('}'))))
            throw new d.error(d, 'invalid', 'Object', d.function?.name!)
        
        const results: string[] = []
        for (const [key, value] of Object.entries(object)) {
            const data = d.extend(d)
            data.setEnvironmentVariable('key', key), data.setEnvironmentVariable('value', value)
            const compiled = await data.reader.compile(code, data)
            if (compiled.code !== '') results.push(compiled.code)
        }

        d.setEnvironmentVariable(variable, results.join(separator))
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/objectMap.ts)