# $await
Holds code execution for the given time.
## Usage
> `$await[duration]`
## Parameters
|   Name   |             Description              |  Type  | Default value |
|----------|--------------------------------------|--------|---------------|
| Duration | The time to hold the remaining code. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import ms from 'ms'

export default new BaseFunction({
    description: 'Holds code execution for the given time.',
    parameters: [
        {
            name: 'Duration',
            description: 'The time to hold the remaining code.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [duration]) {
        if (duration === undefined) throw new d.error(d, 'required', 'Duration', d.function?.name!)

        let parsedDuration = ms(duration)

        if (isNaN(parsedDuration)) throw new d.error(d, 'invalid', 'Duration', d.function?.name!)

        await d.util.sleep(parsedDuration)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/await.ts)