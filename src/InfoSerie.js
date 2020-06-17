import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) =>{
    const [form, setForm] = useState({name: ''})
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')    
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')
    const [data, setData] = useState({})

    useEffect( () =>{
        axios
        .get('/api/series/' + match.params.id)
        .then( resp => {
            setData(resp.data)
            setForm(resp.data)
        })

    }, [match.params.id])

    useEffect( () => {
        axios.get('/api/genres')
        .then(resp =>{
            setGenres(resp.data.data)//duas vezes data pq vem dentro de um wrapper   
            const genres = resp.data.data
            const encontrado = genres.find( value => data.genre === value.name) 
            if (encontrado){
                setGenreId(encontrado.id)
            }       
        })
    }, [data])

    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight:'500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

   /*const onChanceGenre = event => {
        setGenreId(event.target.value)
    }*/

    //Vamos chamar uma funcção de outra funcção e no onClick passar Função() e não apenas Função
    // usamos o spread operator para pegar todo conteúdo antigo do form e juntar com o novo de um determinado field
    const frmChange = field => evento =>{
       setForm({
           ...form,
           [field]: evento.target.value
       })
    }
    const seleciona = value => () =>{
        setForm({
            ...form,
            status: value
        })
    }

    const save = () =>{
        axios.put('/api/series/' + match.params.id, form)
        .then( resp =>{
            setSuccess(true)
        })
    }

    if (success){
        return <Redirect to='/series' />
    }

    return (
        <div className='container'>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}} >
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fluid img-thumbnail' src={data.poster} alt="Imagem"/>
                            </div>
                            <div className='col-9'>
                                <h1 className='font-weight-light text-white'> {data.name} </h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>} 
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div style={{margin:'10px'}} className='container'>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>

            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Editar Série/Filme</h1>
                    <form>          
                        <div className='form-group'>
                            <label htmlFor="name">Nome da Série ou Filme</label>
                            <input value={form.name} onChange={frmChange('name')} type="text" placeholder='Nome da série' className='form-control' id='name'/>
                        </div> 

                        <div className='form-group'>
                            <label htmlFor="name">Comentarios</label>
                            <input value={form.comments} onChange={frmChange('comments')} type="text" placeholder='Comentários da série' className='form-control' id='name'/>
                        </div>    

                        <div className='form-group'>
                            <label htmlFor="name">Gêneros</label>
                            <select className='form-control' onChange={frmChange('genre_id')} value={genreId}>
                                {genres.map(genre => 
                                    <option key={genre.id} value={genre.id} >
                                        {genre.name}
                                    </option>)
                                } 
                            </select>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" 
                                type="radio" 
                                checked={form.status === 'ASSISTIDO'}
                                name="status" 
                                id="assistido" 
                                value="ASSISTIDO" onChange={seleciona('ASSISTIDO')} />
                            <label className="form-check-label" htmlFor="ASSISTIDO">
                                Assistido
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" 
                                type="radio" 
                                checked={form.status === 'PARA_ASSISTIR'}
                                name="status" 
                                id="paraAssistir" 
                                value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')} />
                            <label className="form-check-label" htmlFor="PARA_ASSISTIR">
                                Para assistir
                            </label>
                        </div>                        
                     


                        <button style={{marginRight:'10px'}} onClick={save} className='btn btn-primary' type='button'>Salvar</button>
                        <button onClick={() => setMode('INFO')} className='btn btn-warning'>Cancelar edição</button>
                    </form>
                </div>                
            }

        </div>
    )
}

export default InfoSerie