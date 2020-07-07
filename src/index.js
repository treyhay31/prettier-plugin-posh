const parse = require('./parse');
const print = require('./print');

const languages = [
	{
		extensions: ['.ps1', '.psm1', '.psd1'],
		name: 'POSH',
		parsers: ['posh-parse'],
	},
];

const parsers = {
	'posh-parse': {
		parse: text => parse.parseHard(text),
		astFormat: 'posh-ast',
		locEnd: node => node.end,
		locStart: node => node.start,
	},
};

const printers = {
	'posh-ast': {
		print: print.printPosh,
	},
};

module.exports = {
	languages,
	parsers,
	printers,
};
