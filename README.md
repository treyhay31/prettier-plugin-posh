# prettier-plugin-posh

Forked from :revolving_hearts: [fvictorio's](https://github.com/fvictorio) :revolving_hearts: [tutorial article](https://medium.com/@fvictorio/how-to-write-a-plugin-for-prettier-a0d98c845e70) on how to write a plugin for Prettier.

## src/index.js

Holds the printPosh() method that will handle printing the AST elements. 

## src/parse.js

Using the [npm module powershell](https://www.npmjs.com/package/powershell) to execute powershell that will return json formatted AST information...

## example.ps1

A few lines of simple powershell syntax.
