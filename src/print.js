const {
	doc: {
		builders: { concat, hardline, group, indent, line, join, softline },
	},
} = require('prettier');

const printPosh = (path, options, print) => {
	const node = path.getValue();
	// console.log('node', node);
	// console.log('path', path);

	if (Array.isArray(node)) {
		// console.log('isArray', node[0].value);
		return node.map(n => handleAst(n, path, options, print));
	}

	return handleAst(node, path, options, print);
};

const handleAst = (node, path, options, print) => {
	if (typeof node === 'undefined') {
		return '';
	}
	console.log(node.type, node.value);
	switch (node.type) {
		case 'BinaryExpressionAst':
			//console.log('inside BinaryExpressionAst block', node);
			return path.call(print, 'value');
		case 'CommandAst':
			//console.log('inside CommandAst block', node);
			return path.call(print, 'value');
		case 'CommandExpressionAst':
			//console.log('inside CommandExpressionAst block', node);
			return path.call(print, 'value');
		case 'ConstantExpressionAst':
			//console.log('inside ConstantExpressionAst block', node);
			return path.call(print, 'value');
		case 'NamedBlockAst':
			//console.log('inside NamedBlockAst block', node);
			return path.call(print, 'value');
		case 'PipelineAst':
			//console.log('inside PipelineAst block', node);
			return path.call(print, 'value');
		case 'ScriptBlockAst':
			//console.log('inside ScriptBlockAst block', node);
			return path.call(print, 'value');
		case 'StringConstantExpressionAst':
			//console.log('inside StringConstantExpressionAst block', node);
			return path.call(print, 'value');
		default:
			//console.log('got nothing...', node);
			return '';
	}
	/*
	ArrayExpressionAst
ArrayLiteralAst
AssignmentStatementAst
Ast
AttributeAst
AttributeBaseAst
AttributedExpressionAst
BaseCtorInvokeMemberExpressionAst
BinaryExpressionAst
BlockStatementAst
BreakStatementAst
CatchClauseAst
ChainableAst
CommandAst
CommandBaseAst
CommandElementAst
CommandExpressionAst
CommandParameterAst
CompilerGeneratedMemberFunctionAst
ConfigurationDefinitionAst
ConstantExpressionAst
ContinueStatementAst
ConvertExpressionAst
DataStatementAst
DoUntilStatementAst
DoWhileStatementAst
DynamicKeywordStatementAst
ErrorExpressionAst
ErrorStatementAst
ExitStatementAst
ExpandableStringExpressionAst
ExpressionAst
FileRedirectionAst
ForEachStatementAst
ForStatementAst
FunctionDefinitionAst
FunctionMemberAst
HashtableAst
IfStatementAst
IndexExpressionAst
InvokeMemberExpressionAst
LabeledStatementAst
LoopStatementAst
MemberAst
MemberExpressionAst
MergingRedirectionAst
NamedAttributeArgumentAst
NamedBlockAst
ParamBlockAst
ParameterAst
ParenExpressionAst
PipelineAst
PipelineBaseAst
PipelineChainAst
PropertyMemberAst
RedirectionAst
ReturnStatementAst
ScriptBlockAst
ScriptBlockExpressionAst
SequencePointAst
StatementAst
StatementBlockAst
StringConstantExpressionAst
SubExpressionAst
SwitchStatementAst
TernaryExpressionAst
ThrowStatementAst
TrapStatementAst
TryStatementAst
TypeConstraintAst
TypeDefinitionAst
TypeExpressionAst
UnaryExpressionAst
UsingExpressionAst
UsingStatementAst
VariableExpressionAst
WhileStatementAst */
};

module.exports = {
	printPosh,
};
