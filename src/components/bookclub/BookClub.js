import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import "./BookClub.css"
export const BookClub =() =>{
const [bookClubs, setBookClubs]=useState([])
useEffect(
    ()=>{
         fetch(`http://localhost:8088/bookclubs`)
        .then(response => response.json())
        .then((clubArray)=>{
            setBookClubs(clubArray)
        })
        
    },
    []
)
    return <article className="addFifty">
        <h1>Book Clubs</h1>
        <article className="clubContainer">
        {
            bookClubs.map(bookClub=>{
                return<article key={bookClub.id} className="clubs">
                    <section><h2>{bookClub.name}</h2></section>
                    <section><Link to={`/bookclubs/${bookClub.id}`}><img className="bookClubPhoto"src={bookClub.photo}></img></Link></section>
                    </article>
            })
        }
        </article>
    </article>
}