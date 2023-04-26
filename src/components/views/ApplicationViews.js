import { Outlet, Route, Routes } from "react-router-dom"
import { Community } from "../community/Community"
import { CommunityContainer } from "../community/CommunityContainer"
import { CommunityReviews } from "../community/CommunityReviews"
import { Favorites } from "../favorites/Favorites"
import { AddReview } from "../library/AddReview"
import { EditComic } from "../library/EditComic"
import { Library } from "../library/Library"
import { NewComic } from "../library/NewComic"
import "./Home.css"
export const ApplicationViews = () => {
	return (
		 <Routes>
            <Route path="/" element={
                <>
               <div className="home">
                
                <div className="slider">
                <div className="slide"></div>
                <div className="slide"></div>
                <div className="slide"></div>
                <div className="slide"></div>
                <div className="slide"></div>
                </div>

               </div>
                  <Outlet />
              </>
            }>

            </Route>
                <Route path="library" element={ <Library/>} />
                <Route path="library/:comicId" element={ <EditComic/>} />
                <Route path="library/:comicId/add" element={ <AddReview/>} />
                <Route path="community" element={ <CommunityContainer/> } />
                <Route path="community/:comicId/reviews" element={ <CommunityReviews/>} />
                <Route path="newComic" element={ <NewComic/> } />
                <Route path="favorites" element={ <Favorites/>} />
                
        </Routes>
    )
		
	
}

