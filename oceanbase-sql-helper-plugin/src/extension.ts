import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let keywordsMap: Record<string, { description: string; url: string }> = {};

function loadKeywords(context: vscode.ExtensionContext) {
  const keywordsPath = path.join(context.extensionPath, 'resources', 'keywords.json');
  if (fs.existsSync(keywordsPath)) {
    const content = fs.readFileSync(keywordsPath, 'utf-8');
    try {
      keywordsMap = JSON.parse(content);
    } catch (e) {
      keywordsMap = {};
    }
  }
}

// 获取指定位置的关键词（支持多词）
function getKeywordAtPosition(document: vscode.TextDocument, position: vscode.Position): string | null {
  const line = document.lineAt(position.line).text;
  const lineStart = document.lineAt(position.line).range.start;
  const offset = position.character;
  
  // 获取当前行的所有关键词匹配
  const keywords = Object.keys(keywordsMap);
  let bestMatch: string | null = null;
  let bestMatchLength = 0;
  
  for (const keyword of keywords) {
    const keywordUpper = keyword.toUpperCase();
    const regex = new RegExp(`\\b${keywordUpper.replace(/\s+/g, '\\s+')}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;
      
      // 检查光标是否在当前匹配范围内
      if (offset >= matchStart && offset <= matchEnd) {
        // 选择最长的匹配（优先匹配更长的关键词）
        if (match[0].length > bestMatchLength) {
          bestMatch = keyword;
          bestMatchLength = match[0].length;
        }
      }
    }
  }
  
  return bestMatch;
}

// 获取指定位置的关键词范围（支持多词）
function getKeywordRangeAtPosition(document: vscode.TextDocument, position: vscode.Position): vscode.Range | null {
  const line = document.lineAt(position.line).text;
  const lineStart = document.lineAt(position.line).range.start;
  const offset = position.character;
  
  // 获取当前行的所有关键词匹配
  const keywords = Object.keys(keywordsMap);
  let bestMatch: string | null = null;
  let bestMatchRange: vscode.Range | null = null;
  let bestMatchLength = 0;
  
  for (const keyword of keywords) {
    const keywordUpper = keyword.toUpperCase();
    const regex = new RegExp(`\\b${keywordUpper.replace(/\s+/g, '\\s+')}\\b`, 'gi');
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;
      
      // 检查光标是否在当前匹配范围内
      if (offset >= matchStart && offset <= matchEnd) {
        // 选择最长的匹配（优先匹配更长的关键词）
        if (match[0].length > bestMatchLength) {
          bestMatch = keyword;
          bestMatchLength = match[0].length;
          bestMatchRange = new vscode.Range(
            lineStart.translate(0, matchStart),
            lineStart.translate(0, matchEnd)
          );
        }
      }
    }
  }
  
  return bestMatchRange;
}

// 获取文档中所有关键词的位置
function getAllKeywordRanges(document: vscode.TextDocument): Array<{ range: vscode.Range; keyword: string }> {
  const results: Array<{ range: vscode.Range; keyword: string }> = [];
  const keywords = Object.keys(keywordsMap);
  
  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
    const line = document.lineAt(lineIndex).text;
    const lineStart = document.lineAt(lineIndex).range.start;
    
    for (const keyword of keywords) {
      const keywordUpper = keyword.toUpperCase();
      const regex = new RegExp(`\\b${keywordUpper.replace(/\s+/g, '\\s+')}\\b`, 'gi');
      let match;
      
      while ((match = regex.exec(line)) !== null) {
        const matchStart = match.index;
        const matchEnd = matchStart + match[0].length;
        
        const range = new vscode.Range(
          lineStart.translate(0, matchStart),
          lineStart.translate(0, matchEnd)
        );
        
        results.push({ range, keyword });
      }
    }
  }
  
  return results;
}

export function activate(context: vscode.ExtensionContext) {
  loadKeywords(context);

  // 注册命令：跳转到关键词文档
  const openDocCmd = vscode.commands.registerCommand('oceanbaseSqlKeywordsHelper.openDoc', (keyword: string) => {
    const info = keywordsMap[keyword.toUpperCase()];
    if (info && info.url) {
      vscode.env.openExternal(vscode.Uri.parse(info.url));
    } else {
      vscode.window.showInformationMessage(`未找到关键词 [${keyword}] 的文档链接。`);
    }
  });
  context.subscriptions.push(openDocCmd);

  // 注册 HoverProvider，实现悬停提示
  const hoverProvider = vscode.languages.registerHoverProvider('sql', {
    provideHover(document, position) {
      const keyword = getKeywordAtPosition(document, position);
      if (!keyword) return;
      
      const info = keywordsMap[keyword.toUpperCase()];
      if (info && info.description) {
        return new vscode.Hover(`**${keyword}**\n\n${info.description}`);
      }
      return;
    }
  });
  context.subscriptions.push(hoverProvider);

  // 注册 CodeLens 提供者，在关键词上方显示"查看文档"链接
  const codeLensProvider = vscode.languages.registerCodeLensProvider('sql', {
    provideCodeLenses(document) {
      const keywordRanges = getAllKeywordRanges(document);
      const codeLenses: vscode.CodeLens[] = [];
      
      for (const { range, keyword } of keywordRanges) {
        const info = keywordsMap[keyword.toUpperCase()];
        if (info && info.url) {
          const codeLens = new vscode.CodeLens(range, {
            title: '📖 查看文档',
            command: 'oceanbaseSqlKeywordsHelper.openDoc',
            arguments: [keyword]
          });
          codeLenses.push(codeLens);
        }
      }
      
      return codeLenses;
    }
  });
  context.subscriptions.push(codeLensProvider);

  // 监听 SQL 文件的鼠标双击事件
  const disposable = vscode.window.onDidChangeTextEditorSelection((e) => {
    const editor = e.textEditor;
    const doc = editor.document;
    if (doc.languageId !== 'sql') return;
    if (e.selections.length !== 1) return;
    const selection = e.selections[0];
    if (!selection.isEmpty) {
      const selectedText = doc.getText(selection);
      // 检查选中的文本是否匹配任何关键词
      const keywords = Object.keys(keywordsMap);
      for (const keyword of keywords) {
        if (selectedText.toUpperCase() === keyword.toUpperCase()) {
          vscode.commands.executeCommand('oceanbaseSqlKeywordsHelper.openDoc', keyword);
          return;
        }
      }
    }
  });
  context.subscriptions.push(disposable);

  // 监听 keywords.json 文件变化，自动热加载配置
  const keywordsWatcher = vscode.workspace.createFileSystemWatcher(
    new vscode.RelativePattern(
      path.join(context.extensionPath, 'resources'),
      'keywords.json'
    )
  );
  keywordsWatcher.onDidChange(() => {
    loadKeywords(context);
    console.log('keywords.json 已热加载');
  });
  keywordsWatcher.onDidCreate(() => {
    loadKeywords(context);
    console.log('keywords.json 已创建并加载');
  });
  keywordsWatcher.onDidDelete(() => {
    keywordsMap = {};
    console.log('keywords.json 已删除，关键词已清空');
  });
  context.subscriptions.push(keywordsWatcher);

  console.log('OceanBase SQL Keywords Documentation Helper 已激活');
}

export function deactivate() {} 