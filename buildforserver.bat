@ECHO off

@ECHO making new build
cd app
call yarn build
cd ../

@ECHO removing previous index.html
@DEL /Q "%~dp0\server\index.html"

@ECHO moving index.html
@MOVE .\app\build\index.html .\server

@ECHO removing previous build
@RD /S /Q "%~dp0\server\build"

@ECHO moving build
@MOVE .\app\build .\server

@ECHO finished