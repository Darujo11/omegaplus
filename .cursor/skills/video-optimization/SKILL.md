---
name: video-optimization
description: Optimize MP4 videos for web delivery using ffmpeg with reliable presets for hero backgrounds and section videos. Use when the user asks to compress, reduce size, improve loading, or optimize .mp4 files.
disable-model-invocation: true
---

# Video Optimization

## Goal
Generate lighter MP4 files for web pages with good visual quality and fast start in browsers.

## Prerequisites
- `ffmpeg` available in PATH.
- If PATH is not set on Windows, use the absolute binary path from WinGet install.

Example absolute path:
`C:/Users/<USER>/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1.1-full_build/bin/ffmpeg.exe`

## Workflow
1. Check input file size.
2. Probe input metadata (resolution, fps, bitrate, duration).
3. Encode with a preset below.
4. Compare output size.
5. If acceptable, replace original file.

## Presets

### 1) Hero background (no audio, strongest reduction)
Use for looping hero videos where audio is not needed.

```bash
ffmpeg -y -i "INPUT.mp4" -vf "scale=1280:-2,fps=24" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an "OUTPUT.mp4"
```

### 2) Section/background with audio (balanced)
Use for content videos where audio should remain.

```bash
ffmpeg -y -i "INPUT.mp4" -vf "scale=1280:-2,fps=24" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k "OUTPUT.mp4"
```

### 3) Keep original resolution, reduce bitrate pressure
Use when downscaling is not desired.

```bash
ffmpeg -y -i "INPUT.mp4" -c:v libx264 -preset slow -crf 25 -movflags +faststart -c:a aac -b:a 96k "OUTPUT.mp4"
```

## Quick quality tuning
- Better quality / larger file: lower CRF (`22`).
- Smaller file / lower quality: higher CRF (`26`).

## Validation commands (PowerShell)

Size check:
```powershell
Get-Item "INPUT.mp4","OUTPUT.mp4" | Select-Object Name,Length,@{Name='SizeMB';Expression={[math]::Round($_.Length/1MB,2)}} | Format-Table -AutoSize
```

Metadata check:
```powershell
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,bit_rate -show_entries format=duration,bit_rate -of default=noprint_wrappers=1 "OUTPUT.mp4"
```

Replace original:
```powershell
Move-Item "OUTPUT.mp4" "INPUT.mp4" -Force
```

## Naming convention
- Temporary output: `name-opt.mp4`
- After approval, replace original filename used by the page/component.

## Notes
- Always add `-movflags +faststart` for web playback.
- For background videos, prefer `muted + autoplay + loop + playsInline` in HTML/React.
- Keep output in MP4 H.264 (`libx264`) for broad compatibility.
