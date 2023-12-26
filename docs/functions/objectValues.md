# $objectValues
Joins all valus from an object.
## Usage
> `$objectValues[name;separator?]`
## Parameters
|   Name    |                Description                |  Type  | Default value |
|-----------|-------------------------------------------|--------|---------------|
| Name      | The name for this object.                 | String | none          |
| Separator | The value separator to join the elements. | String | ,             |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Joins all valus from an object.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Separator',
            description: 'The value separator to join the elements.',
            required: false,
            resolver: 'String',
            value: ','
        }
    ],
    code: async function(d, [name, separator = ',']) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function?.name!)

        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function?.name!)

        let object = d.getEnvironmentVariable(name)

        if (typeof object !== 'object' || (typeof object === 'object' && !(JSON.stringify(object).startsWith('{')) && !(JSON.stringify(object).endsWith('}'))))
            throw new d.error(d, 'invalid', 'Object', d.function?.name!)

        return Object.values(object).join(separator)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/objectValues.ts)