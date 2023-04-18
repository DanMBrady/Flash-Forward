import { useState } from "react"
import { Community } from "./Community"
import { CommunitySearch } from "./CommunitySearch"

export const CommunityContainer =()=>{
    const [searchTerms, setSearchTerms]=useState("")
    return <>
    <CommunitySearch setterFunction ={setSearchTerms}/>
    <Community searchTermState={searchTerms}/> 
</>
}