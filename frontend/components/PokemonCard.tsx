import { FC } from "react";

interface PokemonCardProps {
  pokemon: {
    name: string;
    src: string;
  };
  index: number;
  onClick: () => void;
  pokeCount: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ pokemon, onClick, index, pokeCount }) => {
  return (
    <div className={"flex flex-col p-4 border border-3 border-pink-900 rounded-lg"} key={index}>
      <img src={pokemon.src} alt={pokemon.name} className={"block w-full h-[200px] object-cover"} />
      <p className={"capitalize"}>{pokemon.name}</p>
      <p>{pokeCount}</p>
      <button className={"bg-pink-800 rounded-lg px-3 py-2 w-fit text-white"} onClick={onClick}>
        Add {pokemon.name}
      </button>
    </div>
  );
};

export default PokemonCard;
