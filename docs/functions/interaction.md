# $interaction
Retrieves an option from an interaction.
## Usage
> `$interaction[option type;extra options?]`
## Parameters
|     Name      |                                                                       Description                                                                        |  Type  | Default value |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|--------|---------------|
| Option Type   | Option type to be retrieved. (between "customID" | "focusedOption" | "menuOption" | "modalComponent" | "slashOption" | "subCommand" | "subCommandGroup") | String | none          |
| Extra Options | Extra options to get an interaction value.                                                                                                               | String | none          |

## Source Code
```ts
import { BaseInteraction, InteractionType } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Retrieves an option from an interaction.',
    parameters: [
        {
            name: 'Option Type',
            description: 'Option type to be retrieved. (between "customID" \| "focusedOption" \| "menuOption" \| "modalComponent" \| "slashOption" \| "subCommand" \| "subCommandGroup")',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Extra Options',
            description: 'Extra options to get an interaction value.',
            required: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [interactionType, ...options]) {
        if (!(d.ctx?.raw instanceof BaseInteraction))
            throw new d.error(d, 'disallowed', d.function?.name!, 'interactions')

        const int = d.ctx?.raw

        switch (interactionType.toLowerCase()) {
            case 'customid': {
                if (!['anyInteraction', 'buttonInteraction', 'modalInteraction', 'selectMenuInteraction'].includes(d.commandType) || (!int.isMessageComponent() && !int.isModalSubmit()))
                    throw new d.error(d, 'disallowed', 'Custom ID', 'anyInteraction and componentInteraction')
                return int.customId
            }
            case 'focusedoption': {
                if (!['anyInteraction', 'autocompleteInteraction'].includes(d.commandType) || !int.isAutocomplete())
                    throw new d.error(d, 'disallowed', 'focusedOption', 'anyInteraction and autocompleteInteraction')
                if (options[0] === undefined) throw new d.error(d, 'required', 'Option Name', d.function?.name!)
                if (!['name', 'type', 'value'].includes(options[0].toLowerCase()))
                    throw new d.error(d, 'invalid', 'Option Name', d.function?.name!)
                const name = options[0].toLowerCase(), focused = int.options.getFocused(true)
                return name === 'name' ? focused.name : name === 'type' ? focused.type : focused.value
            }
            case 'menuoption': {
                if (!['anyInteraction', 'selectMenuInteraction'].includes(d.commandType) || !int.isAnySelectMenu())
                    throw new d.error(d, 'disallowed', 'menuOption', 'anyInteraction and selectMenuInteraction')
                if (options[0] && (isNaN(Number(options[0])) || Number(options[0]) < 0 || Number(options[0]) > int.values.length))
                    throw new d.error(d, 'invalid', 'Index', d.function?.name!)
                else if (!options[0]) options[0] = 'all'
                return options[0] === 'all' ? int.values.join(',') : int.values[Number(options[0])]
            }
            case 'modalcomponent': {
                if (!['anyInteraction', 'modalInteraction'].includes(d.commandType) || !int.isModalSubmit())
                    throw new d.error(d, 'disallowed', 'modalComponent', 'anyInteraction and modalInteraction')

                const [type, customId] = options

                if (type === undefined) throw new d.error(d, 'required', 'Modal Component Type', d.function?.name!)
                if (!['textInput'].includes(type)) // In case discord add more supported components.
                    throw new d.error(d, 'invalid', 'modalComponent', d.function?.name!)
                if (customId === undefined) throw new d.error(d, 'required', 'Modal Component Custom ID', d.function?.name!)
                return int.fields.getTextInputValue(customId)
            }
            case 'slashoption': {
                if (!['anyInteraction', 'commandInteraction'].includes(d.commandType) || !int.isChatInputCommand())
                    throw new d.error(d, 'disallowed', 'slashOption', 'anyInteraction and commandInteraction')
                if (options[0] === undefined) throw new d.error(d, 'required', 'Option Name', d.function?.name!)
                return int.options.get(options[0])?.value
            }
            case 'subcommand': {
                if (!['anyInteraction', 'commandInteraction'].includes(d.commandType) || !int.isChatInputCommand())
                    throw new d.error(d, 'disallowed', 'slashOption', 'anyInteraction and commandInteraction')
                return int.options.getSubcommand(false)
            }
            case 'subcommandgroup': {
                if (!['anyInteraction', 'commandInteraction'].includes(d.commandType) || !int.isChatInputCommand())
                    throw new d.error(d, 'disallowed', 'slashOption', 'anyInteraction and commandInteraction')
                return int.options.getSubcommandGroup(false)
            }
            default:
                throw new d.error(d, 'invalid', 'Option Type', d.function?.name!)
        }
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/interaction.ts)