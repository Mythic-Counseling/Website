@echo off
rem Live preview of the website on Windows: double-click this file.
rem Opens http://localhost:4000 in your browser and refreshes it whenever a
rem file is saved. Close this window (or press Ctrl+C) to stop.
rem The first run installs Ruby and Jekyll (about 10 minutes); later runs
rem start in a few seconds.
cd /d "%~dp0"
set JEKYLL_NO_BUNDLER_REQUIRE=true

where jekyll >nul 2>nul && goto serve
for /d %%D in (C:\Ruby3*) do if exist "%%D\bin\ruby.exe" set "PATH=%%D\bin;%PATH%"
where jekyll >nul 2>nul && goto serve

echo First run: installing Ruby and Jekyll. This takes about 10 minutes.
where ruby >nul 2>nul || winget install --id RubyInstallerTeam.RubyWithDevKit.3.3 --exact --silent --accept-source-agreements --accept-package-agreements
for /d %%D in (C:\Ruby3*) do if exist "%%D\bin\ruby.exe" set "PATH=%%D\bin;%PATH%"
where ruby >nul 2>nul || (echo Ruby could not be installed. See docs\3-editing-tools.md. & pause & exit /b 1)
call ridk install 3
call gem install jekyll webrick tzinfo tzinfo-data --no-document || (echo Jekyll could not be installed. & pause & exit /b 1)

:serve
call jekyll serve --livereload --drafts --baseurl "" --open-url
pause
