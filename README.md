# BUFF 考研 · 燕山大学电气与控制备考专区

以深灰黑色为主、结合大幅展示与网格的机构宣传网站，纯 HTML / CSS / JavaScript，无需服务器、数据库、构建工具或付费依赖。托管在 GitHub Pages。

- 网站：https://san780020-lab.github.io/buff-ysu/
- 本地目录：`[project directory]`
- 发布方式：`main` 分支的根目录。推送后 GitHub Pages 自动更新。

## 当前内容

包含首页、两个专业方向切换、初试路径、复试准备、课程筛选与详情、价格及服务范围、海报分类与放大浏览、PDF 下载、视频栏目、双品牌介绍、QQ 咨询与复制号码、移动端导航和 404 页面。

用户提供的两个 Logo 已加入网站，网页资源采用压缩后的版本。

2027 课程内容根据机构提供的八张海报和两份介绍 PDF 整理。机构已确认：**B 班含专业课答疑，不含数学答疑**。全程班、强化冲刺班、独立冲刺班、资料答疑班和八套卷分别展示价格，不混用不同班型报价。复试与实际视频链接仍待补充。

海报保留完整内容和原始分辨率，以无损 WebP 提供大图，并使用缩略图延迟加载。PDF 公开版选取课程与资料说明页，不包含成绩截图和聊天截图：

- `assets/documents/buff-ysu-sprint-introduction.pdf`：原冲刺班 PDF 第 1、5、6、7、9、10、13 页。
- `assets/documents/buff-ysu-courses-and-qa.pdf`：原课程及答疑班 PDF 第 4、5、7、9、11、14 页。

海报中的文字按原件保留；网页的 B 班说明采用机构确认的最新口径。原海报中的历史成绩属于原海报内容，网站不另外生成统计或录取承诺。学校相关内容仅描述备考目标，不表示与燕山大学存在官方合作。

## 后续如何更新

最常修改的文件：`assets/js/content.js`。

1. `subjects`：两个专业方向的简介。
2. `courses`：课程名称、适合人群、阶段、课时、资料、服务和价格。`previewTopics` 用于首页卡片，`topics` 用于详情；`pricing` 为各班型价格。`stage` 可用 `initial`（初试）或 `reexam`（复试），`subject` 用 `electrical`、`control` 或 `all`。`poster` 对应海报 ID，`document` 为站内 PDF 路径。
3. `videos`：填写真实视频标题和完整 `https://` 链接。`platform` 用 `bilibili` 或 `douyin`；留空 `url` 展示“视频待上线”。首版采用新标签页打开视频，日后可添加 B 站官方嵌入播放器。
4. `contact`：`people` 列表维护咨询人、角色和 QQ；`qqGroup` 为交流群。还支持公众号、微信、邮箱、B 站和抖音主页。不要填写未公开的私人联系方式。
5. `posters`：维护海报标题、分类、缩略图、原尺寸大图和宽高。图片存放在 `assets/posters/`。
6. `dailyQuestions`：公开题目列表，包含 `id`、`date`、`subject`、`title`、`question`、`image`、`knowledgePoint`、`bilibili`、`douyin`。有多道题时可选择往期题目。答案不应通过隐藏按钮放在公开仓库中；目前只提供跳转到平台观看讲解的入口，没有关注验证。
7. `documents`：维护 PDF 标题、简介、页数、大小与原件选页范围，文件存放在 `assets/documents/`。

首页文案与栏目布局修改 `index.html`；配色与排版修改 `assets/css/design.css`，手机适配修改 `assets/css/responsive.css`，控制原理展示样式修改 `assets/css/control.css`；交互修改 `assets/js/main.js`。`index.html` 中的样式和脚本 URL 带版本参数；更新后可同步递增以刷新缓存。

标签页图标采用蓝底白色 BUFF 标识，提供 SVG、16–256 像素 ICO、PNG 和 Apple 收藏图标。更新图标时同步修改链接的版本参数，减少浏览器缓存旧图标的情况。

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

## 新版展示与交互

顶部导航支持桌面悬停、键盘展开和手机点击展开。首页采用深色展示与两列网格，图片区完整保留机构品牌。公开课链接和每日一题可通过内容文件持续添加。

控制原理模块是数学示意：前向通道 `4K/[s(s+2)]`，单位负反馈，闭环 `4K/(s^2+2s+4K)`。增益滑块范围 0.3–3，联动单位阶跃响应和根轨迹上的闭环极点，属于教学展示，不是模型实测数据。

联系区仅保留桑桑哥与考研交流群；源海报和 PDF 选页中的机构原件内容未改写。
