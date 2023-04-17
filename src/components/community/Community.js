import { useEffect, useState } from "react"
export const Community=()=>{
    const[comics,setComics]=useState([])

    useEffect(
        ()=>{
             fetch(`http://localhost:8088/comics?_expand=era`)
            .then(response => response.json())
            .then((comicArray)=>{
                setComics(comicArray)
            })
            
        },
        []
    )
    return <article>
       <h1>Community Libary</h1> 
       <div className="comicContainer">
        {
            comics.map(comic=>{
                return <article key ={`comic--${comic.id}`} className="comic">
                    <section><img className="image"src={comic.photo}></img></section>
                    <section>{comic.title}</section>
                    <section>Author: {comic.author}</section>
                    <section>Era: {comic?.era?.era}</section>
                </article>
            })
        }
       </div>
    </article>
}