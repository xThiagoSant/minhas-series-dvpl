import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NovaSerie = () =>{

    const [form, setForm] = useState({
        status: 'PARA_ASSISTIR'
    })
  
    const [genres, setGenres] = useState([]) 
    const [success, setSuccess] = useState(false)

    useEffect( () => {
        axios.get('/api/genres')
        .then(resp =>{
            setGenres(resp.data.data)    
        })
    }, [form])    

    const frmChange = field => evento =>{
        setForm({
            ...form,
            [field]: evento.target.value
        })
    }

    const save = () =>{
        //console.log(form)
        axios.post('/api/series', form)
        .then( resp =>{
            setSuccess(true)
        })
    }

    if (success){
        return <Redirect to='/series' />
    }

    return (
        <div className='container'>
            <h1>Nova Série/Filme</h1>

            <form>
                <div className='form-group'>
                    <label htmlFor="name">Nome</label>
                    <input value={form.name} 
                        onChange={frmChange('name')} 
                        type="text" 
                        placeholder='Nome da série' 
                        className='form-control' id='name'/>
                </div> 
                
                <div className='form-group'>
                    <label htmlFor="name">Comentarios</label>
                    <input value={form.comments} 
                        onChange={frmChange('comments')} 
                        type="text" 
                        placeholder='Comentários da série' 
                        className='form-control' id='comments'/>
                </div>    

                <div className='form-group'>
                    <label htmlFor="name">Gêneros</label>
                    <select className='form-control' onChange={frmChange('genre_id')} value={form.genre_id}>
                        {genres.map(genre => 
                            <option key={genre.id} value={genre.id} >
                                {genre.name}
                            </option>)
                        } 
                    </select>
                </div>                
                
                <button onClick={save} className='btn btn-primary' type='button'>Salvar</button>
            </form>
        </div>
    )
}

export default NovaSerie