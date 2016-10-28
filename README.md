# babel-plugin-include

Adds an `include` function which places the given file into a string at compile-time.

## Installation

```sh
$ npm install babel-plugin-include
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["include"]
}
```

### Via CLI

```sh
$ babel --plugins include script.js
```

### Via Node API

```javascript
require('babel').transform('code', {
  plugins: ['include']
});
```

## Example

Given `text.txt` with the contents:

```
Hello, World!
```

the following JS:

```javascript
let file = include("text.txt");
```

will be compiled to:

```javascript
let file = "Hello, World!";
```

## Information

 - The file is included relative to the JS file the `include` is in unless a `root` is specified in the plugin options, in which case, the `root` is used. (See below for info on `root`)
 - The default encoding is utf8 however that can be changed
 - Special characters/unprintables are automatically escaped
 - The `include` function takes a single string as argument. Any following arguments are ignored.

## Options

`babel-plugin-include` allows you to change various settings by providing an options object by using the following instead:

```javascript
{
    plugins: [
        ['include', { options }]
    ]
}
```

where `{ options }` is the options object. The following options are available:

### `root`
The root option specifies the root in which files are included from. e.g.:

```javascript
{
    plugins: [
        ['include', {
            'root': 'proj/src'
        }]
    ]
}
```

### `encoding`
The encoding option specifies which encoding to use when including files. Default is `utf8`

```javascript
{
    plugins: [
        ['include', {
            'encoding': 'ucs2'
        }]
    ]
}
```

### `normalizeNewline`
The normalize newline option specifies whether newlines should be normalized or not. This converts `\r\n` to `\n` and removes and trailing newlines. Disable this for binary files or other applicable locations.

```javascript
{
    plugins: [
        ['include', {
            'encoding': 'ucs2'
        }]
    ]
}
```
