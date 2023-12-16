# $setTimeout
Executes a code when the timeout ends.
## Usage
> `$setTimeout[duration;code;variable]`
## Parameters
|   Name   |                          Description                           |  Type  | Default value |
|----------|----------------------------------------------------------------|--------|---------------|
| Duration | The time to hold the code.                                     | String | none          |
| Code     | The code to be executed when the timeout ends.                 | String | none          |
| Variable | Environment variable name to load the code results to, if any. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import ms from 'ms'

export default new BaseFunction({
    description: 'Executes a code when the timeout ends.',
    parameters: [
        {
            name: 'Duration',
            description: 'The time to hold the code.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'The code to be executed when the timeout ends.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Environment variable name to load the code results to, if any.',
            required: true,
            compile: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [duration, code, variable]) {
        if (duration === undefined) throw new d.error(d, 'required', 'Duration', d.function?.name!)
        if (code === undefined) throw new d.error(d, 'required', 'Code', d.function?.name!)

        let parsedDuration = ms(duration)

        if (isNaN(parsedDuration)) throw new d.error(d, 'invalid', 'Duration', d.function?.name!)

        setTimeout(() => {
            d.reader.compile(code, d).then((compiled) => {
                if (compiled.code !== '')
                    d.setEnvironmentVariable(variable, compiled.code), d.bot?.emit('timeout', d.env)
            })
        }, ms(duration))

    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/setTimeout.ts)