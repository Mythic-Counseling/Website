@echo off
rem Opens this folder in VS Code; the "Preview site" task then starts the
rem live preview at http://localhost:4000 (see docs/3-editing-tools.md).
cd /d "%~dp0"
code .
