import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ({match}) =>{

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() =>{
        axios.get('/api/genres/' + match.params.id)
        .then(resp =>{
            setName(resp.data.name)
        })
    }, [match.params.id])

    const frmChange = evento =>{
       setName(evento.target.value)
    }

    const save = () =>{
        axios.put('/api/genres/' + match.params.id, {
            name
        })
        .then( resp =>{
            console.log(resp)
            setSuccess(true)
        })
    }

    if (success){
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1>Editar Gênero</h1>

            <form>
                <div className='form-group'>
                    <label htmlFor="name">Nome</label>
                    <input value={name} onChange={frmChange} type="text" placeholder='Nome do gênero' className='form-control' id='name'/>
                </div>    
                <button onClick={save} className='btn btn-primary' type='button'>Salvar</button>
            </form>
        </div>
    )
}

export default EditarGenero