# $jsEval
Evaluates JavaScript code.
## Usage
> `$jsEval[return results;code]`
## Parameters
|      Name      |            Description             |  Type   | Default value |
|----------------|------------------------------------|---------|---------------|
| Return results | Whether return evaluation results. | Boolean | none          |
| Code           | JavaScript code.                   | String  | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Evaluates JavaScript code.',
    parameters: [
        {
            name: 'Return results',
            description: 'Whether return evaluation results.',
            required: true,
            resolver: 'Boolean',
            value: 'none'
        },
        {
            name: 'Code',
            description: 'JavaScript code.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [returnResults = 'false', ...code]) {
        if (returnResults === undefined) throw new d.error(d, 'required', 'name', d.function?.name!)
        if (code[0] === undefined) throw new d.error(d, 'required', 'code', d.function?.name!)
        
        code[0] = code.join(';')
        let result: string

        code[0] = (await d.reader.compile(code[0], d)).code

        try {
            result = await eval(code[0])
        } catch (e: any) {
            result = e
        }

        if (returnResults === 'true' && result) return inspect(result, { depth: 4 })
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/jsEval.ts)