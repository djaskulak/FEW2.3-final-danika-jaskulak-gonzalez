import { useState } from "react";


function StarWars () {
    const [id, setID] = useState()
    const [data, setData] = useState(null)

    return (
        <div className="StarWars">
            <div className='input'>
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

            <div className="characterData">

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