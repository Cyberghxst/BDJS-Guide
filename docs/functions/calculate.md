# $calculate
Calculates a math expression.
## Usage
> `$calculate[expression]`
## Parameters
|    Name    |          Description          |  Type  | Default value |
|------------|-------------------------------|--------|---------------|
| Expression | Math expression to be evaled. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

const MATH_REGEX = /[^\d.*()+-\/]/g

export default new BaseFunction({
    description: 'Calculates a math expression.',
    parameters: [
        {
            name: 'Expression',
            description: 'Math expression to be evaled.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [expression]) {
        if (expression === undefined) throw new d.error(d, 'required', 'Math Expression', d.function?.name!)

        expression = expression.replace(/ /g, '')

        if (expression.replace(MATH_REGEX, '') !== expression)
            throw new d.error(d, 'invalid', 'Math Expression', d.function?.name!)

        try {
            return eval(expression.replace(MATH_REGEX, ''))
        } catch {
            throw new d.error(d, 'invalid', 'Math Expression', d.function?.name!)
        }
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/calculate.ts)