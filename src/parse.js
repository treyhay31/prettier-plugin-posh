const PowerShell = require("powershell");

const parse = (scriptContent) => new Promise((resolve, reject) => {
    console.log("scipt content", scriptContent)
    let ps = new PowerShell(`
    # parse code:
    $ast = [System.Management.Automation.Language.Parser]::ParseInput(@"
${scriptContent}
"@, [ref]$null, [ref]$null)

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

    // Stderr
    ps.on("error-output", data => {
      console.error(data);
      reject(data);
    });

    // End
    ps.on("end", code => {
      console.log("exit code: ", code);
    });

     // Stdout
    ps.on("output", json => {
      resolve( JSON.parse(json) )
    });
})

module.exports = parse;