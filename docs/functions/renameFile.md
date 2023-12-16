# $renameFile
Renames a file.
## Usage
> `$renameFile[old;new]`
## Parameters
| Name |    Description     |  Type  | Default value |
|------|--------------------|--------|---------------|
| Old  | The old file name. | String | none          |
| New  | The new file name. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { rename } from 'fs/promises'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Renames a file.',
    parameters: [
        {
            name: 'Old',
            description: 'The old file name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'New',
            description: 'The new file name.',
            required: true,
            compile: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [old, _new]) {
        if (old === undefined) throw new d.error(d, 'required', 'Old Name', d.function?.name!)
        if (_new === undefined) throw new d.error(d, 'required', 'New Name', d.function?.name!)

        await rename(old, _new).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 1 }))
        })

    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/renameFile.ts)