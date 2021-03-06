const PowerShell = require("powershell");
const good = () => new Promise((resolve, reject) => {
    const script = "C:\\proj\\prettier-plugin-posh\\tests\\example-actual.ps1";

    const tokenize = "[System.Management.Automation.PSParser]::Tokenize";
    const readFile = "[System.IO.File]::ReadAllText";
    const tokenizerCommand = `${tokenize}([System.IO.File]::ReadAllText('${script}'), [ref]$null)`;

    const parseInput = "[System.Management.Automation.Language.Parser]::ParseInput";
    const parseInputCommand = `${parseInput}([System.IO.File]::ReadAllText('${script}'), [ref]$null, [ref]$null).FindAll({ $true }, $true)`;

    const parseFile = "[System.Management.Automation.Language.Parser]::ParseFile";
    const parseFileCommand = `${parseFile}('${script}', [ref]$null, [ref]$null).FindAll({ $true }, $true)`;
    // Start the process
    //let ps = new PowerShell(`
    //    ${tokenizerCommand} | ConvertTo-Json | Set-Content ${script}-log-tokenizer.json -Force;
    //    ${parseInputCommand} | Export-Clixml ${script}-log-parse-input.xml -Force;
    //    ${parseFileCommand} | Export-Clixml ${script}-log-parse-file.xml -Force;
    //`);

    let ps = new PowerShell(`
    # parse code:
    $ast = [System.Management.Automation.Language.Parser]::ParseFile("${script}"    , [ref]$null, [ref]$null)

    # include all ast objects:
    $predicate = { $true }

    # search for all ast objects, including nested scriptblocks:
    $recurse = $true

    # expose the object type:
    $type = @{
      Name = 'Type'
      Expression = { $_.GetType().Name }
    }

    # expose the code position: -- start
    $start = @{
      Name = 'Start'
      Expression = { $_.Extent.StartOffset }
    }

    # expose the code position: -- end
    $end = @{
      Name = 'End'
      Expression = { $_.Extent.EndOffset }
    }

    # expose the text of the code:
    $text = @{
      Name = 'Value'
      Expression = { $_.Extent.Text }
    }

    # expose the parent:
    $parent = @{
      Name = 'Parent'
      Expression = { $_.Parent }
    }

    # expose the parent:
    $extent = @{
      Name = 'Extent'
      Expression = { $_.Extent }
    }

    # find the ast objects:
    $astObjects = $ast.FindAll($predicate, $recurse)

    # output the ast type and code position
    $astObjects | Select-Object -Property $start, $end, $type, $text, $parent, $extent | ConvertTo-Json
    `)

    // Handle process errors (e.g. powershell not found)
    ps.on("error", err => {
      console.error(err);
      reject(err);
    });

    ps.on("output", json => {
      resolve(JSON.parse(json));
    });

    // Stderr
    ps.on("error-output", data => {
      console.error(data);
      reject(data);
    });

    // End
    ps.on("end", code => {
      console.log("exit code: ", code);
    });
})
                         good().then(data => {
  console.log("test", data)
});
