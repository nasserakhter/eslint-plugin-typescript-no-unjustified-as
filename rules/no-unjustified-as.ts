/* eslint-disable */

import Eslint from 'eslint';

//eslint-disable-next-line
module.exports = {
  meta: {
    messages: {
      unjustifiedAs: 'Unjustified use of the "as" operator',
    },
  },
  create(context: Eslint.Rule.RuleContext) {
    return {
      //eslint-disable-next-line
      VariableStatement(node: Eslint.Rule.Node) {
        let stop = false;
        let parentNode = node.parent;
        let comment = '';
        while (!stop) {
          if (node.type.indexOf('Statement') === -1) {
            stop = true;
          } else if (parentNode.leadingComments || parentNode.trailingComments) {
            stop = true;
            if (parentNode.leadingComments) {
              comment = parentNode.leadingComments[0].value;
            } else if (parentNode.trailingComments) {
              comment = parentNode.trailingComments[0].value;
            }
          } else {
            parentNode = parentNode.parent;
          }
        }
        if (comment) {
          console.log(comment);
        } else {
          context.report({
            node,
            messageId: 'unjustifiedAs',
          });
        }
      },
    };
  },
};
