/* eslint-disable rulesdir/no-phantom-deps */
/* eslint-disable @typescript-eslint/no-magic-numbers */

import { parser } from '@lezer/javascript';
import {
  LRLanguage,
  LanguageSupport,
  delimitedIndent,
  flatIndent,
  continuedIndent,
  indentNodeProp,
  foldNodeProp,
  foldInside,
} from '@codemirror/language';
import { completeFromList, ifNotIn } from '@codemirror/autocomplete';
import { getCompletions, getSnippets } from './snippets';
import { localCompletionSource, dontComplete } from './complete';

/// mongodb support. Includes [snippet](#lang-mongodb.snippets)
/// and local variable completion.
export function mongodb() {
  /// A language provider based on the [Lezer mongodb
  /// parser](https://github.com/lezer-parser/mongodb), extended with
  /// highlighting and indentation information.
  const lang = LRLanguage.define({
    name: 'mongodb',
    parser: parser.configure({
      props: [
        indentNodeProp.add({
          IfStatement: continuedIndent({ except: /^\s*({|else\b)/ }),
          TryStatement: continuedIndent({
            except: /^\s*({|catch\b|finally\b)/,
          }),
          LabeledStatement: flatIndent,
          SwitchBody: (context) => {
            const after = context.textAfter,
              closed = /^\s*\}/.test(after),
              isCase = /^\s*(case|default)\b/.test(after);
            return (
              context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit
            );
          },
          Block: delimitedIndent({ closing: '}' }),
          ArrowFunction: (cx) => cx.baseIndent + cx.unit,
          'TemplateString BlockComment': () => null,
          'Statement Property': continuedIndent({ except: /^{/ }),
        }),
        foldNodeProp.add({
          'Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType':
            foldInside,
          BlockComment(tree) {
            return { from: tree.from + 2, to: tree.to - 2 };
          },
        }),
      ],
    }),
    languageData: {
      closeBrackets: { brackets: ['(', '[', '{', "'", '"', '`'] },
      commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
      indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
      wordChars: '$',
    },
  });
  return new LanguageSupport(lang, [
    lang.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(getSnippets())),
    }),
    lang.data.of({
      autocomplete: localCompletionSource,
    }),
    lang.data.of({
      autocomplete: getCompletions,
    }),
    [],
  ]);
}
