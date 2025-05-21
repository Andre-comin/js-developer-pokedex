const pokemonApi = {}

// Converte os dados da API para um objeto do modelo Pokemon
function converterDetalhePokemonApiParaModeloPokemon(dadosApi){
    const pokemon = new Pokemon()
    pokemon.numero = dadosApi.id
    pokemon.nome = dadosApi.name
    
    // Extrai os tipos (ex: ['grass', 'poison'])
    pokemon.tipos = dadosApi.types.map(function (tipoObj){
        return tipoObj.type.name
    })
    // Define o tipo principal como o primeiro da lista
    pokemon.tipoPrincipal = dadosApi.types[0].type.name
    // Define a imagem do Pokémon
    pokemon.foto = dadosApi.sprites.other.dream_world.front_default
    
    return pokemon
}

// Recebe a URL de um Pokémon e busca os detalhes dele
pokemonApi.getDetalhePokemons = function(pokemonResumo){
    return fetch(pokemonResumo.url)
        .then(function(resposta){
            return resposta.json()
        })
        .then(converterDetalhePokemonApiParaModeloPokemon)
}
// Busca a lista de Pokémons com detalhes completos
pokemonApi.getPokemons = function(offset = 0, limit = 5 ){
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url) 
        .then(function (resposta){
            return resposta.json()
        })
        .then(function(json){
            return json.results
        })  
        .then(function(listaPokemonsResumo){
            // Transforma cada item da lista em uma promessa de detalhe
            return listaPokemonsResumo.map(pokemonApi.getDetalhePokemons) 
        })
        .then(function (listaPromessas){
            // Aguarda todas as requisições de detalhes terminarem
            return Promise.all(listaPromessas)
        })
        .then(function (listaDetalhada){
            // retorna todos os pokémons completos
            return listaDetalhada
        })
}
