import axios from "axios"


export async function fetchPokeDex(pokeName) {   
    try {
        let pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        return pokeData?.data
    } catch (error) {
        return Promise.reject()
    }
}