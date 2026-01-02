#!/bin/bash

# Configuration
VERSION=$(node -p "require('./package.json').version")
RELEASE_DIR="./dist/releases"

echo "Starting release process for v$VERSION..."

# Preparation
# Clean old releases and ensure the directory exists
rm -rf $RELEASE_DIR
mkdir -p $RELEASE_DIR

# Build & Bundle
# This runs your existing 'pnpm bundle' command
echo "Bundling project..."
pnpm bundle

# Packaging
# Use pkg to create the three main binaries
echo "Compiling binaries..."
npx pkg dist/bundle/index.js \
  --targets node18-linux-x64,node18-macos-arm64,node18-win-x64 \
  --out-path $RELEASE_DIR

# Compression & Cleanup
# Users on Linux/Mac/Windows expect different archive formats
cd $RELEASE_DIR

echo "Compressing assets..."

# Linux
mv index-linux-x64 worklog-linux
tar -czf "worklog-v$VERSION-linux-x64.tar.gz" worklog-linux
rm worklog-linux

# macOS
mv index-macos-arm64 worklog-macos
zip -q "worklog-v$VERSION-macos-arm64.zip" worklog-macos
rm worklog-macos

# Windows
mv index-win-x64.exe worklog.exe
zip -q "worklog-v$VERSION-win-x64.zip" worklog.exe
rm worklog.exe

echo "------------------------------------------"
echo "Done! All assets are ready in $RELEASE_DIR"
ls -lh