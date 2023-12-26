# $objectSet
Set a property value in an object.
## Usage
> `$objectSet[name;path;value]`
## Parameters
| Name  |           Description           |  Type  | Default value |
|-------|---------------------------------|--------|---------------|
| Name  | The name for this object.       | String | none          |
| Path  | Property path to set the value. | String | none          |
| Value | The property value.             | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import * as _ from 'lodash'

export default new BaseFunction({
    description: 'Set a property value in an object.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this object.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Path',
            description: 'Property path to set the value.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Value',
            description: 'The property value.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [name, path, value]) {
        if (name === undefined)
            throw new d.error(d, 'required', 'Object Name', d.function?.name!)
        if (path === undefined)
            throw new d.error(d, 'required', 'Property Path', d.function?.name!)
        if (value === undefined)
            throw new d.error(d, 'required', 'Property Value', d.function?.name!)

        if (!d.hasEnvironmentVariable(name))
            throw new d.error(d, 'invalid', 'Object Name', d.function?.name!)

        let object = d.getEnvironmentVariable(name)

        if (typeof object !== 'object' || (typeof object === 'object' && !(JSON.stringify(object).startsWith('{')) && !(JSON.stringify(object).endsWith('}'))))
            throw new d.error(d, 'invalid', 'Object', d.function?.name!)

        _.set(object, path, value), d.setEnvironmentVariable(name, object)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/objectSet.ts)