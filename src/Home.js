import React from 'react'
import fundoIMG from './home.png'

const Home = () => {
    return (
      <div className='container text-center'>
        <h1>Registre suas séries e filmes</h1>
        <img className="img-fluid rounded" src={fundoIMG} alt="MINHAS SERIES"/>
      </div>
    )
  }

export default Home