import { useState } from "react"

type PokemonItem = {
  id: number;
  name: string;
  pokemon_v2_pokemonsprites: {sprites: string}[]
};

type PokemonResponse = { data: { pokemons: PokemonItem[] } };

export const useGetPokemons = () => {
    const [response, setResponse] = useState < PokemonResponse>();
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    
    const getPokemons = async (params:{search?: string, offset?:string,limit?: string}={}) => {
        setLoading(true)
        try {
            const url = new URLSearchParams(Object.entries(params));
            const response = await fetch(`/api/pokemons?${url.toString()}`)
            const jsonResponse = await response.json()
            setResponse(jsonResponse) 
        } catch (e){
            setError(true)
        } finally {
            setLoading(false);
        }
    }

    return {getPokemons, response, isLoading, isError }
}