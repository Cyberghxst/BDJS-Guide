# $readdir
Reads a directory and load the result into a environment variable.
## Usage
> `$readdir[directory;variable;separator?]`
## Parameters
|   Name    |                          Description                           |  Type  | Default value |
|-----------|----------------------------------------------------------------|--------|---------------|
| Directory | The directory to be readed.                                    | String | none          |
| Variable  | Environment variable name to load the code results to, if any. | String | none          |
| Separator | Result separator.                                              | String | ,             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { readdir } from 'fs/promises'

export default new BaseFunction({
    description: 'Reads a directory and load the result into a environment variable.',
    parameters: [
        {
            name: 'Directory',
            description: 'The directory to be readed.',
            required: true,
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
        },
        {
            name: 'Separator',
            description: 'Result separator.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [directory, variable, sep = ',']) {
        if (directory === undefined) throw new d.error(d, 'required', 'Directory', d.function?.name!)
        if (variable === undefined) throw new d.error(d, 'required', 'Variable Name', d.function?.name!)

        const files = await readdir(directory)

        if (files.length === 0) throw new d.error(d, 'custom', `${directory} is empty.`)

        d.setEnvironmentVariable(variable, files.join(sep))
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/readdir.ts)