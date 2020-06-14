import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Generos = () =>{
    const [data, setData] = useState([])
    useEffect(() =>{
        axios.get('/api/genres')
            .then(resp => {
                setData(resp.data.data)
            })
    }, [])

    const renderizaLinha = records =>{
        return (
            <tr key={records.id}>
                <th scope="row">{records.id}</th>
                <td>{records.name}</td>
                <td><button>+</button></td>
            </tr>            
        )
    }

    if(data.length === 0){
        return(
            <div className='container'>
                <h1>Gêneros</h1>
                <div className="alert alert-warning" role="alert">
                    VoCê não possui gêneros criados.
                </div>                
            </div>
        )
    }

    return (
        <div className='container'>
            <h1>Generos</h1>

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