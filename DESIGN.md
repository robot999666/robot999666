# 个人首页设计与维护

此公开仓库与 GitHub 用户名一致，根目录 README.md 会展示在 robot999666 的个人首页。README 的标题、简介、项目说明和链接可直接修改。

## 动画与入口

- assets/window-garden.gif：原生 GIF 循环动画，作为个人首页横幅。
- assets/window-garden.svg：原创可编辑的矢量动画源。
- assets/window-garden-still.png：减少动态效果时的静态替代；SVG 版本也保留在 assets/。
- assets/blog-entry.png：博客入口按钮；SVG 矢量源可编辑。链接由 README 外层锚点设置。

资产都由本仓库托管，不依赖外部打字或统计卡服务。图片内没有脚本；相对资源链接会由 GitHub 渲染为仓库图片。

## 重新生成

需要 Node.js 22 或更新版本、Playwright、Python 与 Pillow。Python 可用 PYTHON_BINARY 环境变量指定。

```sh
npm ci
npx playwright install chromium
python -m pip install -r requirements.txt
npm run assets
```

生成后的图片需要随 README 一起提交。临时帧与检查文件放在 output/，不会进入版本库。中文横幅生成需要系统中的中文字库，例如微软雅黑或 Noto Sans CJK。

如使用已安装的 Chrome / Edge，可设置 PLAYWRIGHT_CHANNEL 为 chrome / msedge。PYTHON_BINARY 用来选择 Python 解释器，PLAYWRIGHT_MODULE 可选择既有 Playwright 包。

## 内容来源

个人简介来自 https://github.com/robot999666 的公开 bio；项目说明来自 README 所链接的公开仓库。没有使用私有仓库内容，没有虚构个人成绩或技术熟练度。

博客：http://152.136.191.171:8088/

设计参考：Anurag Hazra 的品牌横幅与内容层级、DenverCoder1 的动效与项目展示、Anthony Fu 的简洁入口。代码、图像与文案均独立实现。

GitHub 官方规则：https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme

MIT License。字体使用浏览器系统字体栈，不包含额外字体文件。
