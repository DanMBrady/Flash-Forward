export const CommunitySearch =({ setterFunction })=>{
   return <article>
          <h1>Community Library</h1> 
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