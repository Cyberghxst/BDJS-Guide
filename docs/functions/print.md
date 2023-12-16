# $print
Prints a text into the console.
## Usage
> `$print[texts]`
## Parameters
| Name  |             Description             |  Type  | Default value |
|-------|-------------------------------------|--------|---------------|
| Texts | The text to print into the console. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Prints a text into the console.',
    parameters: [
        {
            name: 'Texts',
            description: 'The text to print into the console.',
            required: true,
            resolver: 'String',
            compile: true,
            value: 'none'
        }
    ],
    code: async function(d, [text]) {
        if (text === undefined) throw new d.error(d, 'required', 'Texts', d.function?.name!)

        console.log(text)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/print.ts)