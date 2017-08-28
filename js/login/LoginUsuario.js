let logado = false

//mudar o status a depender do login
LoginUsuario_render({
    logado: false,
    onLogin: () => logado = true, //cb p/ mudar o status
    onLogout: () => logado = false
})