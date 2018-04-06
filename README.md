# PostCSS At Rules Bem [![Build Status][ci-img]][ci]

[PostCSS] plugin for BEM name convention.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/jkiimm/postcss-at-rules-bem.svg
[ci]:      https://travis-ci.org/jkiimm/postcss-at-rules-bem

```css
/* Input example */
@block foo {
    width: 1px;

    @mod bar {
        width: 2px;
    }

    @el baz {
        width: 3px;

        @mod qux {
            width: 4px;
        }
    }
}
```

```css
/* Output example */
.foo {
    width: 1px;
}

.foo_bar {
    width: 2px;
}

.foo__baz {
    width: 3px;
}

.foo__baz_qux {
    width: 4px;
}
```

## Usage

```js
postcss([ require('postcss-at-rules-bem') ])
```

See [PostCSS] docs for examples for your environment.
