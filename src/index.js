const parser = require('node-powershell');
const {
  doc: {
    builders: { concat }
  }
} = require('prettier')

const languages = [
  {
    extensions: ['.ps1', '.psm1', '.psd1'],
    name: 'POSH',
    parsers: ['posh-parse']
  }
]

const parsers = {
  'posh-parse': {
    parse: text => parser.parse(text),
    astFormat: 'posh-ast'
  }
}

function printPosh(path, options, print) {
  const node = path.getValue()

  if (Array.isArray(node)) {
    return concat(path.map(print))
  }

  switch (node.type) {
    default:
      return ''
  }
}

const printers = {
  'posh-ast': {
    print: printPosh
  }
}

module.exports = {
  languages,
  parsers,
  printers
}
