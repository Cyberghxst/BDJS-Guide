# $exitProcess
Exits the process.
## Usage
> `$exitProcess`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Exits the process.',
    code: async function(d) {
        process.exit()
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/exitProcess.ts)