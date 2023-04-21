import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
export const CommunityReviews =()=>{
    const navigate= useNavigate()
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    const {comicId} = useParams()
    const [comic,setComic]=useState([])
    const [reviews,setReviews]=useState([])
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

    return <article className="reviewS">
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

       </article>
    </article>
}