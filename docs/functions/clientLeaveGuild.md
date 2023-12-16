# $clientLeaveGuild
Client leaves the provided guild.
## Usage
> `$clientLeaveGuild[guild id]`
## Parameters
|   Name   |              Description              |  Type  | Default value |
|----------|---------------------------------------|--------|---------------|
| Guild ID | Guild ID which the client will leave. | String | none          |

## Source Code
```ts
import { BaseFunction } from '../structures/Function'
import { inspect } from 'util'

export default new BaseFunction({
    description: 'Client leaves the provided guild.',
    parameters: [
        {
            name: 'Guild ID',
            description: 'Guild ID which the client will leave.',
            required: true,
            resolver: 'String',
            value: 'none'
        }
    ],
    code: async function(d, [guildID = d.ctx?.guild?.id]) {
        if (guildID === undefined) throw new d.error(d, 'invalid', 'guildID', d.function?.name!)

        const guild = d.bot?.guilds.cache.get(guildID)
        if (!guild) throw new d.error(d, 'invalid', 'Guild', d.function?.name!)
        
        await guild.leave().catch(e => {
            throw new d.error(d, 'custom', inspect(e))
        })
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/clientLeaveGuild.ts)