Write-Host "Logging some stuff..."

$trey = @(
  "trey",
  "hayden",
  "daniel",
  "other",
  "names",
  "as",
  "well"
)

Write-Host "Logging $trey stuff..."

function Get-StuffHere {
  param(
    [string]$thing1, 
    [string]$thing2, 
    [string]$thing3, 
    [string]$thing4
  )
  
  $xml = [xml](Get-Content "some-example.xml")
  
  Write-Host $xml
  
  return @{ 
    thing1 = $thing1
    thing2 = $thing2
    thing3 = $thing3
    thing4 = $thing4 
  }
}

Get-StuffHere '[string]$thing1' `
  '[string]$thing2' `
  '[string]$thing3' `
  '[string]$thing4'

@"
Formating multi line
strings when they should be
using the @ signs and stuff
"@

"advanced concat stuff $($trey[0]) hopefully this works..."

@"
Can i get the parameter names out of the function or something?
... For splatting purposes, of course
"@

"Don't forget that posh only needs ';'s for multiple commands on oneline..."