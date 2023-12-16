# $appendFile
Appends content to the end of a file.
## Usage
> `$appendFile[directory;content;encoding?]`
## Parameters
|   Name    |               Description                |  Type  | Default value |
|-----------|------------------------------------------|--------|---------------|
| Directory | The file directory.                      | String | none          |
| Content   | File content to append.                  | String | none          |
| Encoding  | Type of encoding to write into the file. | String | utf-8         |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { appendFile } from 'fs/promises'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Appends content to the end of a file.',
    parameters: [
        {
            name: 'Directory',
            description: 'The file directory.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Content',
            description: 'File content to append.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Encoding',
            description: 'Type of encoding to write into the file.',
            required: false,
            resolver: 'String',
            value: 'utf-8'
        }
    ],
    code: async function(d, [directory, content, encoding = 'utf-8']) {
        if (directory === undefined) throw new d.error(d, 'required', 'Directory', d.function?.name!)
        if (content === undefined) throw new d.error(d, 'required', 'Content', d.function?.name!)

        await appendFile(directory, content, {
            encoding: encoding as BufferEncoding
        }).catch(e => {
            throw new d.error(d, 'custom', inspect(e, { depth: 1 }))
        })

    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/appendFile.ts)