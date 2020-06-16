import React from 'react';
import Header from './Header'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import Series from './Series'
import NovaSerie from './NovaSerie'
import InfoSerie from './InfoSerie'

const Home = () => {
  return <h1>Home</h1>
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditarGenero} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={NovaSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />
        </Switch>
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
// usar o switch para selecionar apenas uma rota quando for encontrada