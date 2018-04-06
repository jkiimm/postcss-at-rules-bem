/* eslint-disable max-len */

var postcss = require('postcss');

var plugin = require('./');

function run(input, output) {
    return postcss([plugin()]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('converts blocks at-rule with a name to a block selector', () => {
    const input = '@block foo { width: 1px; }';
    const output = '.foo { width: 1px\n}';
    return run(input, output);
});

it('converts elements at-rule within a block to a element selector', () => {
    const input = '@block foo { @el bar { width: 1px; } }';
    const output = '.foo {}\n.foo__bar { width: 1px\n}';
    return run(input, output);
});

it('converts modifiers at-rule within a block to a modifier selector', () => {
    const input = '@block foo { @mod bar { width: 1px; } }';
    const output = '.foo {}\n.foo_bar { width: 1px\n}';
    return run(input, output);
});

it('converts modifiers at-rule within a element to a modifier selector', () => {
    const input = '@block foo { @el bar { @mod baz { width: 1px; } } }';
    const output = '.foo {}\n.foo__bar {}\n.foo__bar_baz { width: 1px\n}';
    return run(input, output);
});

it('works on hybrid', () => {
    const input = '@block foo { width: 1px; @mod bar { width: 2px; } @el baz { width: 3px; @mod qux { width: 4px; } } }';
    const output = '.foo { width: 1px\n}\n.foo_bar { width: 2px\n}\n.foo__baz { width: 3px\n}\n.foo__baz_qux { width: 4px\n}';
    return run(input, output);
});
