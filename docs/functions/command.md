# $command
Get a property from a command data.
## Usage
> `$command[type;name;property]`
## Parameters
|   Name   |      Description      |  Type  | Default value |
|----------|-----------------------|--------|---------------|
| Type     | The command type.     | String | none          |
| Name     | The command name.     | String | none          |
| Property | The command property. | String | none          |

## Source Code
```ts
import _ from 'lodash'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Get a property from a command data.',
    parameters: [
        {
            name: 'Type',
            description: 'The command type.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Name',
            description: 'The command name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Property',
            description: 'The command property.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [type, name, property]) {
        if (type === undefined) throw new d.error(d, 'required', 'Command Type', d.function!.name)
        if (name === undefined) throw new d.error(d, 'required', 'Command Name', d.function!.name)
        if (property === undefined) throw new d.error(d, 'required', 'Command Property', d.function!.name)

        const commands = Array.from(d.bot!.commands.values()).filter(cmd => cmd.type === type)
        const command = commands.find(cmd => cmd.name === name)

        if (!command) throw new d.error(d, 'invalid', 'Command Name', d.function!.name)
        return _.get(command, property)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/command.ts)