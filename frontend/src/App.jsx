import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import Blog from "./components/pages/Blog"
import Detail from "./components/pages/Detail"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Profile from "./components/account/Profile"
import MyBlogs from './components/account/MyBlogs'
import FavBlogs from "./components/account/FavBlogs"
import ChangePassword from './components/account/ChangePassword'
import {Toaster} from "react-hot-toast";
import { AuthProvider } from './components/context/Auth'
import RequireAuth from './components/common/RequireAuth'
import GuestRoute from './components/common/GuestRoute'
import CreateBlog from './components/account/CreateBlog'
import UpdateBlog from './components/account/UpdateBlog'

function App() {
  
  return (
    <> 
      <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/blogs" element={<Blog/>} />
           <Route path="/detail/:id" element={<Detail/>} />
          

            <Route path="/account/profile" element={
                <RequireAuth>
                  <Profile/>
                </RequireAuth>
            } />

            <Route path="/account/blogs/create" element={
                <RequireAuth>
                  <CreateBlog/>
                </RequireAuth>
            } />
            <Route path="/login" element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
            } />
            <Route path="/register" element={
                 <GuestRoute>
                   <Register />
                 </GuestRoute>
            } />
            <Route
            path="/account/blogs/:id/edit"
            element={
              <RequireAuth>
                 <UpdateBlog/>
              </RequireAuth>
            } />
           <Route path="/account/my-blogs" 
           element={
              <RequireAuth>
                <MyBlogs/>
              </RequireAuth>
           } />
           <Route path="/account/saved-blogs" 
           element={
              <RequireAuth>
                <FavBlogs />
              </RequireAuth>
           } />
            <Route path="/account/change-password" 
           element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
           } />
         </Routes>
       </BrowserRouter> 
       <Toaster />
    </>
  )
}

export default App
