# Skill Library

纯静态、无依赖的个人 Skill 看板。`skills.json` 保存分类和条目；`index.html`、`style.css`、`app.js` 负责页面与渲染。手机端可浏览，维护数据建议使用 Mac。

## 本地预览

页面通过 `fetch()` 读取 JSON，需从本地 HTTP 服务打开，不能直接双击 `index.html`。

```sh
python3 -m http.server 8000
```

浏览器打开 <http://localhost:8000>。按 `Ctrl+C` 停止预览。

## 更新技能

只编辑 `skills.json`。把新技能加入对应分类的 `skills` 数组：

```json
{
  "name": "skill-name",
  "url": "https://github.com/owner/repository"
}
```

只有确认过的 GitHub 仓库才填写 `url`；未知来源使用 `null`，网页会显示“仓库待核实”且不生成外链。名称、分类顺序由 `categories` 数组决定。保存后刷新预览即可。

## GitHub Pages

仓库已包含 `.github/workflows/pages.yml`。把项目推送到 GitHub 仓库的 `main` 分支后，在仓库 **Settings → Pages → Build and deployment** 将 Source 设为 **GitHub Actions**。之后每次推送到 `main` 都会自动部署；也可在 Actions 页面手动运行工作流。

项目仓库如果设为公开，网页和 `skills.json` 也会公开。发布前请核对要展示的技能名称与来源，并检查仓库文件中没有本地路径、密钥或私人配置。

## 数据来源说明

初始清单来自当前可读取的本地 Skill 文件名与说明。仅在安装目录的 Git `origin` 或 Skill 文件中找到明确 GitHub 来源时填写仓库链接；其余条目保留名称并等待核实。`xiaohongshu-mcp` 在已检查的 Skill 目录中未检出，故未作为已安装项目列入。
