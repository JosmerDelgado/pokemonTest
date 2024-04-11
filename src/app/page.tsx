"use client";

import { useGetPokemons } from "@/hooks/useGetPokemons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";

export default function Home() {
  const { getPokemons, response, isLoading, isError } = useGetPokemons();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>();
  const router = useRouter();

  useEffect(() => {
    getPokemons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (search) {
      timeout = setTimeout(() => {
        getPokemons({ search });
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if ( typeof page === "number") {
      timeout = setTimeout(() => {
        getPokemons({ offset: `${page * 10}` });
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };
  const onSelectPokemon = (pokemonId: number) => {
    router.push(`/pokemon/${pokemonId}`);
  };
  const onClickPrev = () => {
    setPage((prev) => {
      if (prev && prev > 0) {
        return prev - 1;
      }
    });
  };

  const onClickNext = () => {
    setPage((prev) => {
      if (prev) {
        return prev + 1;
      }
      return 1
    });
  };

  return (
    <main>
      <div className="bg-gray-300 py-3 px-24 flex gap-2 ">
        <label>Search</label>
        <input onChange={onChange} value={search} />
      </div>
      <div className="flex justify-between px-20 pt-4">
        <button
          disabled={page === 0}
          className="border border-black p-2 rounded-lg hover:opacity-60"
          onClick={onClickPrev}
        >
          prev
        </button>
        <div> Page: {page}</div>
        <button
          className="border border-black p-2 rounded-lg hover:opacity-60"
          onClick={onClickNext}
        >
          next
        </button>
      </div>
      <div className="flex my-10 mx-20 gap-8 flex-wrap justify-center">
        {!isLoading &&
          response?.data.pokemons.map((pokemon) => {
            return (
              <button
                key={pokemon.id}
                className="border-black border h-32 w-28 bg-red-600 flex flex-col justify-between rounded-2xl overflow-hidden hover:opacity-60"
                onClick={() => onSelectPokemon(pokemon.id)}
              >
                <div className="flex flex-1">
                  <Image
                    src={
                      pokemon.pokemon_v2_pokemonsprites[0].sprites ||
                      "/poke-logo.png"
                    }
                    alt={pokemon.name + " sprite"}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="bg-white text-center w-full">
                  {pokemon.name}
                </div>
              </button>
            );
          })}
        {isLoading && <div> Loading... </div>}
        {isError && <div> Something went wrong </div>}
      </div>
    </main>
  );
}
