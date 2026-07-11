# 隆诚装修过程真实记录

记录隆诚房屋从毛坯到入住的全过程，作为静态网站部署到腾讯云 EdgeOne。

## 本地预览

直接用浏览器打开 `index.html` 即可，无需构建。

## EdgeOne 部署

1. 把整个仓库推送到 GitHub / Gitee / GitLab
2. 在腾讯云 EdgeOne 控制台创建「静态网站」，绑定上述仓库
3. 构建设置保持默认（无需构建命令，无需输出目录，直接发布根目录）
4. 部署完成后通过 EdgeOne 提供的域名访问

## 目录结构

```
.
├── index.html      # 唯一的页面文件，包含全部内容与样式
└── README.md       # 本说明
```

## 添加真实照片

把照片放到 `photos/` 目录（如 `photos/dianqian.jpg`），然后把 `index.html` 里的 `<div class="photo-placeholder">...</div>` 替换为：

```html
<img src="photos/dianqian.jpg" alt="水电改造">
```