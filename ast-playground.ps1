$file = [System.IO.File]::ReadAllText("C:\proj\prettier-plugin-posh\tests\example-actual.ps1")
$tokens = [System.Management.Automation.PSParser]::Tokenize($file,[ref]$null)
$parsed = [System.Management.Automation.Language.Parser]::ParseInput($file, [ref]$null, [ref]$null)

$parsed | Get-Member

$parsed.FindAll({ $true -eq $true }, $true)