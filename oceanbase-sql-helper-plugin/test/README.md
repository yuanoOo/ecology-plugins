# 测试目录说明

这个目录包含了 OceanBase SQL Keywords Helper 插件的测试文件。

## 文件结构

```text
test/
├── README.md                    # 本说明文件
├── simple-test.ts              # 简单功能测试
├── run-simple-test.js          # 简单测试运行脚本
├── extension.test.ts           # 单元测试（使用 Mocha）
├── runTest.ts                  # 测试运行器
├── test-multi-keywords.sql     # 插件开发和功能验证用的 SQL 语句样例，适合手动测试多词关键词识别、跳转、悬停等功能
└── suite/
    └── index.ts                # 测试套件入口
```

## 测试类型

### 1. 简单功能测试 (`simple-test.ts`)

**用途**：验证插件的基本功能逻辑
**运行方式**：`npm run test:simple`

**测试内容**：

- 关键词匹配功能
- 关键词数据结构验证
- 多词关键词支持
- 大小写不敏感匹配
- URL 和描述格式验证

### 2. 单元测试 (`extension.test.ts`)

**用途**：使用 Mocha 框架的完整单元测试
**运行方式**：`npm test`

**测试内容**：

- 插件功能模块测试
- VSCode API 集成测试
- 错误处理测试

## 运行测试

### 运行简单测试

```bash
npm run test:simple
```

### 运行完整测试套件

```bash
npm test
```

### 手动运行简单测试

```bash
npm run compile
node ./out/test/run-simple-test.js
```

## 测试覆盖范围

### ✅ 已测试功能

- 关键词数据结构验证
- 单个关键词匹配
- 多词关键词匹配
- 大小写不敏感处理
- URL 格式验证
- 描述格式验证

### 🔄 待测试功能

- VSCode 扩展激活
- HoverProvider 功能
- CodeLens 功能
- 双击跳转功能
- 配置文件热加载
- 错误处理机制

## 添加新测试

### 添加简单测试

在 `simple-test.ts` 中添加新的测试函数：

```typescript
export function testNewFeature() {
  console.log('开始测试新功能...');
  // 测试逻辑
  console.log('✅ 新功能测试通过');
}
```

### 添加单元测试

在 `extension.test.ts` 中添加新的测试用例：

```typescript
test('新功能测试', () => {
  // 测试逻辑
  assert.strictEqual(actual, expected);
});
```

## 测试最佳实践

1. **测试覆盖**：确保每个新功能都有对应的测试
2. **边界情况**：测试异常情况和边界条件
3. **数据验证**：验证输入数据的格式和有效性
4. **错误处理**：测试错误情况的处理逻辑
5. **性能考虑**：测试大量数据时的性能表现

## 故障排除

### 测试失败

1. 检查 TypeScript 编译是否成功
2. 确认测试数据格式正确
3. 查看控制台错误信息

### 依赖问题

1. 运行 `npm install` 安装依赖
2. 确认 `@types/mocha` 和 `@vscode/test-electron` 已安装
3. 检查 `tsconfig.json` 中的类型配置
