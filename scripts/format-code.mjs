import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

function filesAt(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((item) => {
    const filename = path.join(directory, item.name);
    return item.isDirectory() ? filesAt(filename) : /\.[cm]?tsx?$/.test(filename) ? [filename] : [];
  });
}

for (const file of [...filesAt('frontend/src'), ...filesAt('backend/src'), ...filesAt('backend/scripts'), ...filesAt('backend/tests')]) {
  let text = fs.readFileSync(file, 'utf8').replace(/\n[ \t]*\n(?:[ \t]*\n)+/g, '\n\n');
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const breaks = new Set();

  function visit(node) {
    if (ts.isJsxElement(node)) {
      breaks.add(node.openingElement.end);
      breaks.add(node.closingElement.getStart(source));
    }
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const start = node.getStart(source);
      if (text.slice(text.lastIndexOf('\n', start - 1) + 1, start).trim()) {
        breaks.add(start);
      }
      if (ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent)) {
        breaks.add(node.end);
      }
    }
    if (ts.isObjectLiteralExpression(node) && node.properties.length > 0) {
      for (const property of node.properties) {
        breaks.add(property.getStart(source));
      }
      breaks.add(node.end - 1);
    }
    ts.forEachChild(node, visit);
  }

  {
    visit(source);
    for (const position of [...breaks].sort((a, b) => b - a)) {
      const before = text.slice(text.lastIndexOf('\n', position - 1) + 1, position);
      const nextLine = text.indexOf('\n', position);
      const after = text.slice(position, nextLine < 0 ? text.length : nextLine);
      if (before.trim() && after.trim()) {
        text = text.slice(0, position) + '\n' + text.slice(position);
      }
    }
  }

  const service = ts.createLanguageService({
    getScriptFileNames: () => [file],
    getScriptVersion: () => '0',
    getScriptSnapshot: (name) => name === file ? ts.ScriptSnapshot.fromString(text) : undefined,
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => ({ jsx: ts.JsxEmit.Preserve }),
    getDefaultLibFileName: ts.getDefaultLibFilePath,
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
  });
  const edits = service.getFormattingEditsForDocument(file, {
    indentSize: 2,
    tabSize: 2,
    newLineCharacter: '\n',
    convertTabsToSpaces: true,
    insertSpaceAfterCommaDelimiter: true,
    insertSpaceAfterSemicolonInForStatements: true,
    insertSpaceBeforeAndAfterBinaryOperators: true,
    insertSpaceAfterKeywordsInControlFlowStatements: true,
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
    semicolons: ts.SemicolonPreference.Insert,
  });
  for (const edit of edits.sort((a, b) => b.span.start - a.span.start)) {
    text = text.slice(0, edit.span.start) + edit.newText + text.slice(edit.span.start + edit.span.length);
  }
  text = text.replace(/\n[ \t]*\n(?=[ \t]*<\/)/g, '\n');
  fs.writeFileSync(file, text);
  service.dispose();
}
