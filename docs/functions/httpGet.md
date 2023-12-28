# $httpGet
Performs an http GET request to given url.
## Usage
> `$httpGet[url;variable;headers?]`
## Parameters
|   Name   |               Description               |  Type  | Default value |
|----------|-----------------------------------------|--------|---------------|
| URL      | URL to request to.                      | String | none          |
| Variable | Variable name to load the results to.   | String | none          |
| Headers  | Headers to include to the request data. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { request } from 'undici'

export default new BaseFunction({
    description: 'Performs an http GET request to given url.',
    parameters: [
        {
            name: 'URL',
            description: 'URL to request to.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Variable name to load the results to.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Headers',
            description: 'Headers to include to the request data.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [url, variable, ...raw_headers]) {
        if (url === undefined)
            throw new d.error(d, 'required', 'URL', d.function!.name)
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function!.name)

        let headers = {} as Record<string, string>
        if (raw_headers.length) {
            for (const header of raw_headers) {
                const [name, value] = header.split(':')
                headers[name] = value
            }
        }

        const result = await request(url, {
            headers: raw_headers.length ? headers : undefined,
            method: 'GET'
        })

        d.setEnvironmentVariable(variable, {
            body: await result.body.text(),
            code: result.statusCode,
            headers: result.headers
        })
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/httpGet.ts)