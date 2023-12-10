import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAbiIBs16w1xT-7jnepaN2DvWu2t_6E7yg",
    authDomain: "tic-tac-toe-88718.firebaseapp.com",
    projectId: "tic-tac-toe-88718",
    storageBucket: "tic-tac-toe-88718.appspot.com",
    messagingSenderId: "340009264879",
    appId: "1:340009264879:web:c90a8685a907ceb9f9dd1a",
    measurementId: "G-WQ71DDGXH8"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Home = () => {
  return <div>Home Page</div>;
};

const Games = () => {
  return <div>games Page</div>;
};

const Login = () => {
  return <div>Login Page</div>;
};

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/games" component={Games} />
      {/* Add more protected routes as needed */}
    </Router>
  );
};

export default App;
