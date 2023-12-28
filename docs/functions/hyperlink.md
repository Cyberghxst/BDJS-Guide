# $hyperlink
Creates a HyperLink block.
## Usage
> `$hyperlink[text;url]`
## Parameters
| Name |       Description       |  Type  | Default value |
|------|-------------------------|--------|---------------|
| Text | The text for the block. | String | none          |
| URL  | The URL for the block.  | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Creates a HyperLink block.',
    parameters: [
        {
            name: 'Text',
            description: 'The text for the block.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'URL',
            description: 'The URL for the block.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [text, url]) {
        if (text === undefined)
            throw new d.error(d, 'required', 'Block Name', d.function!.name)
        if (url === undefined)
            throw new d.error(d, 'required', 'Block URL', d.function!.name)
        return `[${text}](${url})`
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/hyperlink.ts)