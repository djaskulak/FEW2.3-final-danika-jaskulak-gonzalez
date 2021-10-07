import './starwars.css';
import { useState } from "react";


function StarWars () {
    const [id, setID] = useState()
    const [data, setData] = useState(null)
    const [list, setList] = useState([])

    const savedList = list.map(char => {
        return (
            <div className="savedCard">
                <h1>Saved Characters</h1>
                <div>
                    <h3>Character Details:</h3>
                    <div>Name: {char.name}</div>
                    <div>Height: {char.height}</div>
                    <div>Mass: {char.mass}</div>
                    <div>Hair Color: {char.hair_color}</div>
                    <div>Eye Color: {char.eye_color}</div>
                </div>

                <div>
                    <h3>Homeworld:</h3>
                    <div>Planet: {char.homeworld.name}</div>
                    <div>Terrain: {char.homeworld.terrain}</div>
                    <div>Population: {char.homeworld.population}</div>
                </div>

                <div>
                    <h3>Appears in:</h3>
                    {char.films.map(film => {
                        return(
                            <div>
                                {film.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    })

    return (
        <div className="StarWars">
            <div className='inputSection'>
                <input type='number' min="1" max="83" placeholder='Character ID'
                    onChange={e => {
                        setID(e.target.value)
                    }}
                ></input>
                <button
                    onClick={e => {
                        getData(id)
                    }}
                >Enter</button>
            </div>

            <div className="content">
                <div className="data">
                    {data && 
                        <div>
                            <div>
                                <h3>Character Details:</h3>
                                <div>Name: {data.name}</div>
                                <div>Height: {data.height}</div>
                                <div>Mass: {data.mass}</div>
                                <div>Hair Color: {data.hair_color}</div>
                                <div>Eye Color: {data.eye_color}</div>
                            </div>

                            <div>
                                <h3>Homeworld:</h3>
                                <div>Planet: {data.homeworld.name}</div>
                                <div>Terrain: {data.homeworld.terrain}</div>
                                <div>Population: {data.homeworld.population}</div>
                            </div>

                            <div>
                                <h3>Appears in:</h3>
                                {data.films.map(film => {
                                    return(
                                        <div>
                                            {film.title}
                                        </div>
                                    )
                                })}
                            </div>

                            <button 
                                onClick={e => {
                                    setList([...list, data])
                                }}
                            >
                                Save
                            </button>
                        </div>
                    }
                </div>

                <div className="savedList">
                    {list && savedList}
                </div>
            </div>
        </div>
    )

    async function getData (id) {
        const res = await fetch(`https://swapi.dev/api/people/${id}/`)
        const json = await res.json()

        console.log(json)

        if(!json.detail){
            const homeworldRes = await fetch(json.homeworld)
            const homeworldJSON = await homeworldRes.json()

            const filmsRes = await Promise.all(json.films.map(film => fetch(film)))
            const filmsJSON = await Promise.all(filmsRes.map(res => res.json()))

            json.homeworld = homeworldJSON
            json.films = filmsJSON

            setData(json)
        }
    }
}

export default StarWars