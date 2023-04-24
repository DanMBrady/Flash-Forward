import { useState } from "react"
import { Community } from "./Community"
import { CommunitySearch } from "./CommunitySearch"

export const CommunityContainer =()=>{
    const [searchTerms, setSearchTerms]=useState("")
    const [searchAuthor, setSearchAuthor]=useState("")
    const [selectTerms,setSelectTerms]=useState("10")
    return <>
    <CommunitySearch setterFunction ={setSearchTerms} selectFunction={setSelectTerms} setterAuthorFunction ={setSearchAuthor}/>
    <Community searchTermState={searchTerms} selectTermState={selectTerms} searchTermAuthor={searchAuthor}/> 
</>
}