import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export const Community=({ searchTermState,selectTermState, searchTermAuthor })=>{
    const [comics,setComics]=useState([])
    const [reviews,setReviews]=useState([])
    const [filteredComics,setfilteredComics]=useState([])
    const [eras,setEras]=useState([{
        id:1
    }])
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)

    const navigate= useNavigate()


    useEffect(
        ()=>{
             fetch(`http://localhost:8088/comics?_sort=title&_expand=era`)
            .then(response => response.json())
            .then((comicArray)=>{
                setComics(comicArray)
                setfilteredComics(comicArray)
            })
            
        },
        []
    )

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


    useEffect(
        ()=>{
             fetch(`http://localhost:8088/reviews`)
            .then(response => response.json())
            .then((reviewArray)=>{
                setReviews(reviewArray)
            })
            
        },
        []
    )

    const communitySorted = filteredComics.sort(function(a,b) {
        if(a.title.toLowerCase() < b.title.toLowerCase()
        ) return -1
        if(a.title.toLowerCase() > b.title.toLowerCase()
        ) return 1
        return 0
    })


    useEffect(
        ()=>{
            const searchedComics = comics.filter(comic=> {

                return comic.title.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            
               setfilteredComics(searchedComics)
              
               
                
        },
        [ searchTermState ]
    ) 
    useEffect(
        ()=>{
            const searchedAuthors = comics.filter(comic=> {

                return comic.author.toLowerCase().startsWith(searchTermAuthor.toLowerCase())
            })
            
               setfilteredComics(searchedAuthors)
              
               
                
        },
        [ searchTermAuthor ]
    ) 
    useEffect(
        ()=>{
           
             if(selectTermState === "10"){
                     setfilteredComics(comics)
    
                }else{
                    setfilteredComics(comics.filter(comic=> comic.eraId === parseInt(selectTermState)
                         ))
                }
    
        },
        [ selectTermState ]
    ) 

    return <article>
       <div className="comicContainer">
        {
            communitySorted.map(comic=>{
                const comicReviews= reviews.filter(review=>review.comicId===comic.id)
                const userReview = comicReviews.filter(comic=> comic.userId === flashUserObject.id)
                const comicId=comic.id
                return <article key ={`comic--${comic.id}`} className="comicNewC">
                    
                    <section><Link to={`/community/${comic.id}/reviews`}><img className="imageNew"src={comic.photo}></img></Link></section>
                    <div className="comicLeft">
                    <section>{comic.title}</section>
                    <section className="small">Author: {comic.author}</section>
                    <section className="small">Era: {comic?.era?.era}</section>
                    </div>
                       
                </article>
            })
        }
       </div>
    </article>
}