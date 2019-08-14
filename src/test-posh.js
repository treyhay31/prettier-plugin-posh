const PowerShell = require("powershell");

const script = "C:\\proj\\prettier-plugin-posh\\testsexample-actual.ps1";

const tokenize = "[System.Management.Automation.PSParser]::Tokenize";
const readFile = "[System.IO.File]::ReadAllText";
const tokenizerCommand = `${tokenize}(${readFile}('${script}'), [ref]$null)`;

// const parseFile = "[System.Management.Automation.Language.Parser]::ParseInput";
// const parseCommand = `${parseFile}(${readFile}(${script}), [ref]$null, [ref]$null)`;
// Start the process
let ps = new PowerShell(`${tokenizerCommand} | ConvertTo-Json`);

// Handle process errors (e.g. powershell not found)
ps.on("error", err => {
  console.error(err);
});

// Stdout
ps.on("output", data => {
  // console.log(JSON.parse(data));
  console.log(data);
  console.log("typeof data: ", typeof data);
});

// Stderr
ps.on("error-output", data => {
  console.error(data);
});

// End
ps.on("end", code => {
  console.log("exit code: ", code);
});
