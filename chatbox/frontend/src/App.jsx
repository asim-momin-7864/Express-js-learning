import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Conversation from "./pages/Conversation";
import Profile from "./pages/Profile";
import MainLayout from "./layout/MainLayout";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authAPI";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  // dispatch
  const dispatch = useDispatch();

  // useEffect for fetch current user
  useEffect(() => {
    dispatch(fetchCurrentUser()); // this current user data we need for frontend to display and conditional rendering
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Home />} />
          <Route path="chat/:id" element={<Conversation />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

// ⚠️ Cookie Limitation Note:
// Browsers share cookies across tabs/windows for the same origin.
// So if you log in with two different users in two tabs of the same browser,
// the latest login will overwrite the previous session (since JWT is stored in a shared cookie).
// ✅ Use different browsers, Incognito mode, or Chrome profiles for multi-user testing.

/*

OLD layout with navigation issues

 <Routes>
        <Route path="/" element={ <PrivateRoute><MainLayout /></PrivateRoute> }>
          <Route index element={<Home />} />
          <Route path="conversation" element={<Conversation />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login"  element={<Login />} />
      </Routes>

*/

/*

* Remaining Work 

- logout thun is not created ,not sending request to backends logout route 
-  just clearning user in frontend 

* Problems 

- bad & overcomplex layout 
- bad handling of selectedConversation Redux globle state variable , it cause lots of mis-fetching issue
- manual reload for new message comes or fetch all messages for every 2.5 sec 
- webisite is lagging 
- auth with jwt is not that much i like, not solid
- layout navigation is very bad for responsive layouts ,also cause mis-match user fetches  

*/
