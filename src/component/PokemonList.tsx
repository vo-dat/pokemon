import React, { useState } from 'react';
import PokemonBlock from './Pokemon';
import './style.css';
interface Props {
  pokemons: Pokemon[];
}
export interface Pokemon {
  id: number;
  name: string;
  sprites?: {
    front_default: string;
  };
}
export default function PokemonList(props: Props) {
  const { pokemons } = props;
  return (
    <section className='pokemon-section'>
      {pokemons.map((item: Pokemon) => {
        return <PokemonBlock pokemon={item} index={item.id} />;
      })}
    </section>
  );
}
