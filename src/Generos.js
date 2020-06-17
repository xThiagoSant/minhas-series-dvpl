import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Generos = () =>{
    const [data, setData] = useState([])
    useEffect(() =>{
        axios.get('/api/genres')
            .then(resp => {
                setData(resp.data.data)
            })
    }, [])

    const deleteGenero = id =>{
        axios.delete('/api/genres/' + id)
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
                    <button style={{marginRight: '10px'}} className='btn btn-danger' onClick={() => deleteGenero(records.id)}>Remover</button>
                    <Link to={'/generos/' + records.id} className='btn btn-warning'>Editar</Link>
                </td>

            </tr>            
        )
    }

    if(data.length === 0){
        return(
            <div className='container'>
                <h1>Gêneros</h1>
                <div><Link to='/generos/novo' className='btn btn-primary'>Novo Gênero</Link></div>
                <div className="alert alert-warning" role="alert">
                    VoCê não possui gêneros criados.
                </div>                
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Gêneros</h1>
            <div style={{marginBottom:'10px'}}><Link to='/generos/novo' className='btn btn-primary'>Novo Gênero</Link></div>
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

export default Generos