[![NPM](https://nodei.co/npm/b9-debug.png?compact=true)](https://nodei.co/npm/b9-debug/)<br />
[![Build Status](https://travis-ci.org/mhelgeson/b9-debug.svg?branch=master)](https://travis-ci.org/mhelgeson/b9-debug)
[![Coverage Status](https://coveralls.io/repos/github/mhelgeson/b9-debug/badge.svg?branch=master)](https://coveralls.io/github/mhelgeson/b9-debug?branch=master)
- - -

# b9-debug
A [b9](https://github.com/mhelgeson/b9) slack bot plugin, which enables logging and inspecting.

## Listeners

#### `"rtm.send"`
Sends emitted json to `console.log`.

#### `"rtm.read"`
Sends emitted json to `console.log`.

## Commands

#### `debug [prop]`
Inspect properties of the `b9` instance, from within slack. Accepts deeply
namespaced properties and bracket notation.

## Warning

This should only be used during development, or within a trusted environment,
as *anything* stored on the `b9` instance could be exposed to any user.
