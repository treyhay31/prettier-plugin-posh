// const parser = require('node-powershell');
const {
	doc: {
		builders: { concat },
	},
} = require('prettier');

const languages = [
	{
		extensions: ['.ps1', '.psm1', '.psd1'],
		name: 'POSH',
		parsers: ['posh-parse'],
	},
];

const parsers = {
	'posh-parse': {
		parse: text => text,
		astFormat: 'posh-ast',
	},
};

function printPosh(path, options, print) {
	const node = path.getValue();
	console.log('node', node);
	if (Array.isArray(node)) {
		return concat(path.map(print));
	}

	switch (node.type) {
		default:
			return '';
	}
}

const printers = {
	'posh-ast': {
		print: printPosh,
	},
};

module.exports = {
	languages,
	parsers,
	printers,
};
