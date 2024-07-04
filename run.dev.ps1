#The following is required before you run the script, this 
#basically allows local or remotely signed scripts to be run
#in this process. Better to avoid setting this globally.
#Set-ExecutionPolicy RemoteSigned -Scope Process

Start-Process node .\server\server.js

if($?){
    cd client
    Start-Process npx vite
}

if($?){
    cd ..\qr_detector
    mamba activate qr_code_app

    Start-Process python ".\qr_detector.py 0 -d 0 --show-window"
    Start-Process python ".\qr_detector.py 1 -d 1 --show-window"
    Start-Process python ".\qr_detector.py 2 -d 2 --show-window"
    Start-Process python ".\qr_detector.py 3 -d 3 --show-window"
}

cd ..
