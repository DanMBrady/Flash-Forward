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
    const [flashMember,setFlashMember]=useState({})
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
            fetch(`http://localhost:8088/members?bookClubId=${bookClubId}&userId=${flashUserObject.id}`)
            .then(response => response.json())
            .then((data)=>{
                const singleMember =data[0]
                setFlashMember(singleMember)
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
    const getAllMembers= ()=>{
        fetch(`http://localhost:8088/members?bookClubId=${bookClubId}`)
       .then(response => response.json())
       .then((memberArray) => {
        setMembers(memberArray)
       })
    }
    const getFlashMember= ()=>{
        
            fetch(`http://localhost:8088/members?bookClubId=${bookClubId}&userId=${flashUserObject.id}`)
            .then(response => response.json())
            .then((data)=>{
                const singleMember =data[0]
                setFlashMember(singleMember)
            })
        }
        
       
    
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        

        const sendTo={
            userId:flashUserObject.id,
            bookClubId:bookClub.id
        }
       
       return fetch(`http://localhost:8088/members`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(sendTo)
        })
        .then(response => response.json())
        .then(getFlashMember)
        .then(getAllMembers) 
    }
    const handleRemoveButtonClick = (event) => {
        event.preventDefault()
      
        
        return fetch(`http://localhost:8088/members/${flashMember.id}`, {
            method:"DELETE"
        })
        .then(getAllMembers) 
        
    }
    const bookMembers= members.filter(member=>member.bookClubId===bookClub.id)
    const userClub = bookMembers.filter(member=> member.userId === flashUserObject.id)
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
        {
             (flashUserObject.admin) ?
        <section className="clubSpacing"><Link className="titleLinkNew" to={`/bookclubs/${bookClub.id}/description`}>Comic Description: {bookClub.description}</Link></section>
        :  <section className="clubSpacing">Comic Description: {bookClub.description}</section>
        }
       <section className="clubSpacing"> Number of members: {members.length}</section>
       {
        (userClub.length === 0) ?
        <section className="clubSpacing"><button onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}>Join Book Club</button></section>
        : <section className="clubSpacing"><button onClick ={(clickEvent)=> handleRemoveButtonClick(clickEvent)}>Leave Book Club</button></section>
       }
        </div>
        </section>
        </section>
    </article>
}