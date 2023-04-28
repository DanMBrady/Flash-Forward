import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import "./BookClub.css"
export const IndividualBookClub =()=>{
    const navigate =useNavigate()
    const [bookClub,setBookClub]=useState([{
        name:"hello"
    }])
    const [members,setMembers]=useState([])
    const {bookClubId}=useParams()
    const localFlashUser = localStorage.getItem("flash_user")
    const flashUserObject = JSON.parse(localFlashUser)
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
       useEffect(
        ()=>{
             fetch(`http://localhost:8088/members?bookClubId=${bookClubId}`)
            .then(response => response.json())
            .then((clubArray)=>{
                setMembers(clubArray)
            })
            
        },
        []
    )
    return<article className="addFifty">
        
        <h1>{bookClub.name}</h1>
        <section className="clubContainerTwo">
        <section className="clubBio">{
            (flashUserObject.admin) ?
            <Link to={`/bookclubs/${bookClub.id}/comics`}><img className="imageNew"src={bookClub?.comic?.photo}></img></Link> :  <img className="imageNewNot"src={bookClub?.comic?.photo}></img>
        }
        <div className="clubText">
        <h2>Currently Reading</h2>
        <section className="clubSpacing topSpacing">Comic Title: {bookClub?.comic?.title}</section>
        <section className="clubSpacing">Comic Description: {bookClub.description}</section>
       <section className="clubSpacing"> Number of members: {members.length}</section>
        <section className="clubSpacing"><button>Join Book Club</button></section>

        </div>
        </section>
        </section>
    </article>
}