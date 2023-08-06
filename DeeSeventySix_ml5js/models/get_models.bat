@echo off

cd %~dp0
powershell -Command "Invoke-WebRequest https://fox-gieg.com/patches/github/n1ckfg/DeeSeventySix/ml5js/models/d76_mix.pict -OutFile d76_mix.pict"
powershell -Command "Invoke-WebRequest https://fox-gieg.com/patches/github/n1ckfg/DeeSeventySix/ml5js/models/nick_draw.pict -OutFile nick_draw.pict"

@pause