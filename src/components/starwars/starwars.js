import './starwars.css';
import { useState } from "react";


function StarWars () {
    const [id, setID] = useState()
    const [data, setData] = useState(null)

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

            <div className="data">
                {data && 
                    <div>
                        <div>Name: {data.name}</div>
                        <div>Height: {data.height}</div>
                        <div>Mass: {data.mass}</div>
                        <div>Hair Color: {data.hair_color}</div>
                        <div>Eye Color: {data.eye_color}</div>
                    </div>
                }
            </div>
        </div>
    )

    async function getData (id) {
        const res = await fetch(`https://swapi.dev/api/people/${id}/`)
        const json = await res.json()

        console.log(json)

        if(!json.detail){
            setData(json)
        }
    }
}

export default StarWars