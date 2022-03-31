import React, { useEffect, useState } from 'react';
import { Pokemon } from './PokemonList';

interface PokemonDetail extends Pokemon {
  abilities?: {
    ability: {
      name: string;
      url: string;
    };
  }[];
}
interface Props {
  pokemon: PokemonDetail;
  index: number;
}

export default function PokemonBlock(props: Props) {
  const { index, pokemon } = props;
  const [selectectedPokemon, setSelectectedPokemon] = useState<PokemonDetail>({ id: 0, name: '' });
  const [isOpen, setOpen] = useState<boolean>(false);

  const handelSelectPokemon = (id: number) => {
    if (isOpen === false && id === index) {
      setSelectectedPokemon(pokemon);
      setOpen(!isOpen);
    }
  };
  const handleCLose = () => {
    setOpen(!isOpen);
    setSelectectedPokemon({ id: 0, name: '' });
  };

  return (
    <>
      {isOpen && !!selectectedPokemon ? (
        <div className='pokemon-container-active'>
          <div className='pokemon-block'>
            <p className='close-btn' onClick={handleCLose}>
              X
            </p>
            <div className=''>
              <h3 style={{ textTransform: 'uppercase', fontSize: '24px' }}>{selectectedPokemon.name}</h3>
              <div className='content'>
                <img src={selectectedPokemon.sprites?.front_default} alt='image-poke'></img>
                <div className='skill-block'>
                  <h3>Skill:</h3>
                  {selectectedPokemon?.abilities?.map((item) => {
                    return (
                      <>
                        <li>{item.ability.name}</li>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='pokemon-container'
          onClick={() => {
            handelSelectPokemon(pokemon.id);
          }}
        >
          <h3>{pokemon.name}</h3>

          <img src={pokemon.sprites?.front_default} alt='image-poke'></img>
        </div>
      )}
    </>
  );
}
