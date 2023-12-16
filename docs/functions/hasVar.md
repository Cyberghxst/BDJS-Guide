# $hasVar
Check if the provided variable name exists in the records.
## Usage
> `$hasVar[name;table?]`
## Parameters
| Name  |         Description          |  Type  | Default value |
|-------|------------------------------|--------|---------------|
| Name  | Variable name to be checked. | String | none          |
| Table | The database table name.     | String | main          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the provided variable name exists in the records.',
    parameters: [
        {
            name: 'Name',
            description: 'Variable name to be checked.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Table',
            description: 'The database table name.',
            required: false,
            resolver: 'String',
            value: 'main'
        }
    ],
    code: async function(d, [name, table = 'main']) {
        if (name === undefined) throw new d.error(d, 'required', 'Variable Name', d.function?.name!)
        if (!d.bot?.vars.checkVar(name, table)) throw new d.error(d, 'invalid', 'Variable Name', d.function?.name!)

        return await d.bot.vars.has(name, table)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/hasVar.ts)