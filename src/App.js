import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Header from './Header'
import { BrowserRouter, Route} from 'react-router-dom'
import Generos from './Generos'

const Home = () => {
  return <h1>Home</h1>
}

function App() {
  const [data, setData] = useState({})

  useEffect(()=>{
    axios.get('/api')
      .then( resp => {
        setData(resp.data)
      })
  }, [])


  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route path='/' exact component={Home} />
        <Route path='/generos' exact component={Generos} />
        <pre>{JSON.stringify(data)}</pre>
      </div>       
    </BrowserRouter>
  );
}

export default App;
// esse app vai usar bootstrap: yarn add bootstrap
// e para as interações com ele vamos adicionar um modulo chamada reacstrap: yarn add reactstrap
// sempre que não existe a pasta node_modules: yarn ou npm install
// para usar as rotas instalamos o react-router-dom
// para fazer requisições vamos usar o axios: yarn add axios
// nessa aula instalamos um servidor como dependencia uasndo yarn add https://github.com/tuliofaria/minhas-series-server
// e usou um jeitinho usando proxy para executar ambos