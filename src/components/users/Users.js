import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Users.css"
export const Users =()=>{
    const [users,setUsers]=useState([])
    useEffect(
        ()=>{
             fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((userArray)=>{
                setUsers(userArray)
            })
            
        },
        []
    )
    return <article className="addFifty">
        <h1>All Users</h1>
        <div className="userContainer">
        <div className="allUsers">
            {
                users.map(user=>{

                    return(user.isSuperAdmin===true)? "" : <article key={user.id}>
                        <section className="userIn">
                        <section className="perfectSize"><Link className="titleLinkNew" to={`/users/${user.id}`}>Full Name: {user.fullName}</Link> </section>
                        <section className="perfectSize">Username: {user.userName} </section>
                        <section className="perfectSize"> Email: {user.email}</section>
                        </section>


                    </article>
                })
            }
   
        </div>
        </div>
    </article>
}