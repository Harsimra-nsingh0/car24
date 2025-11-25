// import React, { useState } from "react";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errors = {};
//     if (!email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Email is invalid";
//     }
//     if (!password) {
//       errors.password = "Password is required";
//     } else if (password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }
//     return errors;
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setErrors({});
//     alert(`Logged in with email: ${email}`);
//   };

//   return (
//     <div>
//       <h2 className="title">Login</h2>
//       <form onSubmit={handleLogin} className="form">
//         <div className="input-group">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>
//         <div className="input-group">
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {errors.password && <span className="error">{errors.password}</span>}
//         </div>
//         <button type="submit" className="btn">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <h2 className="title">Login</h2>
      {message && <p style={{color: 'green', textAlign: 'center'}}>{message}</p>}
      <form onSubmit={handleLogin} className="form">
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
