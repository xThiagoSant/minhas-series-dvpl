import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Series = () =>{
    const [data, setData] = useState([])
    useEffect(() =>{
        axios.get('/api/series')
            .then(resp => {
                setData(resp.data.data)
            })
    }, [])

    const deleteSeries = id =>{
        axios.delete('/api/series/' + id)
        .then(resp =>{
            const filrtado = data.filter(item => item.id !== id)
            setData(filrtado)
        })
    }

    const renderizaLinha = records =>{
        return (
            <tr key={records.id}>
                <th scope="row">{records.id}</th>
                <td>{records.name}</td>
                <td>
                    <button style={{marginRight: '10px'}} className='btn btn-danger' onClick={() => deleteSeries(records.id)}>Remover</button>
                    <Link to={'/series/' + records.id} className='btn btn-warning'>Info</Link>
                </td>

            </tr>            
        )
    }

    if(data.length === 0){
        return(
            <div className='container'>
                <h1>Série e Filmes</h1>
                <div><Link to='/series/novo' className='btn btn-primary'>Nova Série/Filme</Link></div>
                <div className="alert alert-warning" role="alert">
                    Você não possui séries ou filmes criados.
                </div>                
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Séries e Filmes</h1>
            <div style={{marginBottom:'10px'}}><Link to='/series/novo' className='btn btn-primary'>Nova Série/Filme</Link></div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>
        
    )
  }

export default Series