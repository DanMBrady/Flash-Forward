import { useEffect, useState } from "react"
import "./Library.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Library=()=>{
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)
    const [toRead,setToRead]=useState([])
    const[reading,setReading]=useState([])
    const [alreadyRead,setAlreadyRead]=useState([])
    const [eras,setEras]=useState([])
    const navigate=useNavigate()
useEffect(
    ()=>{
         fetch(`http://localhost:8088/reviews?_expand=comic&readStatId=2&userId=${flashUserObject.id}`)
        .then(response => response.json())
        .then((comicArray)=>{
            setToRead(comicArray)
        })
        
    },
    []
)
useEffect(
    ()=>{
         fetch(`http://localhost:8088/reviews?_expand=comic&readStatId=1&userId=${flashUserObject.id}`)
        .then(response => response.json())
        .then((comicArray)=>{
            setReading(comicArray)
        })
        
    },
    []
)
useEffect(
    ()=>{
         fetch(`http://localhost:8088/reviews?_expand=comic&readStatId=3&userId=${flashUserObject.id}`)
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

const readingSorted = reading.sort(function(a,b) {
    if(a.comic.title.toLowerCase() < b.comic.title.toLowerCase()
    ) return -1
    if(a.comic.title.toLowerCase() > b.comic.title.toLowerCase()
    ) return 1
    return 0
})
const toReadSorted = toRead.sort(function(a,b) {
    if(a.comic.title.toLowerCase() < b.comic.title.toLowerCase()
    ) return -1
    if(a.comic.title.toLowerCase() > b.comic.title.toLowerCase()
    ) return 1
    return 0
})
const alreadyReadSorted = alreadyRead.sort(function(a,b) {
    if(a.comic.title.toLowerCase() < b.comic.title.toLowerCase()
    ) return -1
    if(a.comic.title.toLowerCase() > b.comic.title.toLowerCase()
    ) return 1
    return 0
})



    return <article>
        <h1 className="libHead">My Library</h1>
        <button className="button-29" onClick={() => navigate("/newComic")}>New Comic</button>
        
        <div className="reading">
       <h2>Currently Reading</h2>
       <article className="comicContainer">
       {
        (reading.length===0) ? <article className="comic"><a>You haven't added anything</a> to your Currently Reading yet</article> :
        readingSorted.map(read=>{
            const comicEra= eras.find(era=>era.id===read?.comic?.eraId)

            return<article key={`currentlyReading--${read.id}`} className="comicNewC">
                
                <article><Link  to={`/library/${read?.comic?.id}`}><img className="imageNew"src={read?.comic?.photo}></img></Link></article>
                <div className="comicLeft">
            <article>{read?.comic?.title} </article>
            <article className="small">Author: {read?.comic?.author}</article>
          <article className="small">Era: {comicEra?.era}</article>
          </div>
        </article>
        })
       }
       </article>
</div>
      
 <div className="toRead">
    
       <h2 className="readHeader">To Be Read</h2>
       <article className="comicContainer">
       {
        (toRead.length===0) ?  <article className="comic"><a>You haven't added anything</a> to your To Be Read yet</article> :

        toReadSorted.map(read=>{
            const comicEra= eras.find(era=>era.id===read?.comic?.eraId)
                return<article key={`toRead--${read.id}`} className="comicNewC">
                    
         <article><Link to={`/library/${read?.comic?.id}`}><img className="imageNew"src={read?.comic?.photo}></img></Link></article>
         <div className="comicLeft">
            <article>{read?.comic?.title} </article>
            <article className="small">Author: {read?.comic?.author}</article>
            <article className="small">Era: {comicEra?.era}</article>
            </div>
             </article>
        } )
       }
       </article>
</div>  
<div className="alreadyRead">
       <h2 className="readHeader">Already Read</h2>
       <article className="comicContainer">
       {
        (alreadyRead.length===0) ?  <article className="comic"><a>You haven't added anything</a> to your Already Read yet</article> :
        alreadyReadSorted.map(read=>{
            const comicEra= eras.find(era=>era.id===read?.comic?.eraId)
            return<article key={`alreadyRead--${read.id}`} className="comicNewC">
                 
           <article><Link to={`/library/${read?.comic?.id}`}><img className="imageNew"src={read?.comic?.photo}></img></Link></article>
           <div className="comicLeft">
                <article><Link className="titleLinkNew" to={`/library/${read?.comic?.id}/add`}>{read?.comic?.title}</Link></article>
                <article className="small">Author: {read?.comic?.author}</article>
                <article className="small">Era: {comicEra?.era}</article>
               </div>
                
            </article>
        })
       }
       </article>
</div>
    </article>
}