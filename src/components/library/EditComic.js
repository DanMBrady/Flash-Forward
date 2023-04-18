import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const EditComic =()=>{
    const navigate= useNavigate()
    const {comicId} = useParams()
    const [comic,setComic]=useState({
        title:"",
        author:"",
        photo:"https://c1.wallpaperflare.com/preview/690/220/870/marvel-comics-cartoon-entertainment.jpg",
        eraId:1,
        userId:-1
    })
    const [review,setReview]=useState({
        readStatId:1,
        review:"",
        isFavorite:false,
    })
    const [eras,setEras]=useState([])
    const [readStatus,setReadStatus]=useState([])
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        ()=>{
            fetch(`http://localhost:8088/comics?id=${comicId}`)
            .then(response => response.json())
            .then((data)=>{
                const singleComic =data[0]
                setComic(singleComic)
            })
        },
        [comicId]
       )

       useEffect(
        ()=>{
            fetch(`http://localhost:8088/reviews?comicId=${comicId}&userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data)=>{
                const singleReview =data[0]
                setReview(singleReview)
            })
        },
        [comicId]
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
        
        
        return fetch(`http://localhost:8088/comics/${comicId}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(comic)
        })
        .then(response => response.json())
        .then(fetch(`http://localhost:8088/reviews/${review.id}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(review)
        }))
        .then(() =>{
            navigate("/library")
        }) 
    }

    const handleRemoveButtonClick = (event) => {
        event.preventDefault()
        
        
        return fetch(`http://localhost:8088/reviews/${review.id}`, {
            method:"DELETE"
        })
        .then(() =>{
            navigate("/library")
        }) 
    }

    const handleDeleteButtonClick = (event) => {
        event.preventDefault()
        
        
        return fetch(`http://localhost:8088/comics/${comicId}`, {
            method:"DELETE"
        })
        .then(() =>{
            navigate("/library")
        }) 
    }
   
    return <article>
    <h1>Edit Comic</h1>
    <article className="newComicContainer">
    <article className="comicCover"><img className="image"src ={comic.photo}></img></article>
    <form>
        {
            (comic.userId===honeyUserObject.id) ? 

        <fieldset>
            <div className="form-group">
                <label htmlFor="specialty">Title:</label>
                <input
                    required 
                    type="text"
                    className="form-control"
                    value={comic.title}
                    onChange={
                        (evt) => {
                            const copy ={...comic}
                                copy.title =evt.target.value
                                setComic(copy)
                        }
                    } />
            </div>
        </fieldset>
        :<h2>You Did Not Create This Comic</h2>
                }
                 {
            (comic.userId===honeyUserObject.id) ? 

        <fieldset>
            <div className="form-group">
                <label htmlFor="specialty">Author:</label>
                <input
                    required 
                    type="text"
                    className="form-control"
                    value={comic.author}
                    onChange={
                        (evt) => {
                            const copy ={...comic}
                                copy.author =evt.target.value
                                setComic(copy)
                        }
                    } />
            </div>
        </fieldset>
         :""
        }
 {
            (comic.userId===honeyUserObject.id) ? 
         <fieldset>
            <div className="form-group">
                <label htmlFor="specialty">Cover:</label>
                <input
                    required 
                    type="text"
                    className="form-control"
                     value={comic.photo}
                    onChange={
                        (evt) => {
                            const copy ={...comic}
                            copy.photo =evt.target.value
                            setComic(copy)
                        }
                    } />
            </div>
        </fieldset>
 :""
}
{
            (comic.userId===honeyUserObject.id) ? 
<fieldset>
                <div className="">
                    <label htmlFor="specialty">Era Select:</label>
                    <div className="era">
                       
                    { eras.map(
                        (era)=>{
                            
                        return (era.id === comic.eraId) ? <article key ={era.id}>{era.era}
                     <input
                        required 
                        type="radio"
                        name="types"
                        className="eraForm"
                        defaultChecked 
                        value={era.id}
                        onChange={
                            (evt) => {
                                const copy ={...comic}
                                copy.eraId =parseInt(evt.target.value)
                                setComic(copy)
                            }
                        } />
                        </article> : <article key ={era.id}>{era.era}
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
            :""
}
            <fieldset>
                <div className="">
                    <label htmlFor="specialty">Reading Status:</label>
                    <div className="era">
                    { readStatus.map(
                        (readStat)=>{
                        return (readStat.id === review.readStatId) ? <article key ={readStat.id}>{readStat.type}
                   
                    <input
                        required 
                        type="radio"
                        name="era"
                        className="eraForm"
                        defaultChecked
                        value={readStat.id}
                        onChange={
                            (evt) => {
                                const copy ={...review}
                                copy.readStatId =parseInt(evt.target.value)
                                setReview(copy)
                            }
                        } />
                        </article> :<article key ={readStat.id}>{readStat.type}
                   
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
            <button  onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)} className="buttonW">Save Comic</button>
            {
            (comic.userId===honeyUserObject.id) ? 
            <button  onClick ={(clickEvent)=> handleDeleteButtonClick(clickEvent)} className="buttonW">Delete Comic</button>
           : <button  onClick ={(clickEvent)=> handleRemoveButtonClick(clickEvent)} className="buttonW">Remove Comic</button>}
        </form>
        </article>
        </article>
}