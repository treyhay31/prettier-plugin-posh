describe('simple snapshot', () => {
  it('should match the suggested output', () => {
    expect(`
      $name = "dobby"
      $sum = 20 + 80
      Write-Host "$name is $sum"
`).toMatchSnapshot()
  })
})
