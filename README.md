# Philips Hue for Minoss
[![GitHub version](https://badge.fury.io/gh/dkern%2Fminoss-hue.svg)](http://github.com/dkern/minoss-hue)
[![NPM version](https://badge.fury.io/js/minoss-hue.svg)](http://www.npmjs.org/package/minoss-hue)
[![Dependency version](https://david-dm.org/dkern/minoss-hue.png)](https://david-dm.org/dkern/minoss-hue)

This module adds support for controlling Philips Hue devices to [Minoss](https://github.com/dkern/minoss) server.
The API communication is based on [`node-hue-api`](https://www.npmjs.com/package/node-hue-api).


## Table Of Contents
* [Installation](#installation)
* [Configuration](#configuration)
* [Bridge selection](#bridge-selection)
* [Parameter Shorthand](#parameter-shorthand)
* [State Builder](#state-builder)
  * [Using `JSON` as State](#using-json-as-state)
  * [Chaining States](#chaining-states)
* [Scripts](#scripts)
  * [Bridges](#bridges)
  * [Lights](#lights)
  * [Groups](#groups)
  * [Scenes](#scenes)
  * [Schedules](#schedules)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)
* [Donation](#donation)


---


## Installation
Inside your Minoss root folder just use [npm](http://npmjs.com) to install this Module.

```SH
$ npm install minoss-hue
```


## Configuration
By default there are three configuration files available inside the `config/` folder: `bridges`, `lights` and `groups`.
The configurations for `lights` and `groups` are optionally.
You can store different light states there, if wanted.
For more details take a look inside the files or read about the [state builder](#state-builder).

Before using this module the `bridges` configuration should be set up.
This file contains the `IP` address and `username` for all bridges inside the network, which should be controlled.

It is possible to store the bridges under own names.
The name `default` is a reserved name.
Minoss will select this bridge whenever no bridge name was given by request parameters.
So, if only one bridge is available, the name `default` should be used.

```JS
module.exports = {
    default: {
        ip: "192.168.1.11",
        username: "your-hue-bridge-username"
    },
    garden: {
        ip: "192.168.1.20",
        username: "your-garden-bridge-username"
    },
    another: {
        // ...
    }
};
```

If you don't know how to register a username for your bridge, read about it in the [official documentation](http://www.developers.meethue.com/documentation/getting-started). 


## Bridge selection
It is possible to use more than one bridge in this module.
The `bridge` request parameter controls which bridge will be selected for the current action.
Inside the [configuration](#configuration) it is possible to add those.

When no `bridge` parameter was added on request, the `default` bridge will be used.
So, if working with a single bridge only, or when it's wanted to use the default bridge, the `bridge` parameter redundant.

Default bridge:

> http://localhost:8080/hue/bridges?action=config  
> http://localhost:8080/hue/bridges?action=config&bridge=default

Selecting another bridge:

> http://localhost:8080/hue/bridges?action=config&bridge=garden


### Parameter Shorthand
All request parameters can be shorten to it's first character.
With this it is possible to use shorten URLs.

```TEXT
bridge  ->  b
id      ->  i
group   ->  g 
state   ->  s
```

Example:

> http://localhost:8080/hue/lights?**action**=set&**id**=1&**state**=on  
> http://localhost:8080/hue/lights?**a**=set&**i**=1&**s**=on


## State Builder
Hue `lights` and `groups` uses so called `states` to define it's current output.
Things like `brightness` or `saturation` and others can be controlled by this.
The module can build these states by request.

States for `lights` and `groups` could be predefined in [configuration](#configuration).
By default the states `on`, `off`, `low`, `mid` and `high` are predefined and available. 
They can be set by it's name on request:

> http://localhost:8080/hue/lights?action=set&id=1&state=**on**


### Using `JSON` as State
It is possible to use a `JSON` string as state on request.
It works the same way as with predefined states: 

> http://localhost:8080/hue/lights?action=set&id=1&state=**{"on":true,"bri":255}**


### Chaining States
The state builder can even handle a chain of states.
These states has to be separated by a pipe `|` on request.
It will combine all state in the given order.
When a state property is set by more than one entry, the last one will be set.

For example, these are predefined states:

```JS
var states = {
    on: {
        on: true
    },
    normal: {
        bri: 1,
        sat: 255
    },
    high: {
        bri: 255
    }
}
```

And this request:

> http://localhost:8080/hue/lights?action=set&id=1&state=**on|normal|high**

The resulting state would become:

```JSON
{
  "on": true,
  "bri": 255,
  "sat": 255
}
```

It is even possible to chain a `JSON` string too.

> http://localhost:8080/hue/lights?action=set&id=1&state=**on|normal|{"bri":255}**


## Scripts
The following tables describe the available scripts and parameters of the module


### Bridges
> http://localhost:8080/hue/**bridges**?action={ACTION}

| action                    | parameters                                                | description
| :------------------------ | :-------------------------------------------------------- |-------------
| `config`                  | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_  | receive the full configuration of a bridge
| `description`             | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_  | receive the description of a bridge
| `search`&nbsp;_(default)_ | _-_                                                       | search for bridges inside your network
| `state`                   | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_  | receive the full current state of a bridge
| `user`                    | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_  | receive all registered users of a bridge
| `version`                 | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_  | receive software version information of a bridge


### Lights
> http://localhost:8080/hue**/lights**?action={ACTION}

| action                 | parameters                                                                                                                                               | description
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |-------------
| `get`&nbsp;_(default)_ | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_ <br />_(int)_&nbsp;id&nbsp;&#124;&nbsp;i&nbsp;_[optional]_                                      | receive information of all lights, or of a specific light when `id` is set
| `set`                  | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_ <br />_(int)_&nbsp;id&nbsp;&#124;&nbsp;i&nbsp;<br />_(str)_&nbsp;state&nbsp;&#124;&nbsp;s&nbsp; | set a state, or a chain of states, to a specified light


### Groups
> http://localhost:8080/hue/**groups**?action={ACTION}

| action                 | parameters                                                                                                                                               | description
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |-------------
| `get`&nbsp;_(default)_ | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_ <br />_(int)_&nbsp;id&nbsp;&#124;&nbsp;i&nbsp;_[optional]_                                      | receive information of all groups, or of a specific group when `id` is set
| `set`                  | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_ <br />_(int)_&nbsp;id&nbsp;&#124;&nbsp;i&nbsp;<br />_(str)_&nbsp;state&nbsp;&#124;&nbsp;s&nbsp; | set a state, or a chain of states, to a specified group


### Scenes
> http://localhost:8080/hue/**scenes**?action={ACTION}

| action                 | parameters                                                                                                                                               | description
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |-------------
| `get`&nbsp;_(default)_ | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_ <br />_(int)_&nbsp;id&nbsp;&#124;&nbsp;i&nbsp;_[optional]_                                      | receive information of all scenes, or of a specific scene when `id` is set
| `set`                  | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_ <br />_(int)_&nbsp;id&nbsp;&#124;&nbsp;i&nbsp;<br />_(str)_&nbsp;group&nbsp;&#124;&nbsp;g&nbsp; | set a scene to a specified group


### Schedules
> http://localhost:8080/hue/**schedules**?action={ACTION}

| action                 | parameters                                                                                                          | description
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------|-------------
| `get`&nbsp;_(default)_ | _(str)_&nbsp;bridge&nbsp;&#124;&nbsp;b&nbsp;_[optional]_ <br />_(int)_&nbsp;id&nbsp;&#124;&nbsp;i&nbsp;_[optional]_ | receive information of all schedules, or of a specific schedule when `id` is set


## Bugs / Feature request
Please [report](http://github.com/dkern/minoss-hue/issues) bugs and feel free to [ask](http://github.com/dkern/minoss-hue/issues) for new features directly on GitHub.


## License
Minoss is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.


## Donation
_You like to support me?_  
_You appreciate my work?_  
_You use it in commercial projects?_  
  
Feel free to make a little [donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=93XQ8EYMSWHC6)! :wink:
