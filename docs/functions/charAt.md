# $charAt
Returns the character of a text at the provided index.
## Usage
> `$charAt[text;index]`
## Parameters
| Name  |      Description       |  Type  | Default value |
|-------|------------------------|--------|---------------|
| Text  | The text to work with. | String | none          |
| Index | Argument index.        | Number | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the character of a text at the provided index.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Index',
            description: 'Argument index.',
            required: true,
            resolver: 'Number',
            value: 'none'
        }
    ],
    code: async function(d, [text, index]) {
        if (text === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        if (isNaN(Number(index)) || Number(index) < 0 || Number(index) > text.length)
            throw new d.error(d, 'invalid', 'Index', d.function?.name!)
        return text[Number(index)]
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/charAt.ts)