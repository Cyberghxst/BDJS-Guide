# $setInterval
Executes a code after certain time.
## Usage
> `$setInterval[time;code;variable]`
## Parameters
|   Name   |                          Description                           |  Type  | Default value |
|----------|----------------------------------------------------------------|--------|---------------|
| Time     | The time to execute the code.                                  | String | none          |
| Code     | The code to be executed.                                       | String | none          |
| Variable | Environment variable name to load the code results to, if any. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import ms from 'ms'

export default new BaseFunction({
    description: 'Executes a code after certain time.',
    parameters: [
        {
            name: 'Time',
            description: 'The time to execute the code.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'The code to be executed.',
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

        setInterval(() => {
            d.reader.compile(code, d).then((compiled) => {
                if (compiled.code !== '')
                    d.setEnvironmentVariable(variable, compiled.code), d.bot?.emit('interval', d.env)
            })
        }, ms(duration))

    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/setInterval.ts)