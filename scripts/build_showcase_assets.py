#!/usr/bin/env python3
"""Original QBranch illustrative media generator; all illustrations are conceptual."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math, random, subprocess
import cairosvg
ROOT=Path(__file__).resolve().parents[1]; ART=ROOT/'assets'/'visuals'; ART.mkdir(exist_ok=True,parents=True)
random.seed(31)
THEMES={
 'network': ('NETWORK INFRASTRUCTURE','#0f6cc8','#37c6ef'),
 'security': ('CYBER PROTECTION','#0c58ba','#54d6f7'),
 'surveillance': ('SMART SURVEILLANCE','#1250aa','#37bdec'),
 'access': ('ACCESS CONTROL','#0d67ac','#73d4ff'),
 'workplace': ('DIGITAL WORKPLACE','#125ab1','#80b8ff'),
 'cloud': ('CLOUD & RECOVERY','#0950a5','#74c9ff'),
 'telecom': ('BUSINESS CONNECTIVITY','#1854aa','#4aaaf0'),
 'fence': ('PERIMETER SECURITY','#1b55a5','#75d1fa'),
 'payments': ('DIGITAL TRANSACTIONS','#1a5fb3','#6dcff6'),
 'products': ('IT EQUIPMENT','#1756b2','#5cb5ff'),
}
def art(n):
 label,base,bright=THEMES[n]; rng=random.Random(sum(map(ord,n))); bits=[]
 for row in range(12):
  for col in range(27):
   v='01'[rng.randrange(2)];x=col*42+25;y=row*43+30
   bits.append(f'<text x="{x}" y="{y}" opacity="{rng.uniform(.09,.25):.2f}" fill="#9cdaff" font-family="monospace" font-size="14">{v}</text>')
 lines=[]
 for i in range(25):
  x1=rng.randrange(10,1150);y1=rng.randrange(10,640);x2=rng.randrange(10,1150);y2=rng.randrange(10,640)
  lines.append(f'<path d="M{x1},{y1} L{x2},{y1} L{x2},{y2}" fill="none" stroke="{bright}" stroke-width="1" opacity=".08"/>')
 shape=''
 if n in ('network','cloud','telecom'):
  for i in range(5):
   xx=420+i*95; shape+=f'<rect x="{xx}" y="{155+i%2*24}" width="72" height="360" rx="7" fill="url(#metal)" stroke="{bright}" stroke-opacity=".6"/><rect x="{xx+11}" y="{185+i%2*24}" width="50" height="280" rx="3" fill="#061b37"/>'
   for j in range(11):shape+=f'<rect x="{xx+19}" y="{198+i%2*24+j*23}" width="34" height="4" rx="2" fill="{bright}" opacity="{.35+j/17}"/><circle cx="{xx+55}" cy="{205+i%2*24+j*23}" r="2" fill="#9afaef"/>'
  if n=='telecom':shape+='<path d="M570 155V75M500 130Q570 40 640 130M465 105Q570 -10 675 105" stroke="#94ddff" stroke-width="8" fill="none" stroke-linecap="round" opacity=".8"/>'
 elif n=='surveillance':
  shape=f'<rect x="410" y="160" width="390" height="185" rx="42" fill="url(#metal)" stroke="{bright}" stroke-width="7"/><rect x="730" y="210" width="125" height="100" rx="23" fill="#c6e8ff"/><circle cx="775" cy="253" r="40" fill="#092851" stroke="#49c4ff" stroke-width="7"/><circle cx="775" cy="253" r="17" fill="#73d7ff"/><path d="M565 350l-45 146h170l-45-146" fill="url(#metal)" stroke="#4698e2" stroke-width="6"/><path d="M510 502h215" stroke="#cbefff" stroke-width="18" stroke-linecap="round"/>'
 elif n=='security':
  shape=f'<path d="M590 105L785 195v142c0 133-122 211-195 241-73-30-195-108-195-241V195z" fill="url(#metal)" stroke="{bright}" stroke-width="9"/><path d="M516 333l61 67 116-137" fill="none" stroke="#8ee7ff" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>'
 elif n=='access':
  shape=f'<rect x="475" y="102" width="225" height="425" rx="28" fill="url(#metal)" stroke="{bright}" stroke-width="8"/><rect x="506" y="150" width="163" height="120" rx="12" fill="#062b51"/><path d="M548 222c-10-50 75-67 88-13m-78 38c-20-87 100-102 110-21m-87 32c-2-35 38-56 59-24m-48-8c-12 18-7 42-17 57m36-34c10 5 6 22 3 29" fill="none" stroke="#80ddfa" stroke-width="7" stroke-linecap="round"/>'
  for row in range(3):
   for col in range(3):shape+=f'<circle cx="{529+col*55}" cy="{326+row*59}" r="12" fill="#68bfff" opacity=".8"/>'
 elif n=='workplace':
  shape=f'<rect x="315" y="137" width="550" height="310" rx="23" fill="url(#metal)" stroke="{bright}" stroke-width="7"/><rect x="339" y="160" width="502" height="265" rx="8" fill="#051930"/><path d="M340 355l120-82 87 40 98-116 101 54 95-88" fill="none" stroke="#62d0f6" stroke-width="9"/><circle cx="547" cy="313" r="18" fill="#92edff"/><path d="M430 480h320l50 65H380z" fill="url(#metal)"/>'
 elif n=='fence':
  for i in range(7):
   x=345+i*75;shape+=f'<path d="M{x} 145v365" stroke="#bce5ff" stroke-width="15" stroke-linecap="round"/>'
  for j in range(6):shape+=f'<path d="M330 {185+j*52}H830" stroke="#43c0f2" stroke-width="8"/>'
  shape+=f'<path d="M585 175l-80 164h83l-43 137 136-191h-85l51-110z" fill="{bright}"/>'
 elif n=='payments':
  shape=f'<rect x="344" y="168" width="468" height="300" rx="35" fill="url(#metal)" stroke="{bright}" stroke-width="8"/><rect x="381" y="229" width="392" height="45" fill="#051c3a"/><circle cx="417" cy="388" r="28" fill="#72d2ff"/><circle cx="463" cy="388" r="28" fill="#4689d5"/><path d="M610 357h145M610 389h96" stroke="#c5edff" stroke-width="18" stroke-linecap="round"/>'
 elif n=='products':
  shape=f'<rect x="338" y="150" width="503" height="286" rx="20" fill="url(#metal)" stroke="{bright}" stroke-width="8"/><rect x="358" y="172" width="463" height="242" rx="10" fill="#061b37"/><circle cx="588" cy="293" r="88" fill="none" stroke="#6ed6ff" stroke-width="8"/><path d="M588 230v126M525 293h126" stroke="#b9efff" stroke-width="10"/><path d="M290 449h598l-59 64H349z" fill="url(#metal)" stroke="#8fcaff" stroke-width="5"/>'
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="Original illustrative artwork: {label}"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#05142c"/><stop offset=".55" stop-color="{base}"/><stop offset="1" stop-color="#06172e"/></linearGradient><linearGradient id="metal" x2=".85" y2="1"><stop stop-color="#17385d"/><stop offset=".48" stop-color="#2f719f"/><stop offset="1" stop-color="#071e39"/></linearGradient><radialGradient id="glow"><stop stop-color="{bright}" stop-opacity=".35"/><stop offset="1" stop-color="{bright}" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="675" fill="url(#bg)"/><circle cx="610" cy="300" r="390" fill="url(#glow)"/>{''.join(bits)}{''.join(lines)}<g>{shape}</g><path d="M0 612Q280 550 610 612T1200 610" fill="none" stroke="#4abaff" stroke-opacity=".22" stroke-width="2"/><text x="54" y="616" font-size="18" font-family="DejaVu Sans,Arial" font-weight="bold" letter-spacing="5" fill="#aee7ff" opacity=".85">{label}</text><text x="1146" y="615" text-anchor="end" font-size="18" font-family="monospace" fill="#b4eaff" opacity=".72">0 1 / QBRANCH</text></svg>'''
 (ART/(n+'.svg')).write_text(svg)
 print('svg',n)
for n in THEMES:art(n)
# Convert model-created original environmental illustration to a compressed first-party WebP.
source=Path('/mnt/data/a_cinematic_high_resolution_modern_data_center_n.png')
if source.exists():
 im=Image.open(source).convert('RGB');im.thumbnail((1500,1000));im.save(ART/'qbranch-technology-concept.webp','WEBP',quality=78,method=6)
 print('webp', (ART/'qbranch-technology-concept.webp').stat().st_size)
# Animation overview loop. Frames are rendered from original artwork, not actual client footage.
try:
 fontbold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';fontregular='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
 F1=ImageFont.truetype(fontbold,48);F2=ImageFont.truetype(fontregular,21);F3=ImageFont.truetype(fontbold,17)
 slides=[('network','Connected infrastructure','Networks, cabling & reliable systems'),('surveillance','Security you can see','CCTV, monitoring & surveillance'),('access','Smarter access','Biometrics & time attendance'),('security','Protection built in','Firewalls and information security'),('workplace','Technology that moves business','Equipment, software & support')]
 framesdir=ROOT/'_tmp_video_frames';framesdir.mkdir(exist_ok=True)
 W,H=960,540;fps=16;seconds=2.1;total=int(fps*seconds)
 converted={}
 for kind,*_ in slides:
  out=framesdir/(kind+'.png');cairosvg.svg2png(url=str(ART/(kind+'.svg')),write_to=str(out),output_width=1070,output_height=602)
  converted[kind]=Image.open(out).convert('RGB')
 frameidx=0
 for si,(kind,title,subtitle) in enumerate(slides):
  im=converted[kind]
  for f in range(total):
   t=f/max(total-1,1)
   scale=1.07+.065*t
   ww=int(W*scale);hh=int(H*scale);zoom=im.resize((ww,hh),Image.Resampling.LANCZOS)
   offsetx=int((ww-W)*(.25+.35*t));offsety=int((hh-H)*(.45-.14*t))
   canvas=zoom.crop((offsetx,offsety,offsetx+W,offsety+H))
   shade=Image.new('RGBA',(W,H),(0,0,0,0));d=ImageDraw.Draw(shade)
   d.rectangle((0,0,W,H),fill=(2,13,35,60))
   d.rounded_rectangle((49,50,340,85),12,fill=(7,52,100,170),outline=(72,190,255,150),width=2)
   d.text((65,58),'QBRANCH  /  ICT SOLUTIONS',font=F3,fill=(199,236,255,255))
   d.rounded_rectangle((45,H-180,W-45,H-34),18,fill=(2,15,40,200))
   d.text((70,H-158),title,font=F1,fill=(255,255,255,255))
   d.text((73,H-90),subtitle,font=F2,fill=(168,218,255,255))
   d.rectangle((70,H-47,70+int((W-140)*(frameidx/(len(slides)*total))),H-42),fill=(35,175,255,255))
   fade=min(1,t*5,(1-t)*7)
   combined=Image.alpha_composite(canvas.convert('RGBA'),shade).convert('RGB')
   if fade<1:
    black=Image.new('RGB',(W,H),(3,20,44));combined=Image.blend(black,combined,max(.02,fade))
   combined.save(framesdir/f'frame_{frameidx:04d}.jpg',quality=79)
   frameidx+=1
 dest=ART/'qbranch-capabilities-overview.mp4'
 cmd=['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate',str(fps),'-i',str(framesdir/'frame_%04d.jpg'),'-c:v','libx264','-pix_fmt','yuv420p','-preset','fast','-crf','29','-movflags','+faststart','-an',str(dest)]
 run=subprocess.run(cmd,timeout=130,capture_output=True,text=True);print('ffmpeg',run.returncode,run.stderr[:200],dest.stat().st_size if dest.exists() else None)
 # Use first frame as poster, not a false QBranch employee photo
 poster=Image.open(framesdir/'frame_0005.jpg').convert('RGB');poster.save(ART/'video-poster.webp','WEBP',quality=76)
 import shutil;shutil.rmtree(framesdir,ignore_errors=True)
except Exception as e:
 print('video failed',type(e).__name__,e)