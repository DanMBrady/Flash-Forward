import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
export const ComicClub =()=>{
    const navigate=useNavigate()
    const [comics,setComics]=useState([])
    const {bookClubId}=useParams()
    const [bookClub,setBookClub]=useState({

    })
    useEffect(
        ()=>{
            fetch(`http://localhost:8088/bookclubs?&id=${bookClubId}`)
            .then(response => response.json())
            .then((data)=>{
                const singleClub =data[0]
                setBookClub(singleClub)
            })
        },
        [bookClubId]
       )
    useEffect(
        ()=>{
             fetch(`http://localhost:8088/comics?_sort=title&_expand=era`)
            .then(response => response.json())
            .then((comicArray)=>{
                setComics(comicArray)
            })
            
        },
        []
    )
    const communitySorted = comics.sort(function(a,b) {
        if(a.title.toLowerCase() < b.title.toLowerCase()
        ) return -1
        if(a.title.toLowerCase() > b.title.toLowerCase()
        ) return 1
        return 0
    })
    const handleSaveButtonClick = (event,comicId) => {
        event.preventDefault()
        
        

        const sendTo={
            id:bookClub.id,
            name:bookClub.name,
            comicId:comicId,
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
    return <article className="addFifty">
        <h1>Choose Comic</h1>
        <div className="comicContainer">
        {
            communitySorted.map(comic=>{
                const comicId =comic.id
                return <article key ={`comic--${comic.id}`} className="comicNewC">
                    
                    <section><button onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent,comicId)} className="comicSelectButton"><img className="imageNew"src={comic.photo}></img></button></section>
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