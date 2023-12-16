# $mkdir
Makes a directory.
## Usage
> `$mkdir[directory]`
## Parameters
|   Name    |         Description          |  Type  | Default value |
|-----------|------------------------------|--------|---------------|
| Directory | The directory to be created. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { mkdir } from 'fs/promises'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Makes a directory.',
    parameters: [
        {
            name: 'Directory',
            description: 'The directory to be created.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [directory]) {
        if (directory === undefined) throw new d.error(d, 'required', 'Directory', d.function?.name!)

        await mkdir(directory).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 1 }))
        })

    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/mkdir.ts)