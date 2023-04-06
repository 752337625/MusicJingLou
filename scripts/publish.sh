#!/bin/sh

set -e

pnpm i 

pnpm run electron:build

echo "✅ Publish completed"
