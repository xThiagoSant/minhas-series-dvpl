import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({match}) =>{
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('EDIT')
    const [data, setData] = useState({})
    const [genres, setGenres] = useState([])

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
        })
    }, [])

    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight:'500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    //Vamos chamar uma funcção de outra funcção e no onClick passar Função() e não apenas Função
    // usamos o spread operator para pegar todo conteúdo antigo do form e juntar com o novo
    const frmChange = field => evento =>{
       setForm({
           ...form,
           [field]: evento.target.value
       })
    }

    const save = () =>{
        axios.put('/api/series/' + match.params.id, form)
        .then( resp =>{
            console.log(resp)
            setSuccess(true)
        })
    }

    if (success){
        return <Redirect to='/series' />
    }

    return (
        <div>
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
                                    <Badge color='success'>Assistido</Badge>
                                    <Badge color='warning'>Para assistir</Badge>
                                    Gênero: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>

            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Nova Série</h1>
                    <form>              
                        <div className='form-group'>
                            <label htmlFor="name">Nome</label>
                            <input value={form.name} onChange={frmChange('name')} type="text" placeholder='Nome da série' className='form-control' id='name'/>
                        </div> 

                        <div className='form-group'>
                            <label htmlFor="name">Comentarios</label>
                            <input value={form.comments} onChange={frmChange('comments')} type="text" placeholder='Comentários da série' className='form-control' id='name'/>
                        </div>    

                        <div className='form-group'>
                            <label htmlFor="name">Gêneros</label>
                            <select className='form-control' onChange={frmChange('genre_id')}>
                                {genres.map(genre => 
                                    <option key={genre.id} value={genre.id} select={genre.id === form.genre_id}>
                                        {genre.name}
                                    </option>)
                                } 
                            </select>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO" checked />
                            <label className="form-check-label" Htmlfor="ASSISTIDO">
                                Assistido
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" />
                            <label className="form-check-label" Htmlfor="PARA_ASSISTIR">
                                Para assistir
                            </label>
                        </div>                        
                     


                        <button onClick={save} className='btn btn-primary' type='button'>Salvar</button>
                        <button onClick={() => setMode('INFO')} className='btn btn-warning'>Cancelar edição</button>
                    </form>
                </div>                
            }

        </div>
    )
}

export default InfoSerie