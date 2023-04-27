import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
export const AddReview =()=>{
    const navigate= useNavigate()
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)
    const {comicId} = useParams()
    const [review,setReview]=useState({
        review:"This Comic is Good",
        isFavorite: false
    })
    useEffect(
        ()=>{
            fetch(`http://localhost:8088/reviews?comicId=${comicId}&userId=${flashUserObject.id}&_expand=comic`)
            .then(response => response.json())
            .then((data)=>{
                const singleReview =data[0]
                setReview(singleReview)
            })
        },
        [comicId]
       )

       const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        

        const sendTo={
            id:review.id,
            readStatId: review.readStatId,
            review: review.review,
            userId: review.userId,
            comicId: review.comicId,
            isFavorite: review.isFavorite,
        }
       
       return fetch(`http://localhost:8088/reviews/${review.id}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(sendTo)
        })
        .then(response => response.json())
        .then(() =>{
            navigate("/library")
        }) 
    }


    return <article className="reviewS addFifty">
        <h1>Add Your Review</h1>
         <article className="newComicContainer">
        <article><img className="comicCoverA"src ={review?.comic?.photo}></img></article>
        <article>{review?.comic?.title}</article>
        <article>Author: {review?.comic?.author}</article>
        <form>
        <fieldset>
            <div className="">
                <label htmlFor="specialty">Review:</label>
                <textarea
                    required 
                    type="text"
                    className="reviewText"
                    value={review.review}
                    onChange={
                        (evt) => {
                            const copy ={...review}
                            copy.review =evt.target.value
                            setReview(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
                <div className="">
                    <label htmlFor="specialty">Favorite:</label>
                    <div className="era">
                   {
                    (review.isFavorite === true) ?
                    <div>
                   True
                    <input
                        required 
                        type="radio"
                        name="era"
                        className="eraForm"
                        value={review.isFavorite}
                        defaultChecked
                        onChange={
                            (evt) => {
                                const copy ={...review}
                            copy.isFavorite =true
                            setReview(copy)
                            }
                        } /> 
                    
                         False
                    <input
                        required 
                        type="radio"
                        name="era"
                        className="eraForm"
                        value={review.isFavorite}
                        onChange={
                            (evt) => {
                                const copy ={...review}
                                copy.isFavorite =false
                                setReview(copy)
                            }
                        } />
 </div>  : ""}  {
                    (review.isFavorite === false) ?
                    <div>
                   True
                    <input
                        required 
                        type="radio"
                        name="era"
                        className="eraForm"
                        value={review.isFavorite}
                        onChange={
                            (evt) => {
                                const copy ={...review}
                                copy.isFavorite =true
                                setReview(copy)
                            }
                        } /> 
                    
                         False
                    <input
                        required 
                        type="radio"
                        name="era"
                        className="eraForm"
                        value={review.isFavorite}
                        defaultChecked
                        onChange={
                            (evt) => {
                                const copy ={...review}
                                copy.isFavorite =false
                                setReview(copy)
                            }
                        } />
 </div>  : ""}
                         </div>
                </div>
            </fieldset>
            <button  onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)} className="button-28">Save Review</button>
        </form>
        </article>
    </article>
}