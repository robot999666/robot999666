import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile(new URL('../assets/window-garden.svg', import.meta.url), 'utf8');
const originalGarden = source.slice(source.indexOf('<g transform="translate(687'), source.lastIndexOf('</svg>')).trim();
const palettes = {
  dark: { bg:'#0d1117', card:'#151e29', line:'#334354', title:'#f0f6fc', text:'#d8e4ef', accent:'#8ff0c4', muted:'#a9c8c0' },
  light: { bg:'#f1f6f4', card:'#e5f0eb', line:'#bed2c6', title:'#152d29', text:'#254840', accent:'#14654e', muted:'#45645b' },
};
for (const [theme, c] of Object.entries(palettes)) {
  let garden=originalGarden.replace('translate(687 -6) scale(.83)', 'translate(705 35) scale(.82)')
    .replaceAll('1.8 321','9 321').replaceAll('-1.8 321','-9 321').replaceAll('-2 166','-8 166').replaceAll(';2 166',';8 166')
    .replaceAll('0 -4','0 -17').replaceAll('dur="8s"','dur="4s"');
  if (theme==='dark') {
    const map={'#EEEEDD':'#253e50','#F6EDD9':'#182c3d','#F1F1E5':'#182b35','#EACFAA':'#ffe4ac','#CED9C4':'#315b58','#B9CAB0':'#244443','#F9F8F0':'#658f87','#D7DACB':'#54756e','#D5D5C3':'#6b9284','#D6D8C9':'#688d7d','#DEE0D1':'#466659','#556C50':'#b7e4ae','#637653':'#b7e4ae','#6C8861':'#61bd88','#829A72':'#a4e3ae','#718961':'#69c894','#8CA37E':'#bdeca7','#6B835E':'#8fcf89','#92A57A':'#b1e5a9','#70875E':'#61bd88','#859B6F':'#8fcf89','#8A9D77':'#b1e5a9','#708761':'#66b886','#CCCDBD':'#dcffe9'};
    for (const [from,to] of Object.entries(map)) garden=garden.replaceAll(from,to);
  }
  const stars=Array.from({length:15},(_,i)=>`<circle cx="${710+(i*83)%385}" cy="${32+(i*47)%260}" r="${2+(i%3)}" fill="${c.accent}" opacity=".7"><animate attributeName="cy" values="${32+(i*47)%260};${8+(i*47)%260};${32+(i*47)%260}" dur="${3+i%3}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".2;1;.2" dur="${2+i%4}s" repeatCount="indefinite"/></circle>`).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="400" viewBox="0 0 1120 400" role="img" aria-labelledby="title desc">
<title id="title">robot999666 · 代码与窗边的光</title><desc id="desc">${theme==='dark'?'深色':'浅色'}高对比度横幅，流光、萤火与摇摆的植物，慢慢写代码，也慢慢记录生活。</desc>
<defs><linearGradient id="glow"><stop stop-color="${c.accent}" stop-opacity="0"/><stop offset=".5" stop-color="${c.accent}" stop-opacity=".7"/><stop offset="1" stop-color="${c.accent}" stop-opacity="0"/></linearGradient><clipPath id="typing"><rect x="58" y="285" width="440" height="38"><animate attributeName="width" values="0;440;440;0" keyTimes="0;.42;.88;1" dur="8s" repeatCount="indefinite"/></rect></clipPath></defs>
<rect width="1120" height="400" rx="24" fill="${c.bg}"/><rect x="1" y="1" width="1118" height="398" rx="24" fill="none" stroke="${c.line}" stroke-width="2"/>
<circle cx="907" cy="190" r="165" fill="${c.card}"/><path d="M657 25Q742 200 657 375" stroke="${c.line}" fill="none" opacity=".5"/>
<g font-family="'Microsoft YaHei','Noto Sans CJK SC',sans-serif"><rect x="58" y="40" width="260" height="34" rx="17" fill="${c.card}"/><circle cx="77" cy="57" r="5" fill="${c.accent}"><animate attributeName="opacity" values=".25;1;.25" dur="1.5s" repeatCount="indefinite"/></circle><text x="92" y="63" fill="${c.accent}" font-size="16" letter-spacing="2">CODE · LEARN · CREATE</text>
<text x="58" y="120" fill="${c.muted}" font-size="20">HELLO, I'M</text><text x="54" y="191" fill="${c.title}" font-size="70" font-weight="700" letter-spacing="-2">robot999666</text>
<text x="58" y="244" fill="${c.text}" font-size="27" font-weight="500">慢慢写代码，也慢慢记录生活。</text>
<g clip-path="url(#typing)"><text x="58" y="314" fill="${c.accent}" font-size="24" font-family="'Courier New',monospace">&gt; build. learn. share.</text></g>
<text x="58" y="366" fill="${c.muted}" font-size="19">首都师范大学 · 计算机科学与技术</text></g>
<rect x="58" y="330" width="460" height="3" rx="1.5" fill="${c.line}"/><rect y="330" width="95" height="3" rx="1.5" fill="url(#glow)"><animate attributeName="x" values="58;423;58" dur="3s" repeatCount="indefinite"/></rect>
${stars}<path d="M735 44l86 22" stroke="${c.accent}" stroke-width="2" opacity=".8"><animateTransform attributeName="transform" type="translate" values="-20 -10;120 80;-20 -10" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;.9;0" dur="4s" repeatCount="indefinite"/></path>${garden}</svg>`;
  await writeFile(new URL(`../assets/window-garden-${theme}.svg`,import.meta.url),svg);
  const cta=`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="116" viewBox="0 0 560 116"><rect x="1" y="1" width="558" height="114" rx="22" fill="${c.card}" stroke="${c.line}" stroke-width="2"/><circle cx="52" cy="58" r="27" fill="${c.bg}"/><path d="M40 70V48a12 12 0 0 1 24 0v22H40ZM52 37v33M40 54h24" fill="none" stroke="${c.accent}" stroke-width="2"/><g font-family="'Microsoft YaHei','Noto Sans CJK SC',sans-serif"><text x="99" y="53" fill="${c.title}" font-size="28" font-weight="600">打开窗边手记</text><text x="99" y="82" fill="${c.muted}" font-size="16" letter-spacing="1">BLOG · CODE &amp; CURIOSITY</text></g><path d="M490 58h28m-10-10 10 10-10 10" fill="none" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"/></svg>`;
  await writeFile(new URL(`../assets/blog-entry-${theme}.svg`,import.meta.url),cta);
}
console.log('Created high-contrast light/dark vectors with stronger motion.');
