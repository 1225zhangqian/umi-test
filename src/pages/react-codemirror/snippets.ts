// eslint-disable-next-line rulesdir/no-phantom-deps
import {
  Completion,
  snippetCompletion as snip,
} from '@codemirror/autocomplete';

const completionMap = (
  name: string,
  type: string,
): { label: string; type: string } => ({ label: name, type });

/// A collection of JavaScript-related
/// [snippets](#autocomplete.snippet).
export const getSnippets = () => {
  const snippets = [
    snip('function ${name}(${params}) {\n\t${}\n}', {
      label: 'function',
      detail: 'definition',
      type: 'keyword',
    }),
    snip(
      'for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n\t${}\n}',
      {
        label: 'for',
        detail: 'loop',
        type: 'keyword',
      },
    ),
    snip('for (let ${name} of ${collection}) {\n\t${}\n}', {
      label: 'for',
      detail: 'of loop',
      type: 'keyword',
    }),
    snip('do {\n\t${}\n} while (${})', {
      label: 'do',
      detail: 'loop',
      type: 'keyword',
    }),
    snip('while (${}) {\n\t${}\n}', {
      label: 'while',
      detail: 'loop',
      type: 'keyword',
    }),
    snip('try {\n\t${}\n} catch (${error}) {\n\t${}\n}', {
      label: 'try',
      detail: '/ catch block',
      type: 'keyword',
    }),
    snip('if (${}) {\n\t${}\n}', {
      label: 'if',
      detail: 'block',
      type: 'keyword',
    }),
    snip('if (${}) {\n\t${}\n} else {\n\t${}\n}', {
      label: 'if',
      detail: '/ else block',
      type: 'keyword',
    }),
    snip('class ${name} {\n\tconstructor(${params}) {\n\t\t${}\n\t}\n}', {
      label: 'class',
      detail: 'definition',
      type: 'keyword',
    }),
  ];
  const keywords = [
    'await',
    'async',
    'break',
    'case',
    'catch',
    'const',
    'constructor',
    'continue',
    'debugger',
    'default',
    'delete',
    'else',
    'enum',
    'export',
    'extends',
    'false',
    'finally',
    'implements',
    'import',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'private',
    'protected',
    'public',
    'return',
    'switch',
    'static',
    'throw',
    'typeof',
    'var',
    'void',
    'while',
    'yield',
  ].map((i) => completionMap(i, 'keyword'));
  return snippets.concat(keywords);
};
export const getCompletions = (context: {
  matchBefore: (arg0: RegExp) => any;
  explicit: any;
  pos: any;
}) => {
  const classList = [
    'Math',
    'Array',
    'Object',
    'String',
    'Number',
    'Boolean',
    'Date',
    'RegExp',
    'Error',
    'Symbol',
    'Set',
    'Map',
    'WeakSet',
    'WeakMap',
    'Promise',
    'Proxy',
    'Reflect',
    'JSON',
    'Intl',
    'Function',
  ].map((i) => completionMap(i, 'class'));

  const constantList = [
    'undefined',
    'NaN',
    'Infinity',
    'null',
    'true',
    'false',
    'this',
    'super',
    'console',
    'process',
    'globalThis',
    'global',
    'arguments',
  ].map((i) => completionMap(i, 'constant'));

  const functionList = ['eval', 'require'].map((i) =>
    completionMap(i, 'constant'),
  );

  const methodList = [
    'aggregate',
    'bulkWrite',
    'count',
    'countDocuments',
    'createIndex',
    'createIndexes',
    'dataSize',
    'deleteMany',
    'deleteOne',
    'distinct',
    'drop',
    'dropIndex',
    'dropIndexes',
    'ensureIndex',
    'estimatedDocumentCount',
    'explain',
    'find',
    'findAndModify',
    'findOne',
    'findOneAndDelete',
    'findOneAndReplace',
    'findOneAndUpdate',
    'getIndexes',
    'hideIndex',
    'insert',
    'insertOne',
    'insertMany',
    'isCapped',
    'mapReduce',
    'reIndex',
    'remove',
    'renameCollection',
    'replaceOne',
    'save',
    'stats',
    'storageSize',
    'totalIndexSize',
    'totalSize',
    'unhideIndex',
    'update',
    'updateMany',
    'updateOne',
    'watch',
  ].map((i) => completionMap(i, 'method'));
  const textList = ['db'].map((i) => completionMap(i, 'text'));
  const completions = [
    ...textList,
    ...classList,
    ...constantList,
    ...functionList,
    ...methodList,
  ];
  const before = context.matchBefore(/\w+/);
  // If completion wasn't explicitly started and there
  // is no word before the cursor, don't open completions.
  if (!context.explicit && !before) return null;
  return {
    from: before ? before.from : context.pos,
    options: completions,
    validFor: /^\w*$/,
  };
};
