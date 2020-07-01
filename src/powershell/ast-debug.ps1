$scriptInput = $args[0]
Write-Host $scriptInput
# parse code:
$ast = [System.Management.Automation.Language.Parser]::ParseInput($scriptInput, [ref]$null, [ref]$null)

# include all ast objects:
$predicate = { $true }

# search for all ast objects, including nested scriptblocks:
$recurse = $false

# expose the object type:
$type = @{
  Name = 'type'
  Expression = { $_.GetType().Name }
}

# expose the code position: -- start
$start = @{
  Name = 'start'
  Expression = { $_.Extent.StartOffset }
}

# expose the code position: -- end
$end = @{
  Name = 'end'
  Expression = { $_.Extent.EndOffset }
}

# expose the text of the code:
$text = @{
  Name = 'value'
  Expression = { $_.Extent.Text }
}

# expose the parent:
$parent = @{
  Name = 'parent'
  Expression = { $_.Parent }
}

# expose the parent:
$extent = @{
  Name = 'extent'
  Expression = { $_.Extent }
}

# find the ast objects:
$astObjects = $ast.FindAll($predicate, $recurse)

# output the ast type and code position
$astList = $astObjects | Select-Object -Property $start, $end, $type, $text, $parent, $extent 

$output = @{
  ast = $ast
  list = $astList
  input = $scriptInput
} 

$output | ConvertTo-Json

