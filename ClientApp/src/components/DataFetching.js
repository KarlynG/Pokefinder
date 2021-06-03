import React, { useState, useEffect } from 'react'
import axios from 'axios'

function DataFetching() {
    const [pokemon, setPokemon] = useState([]);
    const [busqueda, setbusqueda] = useState('');
    const [loading, setLoading] = useState(true);
    const [pokeid, setPokeid] = useState(5);

    const onChange = (e) => {
        setbusqueda(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(false);
        setPokeid(e.target.dataset.pokemon);
    };

    const handleClick2 = (e) => {
        e.preventDefault();
        setLoading(true);
    };

    const handleClick3 = (e) => {
        e.preventDefault();
        var data = "Nombre: " + pokemon[pokeid].name + 
                    "\nPeso: " + pokemon[pokeid].weight + 
                    "0 gramos\nAltura: " + pokemon[pokeid].height + 
            "0 cm\nTipo(s): ";

        for (let i = 0; i < pokemon[pokeid].types.length; i++) {
            data = data + (pokemon[pokeid].types[i].type.name)
            if (pokemon[pokeid].types.length > 1) data = data + "/";
        }
        if (pokemon[pokeid].types.length === 2) data = data.slice(0, -1);
        
        const element = document.createElement("a");
        const file = new Blob([data], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "PokemonData.txt";
        document.body.appendChild(element); 
        element.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (busqueda == '') return;
        setbusqueda(e.target.value);
        ConsultarAPI();
        setLoading(true);
    }

    const ConsultarAPI = () => {

        axios.get(`http://localhost:5000/api/pokemons/${busqueda}`)
            .then(res => {
                setPokemon(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        ConsultarAPI();
    }, [])

    if (loading)
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div class="input-group">
                        <input
                            type="search"
                            class="form-control rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={busqueda}
                            onChange={onChange}
                            name="pokemon"
                            id="pokemon"
                        />
                        <button type="submit" class="btn btn-outline-primary">Search</button>
                    </div>

                    <br />

                    <div class="col-sm-12 grid">
                        <div class="card card-fix">
                            <div class="card text-center">
                                <div class="card-header data">
                                    <a id="datos-form">Resultados</a> <a hidden href="#" id="seleccionar">Datos Pokemon</a>
                                </div>
                            </div>

                            <div class="card-body">
                                <ul>
                                    {
                                        pokemon.map(pokemons => <li key={pokemons.id}><a href="#" data-pokemon={pokemons.id} onClick={handleClick}>{pokemons.name}</a><hr /></li>)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );

    return (
        <div>
            <>
                <form onSubmit={handleSubmit}>
                    <div class="input-group">
                        <input
                            type="search"
                            class="form-control rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={busqueda}
                            onChange={onChange}
                            name="pokemon"
                            id="pokemon"
                        />
                        <button type="submit" class="btn btn-outline-primary">Search</button>
                    </div>

                    <br />

                    <div class="col-sm-12 grid">
                        <div class="card card-fix">
                            <div class="card text-center">
                                <div class="card-header data">
                                    <a href="#" onClick={handleClick2}>Volver</a>
                                </div>
                            </div>

                            <div class="card-body">
                                <div class="card2">
                                    <img src={pokemon[pokeid].img} width="100" height="300" class="card-img-top" />
                                    <div class="card-body">
                                        <h5 class="card-title">{Capitalize(pokemon[pokeid].name)}</h5>
                                        <p class="card-text"> <strong>Peso:</strong> {pokemon[pokeid].weight}0 gramos</p>
                                        <p class="card-text"> <strong>Altura:</strong> {pokemon[pokeid].height}0 cm</p>
                                        <p class="card-text"> <strong>Tipo(s):</strong> {pokemon[pokeid].types.map(pokemons => <li>{pokemons.type.name}</li>)}</p>
                                        <br />
                                        <div class="card-footer grid bg-white">
                                            <a href="#" class="btn btn-primary" onClick={handleClick3}>Descargar datos</a>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        </div>
    );
}

export default DataFetching;