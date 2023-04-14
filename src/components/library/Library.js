import { useEffect, useState } from "react"
import "./Library.css"

export const Library=()=>{
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const [toRead,setToRead]=useState([])
    const[reading,setReading]=useState([])
    const [alreadyRead,setAlreadyRead]=useState([])
    const [eras,setEras]=useState([])
useEffect(
    ()=>{
         fetch(`http://localhost:8088/reviews?_expand=comic&readStatId=1&userId=${honeyUserObject.id}`)
        .then(response => response.json())
        .then((comicArray)=>{
            setToRead(comicArray)
        })
        
    },
    []
)
useEffect(
    ()=>{
         fetch(`http://localhost:8088/reviews?_expand=comic&readStatId=2&userId=${honeyUserObject.id}`)
        .then(response => response.json())
        .then((comicArray)=>{
            setReading(comicArray)
        })
        
    },
    []
)
useEffect(
    ()=>{
         fetch(`http://localhost:8088/reviews?_expand=comic&readStatId=3&userId=${honeyUserObject.id}`)
        .then(response => response.json())
        .then((comicArray)=>{
            setAlreadyRead(comicArray)
        })
        
    },
    []
)
useEffect(
    ()=>{
         fetch(`http://localhost:8088/eras`)
        .then(response => response.json())
        .then((comicArray)=>{
            setEras(comicArray)
        })
        
    },
    []
)





    return <article>
         <div className="library">
        <div className="reading">
        <h1>My Comic Library</h1>
       <h2>Currently Reading</h2>
       <article className="comicContainer">
       {
        (reading.length===0) ? <article className="comic"><a>You haven't added anything</a> to your Currently Reading yet</article> :
        reading.map(read=>{
            const comicEra= eras.find(era=>era.id===read?.comic?.eraId)
            return<article key={`currentlyReading--${read.id}`} className="comic">
                <article><img className="image"src={read?.comic?.photo}></img></article>
            <article>{read?.comic?.title} </article>
            <article>Author: {read?.comic?.author}</article>
          <article>Era: {comicEra?.era}</article>
            
        </article>
        })
       }
       </article>
</div>
      
 <div className="toRead">
    
       <h2>To Be Read</h2>
       <article className="comicContainer">
       {
        (toRead.length===0) ?  <article className="comic"><a>You haven't added anything</a> to your To Read yet</article> :

        toRead.map(read=>{
            const comicEra= eras.find(era=>era.id===read?.comic?.eraId)
                return<article key={`toRead--${read.id}`} className="comic">
         <article><img className="image"src={read?.comic?.photo}></img></article>
            <article>{read?.comic?.title} </article>
            <article>Author: {read?.comic?.author}</article>
            <article>Era: {comicEra?.era}</article>
             </article>
        } )
       }
       </article>
</div>  
<div className="alreadyRead">
       <h2>Already Read</h2>
       <article className="comicContainer">
       {
        (alreadyRead.length===0) ?  <article className="comic"><a>You haven't added anything</a> to your Already Read yet</article> :
        alreadyRead.map(read=>{
            const comicEra= eras.find(era=>era.id===read?.comic?.eraId)
            return<article key={`alreadyRead--${read.id}`} className="comic">
           <article><img className="image"src={read?.comic?.photo}></img></article>
                <article>{read?.comic?.title} </article>
                <article>Author: {read?.comic?.author}</article>
                <article>Era: {comicEra?.era}</article>
            </article>
        })
       }
       </article>
</div>
</div>
    </article>
}