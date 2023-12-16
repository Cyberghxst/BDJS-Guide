# $createModal
Creates a modal.
## Usage
> `$createModal[title;custom id;components]`
## Parameters
|    Name    |                Description                |  Type  | Default value |
|------------|-------------------------------------------|--------|---------------|
| Title      | The title for this modal.                 | String | none          |
| Custom ID  | The custom ID for this modal              | String | none          |
| Components | Components to be attached into the modal. | String | none          |

## Source Code
```ts
import { ActionRowBuilder, BaseInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Creates a modal.',
    parameters: [
        {
            name: 'Title',
            description: 'The title for this modal.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Custom ID',
            description: 'The custom ID for this modal',
            required: true,
            resolver: 'String',
            value:'none'
        },
        {
            name: 'Components',
            description: 'Components to be attached into the modal.',
            required: true,
            compile: false,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [title, customID, components]) {
        if (!(d.ctx?.data instanceof BaseInteraction)) throw new d.error(d, 'disallowed', d.function?.name!, 'interactions')
        if (!(d.ctx.data.isMessageComponent() || d.ctx.data.isCommand())) throw new d.error(d, 'disallowed', d.function?.name!, 'message component/command interactions')
        if (title === undefined) throw new d.error(d, 'required', 'Title', d.function?.name!)
        if (customID === undefined) throw new d.error(d, 'required', 'Custom ID', d.function?.name!)
        if (components === undefined) throw new d.error(d, 'required', 'Components', d.function?.name!)
        
        const modal = new ModalBuilder
        const data = d.extend(d)

        data.functions.add({
            name: 'createActionRow',
            description: 'Creates an action row for this modal component.',
            parameters: [
                {
                    name: 'Component',
                    description: 'Component to be attached into the modal.',
                    required: true,
                    compile: false,
                    resolver: 'String',
                    value: 'none'
                }
            ],
            async code(sub, [component]) {
                if (component === undefined) throw new d.error(d, 'required', 'Component', d.function?.name!)

                const row = new ActionRowBuilder<ModalActionRowComponentBuilder>()
                const ex = sub.extend(sub)
                ex.functions.add({
                    name: 'addTextInput',
                    description: 'Adds a text input to the modal component.',
                    code: async (o, [customID, style, label, placeholder, min, max, required, value]) => {
                        if (customID === undefined) throw new o.error(o, 'required', 'Custom ID', o.function?.name!)
                        if (style === undefined) throw new o.error(o, 'required', 'Style', o.function?.name!)
                        if (!['short', 'paragraph'].includes(style.toLowerCase()))
                            throw new o.error(o, 'invalid', 'Style', o.function?.name!)
                        if (label === undefined) throw new o.error(o, 'required', 'Label', o.function?.name!)
                        if (placeholder === undefined) throw new o.error(o, 'required', 'Placeholder', o.function?.name!)

                        const textInput = new TextInputBuilder
                        textInput.setCustomId(customID)
                        .setLabel(label)
                        .setPlaceholder(placeholder)
                        .setStyle(style.toLowerCase() === 'short' ? TextInputStyle.Short : TextInputStyle.Paragraph)
                        .setRequired(required === 'true')

                        if (min) textInput.setMinLength(Number(min))
                        if (max) textInput.setMaxLength(Number(max))
                        if (value) textInput.setValue(value)

                        row.addComponents(textInput)
                    }
                })

                await ex.reader.compile(component, ex)
                modal.addComponents(row)
            }
        })

        modal.setTitle(title)
        .setCustomId(customID)

        await data.reader.compile(components, data)
        await d.ctx?.data.showModal(modal)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/createModal.ts)