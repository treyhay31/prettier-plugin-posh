const prettier = require("prettier");
const code = `$sum = 10 * 10

$name = "mark"

Write-Host "$sum x $name"

`;
const results  = prettier.format(code, {
  parser: "posh-parse",
  plugins: ["."],
});

console.log('results', results)