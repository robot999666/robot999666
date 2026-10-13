from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
for theme in ('dark','light'):
    paths=sorted((ROOT/'output'/f'frames-{theme}').glob('*.png'))
    if len(paths)!=80: raise SystemExit('Expected 80 animation frames')
    frames=[Image.open(p).convert('RGB') for p in paths]
    montage=Image.new('RGB',(560*8,200*10))
    for i,frame in enumerate(frames): montage.paste(frame.resize((560,200)),((i%8)*560,(i//8)*200))
    palette=montage.quantize(colors=256,method=Image.Quantize.MEDIANCUT)
    indexed=[frame.quantize(palette=palette,dither=Image.Dither.NONE) for frame in frames]
    target=ROOT/'assets'/f'window-garden-{theme}.gif'
    indexed[0].save(target,save_all=True,append_images=indexed[1:],duration=100,loop=0,disposal=1,optimize=False)
    print(theme, len(indexed),'frames',target.stat().st_size,'bytes')
