# BUFF 考研 · 燕山大学电气与控制备考专区

蓝白学院风的机构宣传网站，纯 HTML / CSS / JavaScript，无需服务器、数据库、构建工具或付费依赖。托管在 GitHub Pages。

- 网站：https://san780020-lab.github.io/buff-ysu/
- 本地目录：`[project directory]`
- 发布方式：`main` 分支的根目录。推送后 GitHub Pages 自动更新。

## 当前内容

包含首页、两个专业方向切换、初试路径、复试准备、课程筛选与详情、视频栏目、双品牌介绍、联系方式、移动端导航和 404 页面。

用户提供的两个 Logo 已加入网站，网页资源采用压缩后的版本。

首版的课程名称及介绍为**栏目规划**；没有虚构师资、录取数据、学员评价、开课时间、价格、平台账号或咨询方式。学校相关内容仅描述备考目标，不表示与燕山大学存在官方合作。

## 后续如何更新

最常修改的文件：`assets/js/content.js`。

1. `subjects`：两个专业方向的简介。
2. `courses`：课程名称、适合人群、阶段和介绍要点。`stage` 可用 `initial`（初试）或 `reexam`（复试）；可选 `subject` 为 `electrical`、`control` 或 `all`。
3. `videos`：填写真实视频标题和完整 `https://` 链接。`platform` 用 `bilibili` 或 `douyin`；留空 `url` 展示“视频待上线”。首版采用新标签页打开视频，日后可添加 B 站官方嵌入播放器。
4. `contact`：微信、QQ群、邮箱、B 站主页、抖音主页。留空会保留待更新提示，不会产生失效按钮。二维码图片放在 `assets/images/`，然后填写 `qrImage`。

首页文案与栏目布局修改 `index.html`；配色与排版修改 `assets/css/style.css`；交互修改 `assets/js/main.js`。

在 GitHub 网页编辑文件并提交，或本地提交后推送：

```powershell
git add index.html assets README.md 404.html
git commit -m "Update website content"
git push origin main
```

每次提交均保留历史，后续可按提交恢复。

## 本地预览

在网站目录运行：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

浏览器打开 `http://127.0.0.1:4173`。结束预览按 `Ctrl+C`。

## 发布与网址

GitHub 仓库的 Settings → Pages → Build and deployment：选择 **Deploy from a branch**，分支 **main**，目录 **/(root)**。

`.nojekyll` 让静态资源原样发布。图片、样式和脚本使用相对路径，兼容 `/buff-ysu/` 项目路径。

网站标题和品牌文案可单独修改。若改仓库名或绑定域名，同时更新本 README 的网址及 `404.html` 的首页地址。机构宣传图片与文字的权利仍归各自权利人所有。
