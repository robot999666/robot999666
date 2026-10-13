# 个人首页设计与维护

此公开仓库与 GitHub 用户名一致，根目录 README.md 会展示在 robot999666 的个人首页。README 的标题、简介、项目说明和链接可直接修改。

## 动画与入口

- assets/window-garden-dark.gif / window-garden-light.gif：80 帧、8 秒循环，根据 GitHub 的深浅主题选择。
- assets/window-garden-dark.svg / window-garden-light.svg：可编辑的高对比度矢量动画。
- assets/window-garden-dark-still.png / window-garden-light-still.png：减少动态效果时的主题对应静态替代。
- assets/blog-entry-dark.png / blog-entry-light.png：主题对应的博客入口按钮，矢量源也保留在 assets/。链接由 README 外层锚点设置。

新版增强了植物摇摆、流星、萤火与打字揭示动效，主标题和说明文字增大。使用 GitHub 原生的 gh-dark-mode-only / gh-light-mode-only 图片标记，跟随 GitHub 实际主题；减少动态效果仍使用 picture 的静态替代。原始 window-garden.svg 保留为花园插画基础源，由生成脚本组合新版主题素材。

GitHub 当前样式按链接 href 的末尾标记隐藏主题图片，因此每套图片使用独立的带主题标记锚点。博客链接的片段只参与 GitHub 显示过滤，不改变服务器请求或目标首页。

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
