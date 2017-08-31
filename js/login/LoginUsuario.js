let logado = JSON.parse(localStorage.getItem("logado"))
let usuario = localStorage.getItem("nomeUsuario")
let login = new EventEmitter2() //emissor dos eventos

//mudar o status a depender do login
LoginUsuario_render({
    logado: logado,
    usuario: localStorage.getItem("nomeUsuario"),
    onLogin: (nomeUsuario) => {
        logado = true
        localStorage.setItem("logado", true) //aqui passamos dois valores, um pra o status e outro para o user
        localStorage.setItem("nomeUsuario", nomeUsuario)
        usuario = nomeUsuario
        login.emit("login")
    }, //cb p/ mudar o status
    onLogout: () => {
        logado = false
        localStorage.setItem("logado", false)
        localStorage.removeItem("nomeUsuario")    
        login.emit("logout")    
    }
})