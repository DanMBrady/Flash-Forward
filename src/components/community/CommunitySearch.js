import { useEffect, useState } from "react"
import "./Community.css"

export const CommunitySearch =({ setterFunction, selectFunction, setterAuthorFunction })=>{
    const [eras,setEras]=useState([])
    const era ={}
    useEffect(
        ()=>{
             fetch(`http://localhost:8088/eras`)
            .then(response => response.json())
            .then((eraArray)=>{
                setEras(eraArray)
            })
            
        },
        []
    )
    return <article>
          <h1>Community Library</h1> 
          <div>
            <input 
            onChange={
                (changeEvent)=>{
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Find Comics" />
             <input className="searchAuthor"
            onChange={
                (changeEvent)=>{
                    setterAuthorFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Find Authors" />
<select className="comicSearch" onChange={
    (changeEvent)=>{
        selectFunction(changeEvent.target.value)
    }
}><option value={10}>All</option>
   {eras.map(era=>{
        return <option value={era.id} key ={era.id}>{era.era}</option>
    })
    }
</select>
        </div>
    </article>
}