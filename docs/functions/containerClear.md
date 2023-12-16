# $containerClear
Clears the container.
## Usage
> `$containerClear`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Clears the container.',
    code: async function(d) {
        d.container.clear()
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/containerClear.ts)