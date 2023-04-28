import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
export const IndividualUser =()=>{
    const {userId} = useParams()
    const [reviews,setReviews]=useState([])
    const [comics,setComics]=useState([])
     const [user,setUser]=useState({
    fullName:"joey",
    isAdmin: false
})
const navigate =useNavigate()
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
useEffect(
    ()=>{
         fetch(`http://localhost:8088/comics?userId=${userId}`)
        .then(response => response.json())
        .then((comicArray)=>{
            setComics(comicArray)
        })
        
    },
    []
)

const handleSaveButtonClick = (event) => {
    event.preventDefault()
    
    return fetch(`http://localhost:8088/users/${userId}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(user)
    })
    .then(response => response.json())
    .then(() =>{
        navigate("/users")
    }) 
}


    return<article className="addFifty">
        <h1>User Profile</h1>
        <div className="profileContainer">
        <article className="userProfile">
            <section className="spaceProfile">Full Name: {user.fullName}</section>
            <section className="spaceProfile">Username: {user.userName}</section>
            <section className="spaceProfile">Email: {user.email}</section>
            <section className="spaceProfile">Total Number of Comics: {reviews.length}</section>
            <section className="spaceProfile">Number of Comics Uploaded: {comics.length}</section>
            <section className="spaceProfile">Admin: {

                (user.isAdmin === true) ? <div className="userSpace">
                Yes
                 <input
                     required 
                     type="radio"
                     name="era"
                     value={user.isAdmin}
                     className="eraForm profileRadio"
                     defaultChecked
                     onChange={
                         (evt) => {
                            const copy ={...user}
                            copy.isAdmin =true
                            setUser(copy)
                         }
                     } /> 
                 
                      No
                 <input
                     required 
                     type="radio"
                     name="era"
                     value={user.isAdmin}
                     className="eraForm profileRadio"
                     onChange={
                         (evt) => {
                            const copy ={...user}
                            copy.isAdmin =false
                            setUser(copy)
                         }
                     } />
</div>  : "" } {

                        (user.isAdmin === false) ? <div className="userSpace">
                        Yes
                        <input
                            required 
                            type="radio"
                            name="era"
                            value={user.isAdmin}
                            className="eraForm profileRadio"
                            onChange={
                                (evt) => {
                                    const copy ={...user}
                                    copy.isAdmin =true
                                    setUser(copy)
                                }
                            } /> 
                        
                            No
                        <input
                            required 
                            type="radio"
                            name="era"
                            value={user.isAdmin}
                            className="eraForm profileRadio"
                            defaultChecked
                            onChange={
                                (evt) => {
                                    const copy ={...user}
                                    copy.isAdmin =false
                                    setUser(copy)
                                }
                            } />
                        </div>  : "" }
                                                        
                                                        
                                                        </section>
            <button className="spaceProfile profileButton" onClick ={(clickEvent)=> handleSaveButtonClick(clickEvent)}> Save Profile</button>
        </article>
        </div>
    </article>
}