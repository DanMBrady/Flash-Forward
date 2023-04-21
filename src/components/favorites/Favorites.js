import { useEffect, useState } from "react"

export const Favorites =() =>{
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const [comics,setComics] =useState([])
    const [eras,setEras]=useState([])
    useEffect(
        ()=>{
             fetch(`http://localhost:8088/reviews?_expand=comic&isFavorite=true&userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((comicArray)=>{
                setComics(comicArray)
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
    const comicsSorted = comics.sort(function(a,b) {
        if(a.comic.title.toLowerCase() < b.comic.title.toLowerCase()
        ) return -1
        if(a.comic.title.toLowerCase() > b.comic.title.toLowerCase()
        ) return 1
        return 0
    })
    const noFavorites = comics.every(comic=> comic?.comic?.isFavorite === false)
    return <article>
        <h1>My Favorites</h1>
        <article className="comicContainer">
        {
            (noFavorites) ? <article className="comic"><a>You haven't added anything</a> to your Favorites yet</article> :
            comicsSorted.map(comic=>{
                const comicEra= eras.find(era=>era.id===comic?.comic?.eraId)
                return<article key ={comic.id} className="comic">
                     <article><img className="image"src={comic?.comic?.photo}></img></article>
                <section>{comic?.comic?.title}</section>
                <article>Author: {comic?.comic?.author}</article>
                <article>Era: {comicEra?.era}</article>
                </article>
        })
}
</article>
    </article>
}