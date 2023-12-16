# $version
Returns the installed version of BDJS.
## Usage
> `$version`
## Source Code
```ts
import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
    description: 'Returns the installed version of BDJS.',
    code: async function(d) {
        return (require('../../package.json')).version
    }
})
```
Available on GitHub: [Click Here](https://github.com/Cyberghxst/bdjs/blob/v1/src/functions/version.ts)