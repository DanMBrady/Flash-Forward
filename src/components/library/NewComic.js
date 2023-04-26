import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
export const NewComic=()=>{
    const navigate= useNavigate()
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)
const [eras,setEras]=useState([])
const [readStatus,setReadStatus]=useState([])
const [comic,setComic]=useState({
    title:"",
    author:"",
    photo:"https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg",
    eraId:1,
    userId:flashUserObject.id,
})
const [review,setReview]=useState({
    readStatId:1,
    review:"",
    userId:flashUserObject.id,
    isFavorite:false,
})


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
         fetch(`http://localhost:8088/readStats`)
        .then(response => response.json())
        .then((statusArray)=>{
            setReadStatus(statusArray)
        })
        
    },
    []
)

const handleSaveButtonClick = (event) => {
    event.preventDefault()
    

   
    const ToSendToAPIComic = {
      title:comic.title,
      author:comic.author,
      photo:comic.photo,
      eraId:comic.eraId,
      userId:comic.userId
    }

    const ToSendToAPIReview ={
        readStatId:review.readStatId,
        review:review.review,
        userId:review.userId,
        isFavorite:review.isFavorite
    }

   return (comic.title===""|| comic.author==="") ?  
    Swal.fire({
    text:"You must fill out the entire form",
    confirmButtonColor:" rgb(201, 6, 6)",
}) :
   
    
     fetch("http://localhost:8088/comics", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(ToSendToAPIComic)
    })
    .then(response => response.json())
    .then((comic)=>{
       ToSendToAPIReview.comicId=comic.id
        return fetch("http://localhost:8088/reviews", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(ToSendToAPIReview)
    })
    })
    .then(() =>{
        navigate("/library")
    })
  

   
}
    return<article>
        <h1>New Comic</h1>
        <article className="newComicContainer">
        <article className="comicCover"><img className="image"src ={comic.photo}></img></article>
        <form>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Title:</label>
                    <input
                        required 
                        type="text"
                        className="form-control"
                        placeholder="Enter Title of Comic"
                        onChange={
                            (evt) => {
                                const copy ={...comic}
                                copy.title =evt.target.value
                                setComic(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Author:</label>
                    <input
                        required 
                        type="text"
                        className="form-control"
                        placeholder="Enter Author of Comic"
                        onChange={
                            (evt) => {
                                const copy ={...comic}
                                copy.author =evt.target.value
                                setComic(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Cover:</label>
                    <input
                        required 
                        type="text"
                        className="form-control"
                        placeholder="Enter Link of Comic Cover"
                        onChange={
                            (evt) => {
                                const copy ={...comic}
                                copy.photo =evt.target.value
                                setComic(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="">
                    <label htmlFor="specialty">Era Select:</label>
                    <div className="era">
                    { eras.map(
                        (era)=>{
                        return <article key ={era.id}>{era.era}
                   
                    <input
                        required 
                        type="radio"
                        name="types"
                        className="eraForm"
                        value={era.id}
                        onChange={
                            (evt) => {
                                const copy ={...comic}
                                copy.eraId =parseInt(evt.target.value)
                                setComic(copy)
                            }
                        } />
                        </article>
                    })
                    } </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="">
                    <label htmlFor="specialty">Reading Status:</label>
                    <div className="era">
                    { readStatus.map(
                        (readStat)=>{
                        return <article key ={readStat.id}>{readStat.type}
                   
                    <input
                        required 
                        type="radio"
                        name="era"
                        className="eraForm"
                        value={readStat.id}
                        onChange={
                            (evt) => {
                                const copy ={...review}
                                copy.readStatId =parseInt(evt.target.value)
                                setReview(copy)
                            }
                        } />
                        </article>
                    })
                    } </div>
                </div>
            </fieldset>
            <button  onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)} className="button-28">Submit Comic</button>
             </form>
             </article>
    </article>
}