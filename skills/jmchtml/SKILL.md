---
name: "jmchtml"
description: "JMC书页式HTML演示文稿设计系统。覆盖色调、右上角冠名 Logo、Logo 点击全屏切换、顶部悬浮目录和底部导航条。当用户要创建带封面感、多页演示或复刻此类书页式 PPT 的 HTML 页面/幻灯片时使用。"
license: "MIT"
metadata:
  version: "1.0.0"
  author: "pherehouse"
  homepage: "https://github.com/pherehouse/jmchtml"
---

# JMC 书页式 HTML 演示文稿设计系统

沉淀自范例 `jmc-ai-matrix-standalone.html` 的视觉语言与交互骨架。目标是让任意 HTML 演示（PPT / 幻灯片 / 数据汇报页）在保留"书页质感"的前提下，具备一致的企业冠名、目录导航与底部翻页体验。

适用：全屏多页演示（`.deck` 每页一屏）、竖屏滚动汇报页、或复刻同类视觉的作品。

## 一、整体骨架

页面以 `.deck` 为容器（`width/height: 100vw/100vh; overflow:hidden`），内部为绝对定位的 `.slide` 页面。常驻 chrome 包括：右上角 Logo（CSS 伪元素呈现，另设透明按钮承载全屏交互）、顶部悬浮目录（`.toc`）、底部圆点导航（`.dot-nav`）及页码/进度条。这样内容页只写业务内容，导航不污染业务结构。

### 页面结构（强制约定）

一套标准的演示由**三种角色**的 `.slide` 按固定顺序组成，任何演示都必须遵守：

1. **第 1 页 = 封面页**（`.cover`，深色渐变 + 大标题）：承载标题、副标题、一组关键标签。不放业务正文、不放总结。
2. **中间若干页 = 内容页**（普通 `.slide`）：承载全部业务内容。页数自由（无上限），但**至少需要有 1 页内容**，否则目录无内容。
3. **最后一页 = 结束页**（`.cover` style，`data-title="结束"`）：用于收尾致谢或 Slogan。**绝不含具体业务内容 / 表格 / 对比图**，只放一句收尾文案 + 落款或行动号召。

> ⚠️ 关键规则：**末页必须是结束页，不是内容页、也不是"总结"页。** 需要总结、对比、结论时，安排到最后一页内容页（倒数第 2 页）中完成；末页只做视觉收尾。业务内容永远不许落在最后一页。

示例页序：`封面 → 内容1 → 内容2 … → 结束`（中间内容数 ≥1）。目录仅索引中间内容页，封面与结束页均不入目录（见第四节）。

## 二、色调（Design Tokens）

统一通过 `:root` CSS 变量控制，换主题只需覆盖变量、无需改动组件。核心六组：

### 1. 背景与表面
```css
--bg: #ffffff;            /* 主背景 */
--bg-soft: #f7f7f8;       /* 次级背景 */
--surface: #ffffff;       /* 卡片表面 */
--surface-2: #f2f2f4;     /* 卡片次级面 */
```

### 2. 文字层级
```css
--text-1: #111216;        /* 主标题 */
--text-2: #55596a;        /* 正文/次级 */
--text-3: #8a8f9e;        /* 弱提示/眉标 */
```

### 3. 强调色（品牌主色 + 双辅色 + 状态色）
```css
--accent: #0A79C3;        /* 主强调：蓝青（滑块同族、略亮保可见），激活态/KPI/进度条 */
--accent-2: #036AA2;      /* 强调基准：深蓝青 rgb(3,106,162)，导航激活滑块 */
--accent-3: #0FA3B1;      /* 辅强调2：青（同族点缀），呼应滑块 */
--good: #1aaf6c; --warn: #f5a524; --bad: #e0445a;  /* 成功/警示/错误 */
```

### 4. 渐变与玻璃
```css
/* 主渐变：用于渐变文字 gradient-text 与高亮背景 */
--grad: linear-gradient(135deg,#0A79C3,#036AA2 55%,#0FA3B1);
/* 柔和渐变：雾面底（蓝青浅调，配合整体系列） */
--grad-soft: linear-gradient(135deg,#e3f2fb,#e6f5f6 55%,#dff3f6);
/* 玻璃毛玻璃：白 55% + blur 14px，用于目录/悬浮层 */
```

### 5. 圆角、阴影、动效
```css
--radius: 18px; --radius-sm: 12px; --radius-lg: 26px;
--shadow: 0 10px 30px rgba(18,24,40,.08), 0 2px 6px rgba(18,24,40,.04);
--shadow-lg: 0 24px 60px rgba(18,24,40,.14), 0 6px 16px rgba(18,24,40,.06);
--ease: cubic-bezier(.4,0,.2,1);   /* 统一缓动 */
```

### 6. 字体
```css
--font-sans: 'Inter','Noto Sans SC',-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif;
--font-serif: 'Playfair Display','Noto Serif SC',Georgia,serif;
--font-mono: 'JetBrains Mono','IBM Plex Mono',SFMono-Regular,Menlo,monospace;
--letter-tight:-.03em; --letter-normal:-.01em;   /* 标题收紧字距 */
```

### 配色使用纪律
- 渐变文字仅用于重点标题/封面大词，用 `.gradient-text`（`background-clip:text; -webkit-text-fill-color:transparent`）。
- 激活态一律用蓝青渐变底 + 主强调文字：`linear-gradient(135deg,rgba(3,106,162,.14),rgba(15,163,177,.14))`。
- 弱色（`text-3`）/宽字距（`letter-spacing:.12em~.16em`）+ 大写，用于眉标 eyebrow 、小标签、TABLE 表头。

## 三、右上角 冠名 LOGO

固定于每页右上角，用伪元素实现（不占 DOM、不干扰内容、绝对定位不滚动）。

```css
/* ======== 江铃（JMC）公司 Logo，固定于每页右上角 ======== */
.deck::after{
  content:'';
  position:absolute;top:34px;right:44px;z-index:15;
  width:150px;height:auto;aspect-ratio:288/52;
  background:url('./assets/jmc-ford-logo.png') no-repeat center/contain;
  pointer-events:none;
}
```
要点：`aspect-ratio` 保持源图比例；尺寸默认约 150px 宽；`pointer-events:none` 避免遮挡点击。Logo 仅嵌在 `.deck::after`，故封面到末页全程固定。

仓库内置透明 PNG 资产 [`assets/jmc-ford-logo.png`](assets/jmc-ford-logo.png)，用于离线生成。交付单文件 HTML 时，将该图片转为 Data URL 后内嵌；交付目录型 HTML 时，可复制到输出目录并使用相对路径。不要依赖个人图床或临时 URL。用户未要求 JMC 品牌时，应先询问是否保留默认 Logo，或替换为用户提供的品牌素材。

### Logo 点击全屏暗门（标准交互）

Logo 保持伪元素呈现，在其上方增加透明按钮作为点击层。第一次点击进入全屏，再次点击退出全屏；视觉上不增加按钮或提示文案。

```html
<body>
  <button class="logo-fullscreen-toggle" type="button" aria-label="切换全屏播放"></button>
  <div class="deck">…</div>
</body>
```

```css
.logo-fullscreen-toggle{
  position:fixed;top:28px;right:38px;z-index:60;
  width:162px;height:64px;padding:0;border:0;border-radius:8px;
  background:transparent;cursor:pointer;
  -webkit-tap-highlight-color:transparent;
}
.logo-fullscreen-toggle:focus,
.logo-fullscreen-toggle:focus-visible{
  outline:none !important;box-shadow:none !important;
}
```

点击层应略大于 Logo，确保完整覆盖；`.deck::after` 继续保留 `pointer-events:none`。按钮必须有 `aria-label`，但不显示浏览器焦点框；点击后立即释放焦点，避免蓝色描边残留。

```js
var wasScrollModeBeforeFullscreen = false;

function fullscreen(){
  if(!document.fullscreenElement){
    wasScrollModeBeforeFullscreen = typeof scrollMode!=='undefined' && !!scrollMode;
    if(wasScrollModeBeforeFullscreen && typeof exitScrollMode==='function') exitScrollMode();
    document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
  }else{
    document.exitFullscreen && document.exitFullscreen();
  }
}

document.addEventListener('fullscreenchange',function(){
  if(!document.fullscreenElement && wasScrollModeBeforeFullscreen && typeof enterScrollMode==='function'){
    wasScrollModeBeforeFullscreen = false;
    enterScrollMode();
  }
});

var logoFullscreenToggle=document.querySelector('.logo-fullscreen-toggle');
if(logoFullscreenToggle){
  logoFullscreenToggle.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.blur();
    fullscreen();
  });
}
```

交互规则：

- Logo 点击和键盘 `F` 必须共用同一个 `fullscreen()` 函数。
- 进入全屏前如处于滚动模式，先记录状态并切回单页；退出全屏后恢复滚动模式。
- Logo 点击必须阻止事件冒泡；全局点击翻页逻辑也必须排除 `button` 或 `.logo-fullscreen-toggle`，避免误触翻页。
- 页面不支持 Fullscreen API 时保持静默，不影响其他导航交互。

## 四、顶部 悬浮目录（CONTENTS）

- 定位：`position:fixed; top:30px; left:96px; z-index:50`，随 `.is-visible` 淡入淡出。
- 结构：圆角胶囊条 `border-radius:999px`，内含 `CONTENTS` 标签 + 若干 `toc-item` 分段按钮。
- 材质：玻璃毛玻璃 `background:rgba(255,255,255,.55); backdrop-filter:blur(14px)`，细描边 `border:1px solid rgba(120,130,180,.12)` + 上高光 `inset box-shadow`。

```css
.toc{padding:4px 6px;gap:2px;background:rgba(255,255,255,.55);
  backdrop-filter:blur(14px);border:1px solid rgba(3,106,162,.16);
  border-radius:999px;
  box-shadow:0 1px 0 rgba(255,255,255,.6) inset,0 2px 8px rgba(24,34,70,.05),0 8px 20px rgba(24,34,70,.06);
  opacity:0;transition:opacity .35s var(--ease)}
.toc.is-visible{opacity:1}
```
- 分段按钮 `.toc-item`：`padding:6px 11px;border-radius:999px`，字号 11px。hover 用淡蓝青底 `rgba(3,106,162,.10)`；`.is-active` 用 `color:var(--accent);font-weight:600` + 蓝青渐变底。
- 序号 `.toc-number`：mono 字体，10px，弱透明（`.45`，激活时 `.8`），如 `01`。
- 交互规则（JS）：**首页为封面、末页为结束**，两者都不放入目录、也不显示目录条；仅中间内容页进入目录并随切换同步高亮 `.is-active`。

## 五、底部 导航条（圆点 + 页码 + 进度条）

三件套，均在 `.deck` 内部或页面底部，互不遮挡。

### 1. 圆点导航 `.dot-nav`
```js
position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
display:flex;gap:8px;z-index:30;align-items:center;
```
- 未激活点：`10×10px;border-radius:50%;background:rgba(100,116,139,.35)`。
- 激活点（胶囊高亮）：`width:28px;border-radius:5px;background:var(--accent-2, #036AA2)`，过渡 `transition:all .35s cubic-bezier(.4,0,.2,1)`。
- 用 `MutationObserver` 监听 slide 的 `class` 变化实时同步。

### 2. 页码 `.deck-footer`
```css
.deck-footer{position:absolute;bottom:24px;left:40px;right:40px;
  display:flex;justify-content:space-between;font-size:12px;color:var(--text-3);
  z-index:10;pointer-events:none}
.slide-number::before{content:attr(data-current)}
.slide-number::after{content:" / " attr(data-total)}
```
每页放 `<div class="deck-footer"><span class="slide-number" data-current="N" data-total="T"></span></div>`。

### 3. 底部进度条 `.progress-bar`
```css
.progress-bar{position:fixed;left:0;right:0;bottom:0;height:3px;z-index:20;background:transparent}
.progress-bar > span{display:block;height:100%;width:0;background:var(--accent)}
```
宽度随进度 update（`transition:width .3s var(--ease)`）。

### 辅助翻页（建议一并提供）
- 点按左 40% / 右 60% 区间翻页（需 `e.stopPropagation()` 排除按钮/目录/导航区）。
- 方向键 `←/→ / . / 空格 / PgUp / PgDn / Home / End`。
- 深色封面页时，3px 圆点与页码建议改浅色（覆盖色用 `rgba(255,255,255,.xx)` 或移入 cover 专用样式）。

## 六、开始使用（最小模板）

写新演示时，结构即：`<div class="deck">` 内多个 `<section class="slide" data-title="标题">标题+内容</section>`，最后引一段"运行时脚本"，Drain 由脚本自动生成 toc / dot-nav / 键盘与点击翻页。

复制这段骨架后，改三处即可复用：`:root` 主色（换品牌色）、`.deck::after` 的 logo 图、`.slide` 内业务内容。

```html
<button class="logo-fullscreen-toggle" type="button" aria-label="切换全屏播放"></button>
<div class="deck">
  <section class="slide cover" data-title="封面">… 标题 + 副标题 + 标签 …</section>
  <section class="slide" data-title="第一章">… 业务内容 …</section>
  <section class="slide" data-title="第N章">… 业务内容（含总结/结论则放这里）…</section>
  <section class="slide cover" data-title="结束">… 收尾致谢 / Slogan（无业务内容）…</section>
</div>
<script>
  // —— 运行时：生成 dot-nav、toc、页码、进度、键盘/点击翻页及 Logo 全屏切换 ——
  var slides=[].slice.call(document.querySelectorAll('.deck .slide'));
  var idx=0, total=slides.length;
  function setActive(n){idx=(n+total)%total;slides.forEach((s,i)=>s.classList.toggle('is-active',i===idx));
    document.querySelector('.progress-bar>span')&&(document.querySelector('.progress-bar>span').style.width=((idx+1)/total*100)+'%');
    slides[idx].querySelectorAll('.slide-number').forEach(el=>el.dataset.current=idx+1);}
  /* dot-nav、toc、键盘/点击翻页：参见第四、五节；Logo 全屏切换：参见第三节 */
</script>
```

## 七、Obsidian 内置查看兼容

若页面需要在 Obsidian 的 HTML Reader / `obsidian-html-plugin` 中打开，插件会以 `iframe.srcdoc` 渲染，页面地址为 `about:srcdoc`。不要让 URL hash 更新失败中断演示初始化；否则后续动态创建的顶部目录和底部圆点导航会缺失。

将 hash 写入历史的代码包在 `try/catch` 中，保留浏览器直接打开时的深链能力，并在 `srcdoc` 中安全降级：

```js
const hashTarget = '#/' + (n + 1);
if (location.hash !== hashTarget && !isPresenterWindow) {
  try {
    history.replaceState(null, '', hashTarget);
  } catch (e) {
    // Obsidian iframe.srcdoc：忽略地址栏 hash 更新
  }
}
```

生成或修改演示后，至少在外置浏览器和 Obsidian 内置阅读器各验证一次：控制台无异常，顶部目录与底部圆点均已生成；封面页按既定交互规则可以隐藏目录。

## 八、检查清单（落盘前自查）

- [ ] 结构合规：第 1 页是封面页 `.cover`，最后一页是结束页 `.cover`（`data-title="结束"`），两者不含业务内容
- [ ] 内容均落在中间内容页；总结/对比/结论放在最后一页内容页（倒数第 2 页），不占末页
- [ ] 主题色集中在 `:root` 变量，组件不写死颜色
- [ ] `.deck::after` 用于 logo，覆盖文档/深色封面时有一套浅色样式
- [ ] Logo 上方有透明 `.logo-fullscreen-toggle` 点击层，视觉不变，按钮有 `aria-label` 且不显示焦点框
- [ ] 点击 Logo 可进入/退出全屏；退出后按进入前状态恢复滚动或单页模式
- [ ] Logo 点击不会触发翻页，键盘 `F` 与 Logo 共用同一个全屏函数
- [ ] `.toc` 玻璃毛玻璃、胶囊圆角，封面与结束页隐藏
- [ ] `.dot-nav` 激活点胶囊化（宽 28px、accent-2），非激活圆点 10px
- [ ] `.progress-bar` 3px 置于底部，随进度 update
- [ ] 键盘 + 左右点击翻页可用，按钮/导航区不误触
- [ ] Obsidian HTML Reader 内打开时，`history.replaceState` 等地址栏更新不会中断初始化；顶部目录和底部圆点导航均存在
- [ ] 打印样式 `@media print` 下隐藏 chrome（header/footer/progress/toc/dot/logo-fullscreen-toggle）
