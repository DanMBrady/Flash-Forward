import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
export const Community=({ searchTermState })=>{
    const [comics,setComics]=useState([])
    const [reviews,setReviews]=useState([])
    const [comicsBack,setComicsB]=useState([])
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const navigate= useNavigate()

    const getAllReviews= ()=>{
        fetch("http://localhost:8088/reviews")
       .then(response => response.json())
       .then((ticketArray) => {
        setReviews(ticketArray)
       })
    }

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

    useEffect(
        ()=>{
             fetch(`http://localhost:8088/comics?_expand=era`)
            .then(response => response.json())
            .then((comicArray)=>{
                setComicsB(comicArray)
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

    const handleSaveButtonClick = (event,comicId) => {
        event.preventDefault()
        
    
       
        const ToSendToAPIReview = {
         readStatId:2,
         review:"",
         userId:honeyUserObject.id,
         comicId:comicId,
         isFavorite:false
        }
    
      
    
        
        return fetch("http://localhost:8088/reviews", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(ToSendToAPIReview)
        })
        .then(response => response.json())
        .then(getAllReviews)
    }

    useEffect(
        ()=>{
            const searchedComics = comics.filter(comic=> {

                return comic.title.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            if(searchTermState !==""){
                setComics(searchedComics)
                }
                else{
                    setComics(comicsBack)
                }
        },
        [ searchTermState ]
    ) 

    return <article>
       <div className="comicContainer">
        {
            comics.map(comic=>{
                const comicReviews= reviews.filter(review=>review.comicId===comic.id)
                const userReview = comicReviews.filter(comic=> comic.userId === honeyUserObject.id)
                const comicId=comic.id
                return <article key ={`comic--${comic.id}`} className="comicC">
                    <div className="comicTop">
                    <section><img className="image"src={comic.photo}></img></section>
                    <section>{comic.title}</section>
                    <section>Author: {comic.author}</section>
                    <section>Era: {comic?.era?.era}</section>
                    </div>
                    <section>{ (userReview.length === 0) ?
                        <button className="buttonR" onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent,comicId)}>Add Comic</button> : ""
                        }</section>
                       
                </article>
            })
        }
       </div>
    </article>
}