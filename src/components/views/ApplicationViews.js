import { Outlet, Route, Routes } from "react-router-dom"
import { Community } from "../community/Community"
import { CommunityContainer } from "../community/CommunityContainer"
import { AddReview } from "../library/AddReview"
import { EditComic } from "../library/EditComic"
import { Library } from "../library/Library"
import { NewComic } from "../library/NewComic"
export const ApplicationViews = () => {
	return (
		 <Routes>
            <Route path="/" element={
                <>
                <div className="home">
                  <h1>Flash Forward</h1>
                  
                  <img className="logo"src=""></img>
                  </div>
                  <Outlet />
              </>
            }>

            </Route>
                <Route path="library" element={ <Library/>} />
                <Route path="library/:comicId" element={ <EditComic/>} />
                <Route path="library/:comicId/add" element={ <AddReview/>} />
                <Route path="community" element={ <CommunityContainer/> } />
                <Route path="newComic" element={ <NewComic/> } />
                
        </Routes>
    )
		
	
}

