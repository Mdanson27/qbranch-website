#!/usr/bin/env python3
"""Small, geographically grounded Natural Earth world outline for QBranch globe.
Natural Earth cultural vector data is public domain, bundled in pyogrio fixtures.
"""
import json
from pathlib import Path
import geopandas as gpd
from shapely.geometry import MultiPolygon, Polygon

ROOT=Path(__file__).resolve().parents[1]
p='/opt/pyvenv/lib/python3.13/site-packages/pyogrio/tests/fixtures/naturalearth_lowres/naturalearth_lowres.shp'
df=gpd.read_file(p)
def compact_coords(ring):
 return [[round(x,2),round(y,2)] for x,y in list(ring.coords)]
def shapes(geom):
 if isinstance(geom,Polygon): geoms=[geom]
 elif isinstance(geom,MultiPolygon):geoms=list(geom.geoms)
 else:return []
 return [[compact_coords(p.exterior)] for p in geoms if p.area>.08]
features=[]
for _,rec in df.iterrows():
 geom=rec.geometry
 if geom is None:continue
 tol=.32 if rec.continent=='Africa' else .7
 geo=geom.simplify(tol,preserve_topology=True)
 features.append([rec.iso_a3,rec.continent=='Africa',shapes(geo)])
output={'source':'Natural Earth 1:110m public-domain country boundaries','features':features,'uganda':[32.29,1.37]}
pth=ROOT/'assets/visuals/world-earth.json'
pth.write_text(json.dumps(output,separators=(',',':'),ensure_ascii=False),encoding='utf8')
print(len(features),'countries',len(pth.read_bytes()),'bytes', 'Uganda',any(c[0]=='UGA' for c in features))