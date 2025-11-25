// import React, { useState } from "react";
// import Login from "./Login";
// import Signup from "./Signup";
// import "./App.css";

// function App() {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="container">
//       <div className="form-box">
//         {isLogin ? <Login /> : <Signup />}
//         <p className="toggle-text">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Sign Up" : "Login"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container">
      <div className={`card ${isLogin ? "" : "flipped"}`}>
        <div className="front">
          <Login />
          <p className="toggle-text">
            Don't have an account?{" "}
            <span className="toggle-link" onClick={() => setIsLogin(false)}>
              Sign Up
            </span>
          </p>
        </div>
        <div className="back">
          <Signup />
          <p className="toggle-text">
            Already have an account?{" "}
            <span className="toggle-link" onClick={() => setIsLogin(true)}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
