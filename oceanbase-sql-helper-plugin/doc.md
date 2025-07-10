# OceanBase SQL Keywords Documentation Helper 插件使用说明

<main id="notice" type="notice">
<h4>注意</h4>
<p>本插件仅支持 <strong>VSCode 1.101.0 及以上版本</strong>。请确保您的 VSCode 已升级到 2025 年 5 月或更高版本，否则无法安装和使用本插件。</p>
</main>

## 安装与启动

1. 从 VSCode 插件市场安装本插件，或克隆/下载本插件源码到本地进行开发。
2. 如需本地开发，进入插件目录运行 `npm install` 安装依赖。
3. 运行 `npx tsc` 编译 TypeScript 源码。
4. 在 VSCode 中选择“运行和调试”，点击“Run Extension”或按 F5 启动调试。
5. 在新打开的 Extension Host 窗口中，打开任意文件夹并新建或打开 `.sql` 文件。

## 基本功能

- **关键词识别与跳转**：
  - 在 SQL 文件中双击关键词（如 `SELECT`、`INSERT`），自动跳转到配置的文档页面。
- **悬停提示**：
  - 鼠标悬停在 SQL 关键词上时，弹出气泡显示关键词说明。
- **CodeLens 跳转**：
  - 关键词上方会显示“📖 查看文档”链接，点击可直接跳转到官方文档。
- **热加载支持**（仅源码开发者）：
  - 修改 `keywords.json` 后，无需重启插件，配置会自动生效。

## 关键词自定义说明

<main id="notice" type="notice">
<h4>注意</h4>
<p>普通用户通过插件市场安装后，<strong>无法直接自定义关键词</strong>。如需自定义关键词或文档链接，请下载插件源码并本地开发。</p>
</main>

### 源码用户自定义方法

1. 打开 `resources/keywords.json` 文件。
2. 按如下格式添加或修改关键词：

   ```json
   {
     "SELECT": {
       "description": "用于从数据库中查询数据",
       "url": "https://docs.oceanbase.com/zh-cn/sql-reference/SELECT"
     },
     "MYKEYWORD": {
       "description": "自定义关键词说明",
       "url": "https://example.com/mykeyword-doc"
     }
   }
   ```

3. 保存后，插件会自动加载新配置（无需重启）。

## 常见问题

- **插件无效或报错**：
  - 请确保在 Extension Host 窗口中已打开文件夹，并且 `package.json` 的 `main` 字段指向 `./src/extension.js`。
  - 检查 `keywords.json` 是否为合法 JSON 格式（仅源码开发者）。
- **关键词无跳转或无提示**：
  - 请确认关键词已正确添加到 `keywords.json`，并在 SQL 文件中双击或悬停测试（仅源码开发者）。
- **调试日志查看**：
  - 在主窗口“调试控制台”或“输出”面板选择“Extension Host”查看插件日志。

## 贡献与反馈

如需反馈问题或贡献代码，请通过 GitHub 提交 Issue 或 Pull Request。

---

<main id="notice" type="explain">
  <h4>说明</h4>
  <p>本插件支持自定义扩展，但仅限源码开发者。适合团队和个人维护专属 SQL 关键词文档体系。</p>
</main>
