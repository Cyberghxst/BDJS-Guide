[remoteMarkdownUrl](https://raw.githubusercontent.com/Cyberghxst/bdjs-db/main/README.md)

# Variables
In order to follow this guide, you need to install `bdjs-db` plugin. <br>
Check the plugin here: [BDJS-DB](https://github.com/Cyberghxst/bdjs-db)

## Introduction
A variable is an abstract storage location paired with an associated symbolic name, which contains some known or unknown quantity of data or object referred to as a value; or in simpler terms, a variable is a named container for a particular set of bits or type of data (like integer, float, string etc...) <br>

You are probably familiar with the concepts "getServerVar", "getUserVar", "getGlobalUserVar", "getChannelVar", "getMessageVar", among many others. Functions like the previous ones doesn't exist in BDJS. <br>

To replace these functions, you can name your variables with different words in order to separate all types of variables, here some ideas.

## Variable Naming
### Global Variables
To identify that a variable is of global type we can name it as: "global_varName"
```
$setVar[global_message_$userGet[id];NULL]
$getVar[global_message_$userGet[id]]
```

### Guild Variables
To identify that a variable is of guild type we can name it as: "guild_varName"
```
$setVar[guild_welcomeMsg_$guildGet[id];NULL]
$getVar[guild_welcomeMsg_$guildGet[id]]
```

### Guild Member Variables
To identify that a variable is of guild-member type we can name it as: "member_varName"
```
$setVar[member_welcomeMsg_$memberGet[id];NULL]
$getVar[member_welcomeMsg_$memberGet[id]]
```

### Channel Variables
To identify that a variable is of channel type we can name it as: "channel_varName"
```
$setVar[channel_pinned_$channelGet[id];NULL]
$getVar[channel_pinned_$channelGet[id]]
```

### Message Variables
To identify that a variable is of message type we can name it as: "message_varName"
```
$setVar[message_pinned;NULL]
$getVar[message_pinned]
```

### User Variables
To identify that a variable is of user type we can name it as: "user_varName"
```
$setVar[user_status_$userGet[id];NULL]
$getVar[user_status_$userGet[id]]
```

Anyway, these are just ideas, you can name your variables to anything you want.