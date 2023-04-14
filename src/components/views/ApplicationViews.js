import { Outlet, Route, Routes } from "react-router-dom"
import { Community } from "../community/Community"
import { Library } from "../library/Library"
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
                <Route path="community" element={ <Community/> } />
                
        </Routes>
    )
		
	
}

