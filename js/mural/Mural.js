const Mural = (function (_render, Filtro) {
    "use strict"
    //aqui devemos carregar os cards do user
    //devemos tbm chamar a const Cartao() para criarmos uma nova lista com base na lista salva no localStorage
    let cartoes = JSON.parse(localStorage.getItem("cartoes"))
        .map(cartaoSalvo => new Cartao(
            cartaoSalvo.conteudo,
            cartaoSalvo.tipo
        )) || []
    cartoes.forEach(cartao => {
        ajeitaCartao(cartao) //editar e remover os cartões salvos
    });
    const render = () => _render({
        cartoes: cartoes,
        filtro: Filtro.tagsETexto
    });

    render() //aqui forçamos o render da página para pegar os cartões do localStorage

    Filtro.on("filtrado", render)

    function ajeitaCartao(cartao) {
        cartao.on("mudanca.**", adicionaCartoes)
        cartao.on("remocao", () => {
            cartoes = cartoes.slice(0)
            cartoes.splice(cartoes.indexOf(cartao), 1)
            adicionaCartoes()
            render()
        })
    }

    function adicionaCartoes() {
        //usamos o stringify passando as propriedades do cartao (conteudo, tipo)
        localStorage.setItem("cartoes", JSON.stringify(
            cartoes.map(cartao => ({
                conteudo: cartao.conteudo,
                tipo: cartao.tipo
            }))
        ))
    }

    function adiciona(cartao) {
        if (logado) {
            cartoes.push(cartao)
            adicionaCartoes() //função para salvar os dados do cartão (assim pq precisamos das propriedades)
            //para que o editar e o remover funcionem, eu preciso adicionar ele nos cartoes do JSON.parse
            cartao.on("mudanca.**", render)
            ajeitaCartao(cartao) //editar e remover os cartões adicionados
            render()
            return true
        } else {
            alert('Você não está logado!')
        }
    }

    return Object.seal({
        adiciona
    })

})(Mural_render, Filtro)