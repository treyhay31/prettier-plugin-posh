const {
	doc: {
		builders: { concat, hardline, group, indent, line, join, softline },
	},
} = require('prettier');

const printPosh = (path, options, print) => {
	const node = path.getValue();

	if (Array.isArray(node)) {
		return concat(path.map(print));
	}

	return handleAst(node, path, options, print);
};

const handleAst = (node, path, options, print) => {
	// console.log(`type: ${node.type}`, `(${node.start})${node.value}(${node.end})`);
	// console.log(`type: ${node.type}`, node);
	if (typeof node === undefined) {
		// console.log('returning...');
		return '';
	}

	switch (node.type) {
		case 'ArrayExpressionAst':
		case 'ArrayLiteralAst':
		case 'AssignmentStatementAst':
		case 'Ast':
		case 'AttributeAst':
		case 'AttributeBaseAst':
		case 'AttributedExpressionAst':
		case 'BaseCtorInvokeMemberExpressionAst':
		case 'BinaryExpressionAst':
		case 'BlockStatementAst':
		case 'BreakStatementAst':
		case 'CatchClauseAst':
		case 'ChainableAst':
		case 'CommandAst':
		case 'CommandBaseAst':
		case 'CommandElementAst':
		case 'CommandExpressionAst':
		case 'CommandParameterAst':
		case 'CompilerGeneratedMemberFunctionAst':
		case 'ConfigurationDefinitionAst':
		case 'ConstantExpressionAst':
		case 'ContinueStatementAst':
		case 'ConvertExpressionAst':
		case 'DataStatementAst':
		case 'DoUntilStatementAst':
		case 'DoWhileStatementAst':
		case 'DynamicKeywordStatementAst':
		case 'ErrorExpressionAst':
		case 'ErrorStatementAst':
		case 'ExitStatementAst':
		case 'ExpandableStringExpressionAst':
		case 'ExpressionAst':
		case 'FileRedirectionAst':
		case 'ForEachStatementAst':
		case 'ForStatementAst':
		case 'FunctionDefinitionAst':
		case 'FunctionMemberAst':
		case 'HashtableAst':
		case 'IfStatementAst':
		case 'IndexExpressionAst':
		case 'InvokeMemberExpressionAst':
		case 'LabeledStatementAst':
		case 'LoopStatementAst':
		case 'MemberAst':
		case 'MemberExpressionAst':
		case 'MergingRedirectionAst':
		case 'NamedAttributeArgumentAst':
		case 'NamedBlockAst':
		case 'ParamBlockAst':
		case 'ParameterAst':
		case 'ParenExpressionAst':
		case 'PipelineAst':
		case 'PipelineBaseAst':
		case 'PipelineChainAst':
		case 'PropertyMemberAst':
		case 'RedirectionAst':
		case 'ReturnStatementAst':
		case 'ScriptBlockAst':
		case 'ScriptBlockExpressionAst':
		case 'SequencePointAst':
		case 'StatementAst':
		case 'StatementBlockAst':
		case 'StringConstantExpressionAst':
		case 'SubExpressionAst':
		case 'SwitchStatementAst':
		case 'TernaryExpressionAst':
		case 'ThrowStatementAst':
		case 'TrapStatementAst':
		case 'TryStatementAst':
		case 'TypeConstraintAst':
		case 'TypeDefinitionAst':
		case 'TypeExpressionAst':
		case 'UnaryExpressionAst':
		case 'UsingExpressionAst':
		case 'UsingStatementAst':
		case 'VariableExpressionAst':
		case 'WhileStatementAst':
			console.log(node.type, node.value);
			return path.call(print, 'value');
		default:
			return '';
	}
};

module.exports = {
	printPosh,
};
