//self para acessar o sw
self.addEventListener("fetch", loadFromCacheStorage)

//a função dev ser executada apenas quando o browser tiver carregando algum arquivo fora do servidor local
function loadFromCacheStorage(event) {
    let itemReq = event.request
    let responsePromise = caches.open("renotes-imagens").then(cache => {
        //matchAll para pegar todas as imagens da lista
        return cache.match(itemReq)
        //aqui encadeamos a resposta da primeira promise
    }).then(response => {
        //neste caso a res da imagem é o código dela, que pode ser convertido para base64
        //como é uma função async, o .respondWith deve ficar fora da promise
        //event.respondWith(response)
        return response
    })

    event.respondWith(responsePromise)
}