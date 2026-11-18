#!/usr/bin/env python3
"""Cut the Sisyphus scene (figure, boulder, mountain) and the boulder alone out
of the Mythic logo onto transparent backgrounds.

Writes assets/images/original/sisyphus-boulder-mountain.png and boulder.png;
run scripts/optimize-images.sh afterwards. Needs Pillow, NumPy and SciPy:
    python3 -m venv .venv && .venv/bin/pip install pillow numpy scipy
    .venv/bin/python scripts/extract-logo-art.py
"""
from pathlib import Path
from PIL import Image
import numpy as np
from scipy import ndimage as ndi

ORIGINAL = Path(__file__).resolve().parents[2] / "assets/images/original"
SRC = ORIGINAL / "mythic-sisyphus-emblem.png"
im=np.asarray(Image.open(SRC).convert('RGB')).astype(float)
bg=np.array([242,207,161.]); W=[0.299,0.587,0.114]
lum_full=im@W; ratio_full=(im[...,0]-im[...,2])/np.maximum(im[...,0],1)
# Fit the gold arc as a circle from strongly saturated pixels in the upper area.
ys,xs=np.nonzero((ratio_full>0.6)&(bg@W-lum_full>40)&(np.arange(im.shape[0])[:,None]<640))
sel=(xs>300)&(xs<1250)
xs,ys=xs[sel].astype(float),ys[sel].astype(float)
A=np.c_[2*xs,2*ys,np.ones_like(xs)]; b=xs**2+ys**2
cx,cy,k=np.linalg.lstsq(A,b,rcond=None)[0]; r=np.sqrt(k+cx**2+cy**2)
res=np.abs(np.hypot(xs-cx,ys-cy)-r); keep=res<np.percentile(res,80)
A,b=A[keep],b[keep]; cx,cy,k=np.linalg.lstsq(A,b,rcond=None)[0]; r=np.sqrt(k+cx**2+cy**2)
print('arc circle',cx,cy,r)

X0,Y0,X1,Y1=250,150,1370,640
c=im[Y0:Y1,X0:X1]
yy,xx=np.mgrid[Y0:Y1,X0:X1]
ring=np.abs(np.hypot(xx-cx,yy-cy)-r)<9
lum=c@W; diff=bg@W-lum
alpha=np.clip((diff-14)/34,0,1)
ratio=(c[...,0]-c[...,2])/np.maximum(c[...,0],1)
alpha[ring&(ratio>0.5)]=0          # arc pixels
alpha[ring&(diff<60)&(ratio>0.45)]=0  # its anti-aliased fringe
lab,n=ndi.label(alpha>0.35)
sizes=ndi.sum(np.ones_like(lab),lab,range(1,n+1))
main=lab==(np.argmax(sizes)+1)
# fill only small interior holes (texture speckles), not the open sky between arm and slope
holes=ndi.binary_fill_holes(main)&~main
hl,hn=ndi.label(holes)
hs=ndi.sum(np.ones_like(hl),hl,range(1,hn+1))
small=np.isin(hl,np.nonzero(hs<400)[0]+1)
solid=main|small
near=ndi.binary_dilation(solid,iterations=2)
alpha=np.where(solid,np.maximum(alpha,ndi.binary_erosion(solid,iterations=2)*1.0),alpha*near)
a=alpha[...,None]
rgb=np.clip(np.where(a>0.02,(c-(1-a)*bg)/np.maximum(a,0.02),0),0,255)
img=Image.fromarray(np.dstack([rgb,alpha*255]).astype(np.uint8),'RGBA')
img=img.crop(img.getbbox()); img.save(ORIGINAL / "sisyphus-boulder-mountain.png"); print('scene',img.size)

# Boulder alone: fixed circle measured on the 1536x1024 logo.
cx, cy, r = 934.0, 301.0, 124.0
R = int(r) + 2
x0, y0 = int(cx) - R, int(cy) - R
crop = im[y0:y0 + 2 * R, x0:x0 + 2 * R]
yy, xx = np.mgrid[0:2 * R, 0:2 * R]
ba = np.clip(r + 0.5 - np.hypot(xx + x0 - cx, yy + y0 - cy), 0, 1)
Image.fromarray(np.dstack([crop, ba * 255]).astype(np.uint8), "RGBA").save(ORIGINAL / "boulder.png")
