# $stop
Stops the execution for the remaining code.
## Usage
> `$stop`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Stops the execution for the remaining code.',
    code: async function(d) {
        d.stop = true
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/stop.ts)