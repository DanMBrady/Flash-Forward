import { Outlet, Route, Routes } from "react-router-dom"
import { BookClub } from "../bookclub/BookClub"
import { IndividualBookClub } from "../bookclub/IndividualBookClub"
import { Community } from "../community/Community"
import { CommunityContainer } from "../community/CommunityContainer"
import { CommunityReviews } from "../community/CommunityReviews"
import { Favorites } from "../favorites/Favorites"
import { AddReview } from "../library/AddReview"
import { EditComic } from "../library/EditComic"
import { Library } from "../library/Library"
import { NewComic } from "../library/NewComic"
import newLogo from "../photos/newLogo.png"
import spiderman from "../photos/spiderman.png"
import { IndividualUser } from "../users/IndividualUser"
import { Users } from "../users/Users"
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
                <Route path="users" element={ <Users/>} />
                <Route path="users/:userId" element={ <IndividualUser/>} />
                <Route path="bookclubs" element={ <BookClub/>} />
                <Route path="bookclubs/:bookClubId" element={ <IndividualBookClub/>} />

                
        </Routes>
    )
		
	
}

