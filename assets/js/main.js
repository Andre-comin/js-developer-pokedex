// --- Código principal que consome a API ---

// Seleciona a <ol> do HTML onde os pokémons serão inseridos
const listaPokemonOl = document.getElementById("lista-pokemon-ol")
const botaoCarregarMais = document.getElementById("botao-carregarMais")
const maximoRegistros = 151
const limit = 5
let offset = 0


function carregarPaginasPokemon(offset, limit){
    pokemonApi.getPokemons(offset, limit)
    .then(function(listaPokemons = []){
        const htmlPokemons  = listaPokemons.map(function(pokemon){ //converte cada pokemon para HTML
            return `
                <li class="pokemon ${pokemon.tipoPrincipal}">
                        <span class="numero">#${pokemon.numero}</span>
                        <span class="nome">${pokemon.nome}</span>
                    
                        <div class="detalhe-pokemon">
                            <ol class="tipos-lista">
                                ${pokemon.tipos.map(function(tipo){
                                    return ` <li class="tipo ${tipo}">${tipo}</li> `
                                }).join("")}
                            </ol>
                            <img src="${pokemon.foto}" alt="${pokemon.nome}">
                        </div>
                    </li>
                `
        }).join("")  //Junta tudo em uma única string
        listaPokemonOl.innerHTML += htmlPokemons  
    })
}

carregarPaginasPokemon(offset, limit)

botaoCarregarMais.addEventListener("click", function(){
    offset += limit
    const qtdRegistroProximaPagina = offset + limit

    if(qtdRegistroProximaPagina >= maximoRegistros){
        const novoLimite = maximoRegistros - offset
        carregarPaginasPokemon(offset, novoLimite)

        botaoCarregarMais.parentElement.removeChild(botaoCarregarMais)
    } else {
        carregarPaginasPokemon(offset, limit)
    }
})



