# $stringReplace
Replaces something in a string.
## Usage
> `$stringReplace[text;query;replacer;type?;limit?]`
## Parameters
|   Name   |                 Description                 |  Type  | Default value |
|----------|---------------------------------------------|--------|---------------|
| Text     | The text to work with.                      | String | none          |
| Query    | The word to be replaced.                    | String | none          |
| Replacer | Word to replace the match.                  | String | none          |
| Type     | Type of replace worker. (all|limited)       | String | all           |
| Limit    | How many times the word should be replaced. | Number |               |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Replaces something in a string.',
    parameters: [
        {
            name: 'Text',
            description: 'The text to work with.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Query',
            description: 'The word to be replaced.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Replacer',
            description: 'Word to replace the match.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Type',
            description: 'Type of replace worker. (all|limited)',
            required: false,
            resolver: 'String',
            value: 'all'
        },
        {
            name: 'Limit',
            description: 'How many times the word should be replaced.',
            required: false,
            resolver: 'Number',
            value: ''
        }
    ],
    code: async function(d, [text, match, replacer = '', type = 'all', limit]) {
        if (text === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        if (match === undefined) throw new d.error(d, 'required', 'query', d.function?.name!)
        if (!['all', 'limited'].includes(type)) throw new d.error(d, 'invalid', 'type', d.function?.name!)

        if (type === 'all') text = text.split(match).join(replacer)
        else if (type === 'limited') {
            if (limit) {
                for (let i = 0; i < Number(limit); i++) {
                    text = text.replace(match, replacer)
                }
            } else text = text.split(match).join(replacer)
        }

        return text
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/stringReplace.ts)