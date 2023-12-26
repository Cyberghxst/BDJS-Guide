# $hasPermInChannel
Check if the member has the provided permission in channel.
## Usage
> `$hasPermInChannel[permission name;member id?;channel id?;guild id?]`
## Parameters
|      Name       |                Description                |  Type  |   Default value    |
|-----------------|-------------------------------------------|--------|--------------------|
| Permission Name | The name of the permission to be checked. | String | none               |
| Member ID       | The member to be checked.                 | String | d.ctx?.author?.id  |
| Channel ID      | The channel to be checked.                | String | d.ctx?.channel?.id |
| Guild ID        | The ID of the guild member belongs to.    | String | d.ctx?.guild?.id   |

## Source Code
```ts
import { PermissionsBitField, PermissionResolvable, GuildTextBasedChannel } from 'discord.js'
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Check if the member has the provided permission in channel.',
    parameters: [
        {
            name: 'Permission Name',
            description: 'The name of the permission to be checked.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Member ID',
            description: 'The member to be checked.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.author?.id'
        },
        {
            name: 'Channel ID',
            description: 'The channel to be checked.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.channel?.id'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild member belongs to.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        }
    ],
    code: async function(d, [name, userID = d.ctx?.author?.id, channelID = d.ctx?.channel?.id, guildID = d.ctx?.guild?.id]) {
        if (name === undefined) throw new d.error(d, 'required', 'Permission Name', d.function?.name!)
        if (userID === undefined) throw new d.error(d, 'invalid', 'Member ID', d.function?.name!)
        if (channelID === undefined) throw new d.error(d, 'invalid', 'Channel ID', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const channel = await d.util.getChannel<GuildTextBasedChannel>(channelID, guild)
        if (!channel) throw new d.error(d, 'invalid', 'Channel ID', d.function?.name!)

        const member = await d.util.getMember(userID, guild) ?? await d.util.getRole(userID, guild)
        if (!member) throw new d.error(d, 'invalid', 'Member ID', d.function?.name!)

        const permissions = Object.keys(PermissionsBitField.Flags)
        if (!permissions.includes(name)) throw new d.error(d, 'invalid', 'Permission Name', d.function?.name!)

        return channel.permissionsFor(member).has(name as PermissionResolvable)
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/hasPermInChannel.ts)