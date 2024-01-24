import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pagination from './Pokedex/Pagination'
import PokemonCard from './Pokedex/PokemonCard'
import SearchInput from './Pokedex/SearchInput'
import SelectType from './Pokedex/SelectType'
import HeaderPoke from './shared/HeaderPoke'
import './styles/pokedex.css'

const Pokedex = () => {
  const [currentBlock, setCurrentBlock] = useState(1)
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [optionType, setOptionType] = useState('All')

  useEffect(() => {
    if(optionType !== 'All'){
// Aqui se hace la logica cuando el usuario quiere filtrar por tipo
      const URL = `https://pokeapi.co/api/v2/type/${optionType}/`
      axios.get(URL)
        .then(res => {
          const arr = res.data.pokemon.map(e => e.pokemon)
          setPokemons({results: arr})
      })
        .catch(err => console.log(err))
      } else if(pokeSearch){
        // Aqui se hace la lógica cuando el usuario busca por el input
      const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`        
      const obj = {
        results: [{url}]
        }
        setPokemons(obj)
    } else{
        // Aqui se hace la logica cuando el usuario quiere todos los pokemon
        const URL = `https://pokeapi.co/api/v2/pokemon/?limit=9999999999999&offset=0`
        axios.get(URL)
        .then(res => setPokemons(res.data))
        .catch(err => console.log(err))      
    }
  }, [pokeSearch, optionType, page])


  const nameTrainer = useSelector(state => state.nameTrainer)

  return (
    <div>
      <HeaderPoke />      
      <h2>Welcome {nameTrainer},<span> search your favorite pokemon.</span></h2>
      <SearchInput setPokeSearch={setPokeSearch} setOptionType={setOptionType} />      
      <div>        
      </div>
      <Pagination 
      pokemons={pokemons}
      page={page}
      setPage={setPage}
      currentBlock ={currentBlock}
      setCurrentBlock={setCurrentBlock}
      />
      <div className='cards-container'>
        {
          pokemons?.results.slice(page *20,(page +1)*20).map(pokemon => (
            <PokemonCard 
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
      </div> 
      <Pagination 
      pokemons={pokemons}
      page={page}
      setPage={setPage}
      currentBlock ={currentBlock}
      setCurrentBlock={setCurrentBlock}
      />     
    </div>
  )
}

export default Pokedex