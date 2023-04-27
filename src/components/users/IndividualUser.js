import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
export const IndividualUser =()=>{
    const {userId} = useParams()
    const [reviews,setReviews]=useState([])
     const [user,setUser]=useState({
    fullName:"joey"
})
useEffect(
    ()=>{
        fetch(`http://localhost:8088/users?id=${userId}`)
        .then(response => response.json())
        .then((data)=>{
            const singleUser =data[0]
            setUser(singleUser)
        })
    },
    [userId]
   )
   useEffect(
    ()=>{
         fetch(`http://localhost:8088/reviews?userId=${userId}`)
        .then(response => response.json())
        .then((comicArray)=>{
            setReviews(comicArray)
        })
        
    },
    []
)
    return<article className="addFifty">
        <h1>User Profile</h1>
        <div className="profileContainer">
        <article className="userProfile">
            <section className="spaceProfile">Full Name: {user.fullName}</section>
            <section className="spaceProfile">Username: {user.userName}</section>
            <section className="spaceProfile">Email: {user.email}</section>
            <section className="spaceProfile">Number of Comics: {reviews.length}</section>
            <section className="spaceProfile">Admin:</section>
            <button className="spaceProfile"> Save Profile</button>
            <button className="spaceProfile"> Delete Profile</button>
        </article>
        </div>
    </article>
}