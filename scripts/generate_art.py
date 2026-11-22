from pathlib import Path
from xml.sax.saxutils import escape
root=Path(__file__).resolve().parents[1]/'assets'
parts=['''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="900" viewBox="0 0 1000 900" role="img" aria-label="Abstract illustration of an enterprise server room">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0a1f42"/><stop offset=".5" stop-color="#102951"/><stop offset="1" stop-color="#061128"/></linearGradient><linearGradient id="face" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#172b50"/><stop offset=".55" stop-color="#0d2346"/><stop offset="1" stop-color="#132e56"/></linearGradient><linearGradient id="side" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1e4e80"/><stop offset="1" stop-color="#081831"/></linearGradient><linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#1c4d7a"/><stop offset="1" stop-color="#030d22"/></linearGradient><radialGradient id="glow"><stop stop-color="#32adff" stop-opacity=".28"/><stop offset="1" stop-color="#32adff" stop-opacity="0"/></radialGradient><filter id="blur"><feGaussianBlur stdDeviation="34"/></filter><filter id="soft"><feGaussianBlur stdDeviation="3"/></filter></defs>
<rect width="1000" height="900" fill="url(#bg)"/><circle cx="690" cy="270" r="470" fill="url(#glow)"/><path d="M0 640 1000 550V900H0Z" fill="url(#floor)"/><path d="m500 570-410 330M500 570l150 330M500 570l420 330" stroke="#65b5fd" stroke-opacity=".09" stroke-width="2"/><path d="M0 770 1000 690M0 840 1000 790" stroke="#6baeff" stroke-opacity=".11" stroke-width="2"/>
<g opacity=".3" stroke="#44acff" stroke-width="2"><path d="M15 70v590M110 0v650M196 0v650M900 0v630M986 0v630" opacity=".3"/><path d="M0 132h1000M0 310h1000M0 500h1000" opacity=".2"/></g>
<rect x="70" y="120" width="350" height="540" rx="9" fill="#050f25" stroke="#2475b3" stroke-width="3"/><rect x="80" y="134" width="322" height="510" rx="3" fill="url(#face)" stroke="#50adff" stroke-opacity=".3"/>
''']
# left cabinet
for i in range(13):
 y=145+i*37
 parts.append(f'<rect x="91" y="{y}" width="299" height="30" rx="3" fill="{("#0b1b36" if i%2==0 else "#102748")}" stroke="#22547d" stroke-width="1"/>')
 parts.append(f'<path d="M{118} {y+8}h160M118 {y+14}h160M118 {y+20}h160" stroke="#2c5582" stroke-width="1" opacity=".55"/>')
 for j in range(3):parts.append(f'<circle cx="{337+j*14}" cy="{y+14}" r="3" fill="{("#40e6c0" if (i+j)%4==0 else "#388ec7")}" opacity=".85"/>')
parts+=['<polygon points="420,125 480,96 480,622 420,660" fill="url(#side)" stroke="#276fa6" stroke-width="3"/><path d="M420 125 480 96 480 622 420 660" stroke="#4da2df" stroke-opacity=".3" fill="none"/><rect x="88" y="640" width="326" height="13" fill="#0f2b4d"/>']
# right bank
parts+=['<polygon points="578,96 902,145 902,681 578,615" fill="#061329" stroke="#2d7ba8" stroke-width="3"/><polygon points="583,103 891,150 891,666 583,608" fill="url(#face)"/><polygon points="538,124 578,96 578,615 538,649" fill="url(#side)" stroke="#2f8fcb" stroke-width="2"/>']
for i in range(13):
 y=128+i*37
 x0=595; x1=882; d=i*1.4
 parts.append(f'<polygon points="{x0},{y} {x1},{y+43} {x1},{y+67} {x0},{y+24}" fill="{("#0b1a36" if i%2 else "#122648")}" stroke="#31527c" stroke-width="1"/>')
 parts.append(f'<path d="M615 {y+9} 800 {y+36}M615 {y+14} 800 {y+41}" stroke="#4e709a" stroke-width="1" opacity=".35"/>')
 for j in range(3):parts.append(f'<circle cx="{833+j*12}" cy="{y+42+j*1.7:.1f}" r="2.7" fill="{("#4cdcc8" if (i+j)%3==0 else "#52a0e4")}"/>')
parts+=['<path d="M88 655c125 30 330 23 464 21s240 31 330 26" stroke="#74caff" stroke-width="4" opacity=".22" fill="none" filter="url(#blur)"/><ellipse cx="520" cy="705" rx="430" ry="100" fill="#30a2fc" opacity=".07" filter="url(#blur)"/>']
# optical light traces
for x,y in [(126,240),(175,414),(302,558),(677,300),(730,450),(820,580)]:
 parts.append(f'<circle cx="{x}" cy="{y}" r="5" fill="#6cdeff" opacity=".65" filter="url(#soft)"/>')
parts+=['<g stroke="#51b9ff" stroke-opacity=".12" fill="none"><circle cx="800" cy="200" r="120"/><circle cx="800" cy="200" r="190"/></g></svg>']
(root/'hero-server.svg').write_text(''.join(parts),encoding='utf8')
# a self contained people-at-workplace backup illustration, used behind corporate stock photo if it fails
team='''<svg xmlns="http://www.w3.org/2000/svg" width="900" height="850" viewBox="0 0 900 850" role="img" aria-label="Illustrative collaborative technology workspace"><defs><linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dceafa"/><stop offset="1" stop-color="#8fb9e5"/></linearGradient><linearGradient id="m" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#214b80"/><stop offset="1" stop-color="#0a2448"/></linearGradient><filter id="s"><feGaussianBlur stdDeviation="28"/></filter></defs><rect width="900" height="850" fill="url(#b)"/><circle cx="670" cy="220" r="270" fill="#e6f7ff" opacity=".65" filter="url(#s)"/><g stroke="#ffffff" stroke-width="2" opacity=".22"><path d="M0 110h900M0 220h900M0 330h900M0 440h900M0 550h900M0 660h900M100 0v850M250 0v850M400 0v850M550 0v850M700 0v850"/></g><rect x="75" y="90" width="560" height="360" rx="22" fill="#0c284d" stroke="#f2f8ff" stroke-width="12"/><rect x="103" y="119" width="506" height="300" rx="8" fill="url(#m)"/><path d="M126 300 218 230 295 271 378 168 459 212 563 146" stroke="#4ebaff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g stroke="#6bd7ff" opacity=".5"><path d="M126 345h437M126 372h437M126 392h290"/></g><rect x="253" y="454" width="200" height="20" rx="8" fill="#2c568a"/><path d="M340 450v84" stroke="#447aaa" stroke-width="17"/><rect x="205" y="532" width="302" height="15" rx="8" fill="#6e9ec9"/><rect x="50" y="607" width="800" height="38" rx="18" fill="#124b84"/><rect x="88" y="640" width="26" height="210" fill="#28679d"/><rect x="782" y="640" width="26" height="210" fill="#28679d"/><path d="M565 600c1-116 57-199 139-199s123 92 116 199" fill="#134e83"/><circle cx="693" cy="370" r="66" fill="#d99f77"/><path d="M629 361c-22-80 123-124 133-8-15-28-35-32-53-44-15 39-50 55-80 52Z" fill="#203551"/><path d="M565 595c17-87 71-132 128-132s105 45 127 132" fill="#1b5d9c"/><rect x="190" y="552" width="299" height="18" rx="8" fill="#102f56"/><rect x="265" y="555" width="185" height="11" rx="4" fill="#72b6ed"/><circle cx="780" cy="166" r="56" fill="#d8f0ff" opacity=".7"/><path d="M752 164h56m-28-28v56" stroke="#2161b5" stroke-width="11" stroke-linecap="round"/></svg>'''
(root/'office-team.svg').write_text(team,encoding='utf8')
print((root/'hero-server.svg').stat().st_size,(root/'office-team.svg').stat().st_size)