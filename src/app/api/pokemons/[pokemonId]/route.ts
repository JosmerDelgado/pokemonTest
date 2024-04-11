import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

const pokemonsQuery = `
  query pokemons($id: Int) {
    pokemons: pokemon_v2_pokemon(
      where: { id: { _eq: $id } }
    ) {
      name
      id
      sprites: pokemon_v2_pokemonsprites {
        sprites(path: "front_default")
      }
      height
      base_experience
      pokemon_species_id
      moves: pokemon_v2_pokemonmoves {
        level
        id
        move_id
        move_learn_method_id
        order
        move: pokemon_v2_move {
          name
        }
      }
      pokemonTypes: pokemon_v2_pokemontypes {
        id
        type: pokemon_v2_type {
          name
          generation_id
        }
      }
    }
  }
`;

export async function GET(
  _: NextRequest,
  { params }: { params: { pokemonId: string } }
) {
  try {
    const id = params.pokemonId && parseInt(params.pokemonId);
    const results = await fetch(config.apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: pokemonsQuery,
        variables: {
          id: id,
        },
      }),
    });

    const resultsJson = await results.json();
    if (resultsJson.errors) {
      throw Error();
    }
    return NextResponse.json({ pokemon: resultsJson.data.pokemons[0] });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
