// // import React, { useState } from "react";

// // function Signup() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [errors, setErrors] = useState({});

// //   const validate = () => {
// //     const errors = {};
// //     if (!email) {
// //       errors.email = "Email is required";
// //     } else if (!/\S+@\S+\.\S+/.test(email)) {
// //       errors.email = "Email is invalid";
// //     }
// //     if (!password) {
// //       errors.password = "Password is required";
// //     } else if (password.length < 6) {
// //       errors.password = "Password must be at least 6 characters";
// //     }
// //     if (password !== confirmPassword) {
// //       errors.confirmPassword = "Passwords do not match";
// //     }
// //     return errors;
// //   };

// //   const handleSignup = (e) => {
// //     e.preventDefault();
// //     const validationErrors = validate();
// //     if (Object.keys(validationErrors).length > 0) {
// //       setErrors(validationErrors);
// //       return;
// //     }
// //     setErrors({});
// //     alert(`Account created for: ${email}`);
// //   };

// //   return (
// //     <div>
// //       <h2 className="title">Sign Up</h2>
// //       <form onSubmit={handleSignup} className="form">
// //         <div className="input-group">
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //           {errors.email && <span className="error">{errors.email}</span>}
// //         </div>
// //         <div className="input-group">
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           {errors.password && <span className="error">{errors.password}</span>}
// //         </div>
// //         <div className="input-group">
// //           <input
// //             type="password"
// //             placeholder="Confirm Password"
// //             value={confirmPassword}
// //             onChange={(e) => setConfirmPassword(e.target.value)}
// //           />
// //           {errors.confirmPassword && (
// //             <span className="error">{errors.confirmPassword}</span>
// //           )}
// //         </div>
// //         <button type="submit" className="btn">Sign Up</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Signup;



// import React, { useState } from "react";
// import axios from "axios";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState("");

//   const validate = () => {
//     const errors = {};
//     if (!email) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
//     if (!password) errors.password = "Password is required";
//     else if (password.length < 6) errors.password = "Password must be at least 6 characters";
//     if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
//     return errors;
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setErrors({});

//     try {
//       const res = await axios.post("http://localhost:5000/signup", { email, password });
//       setMessage(res.data.message);
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//     } catch (err) {
//       setMessage(err.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2 className="title">Sign Up</h2>
//       {message && <p style={{color: 'green', textAlign: 'center'}}>{message}</p>}
//       <form onSubmit={handleSignup} className="form">
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
//         <div className="input-group">
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
//         </div>
//         <button type="submit" className="btn">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;


import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });
      
      setMessage(res?.data?.message || "Account created successfully!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Server error: Unable to connect.");
      }
    }
  };

  return (
    <div>
      <h2 className="title">Sign Up</h2>
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
      <form onSubmit={handleSignup} className="form">
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
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
