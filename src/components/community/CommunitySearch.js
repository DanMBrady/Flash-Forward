export const CommunitySearch =({ setterFunction })=>{
   return <article>
          <h1>Community Libary</h1> 
          <div>
            <input className="comicSearch"
            onChange={
                (changeEvent)=>{
                    setterFunction(changeEvent.target.value)
                }
            }
            type="text" placeholder="Find Comics" />

        </div>
    </article>
}