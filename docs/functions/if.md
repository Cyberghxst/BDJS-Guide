# $if
Execute a code field if the condition is met.
## Usage
> `$if[condition;then code;else code?]`
## Parameters
|   Name    |                  Description                   |  Type  | Default value |
|-----------|------------------------------------------------|--------|---------------|
| Condition | The condition to evaluate.                     | String | none          |
| Then code | The code to execute if the condition is true.  | String | none          |
| Else code | The code to execute if the condition is false. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Execute a code field if the condition is met.',
    parameters: [
        {
            name: 'Condition',
            description: 'The condition to evaluate.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Then code',
            description: 'The code to execute if the condition is true.',
            required: true,
            resolver: 'String',
            compile: false,
            value: 'none'
        },
        {
            name: 'Else code',
            description: 'The code to execute if the condition is false.',
            required: false,
            resolver: 'String',
            compile: false,
            value: 'none'
        }
    ],
    code: async function(d, [condition, then, _else]) {
        if (condition === undefined) throw new d.error(d, 'required', 'condition', d.function?.name!)
        if (then === undefined) throw new d.error(d, 'required', 'then code', d.function?.name!)

        const evaluated = d.condition.evaluate(condition)
        
        if (evaluated) {
            const compiled = await d.reader.compile(then, d)
            if (compiled.code !== '') return compiled.code
        } else if (!evaluated && _else) {
            const compiled = await d.reader.compile(_else, d)
            if (compiled.code !== '') return compiled.code
        }
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/if.ts)