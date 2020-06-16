import React, { useState} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () =>{

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    const frmChange = evento =>{
       setName(evento.target.value)
    }

    const save = () =>{
        axios.post('/api/series', {
            name
        })
        .then( resp =>{
            console.log(resp)
            setSuccess(true)
        })
    }

    if (success){
        return <Redirect to='/series' />
    }

    return (
        <div className='container'>
            <h1>Nova Série</h1>

            <form>
                <div className='form-group'>
                    <label htmlFor="name">Nome</label>
                    <input value={name} onChange={frmChange} type="text" placeholder='Nome da série' className='form-control' id='name'/>
                </div>    
                <button onClick={save} className='btn btn-primary' type='button'>Salvar</button>
            </form>
        </div>
    )
}

export default NovaSerie