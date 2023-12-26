# $arrayCreate
Creates an array.
## Usage
> `$arrayCreate[name;text;separator?]`
## Parameters
|   Name    |                 Description                  |  Type  | Default value |
|-----------|----------------------------------------------|--------|---------------|
| Name      | The name for this array.                     | String | none          |
| Text      | The text to be splitted.                     | String | none          |
| Separator | The element separator to split the elements. | String | ,             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Creates an array.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this array.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Text',
            description: 'The text to be splitted.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'The element separator to split the elements.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [name, text, separator = ',']) {
        if (name === undefined) throw new d.error(d, 'required', 'Array Name', d.function?.name!)
        if (text === undefined) throw new d.error(d, 'required', 'Text', d.function?.name!)

        d.setEnvironmentVariable(name, text.split(separator))
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/arrayCreate.ts)