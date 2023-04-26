import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
export const CommunityReviews =()=>{
    const navigate= useNavigate()
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)
    const {comicId} = useParams()
    const [comic,setComic]=useState([])
    const [reviews,setReviews]=useState([])
    const [allReviews,setReviewsAll]=useState([])

    const getAllReviews= ()=>{
        fetch("http://localhost:8088/reviews")
       .then(response => response.json())
       .then((ticketArray) => {
        setReviewsAll(ticketArray)
       })
    }
    useEffect(
        ()=>{
             fetch(`http://localhost:8088/reviews`)
            .then(response => response.json())
            .then((reviewArray)=>{
                setReviewsAll(reviewArray)
            })
            
        },
        []
    )
    useEffect(
        ()=>{
            fetch(`http://localhost:8088/reviews?_expand=user&comicId=${comicId}`)
            .then(response => response.json())
            .then((data)=>{
                setReviews(data)
            })
        },
        [comicId]
       )
       useEffect(
        ()=>{
            fetch(`http://localhost:8088/comics?id=${comicId}`)
            .then(response => response.json())
            .then((data)=>{
                const singleReview =data[0]
                setComic(singleReview)
            })
        },
        [comicId]
       )
       const noReviews = reviews.every(review=> review.review === "")


       const handleDeleteButtonClick = (event) => {
        event.preventDefault()
        
        
        return fetch(`http://localhost:8088/comics/${comicId}`, {
            method:"DELETE"
        })
        .then(() =>{
            navigate("/community")
        }) 
    }
    const handleSaveButtonClick = (event,CorrectComicId) => {
        event.preventDefault()
        
    
       
        const ToSendToAPIReview = {
         readStatId:2,
         review:"",
         userId:flashUserObject.id,
         comicId:CorrectComicId,
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
    const comicReviews= allReviews.filter(review=>review.comicId===comic.id)
    const userReview = comicReviews.filter(comic=> comic.userId === flashUserObject.id)
    const CorrectComicId=comic.id

    return <article className="reviewS addFifty">
        <h1>Community Reviews</h1>
        
        <article className="newComicContainer">
        <article><img className="comicCoverA"src ={comic.photo}></img></article>
        <article>{comic.title}</article>
        <article>Author: {comic.author}</article>
        <h2 className="reviewF">Reviews</h2>

        {
            (noReviews) ? "There are currently no reviews" :  reviews.map(review=>{
                
               return (review.review === "") ? "" : 
                <article key ={review.id}>
                  <article>{review?.user?.userName}- "{review.review}"</article> 
             
                  </article>
             })
             
             
            }
            <section>{ (userReview.length === 0) ?
                        <button className="button-28" onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent,CorrectComicId)}>Add Comic</button> : ""
                        }</section>
   
       </article>
   
            
    {   
            (flashUserObject.admin) ? <article><button onClick ={(clickEvent)=> handleDeleteButtonClick(clickEvent)} className="button-30">Delete Comic</button></article> : ""
    }
     
    </article>
}