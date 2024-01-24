import React from 'react'
import './style/Pagination.css'

const Pagination = ({pokemons,setPage, page, currentBlock, setCurrentBlock}) => {
    const pageNumbers = [];
    const maxPagesPerBlock = 1
    const totalPages = Math.ceil(pokemons?.results.length / 18)
    const pageBloks = Math.ceil(totalPages / maxPagesPerBlock)

    for(let i = (currentBlock - 1)* maxPagesPerBlock; i < currentBlock * maxPagesPerBlock; i++ ){
        if(i + 1 <=totalPages){
            pageNumbers.push(i+1)
        }
    }
    

    const previewsBlock = () => {
        setCurrentBlock(e => e-1)
        setPage((currentBlock -2) * maxPagesPerBlock)
    }
    const nextBlock = () => {
        setCurrentBlock(e => e+1)
        setPage((currentBlock) * maxPagesPerBlock)
    }
  return (
    <div className='card-pagination'>
        <ul className='numberPages'>
            {
                currentBlock !== 1 && <button className='pagination__btn-prev' onClick={previewsBlock}>Previous</button>
            }

            <h1>{page + 1}</h1>
            
            {
                pageNumbers.map(number => (
                    <li key={number}>
                        <a className={page + 1 === number && 'active-page'} onClick={() => setPage(number - 1)}>                            
                        </a>
                    </li>
                ))
            }
            {
                currentBlock !== pageBloks && <button className='pagination__btn-next' onClick={nextBlock}>Next</button>
            }
        </ul>
    </div>
  )
}

export default Pagination