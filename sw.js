//self para acessar o sw
self.addEventListener("fetch", loadFromCacheStorage)

//a função dev ser executada apenas quando o browser tiver carregando algum arquivo fora do servidor local
function loadFromCacheStorage(event) {
    let itemReq = event.request
    let responsePromise = caches.open("renotes-imagens").then(cache => {
        //matchAll para pegar todas as imagens da lista
        return cache.match(itemReq)
        //aqui encadeamos a resposta da primeira promise
    }).then(responseFromCache => {
        //fixed problem with crash website
        //a função fetch está disponível no SW e nesse momento passo para ele o nosso pedido, caso os arquivos não estejam no cache
        response = responseFromCache ? responseFromCache : fetch(itemReq)
        //neste caso a res da imagem é o código dela, que pode ser convertido para base64
        //como é uma função async, o .respondWith deve ficar fora da promise
        //event.respondWith(response)
        return response
    })

    event.respondWith(responsePromise)
}