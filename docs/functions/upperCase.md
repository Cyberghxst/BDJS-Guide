# $upperCase
Converts a string to uppercase.
## Usage
> `$upperCase[text]`
## Parameters
| Name |     Description      |  Type  | Default value |
|------|----------------------|--------|---------------|
| Text | The text to convert. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Converts a string to uppercase.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to convert.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [text]) {
        if (text === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        return text.toUpperCase()
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/upperCase.ts)