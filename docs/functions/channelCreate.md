# $channelCreate
Creates a channel in a guild.
## Usage
> `$channelCreate[name;type?;guild id?;options?;return id?]`
## Parameters
|   Name    |                     Description                      |  Type   |  Default value   |
|-----------|------------------------------------------------------|---------|------------------|
| Name      | The name for this channel.                           | String  | none             |
| Type      | The channel type.                                    | String  | text             |
| Guild ID  | The ID of the guild where channel should be created. | String  | d.ctx?.guild?.id |
| Options   | Builder functions to set channel properties.         | String  | none             |
| Return ID | Whether return channel ID.                           | Boolean | false            |

## Extra Data
> Supports Builders
## Source Code
```ts
import { 
    ChannelType,
    GuildChannelCreateOptions,
    OverwriteResolvable, 
    PermissionResolvable,
    PermissionsBitField
} from 'discord.js'
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    builders: true,
    description: 'Creates a channel in a guild.',
    parameters: [
        {
            name: 'Name',
            description: 'The name for this channel.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Type',
            description: 'The channel type.',
            required: false,
            resolver: 'String',
            value: 'text'
        },
        {
            name: 'Guild ID',
            description: 'The ID of the guild where channel should be created.',
            required: false,
            resolver: 'String',
            value: 'd.ctx?.guild?.id'
        },
        {
            name: 'Options',
            description: 'Builder functions to set channel properties.',
            required: false,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Return ID',
            description: 'Whether return channel ID.',
            required: false,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function(d, [name, type = 'text', guildID = d.ctx?.guild?.id, options, returnID = 'false']) {
        if (name === undefined) throw new d.error(d, 'required', 'Channel Name', d.function?.name!)
        if (guildID === undefined) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild ID', d.function?.name!)

        const channelOptions = {} as GuildChannelCreateOptions, 
        channelTypes: Record<string, any> = {
            announcement: ChannelType.GuildAnnouncement,
            category: ChannelType.GuildCategory,
            directory: ChannelType.GuildDirectory,
            forum: ChannelType.GuildForum,
            media: ChannelType.GuildMedia,
            text: ChannelType.GuildText,
            stagevoice: ChannelType.GuildStageVoice,
            voice: ChannelType.GuildVoice
        }

        if (!Object.keys(channelTypes).includes(type.toLowerCase())) throw new d.error(d, 'invalid', 'Channel Type', d.function?.name!)

        channelOptions.name = name
        channelOptions.type = channelTypes[type.toLowerCase()]

        if (options) {
            const data = d.extend(d)
            data.functions.add({
                name: 'setBitrate',
                description: 'Set the maximum bitrate for a voice channel.',
                async code(t, [bitrate]) {
                    if (channelOptions.type !== ChannelType.GuildVoice) throw new t.error(t, 'disallowed', t.function?.name!, 'Guild Voice Channels')
                    if (bitrate === undefined) throw new t.error(t, 'required', 'Bitrate', t.function?.name!)
                    if (isNaN(Number(bitrate))) throw new t.error(t, 'invalid', 'Bitrate', t.function?.name!)
                    
                    channelOptions.bitrate = Number(bitrate)
                }
            }).add({
                name: 'setNSFW',
                description: 'Set the NSFW availabilty for this channel.',
                async code(t, [nsfw = 'true']) {
                    channelOptions.nsfw = nsfw === 'true'
                }
            }).add({
                name: 'setParent',
                description: 'Set the parent channel for this channel.',
                async code(t, [parentID]) {
                    if (parentID === undefined) throw new t.error(t, 'required', 'Parent ID', t.function?.name!)

                    channelOptions.parent = parentID
                }
            }).add({
                name: 'setPermissions',
                description: 'Set permissions for this channels.',
                async code(t, [target, ...permissions]) {
                    if (target === undefined) throw new t.error(t, 'required', 'Target', t.function?.name!)
                    if (target.toLowerCase() === 'everyone') target = guild.id

                    const validPermissions = Object.keys(PermissionsBitField.Flags)
                    channelOptions.permissionOverwrites??=[]
                    let role: any

                    if (target !== guild.id) {
                        role = await d.util.getRole(target, guild) ?? await d.util.getMember(target, guild)
                        if (!role) throw new t.error(t, 'custom', `Invalid target ID in "${t.function?.name!}" provided, must be GuildID string, RoleID string or MemberID string.`)
                    }

                    const allow: PermissionResolvable[] = [], deny: PermissionResolvable[] = []

                    for (let permission of permissions) {
                        if (permission.startsWith('+')) {
                            permission = permission.slice(1)
                            if (!validPermissions.includes(permission))
                                throw new t.error(t, 'invalid', 'Permission Name', t.function?.name!)

                            allow.push(permission as PermissionResolvable)

                        } else if (permission.startsWith('-')) {
                            permission = permission.slice(1)
                            if (!validPermissions.includes(permission))
                                throw new t.error(t, 'invalid', 'Permission Name', t.function?.name!)

                            deny.push(permission as PermissionResolvable)

                        } else throw new t.error(t, 'invalid', 'Permission Grant Type (+|-)', t.function?.name!)
                    }

                    (channelOptions.permissionOverwrites as OverwriteResolvable[]).push({
                        id: target,
                        allow, deny
                    })

                }
            }).add({
                name: 'setPosition',
                description: 'Set the position for this channel.',
                async code(t, [position]) {
                    if (position === undefined) throw new t.error(t, 'required', 'Channel Position', t.function?.name!)
                    if (isNaN(Number(position))) throw new t.error(t, 'invalid', 'Channel Position', t.function?.name!)
                    
                    channelOptions.position = Number(position)
                }
            }).add({
                name: 'setIndividualRateLimit',
                description: 'Set the channel ratelimit per user.',
                async code(t, [ratelimit]) {
                    if (channelOptions.type !== ChannelType.GuildVoice) throw new t.error(t, 'disallowed', t.function?.name!, 'Guild Voice Channels')
                    if (ratelimit === undefined) throw new t.error(t, 'required', 'Ratelimit', t.function?.name!)
                    if (isNaN(Number(ratelimit))) throw new t.error(t, 'invalid', 'Ratelimit', t.function?.name!)
                    
                    channelOptions.rateLimitPerUser = Number(ratelimit)
                }
            }).add({
                name: 'setReason',
                description: 'Set the reason for the channel creation.',
                async code(t, [reason]) {
                    if (reason === undefined) throw new t.error(t, 'required', 'Reason', t.function?.name!)
                    
                    channelOptions.reason = reason
                }
            }).add({
                name: 'setRTCRegion',
                description: 'Set the RTC region for the channel.',
                async code(t, [region]) {
                    if (region === undefined) throw new t.error(t, 'required', 'RTC Region', t.function?.name!)
                    
                    channelOptions.rtcRegion = region
                }
            }).add({
                name: 'setTopic',
                description: 'Set the topic for the channel creation.',
                async code(t, [topic]) {
                    if (topic === undefined) throw new t.error(t, 'required', 'Channel Topic', t.function?.name!)
                    
                    channelOptions.topic = topic
                }
            }).add({
                name: 'setUserLimit',
                description: 'Set the limit of users that can connect to the channel.',
                async code(t, [limit]) {
                    if (channelOptions.type !== ChannelType.GuildVoice) throw new t.error(t, 'disallowed', t.function?.name!, 'Guild Voice Channels')
                    if (limit === undefined) throw new t.error(t, 'required', 'User Limit', t.function?.name!)
                    if (isNaN(Number(limit))) throw new t.error(t, 'invalid', 'User Limit', t.function?.name!)
                    
                    channelOptions.userLimit = Number(limit)
                }
            });

            await data.reader.compile(options, data)
        }

        const channel = await guild.channels.create(channelOptions).catch(e => {
            throw new d.error(d, 'custom', inspect(e))
        })

        if (channel.id && returnID === 'true') return channel.id
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/channelCreate.ts)