# $toFixed
Fixes a number.
## Usage
> `$toFixed[number;decimals?]`
## Parameters
|   Name   |                Description                |  Type  | Default value |
|----------|-------------------------------------------|--------|---------------|
| Number   | Number to be fixed.                       | Number | none          |
| Decimals | Number of digits after the decimal point. | Number |             2 |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Fixes a number.',
    parameters: [
        {
            name: 'Number',
            description: 'Number to be fixed.',
            required: true,
            resolver: 'Number',
            value: 'none'
        },
        {
            name: 'Decimals',
            description: 'Number of digits after the decimal point.',
            required: false,
            resolver: 'Number',
            value: '2'
        }
    ],
    code: async function(d, [num, decimals = '2']) {
        if (num === undefined) throw new d.error(d, 'required', 'Number', d.function?.name!)
        if (isNaN(Number(num))) throw new d.error(d, 'invalid', 'Number', d.function?.name!)

        return Number(num).toFixed(Number(decimals))

    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/toFixed.ts)