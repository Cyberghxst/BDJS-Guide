# Custom Functions
You can add your own function by following the next example.
```js
// ...bot declaration

bot.functions.add({
    name: '$helloWorld',
    description: 'Prints a message using $helloWorld keyword, that is fun.',
    builders: false, // Optional property. If this function support builder functions.
    injectable: false, // Optional property. If this function support subfunction injection.
    parameters: [
        {
            name: 'Parameter',
            description: 'Parameter to be printed.',
            required: true,
            resolver: 'String',
            compile: true, // Optional property. Tell the compiler to compile this field or not.
            unescape: true, // Optional property. Tell the compiler to unescape this field or not.
            value: 'none' // Default field value, if any. Set to "none" if don't have default value.
        }
    ],
    code: async (d, [param]) => {
        if (param === undefined)
            throw new d.error(d, 'required', 'parameter', d.function.name)
        console.log(param)
    }
})

bot.login()
```

## Builder functions
Builder functions are functions that are **function-scope** executable, this means
that these functions just will work inside its parent function.
```
# Works!
$roleCreate[xd;
    $setColor[FFEDF4]
    $setHoist[true]
    $setMentionable[false]
    $setReason[Nomás porque si.]
    $setPermissions[SendMessages]
]

# Will throw an error.
$roleCreate[xd;
    $setColor[FFEDF4]
    $setHoist[true]
    $setMentionable[false]
    $setReason[Nomás porque si.]
]
$setPermissions[SendMessages]
```

### Builder-compatible functions
|  Function name   |                    Description                     |
|------------------|----------------------------------------------------|
| $channelCreate   | Creates a channel in a guild.                      |
| $createActionRow | Creates a new action row.                          |
| $createBan       | Creates a ban for the provided user ID in a guild. |
| $createEmbed     | Creates an embed.                                  |
| $roleCreate      | Creates a role in a guild.                         |
| $roleUpdate      | Updates a role in a guild.                         |

## Function injections
Injections allows to inject subfunctions to any function that supports it.
```js
// ...bot declaration

bot.functions.inject('createEmbed', 'myFunction', {
    async code(d) {
        return 'success'
    }
})

bot.commands.add({
    name: 'run',
    type: 'prefixed',
    code: `
        $createEmbed[
            ...
            $myFunction # Will work
        ]

        $myFunction # Will not work
    `
})
```

### Injectable functions
| Function name |    Description    |
|---------------|-------------------|
| $createEmbed  | Creates an embed. |