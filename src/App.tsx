import axios from 'axios';
import { type } from 'os';
import React, { useEffect, useState } from 'react';
import { isatty } from 'tty';
import { BooleanLiteral } from 'typescript';
import './App.css';
import PokemonList from './component/PokemonList';
interface Poke {
  pokemon: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}
interface Type {
  name: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [param, setParam] = useState<string>('pokemon?limit=10&offset=200');
  const [types, setTypes] = useState<Type[]>([]);
  const [load, setLoad] = useState<String>('');
  const [isActive, setActive] = useState<any>({ id: -1, active: true });

  const getPokemons = async (param: string) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/${param}`);

    if (res.data.next == undefined) {
      res.data.pokemon.forEach(async (poke: Poke) => {
        const p = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.pokemon.name}`);
        setPokemons((pokemon) => [...pokemon, p.data]);
      });
    } else {
      setLoad(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemon) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setPokemons((pokemon) => [...pokemon, poke.data]);
      });
    }
  };
  const getType = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/type');
    setTypes(res.data.results);
  };
  const init = () => {
    setPokemons([]);
    getType();
    getPokemons(param);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    getPokemons(param);
  }, [param]);

  const handelLoadMore = async () => {
    const res = await axios.get(`${load}`);
    setLoad(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((pokemon) => [...pokemon, poke.data]);
    });
  };

  const handleType = (name: string, index: number) => {
    setActive({ id: index, isActive: true });

    index++;
    setPokemons([]);
    setParam('type/' + index);
  };

  return (
    <div className='App'>
      <header className='header-container'>Pokemon</header>
      <div className='type-container'>
        <div
          className='content'
          onClick={() => {
            setPokemons([]);
            setActive({ id: -1, active: true });
            setParam('pokemon?limit=10&offset=200');
          }}
          style={isActive.id === -1 ? { background: '#000' } : {}}
        >
          Random
        </div>
        {!!types &&
          types.map((item, index) => {
            return (
              <div
                className='content'
                style={isActive.id === index ? { background: '#000' } : {}}
                onClick={() => handleType(item.name, index)}
              >
                {item.name}
              </div>
            );
          })}
      </div>
      <PokemonList pokemons={pokemons} />

      {isActive.id === -1 && <button onClick={handelLoadMore}>Load More</button>}
    </div>
  );
}

export default App;
