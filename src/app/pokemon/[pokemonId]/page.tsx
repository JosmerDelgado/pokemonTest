import config from "@/config";
import Image from "next/image";

type MoveDetails = {
  name: string;
}

type MovesPerPokemon = {
  level: string;
  id: string;
  move_id: string;
  move_learn_method_id: string;
  order: string;
  move: MoveDetails;
};

type TypeDetails = {
  name: string;
  generation_id: string;
};

type TypesPerPokemon = {
  id: string;
  type: TypeDetails
}

type Pokemon = {
  name: string;
  id: number;
  sprites: { sprites: string }[];
  moves: MovesPerPokemon[];
  pokemonTypes: TypesPerPokemon[]
};

type PokemonResponse = {
  pokemon: Pokemon;
  errors?: {};
};

export default async function Pokemon({
  params,
}: {
  params: { pokemonId: string };
}) {
  const response = await fetch(
    `${config.baseURL}/api/pokemons/${params.pokemonId}`
  );

  const responseJson: PokemonResponse = await response.json();
  if (responseJson.errors) {
    throw Error();
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-red-600 border border-black rounded-3xl overflow-hidden">
        <div className="bg-white grid grid-cols-2 p-4">
          <div className="mr-2">ID:</div>
          <div>{responseJson.pokemon.id}</div>
          <div className="mr-2">Name:</div>
          <div>{responseJson.pokemon.name}</div>
          <div>Types: </div>
          <div className="mr-2">
            {responseJson.pokemon.pokemonTypes?.map((pokemonType) => {
              return <div key={pokemonType.id}>{pokemonType.type.name} </div>;
            })}
          </div>
        </div>
        <Image
          src={responseJson.pokemon.sprites[0].sprites || "/poke-logo.png"}
          alt={responseJson.pokemon.name + " sprite"}
          width={300}
          height={300}
        />
      </div>
      <div className="mt-3">
        <div className="text-lg text-center">Moves</div>
        <table>
          <tbody>
            <tr className="border-b-2 border-blue">
              <th className="p-2">Move ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Level</th>
              <th className="p-2">Move learn method</th>
            </tr>
            {responseJson.pokemon.moves.map((move)=>{
              return (
                <tr key={move.id} className="border-b border-black">
                  <td className="p-2">{move.move_id}</td>
                  <td className="p-2">{move.move.name}</td>
                  <td className="p-2">{move.level}</td>
                  <td className="p-2 text-right">
                    {move.move_learn_method_id}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
