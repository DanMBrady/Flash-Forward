import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
export const DescriptionClub =()=>{
    const [bookClub,setBookClub]=useState([{
        name:"hello",
        description:"Spider-Man"
    }])
    const {bookClubId}=useParams()
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)
    const navigate=useNavigate()
    useEffect(
        ()=>{
            fetch(`http://localhost:8088/bookclubs?_expand=comic&id=${bookClubId}`)
            .then(response => response.json())
            .then((data)=>{
                const singleClub =data[0]
                setBookClub(singleClub)
            })
        },
        [bookClubId]
       )
       const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        

        const sendTo={
            id:bookClub.id,
            name:bookClub.name,
            comicId:bookClub.comicId,
            photo:bookClub.photo,
            description:bookClub.description
        }
       
       return fetch(`http://localhost:8088/bookclubs/${bookClubId}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(sendTo)
        })
        .then(response => response.json())
        .then(() =>{
            navigate(`/bookclubs/${bookClub.id}`)
        }) 
    }
    return<article className="addFifty">
         <h1>{bookClub.name}</h1>
         <section className="clubContainerTwo">
        <section className="clubBio">
        <img className="imageNewNot"src={bookClub?.comic?.photo}></img>
        <div className="clubTextTwo">
        <h2>Choose Description</h2>
        <form>
        <fieldset>
            <div className="">
                <label htmlFor="specialty"></label>
                <textarea
                    required 
                    type="text"
                    className="descriptionText"
                    value={bookClub.description}
                    onChange={
                        (evt) => {
                            const copy ={...bookClub}
                            copy.description =evt.target.value
                            setBookClub(copy)
                    
                        }
                    } />
            </div>
        </fieldset>
        </form>
        <section className="clubSpacing"><button onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}>Save description</button></section>

       </div>
            </section>
            </section>
    </article>
}