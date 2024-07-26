set dir_path=%cd%

start cmd.exe /c "mamba activate qr_code_app && cd %dir_path% && python .\qr_detector\qr_detector.py 0 -d 0 --show-window -s wss://server-wandering-fire-1875.fly.dev"
start cmd.exe /c "mamba activate qr_code_app && cd %dir_path% && python .\qr_detector\qr_detector.py 1 -d 1 --show-window -s wss://server-wandering-fire-1875.fly.dev"
start cmd.exe /c "mamba activate qr_code_app && cd %dir_path% && python .\qr_detector\qr_detector.py 2 -d 2 --show-window -s wss://server-wandering-fire-1875.fly.dev"
start cmd.exe /c "mamba activate qr_code_app && cd %dir_path% && python .\qr_detector\qr_detector.py 3 -d 3 --show-window -s wss://server-wandering-fire-1875.fly.dev"
start cmd.exe /c "mamba activate qr_code_app && cd %dir_path% && python .\qr_detector\qr_detector.py 4 -d 4 --show-window -s wss://server-wandering-fire-1875.fly.dev"
