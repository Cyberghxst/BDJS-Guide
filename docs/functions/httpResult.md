# $httpResult
Retrieves a property value from a request.
## Usage
> `$httpResult[variable;path]`
## Parameters
|   Name   |                  Description                  |  Type  | Default value |
|----------|-----------------------------------------------|--------|---------------|
| Variable | Variable name to get the property value from. | String | none          |
| Path     | Property path to retrieve.                    | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import * as _ from 'lodash'

export default new BaseFunction({
    description: 'Retrieves a property value from a request.',
    parameters: [
        {
            name: 'Variable',
            description: 'Variable name to get the property value from.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Path',
            description: 'Property path to retrieve.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [variable, path]) {
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function!.name)
        if (path === undefined)
            throw new d.error(d, 'required', 'Property Path', d.function?.name!)
        if (!d.hasEnvironmentVariable(variable))
            throw new d.error(d, 'invalid', 'Variable Name', d.function!.name)

        const data = d.getEnvironmentVariable(variable)
        if (typeof data !== 'object' || ['body', 'code', 'headers'].some(x => !Object.keys(data).includes(x)))
            throw new d.error(d, 'invalid', 'Variable Name', d.function!.name)

        return _.get(data, path)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/httpResult.ts)