const parse = require("./parse");
const {
	doc: {
		builders: { concat, hardline, group, indent, line, join, softline }
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
		parse,
		astFormat: 'posh-ast',
		locStart: () => 0,
		locEnd: () => 0,
	},
};

const printPosh = async (path, options, print) => {
	const pathNode = await path.getValue()

	if (Array.isArray(pathNode)) {
	   // console.log("isArray", pathNode[0])
	   return pathNode.map(node => handleAst(node, path, options, print))
	}

	return handleAst(pathNode, path, options, print)
}

const handleAst = async (node, path, options, print) => {

	 if (typeof node === 'undefined') {
		 return '';
	 }
	 console.log(`${node.type}`, `'${node.value}'`)
	 switch (node.type) {
		 case 'BinaryExpressionAst':
			 // console.log('inside BinaryExpressionAst block', node);
			 return concat(['"', node.value, '"'])
		 case 'CommandAst':
			 // console.log('inside CommandAst block', node);
			 return concat(['"', node.value, '"'])
		 case 'CommandExpressionAst':
			 // console.log('inside CommandExpressionAst block', node);
			 return concat(['"', node.value, '"'])
		 case 'ConstantExpressionAst':
			 // console.log('inside ConstantExpressionAst block', node);
			 return concat(['"', node.value, '"'])
		 case 'NamedBlockAst':
			 // console.log('inside NamedBlockAst block', node);
			 return concat(['"', node.value, '"'])
		 case 'PipelineAst':
			 // console.log('inside PipelineAst block', node);
			 return concat(['"', node.value, '"'])
		 case 'ScriptBlockAst':
			 // console.log('inside ScriptBlockAst block', node);
			 return concat(['"', node.value, '"'])
		 case 'StringConstantExpressionAst':
			 // console.log('inside StringConstantExpressionAst block', node);
			 return concat(['"', node.value, '"'])
		 default:
			 // console.log('got nothing...', node)
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
