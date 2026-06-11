 // 动态切换 highlight.js 代码高亮明暗样式
 export function setHighlightTheme(theme: 'light' | 'dark') {
  const linkId = 'hljs-theme'
  let link = document.getElementById(linkId) as HTMLLinkElement
  if (!link) {
    link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  const href = theme === 'light'
    ? 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css'
    : 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/atom-one-dark.min.css'
  link.href = href
} 


