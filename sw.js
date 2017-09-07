//update07092017.0.1.3 (para atualização dos arquivos, apenas o comentário é suficiente)

//quais serão os arquivos que devem ser instalados?
let mainFiles = ["/", "img/bin2.svg", "img/edit.svg", "css/estilos.css", "css/opcoesDaPagina.css", "css/opcoesDoCartao.css", "css/cabecalho.css", "css/login.css", "css/loginForm.css", "css/loginStatus.css", "css/cartao.css", "css/novoCartao.css", "css/mural.css", "js/lib/jquery.js", "js/lib/eventemitter2.js", "js/lib/KeyBoardNavigation.js", "js/tags/Tags.js", "js/cabecalho/mudaLayout.js", "js/cabecalho/busca.js", "js/filtro/Filtro.js", "js/tipos/TiposCartao.js", "js/cartao/render/Cartao_renderHelpers.js", "js/cartao/render/CartaoOpcoes_render.js", "js/cartao/render/CartaoConteudo_render.js", "js/cartao/render/Cartao_render.js", "js/cartao/Cartao.js", "js/login/LoginUsuario_render.js", "js/login/LoginUsuario.js", "js/mural/render/Mural_render.js", "js/mural/Mural.js", "js/cabecalho/novoCartao.js"]

//instalar arquivos apenas no momento da instalação do sw e apenas uma única vez
self.addEventListener("install", function () {
    console.log("SW delete files...")
    //como remover os arquivos que não são mais necessários?
    caches.delete("renotes-arquivos").then(function () {
        console.log("SW install files...")
        //abrir um novo cache
        caches.open("renotes-arquivos").then(cache => {
            //.addAll para adicionar todos os arquivos de uma lista
            cache.addAll(mainFiles)
        })
    })

})


//self para acessar o sw
self.addEventListener("fetch", loadFromCacheStorage)

//a função dev ser executada apenas quando o browser tiver carregando algum arquivo fora do servidor local
function loadFromCacheStorage(event) {
    let itemReq = event.request
    //aqui procuramos em todos os caches, por isso não mais usar o .open, mas sim o .match
    let responsePromise = caches.match(itemReq).then(responseFromCache => {
        //fixed problem with crash website
        //a função fetch está disponível no SW e nesse momento passo para ele o nosso pedido, caso os arquivos não estejam no cache
        let response = responseFromCache ? responseFromCache : fetch(itemReq)
        //neste caso a res da imagem é o código dela, que pode ser convertido para base64
        //como é uma função async, o .respondWith deve ficar fora da promise
        //event.respondWith(response)
        return response
    })

    event.respondWith(responsePromise)
}