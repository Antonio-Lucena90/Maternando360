import React, { lazy, Suspense, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';


import { PublicRoutes } from './PublicRoutes';
import { PublicLayout } from '../layouts/PublicLayout';
const Home = lazy(()=>import('../pages/PublicPages/Home/Home'))
const About = lazy(()=>import('../pages/PublicPages/About/AboutPage'))
const Accompaniment = lazy(()=>import('../pages/PublicPages/Services/Accompaniment/Accompaniment'))
const Dream = lazy(()=>import('../pages/PublicPages/Services/Dream/Dream'))
const Courses = lazy(()=>import('../pages/PublicPages/Training/Courses/Courses'))
const Workshops = lazy(()=>import('../pages/PublicPages/Training/Workshops/Workshops'))
const Rates = lazy(()=>import('../pages/PublicPages/Rates/Rates'))
const LoginPage = lazy(()=>import('../pages/PublicPages/AuthPage/Login/LoginPage'))
const RegisterPage = lazy(()=>import('../pages/PublicPages/AuthPage/Register/RegisterPage'))
const ErrorPage = lazy(()=>import('../pages/PublicPages/Error/ErrorPage'))

import { PrivateRoutes } from './PrivateRoutes';

import { UserLayout } from '../layouts/UserLayout';
const AllUsersPage = lazy(()=>import('../pages/userPages/AllUsersPage/AllUsersPage'))
const Profile = lazy(()=>import('../pages/userPages/Profile/Profile'))
const EditUser = lazy(()=>import('../pages/userPages/EditUser/EditUser'))
const UserCourses = lazy(()=>import('../pages/userPages/UserCourses/UserCourses'))
const UserWorkshops = lazy(()=>import('../pages/userPages/UserWorkshops/UserWorkshops'))
const FetchAppointment = lazy(()=>import('../pages/userPages/FetchAppointment/FetchAppointment'))



import { AdminLayout } from '../layouts/AdminLayout';

const AdminDashboard = lazy(()=>import('../pages/AdminPages/AdminDashboard/AdminDashboard'))
const AllUsersRegistered = lazy(()=>import('../pages/AdminPages/AllUsersRegistered/AllUsersRegistered'))
const CreateWorkshops = lazy(()=>import('../pages/AdminPages/CreateWorkshops/CreateWorkshops'))
const AllWorkshops = lazy(()=>import('../pages/AdminPages/AllWorkshops/AllWorkshops'))
const EditWorkshop = lazy(()=>import('../pages/AdminPages/EditWorkshop/EditWorkshop'))

export const AppRoutes = () => {
 const {user} = useContext(AuthContext);
 const [currentInfo, setCurrentInfo] = useState(false);
  
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Cargando...</h2>}>
        <Routes>

          <Route element={<PublicRoutes/>}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/accompaniment" element={<Accompaniment />} />
              <Route path="/dream" element={<Dream />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/rates" element={<Rates currentInfo={currentInfo} setCurrentInfo={setCurrentInfo}/>} />
            </Route>
          </Route>

          <Route element={<PrivateRoutes 
                                user={user} 
                                requiredType={2}/>}>
            <Route element={<UserLayout/>}> 
              <Route path='/userPage' element={<AllUsersPage/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/editUser' element={<EditUser/>}/>
              <Route path='/userCourses' element={<UserCourses/>}/>
              <Route path='/userWorkshops' element={<UserWorkshops/>}/>
              <Route path='/fetchAppointment' element={<FetchAppointment/>}/>
            </Route>
          </Route>

            <Route element={<PrivateRoutes 
                                    user={user} requiredType={1}/>}>
              <Route element={<AdminLayout/>}>        
                <Route path='/admin' element={<AdminDashboard/>}/>
                <Route path='/admin/allUsers' element={<AllUsersRegistered/>}/>
                <Route path='/admin/createWorkshops' element={<CreateWorkshops/>}/>
                <Route path='/admin/allWorkshops' element={<AllWorkshops/>}/>
                <Route path='/admin/editWorkshops/:id' element={<EditWorkshop/>}/>
              </Route>
            </Route>

          <Route path='*' element={<ErrorPage/>}/>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
