#!/bin/sh

set -e

pnpm i 

pnpm run electron:build


cp dist_electron/vite-electron-plugin-setup.exe /usr/local/NeteaseCloudMusicApi/public

cp dist_electron/latest.yml /usr/local/NeteaseCloudMusicApi/public

echo "✅ Publish completed"
