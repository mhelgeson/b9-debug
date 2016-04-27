[![NPM](https://nodei.co/npm/b9-debug.png?compact=true)](https://nodei.co/npm/b9-debug/)<br />
[![Build Status](https://travis-ci.org/mhelgeson/b9-debug.svg?branch=master)](https://travis-ci.org/mhelgeson/b9-debug)
[![Coverage Status](https://coveralls.io/repos/github/mhelgeson/b9-debug/badge.svg?branch=master)](https://coveralls.io/github/mhelgeson/b9-debug?branch=master)
- - -

# b9-debug
A [b9](https://github.com/mhelgeson/b9) slack bot plugin, which enables logging and inspecting.

## Options

- **`debug_log`** *`{Function}`* `console.log` <br />
Function which receives json emitted by listeners. Set to `false` to disable.

## Methods

#### `b9.debug( channel, value )`
Posts a formatted JSON attachment, to the provided channel. Useful for logging output during development.

- **`channel`** *`{String}`* <br />
The `id` of the destination channel.

- **`value`** *`{Any}`* <br />
The value to log.

## Listeners

#### `"rtm.send"`
Sends emitted json to `debug_log`.

#### `"rtm.read"`
Sends emitted json to `debug_log`.

## Commands

#### `inspect [prop]`
Inspect properties of the `b9` instance, from within slack. Accepts deeply
namespaced properties and bracket notation. Result is posted as a JSON file snippet.

## Warning

This should only be used during development, or within a trusted environment,
as *anything* stored on the `b9` instance could be exposed to any user.
