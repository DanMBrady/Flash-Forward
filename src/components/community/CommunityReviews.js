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
            fetch(`http://localhost:8088/reviews?comicId=${comicId}`)
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

    return <article className="reviewS">
        <h1>Community Reviews</h1>
        <article className="newComicContainer">
        <article><img className="comicCoverA"src ={comic.photo}></img></article>
        <article>{comic.title}</article>
        <article>Author: {comic.author}</article>
        <h2>Reviews</h2>
         <ul>
       {
        reviews.map(review=>{
           return<article key ={review.id}>
            {review.review === "" ? "" :
            <li>{review.review}</li> 
        }
             </article>
        })
       }
       </ul>
       </article>
    </article>
}