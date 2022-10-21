const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
const button = document.getElementById('button')
const accessButton = document.getElementById('accessbutton')
const startButton = document.getElementById('startbutton')
button.addEventListener('click', () => {
  const title = "HELLO WORLD"
  window.versions.setTitle(title)
});

accessButton.addEventListener('click', () => {
  console.log("WEEEE")
})

startButton.addEventListener('click', async () => {
  const lesgo = await window.versions.lesgo()
  console.log(lesgo)
})



