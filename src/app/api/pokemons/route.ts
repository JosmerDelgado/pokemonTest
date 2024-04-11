import { NextRequest, NextResponse } from "next/server";
import config from "@/config"

const pokemonsQuery = `
  query pokemons($name: String, $limit: Int, $offset: Int) {
    pokemons: pokemon_v2_pokemon(
      where: { name: { _regex: $name } }
      limit: $limit
      offset: $offset
    ) {
      name
      id
      pokemon_v2_pokemonsprites {
        sprites(path: "front_default")
      }
    }
  }
`;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.searchParams);
  try {
    const search = params.get("search") || ""
    const rawLimit = params.get("limit");
    const limit = rawLimit  ? parseInt(rawLimit) : 10;
    const rawOffset = params.get("offset")
    const offset = rawOffset ? parseInt(rawOffset) : 0;
    
    const results = await fetch(config.apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: pokemonsQuery,
        variables: {
          name: search,
          limit: limit,
          offset: offset,
        },
      }),
    });

    const resultsJson = await results.json();

    return NextResponse.json(resultsJson);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
