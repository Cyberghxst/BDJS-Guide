# $httpCode
Retrieves a status code from a request.
## Usage
> `$httpCode[variable]`
## Parameters
|   Name   |                Description                 |  Type  | Default value |
|----------|--------------------------------------------|--------|---------------|
| Variable | Variable name to get the status code from. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Retrieves a status code from a request.',
    parameters: [
        {
            name: 'Variable',
            description: 'Variable name to get the status code from.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [variable]) {
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function!.name)
        if (!d.hasEnvironmentVariable(variable))
            throw new d.error(d, 'invalid', 'Variable Name', d.function!.name)

        const data = d.getEnvironmentVariable(variable)
        if (typeof data !== 'object' || ['body', 'code', 'headers'].some(x => !Object.keys(data).includes(x)))
            throw new d.error(d, 'invalid', 'Variable Name', d.function!.name)

        return data.code
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/httpCode.ts)