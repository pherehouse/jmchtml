# Contributing

感谢你帮助改进 `jmchtml`。

## 提交前

1. 先创建 Issue 说明问题、目标 Agent 和可复现步骤；小型文档修正可以直接提交 PR。
2. 修改应保持 Skill 聚焦于书页式 HTML 演示，不引入与演示生成无关的通用规则。
3. 新增兼容路径时，请附对应产品的官方文档链接。
4. 不要提交凭据、内部材料、未经授权的品牌资产或依赖个人账户的 URL。

## 本地检查

```bash
npm test
npm run pack:check
python3 /path/to/quick_validate.py skills/jmchtml
```

同时检查：封面与结束页不进入目录；末页不承载业务内容；Logo、目录、圆点导航、键盘翻页、全屏和打印样式可以共同工作。

## Pull Request

请说明：

- 改了什么以及为什么；
- 验证过哪些 Agent 或浏览器；
- 是否涉及品牌素材、安装路径或兼容性变化；
- 对应的截图、示例或官方文档链接（如适用）。
