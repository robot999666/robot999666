import { chromium } from 'playwright';
import { readFile,mkdir,copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
const root=process.cwd();
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
try {
 const page=await browser.newPage({viewport:{width:1120,height:400},deviceScaleFactor:1});
 for (const theme of ['dark','light']) {
  const dir=resolve(root,'output',`frames-${theme}`);await mkdir(dir,{recursive:true});
  const svg=await readFile(resolve(root,'assets',`window-garden-${theme}.svg`),'utf8');
  await page.setViewportSize({width:1120,height:400});await page.setContent(`<style>html,body{margin:0}svg{display:block}</style>${svg}`);
  await page.evaluate(async()=>{await document.fonts.ready;document.querySelector('svg').pauseAnimations();});
  for(let i=0;i<80;i++) {await page.evaluate(time=>document.querySelector('svg').setCurrentTime(time),i/10);await page.screenshot({path:resolve(dir,`${String(i).padStart(3,'0')}.png`)});}
  await copyFile(resolve(dir,'000.png'),resolve(root,'assets',`window-garden-${theme}-still.png`));
  await page.setViewportSize({width:560,height:116});const cta=await readFile(resolve(root,'assets',`blog-entry-${theme}.svg`),'utf8');await page.setContent(`<style>html,body{margin:0}svg{display:block}</style>${cta}`);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:resolve(root,'assets',`blog-entry-${theme}.png`)});
 }
} finally {await browser.close();}
const result=spawnSync(process.env.PYTHON_BINARY||(process.platform==='win32'?'python':'python3'),[resolve(root,'scripts','encode-theme-gifs.py')],{stdio:'inherit'});
if(result.error)throw result.error;if(result.status!==0)throw Error('GIF encoding failed');
