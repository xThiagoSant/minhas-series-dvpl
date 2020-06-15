import React, { useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovoGenero = () =>{

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    const frmChange = evento =>{
       setName(evento.target.value)
    }

    const save = () =>{
        axios.post('/api/genres', {
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
            <h1>Novo Gênero</h1>

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

export default NovoGenero