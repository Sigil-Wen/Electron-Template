# Electron-Template
 Sigil Learn's the foundations of electron.js :) It's pretty fun. The Electron.js Documentation is actually quite robust :)

## The Beauty of Preload.js 
- Onstart, loads in contextBridge that allows for main.js (Node.js instance running on the client's computer) to communicate with renderer.js (Web instance) and vice versa
- This also acts as a security layer for clearly defining the scope of what the electron can access via Node.js (system access), preventing malicious code!

# Resources on Inter-Process Communication (IPC)
- https://www.electronjs.org/docs/latest/tutorial/ipc 
- https://www.electronjs.org/docs/latest/api/ipc-renderer 
