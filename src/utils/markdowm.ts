// markdowm渲染
import marked from 'marked';  
import hljs from 'highlight.js'; 

// 转义 HTML 特殊字符，避免 XSS
function escapeHtml(str: string): string {
  return str.replace(/[&<>]/g, m => {
    if (m === '&') return '&amp;'
    if (m === '<') return '&lt;'  
    if (m === '>') return '&gt;'
    return m
  })
}
 
const renderer = new marked.Renderer()

// 自定义代码块
renderer.code = function (code: string, language: string) {
  const lang = language && hljs.getLanguage(language) ? language : 'plaintext';
  const codeId = `code-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    const highlighted = hljs.highlight(code, { language: lang }).value;
    return `
    <div class="code-block-wrapper" data-code-id="${codeId}">
      <div class="code-header">
        <span class="code-lang">${lang}</span>
        <button class="copy-code-btn van-button van-button--small van-button--primary" data-code="${escapeHtml(code)}">
          <span class="copy-txt">复制</span>
          <span class="success-icon van-icon van-icon-success" style="display:none;"></span>
        </button>
      </div>
      <pre><code class="hljs language-${lang}">${highlighted}</code></pre>
    </div>
    `;
  } catch (error) {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
};

marked.setOptions({
  renderer,
  gfm: true,          // 开启 GitHub 语法
  breaks:false,
  silent: true,       // 不报错
});

export const renderMarkdown = (content: string): string => {
  if (!content) return '';
  return marked.parse(content); 
};




