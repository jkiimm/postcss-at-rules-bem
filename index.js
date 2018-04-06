var postcss = require('postcss');

function processEM(base, rule, blockNode) {
    let sep = null;
    let last = null;

    if (rule.name === 'el') {
        sep = '__';
    } else if (rule.name === 'mod') {
        sep = '_';
    }

    if (sep) {
        const name = base + sep + rule.params;
        const newRule = postcss.rule({
            selector: `.${name}`,
            source: rule.source
        });

        blockNode.after(newRule);
        last = newRule;

        rule.each(subRule => {
            let newSubRule = null;

            if (subRule.type === 'atrule' && subRule.name === 'mod') {
                newSubRule = processEM(name, subRule, last);
            }

            if (newSubRule) {
                last = newSubRule;
            } else {
                newRule.append(subRule);
            }
        });

        rule.remove();
        return last;
    }

    return null;
}

module.exports = postcss.plugin('postcss-at-rules-bem', () => {
    return root => {
        root.walkAtRules('block', node => {
            const blockName = node.params;

            let last = node;
            const css = postcss.rule({
                selector: `.${blockName}`,
                source: node.source
            });

            node.each(rule => {
                let newRule = null;

                if (rule.type === 'atrule') {
                    newRule = processEM(blockName, rule, last);
                }

                if (newRule) {
                    last = newRule;
                } else {
                    css.append(rule);
                }
            });

            node.replaceWith(css);
        });
    };
});
