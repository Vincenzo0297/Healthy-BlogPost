import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import ProtectedRoute from './Login&SignUp/ProtectedRoute';

// Main
import Main from './Main/Main';
import Login from './Login&SignUp/Login';
import UserAccount from './Login&SignUp/UserAccount';
import BusinessUserAccount from './Login&SignUp/BusinessUserAccount';
import DietitiansUserAccount from './Login&SignUp/DietitiansUserAccount';
import Logout from './Login&SignUp/Logout';
import CreateAccount from './Login&SignUp/CreateAccount';
import RecipesIntro from './Main/RecipesIntro';
import MealPlanIntro from './Main/MealPlanIntro';
import LearningContentIntro from './Main/LearningContentIntro';

// System Administration
import SystemAdminMainAcc from './SystemAdmin/SystemAdminMainAcc';
import ViewAccount from './SystemAdmin/ViewAccount';
import ViewUserProfile from './Functionalities/ViewUserProfile';
import UserAccountManagement from './Functionalities/UserAccountManagement';
import UserAccountManagement2 from './Functionalities/UserAccountManagement2';
import UserVerification from './Functionalities/UserVerification';
import CreateUserProfile from './Functionalities/CreateUserProfile';
import SuspendBlogPost from './SystemAdmin/SuspendBlogPost';
import SuspendContentPost from './SystemAdmin/SuspendContentPost';
import SuspendRecipesPost from './SystemAdmin/SuspendRecipesPost';

// Freemium User
import FreemiumUser from './FreemiumUser/FreemiumUser';
import FreemiumViewAccount from './FreemiumUser/FreemiumViewAccount';
import FreemiumTrackBodyWeight from './FreemiumUser/FreemiumTrackBodyWeight';
import FreemiumBMICalculate from './FreemiumUser/FreemiumBMICalculate';
import BlogPosts2 from './FreemiumUser/BlogPosts2';
import LearningContentPost from './FreemiumUser/LearningContentPost';
import MealPlans2 from './FreemiumUser/MealPlans2';
import RecipesPost2 from './FreemiumUser/RecipesPost2';
import RecordFoodConsumption from './FreemiumUser/RecordFoodConsumption';

import FreemiumViewContentPost from './FreemiumUser/FreemiumViewContentPost';
import FreemiumContentPost from './FreemiumUser/FreemiumContentPost';

// Business User
import BusinessUser from './BusinessUser/BusinessUser';
import BusinessViewAccount from './BusinessUser/BusinessViewAccount';
import ContentPost from './BusinessUser/ContentPost';
import CreateContentPost from './BusinessUser/CreateContentPost';
import UpdateContentPost from './BusinessUser/UpdateContentPost';
import ViewContentPost from './BusinessUser/ViewContentPost';
import BlogPost from './BusinessUser/BlogPost';
import CreateBlogPost from './BusinessUser/CreateBlogPost';
import UpdateBlogPost from './BusinessUser/UpdateBlogPost';
import ViewBlogPost from './BusinessUser/ViewBlogPost';
import RecipesPost from './BusinessUser/RecipesPost';
import CreateRecipesPost from './BusinessUser/CreateRecipesPost';
import UpdateRecipesPost from './BusinessUser/UpdateRecipesPost';
import ViewRecipesPost from './BusinessUser/ViewRecipesPost';
import BlogPosts from './BusinessUser/BlogPosts';


//Dietitians User
import DietitiansUser from './Dietitians/DietitiansUser';
import DietitiansViewAccount from './Dietitians/DietitiansViewAccount';
import DietitiansPost from './Dietitians/DietitiansPost';
import CreateDietitiansPost from './Dietitians/CreateDietitiansPost';
import UpdateDietitiansPost from './Dietitians/UpdateDietitiansPost';
import ViewDietitiansPost from './Dietitians/ViewDietitiansPost';



function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/Main" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/UserAccount" element={<UserAccount />} />
          <Route path="/BusinessUserAccount" element={<BusinessUserAccount />} />
          <Route path="/DietitiansUserAccount" element={<DietitiansUserAccount />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/CreateAccount" element={<CreateAccount />} />
          <Route path="/RecipesIntro" element={<RecipesIntro />} />
          <Route path="/MealPlanIntro" element={<MealPlanIntro />} />
          <Route path="/LearningContentIntro" element={<LearningContentIntro />} />


          <Route path="/systemadminmainacc" element={<ProtectedRoute element={SystemAdminMainAcc} />} />
          <Route path="/ViewAccount" element={<ProtectedRoute element={ViewAccount} />} />
          <Route path="/ViewUserProfile" element={<ProtectedRoute element={ViewUserProfile} />} />
          <Route path="/UserAccountManagement" element={<ProtectedRoute element={UserAccountManagement} />} />
          <Route path="/UserAccountManagement2" element={<ProtectedRoute element={UserAccountManagement2} />} />
          <Route path="/UserVerification" element={<ProtectedRoute element={UserVerification} />} />
          <Route path="/CreateUserProfile" element={<ProtectedRoute element={CreateUserProfile} />} />
          <Route path="/SuspendBlogPost" element={<ProtectedRoute element={SuspendBlogPost} />} />
          <Route path="/SuspendContentPost" element={<ProtectedRoute element={SuspendContentPost} />} />
          <Route path="/SuspendRecipesPost" element={<ProtectedRoute element={SuspendRecipesPost} />} />


          <Route path="/FreemiumUser" element={<ProtectedRoute element={FreemiumUser} />} />
          <Route path="/FreemiumViewAccount" element={<ProtectedRoute element={FreemiumViewAccount} />} />
          <Route path="/FreemiumTrackBodyWeight" element={<ProtectedRoute element={FreemiumTrackBodyWeight} />} />
          <Route path="/FreemiumBMICalculate" element={<ProtectedRoute element={FreemiumBMICalculate} />} />
          <Route path="/BlogPosts2" element={<ProtectedRoute element={BlogPosts2} />} />
          <Route path="/LearningContentPost" element={<ProtectedRoute element={LearningContentPost} />} />
          <Route path="/MealPlans2" element={<ProtectedRoute element={MealPlans2} />} />
          <Route path="/RecipesPost2" element={<ProtectedRoute element={RecipesPost2} />} />
          <Route path="/RecordFoodConsumption" element={<ProtectedRoute element={RecordFoodConsumption} />} />

          <Route path="/FreemiumViewContentPost" element={<ProtectedRoute element={FreemiumViewContentPost} />} />
          <Route path="/FreemiumContentPost/:postId" element={<ProtectedRoute element={FreemiumContentPost} />} />
          
          
          
          <Route path="/BusinessUser" element={<ProtectedRoute element={BusinessUser} />} />
          <Route path="/BusinessViewAccount" element={<ProtectedRoute element={BusinessViewAccount} />} />
          <Route path="/ContentPost" element={<ProtectedRoute element={ContentPost} />} />
          <Route path="/CreateContentPost" element={<ProtectedRoute element={CreateContentPost} />} />
          <Route path="/UpdateContentPost/:postId" element={<ProtectedRoute element={UpdateContentPost} />} />
          <Route path="/ViewContentPost/:postId" element={<ProtectedRoute element={ViewContentPost} />} />
          <Route path="/BlogPost" element={<ProtectedRoute element={BlogPost} />} />
          <Route path="/CreateBlogPost" element={<ProtectedRoute element={CreateBlogPost} />} />
          <Route path="/UpdateBlogPost/:postId" element={<ProtectedRoute element={UpdateBlogPost} />} />
          <Route path="/ViewBlogPost/:postId" element={<ProtectedRoute element={ViewBlogPost} />} />
          <Route path="/RecipesPost" element={<ProtectedRoute element={RecipesPost} />} />
          <Route path="/CreateRecipesPost" element={<ProtectedRoute element={CreateRecipesPost} />} />
          <Route path="/UpdateRecipesPost/:postId" element={<ProtectedRoute element={UpdateRecipesPost} />} />
          <Route path="/ViewRecipesPost/:postId" element={<ProtectedRoute element={ViewRecipesPost} />} />
          <Route path="/BlogPosts" element={<ProtectedRoute element={BlogPosts} />} />
          


          <Route path="/DietitiansUser" element={<ProtectedRoute element={DietitiansUser} />} />
          <Route path="/DietitiansViewAccount" element={<ProtectedRoute element={DietitiansViewAccount} />} />
          <Route path="/DietitiansPost" element={<ProtectedRoute element={DietitiansPost} />} />
          <Route path="/CreateDietitiansPost" element={<ProtectedRoute element={CreateDietitiansPost} />} />
          <Route path="/UpdateDietitiansPost/:postId" element={<ProtectedRoute element={UpdateDietitiansPost} />} />
          <Route path="/ViewDietitiansPost/:postId" element={<ProtectedRoute element={ViewDietitiansPost} />} />

          <Route path="*" element={<Navigate to="/Main" replace />} /> {/* Redirect any undefined routes */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
