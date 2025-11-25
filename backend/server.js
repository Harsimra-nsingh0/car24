// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcryptjs');

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/authDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log(err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // ===== Routes =====

// // Signup
// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   // Check if user exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Save user
//   const user = new User({ email, password: hashedPassword });
//   await user.save();

//   res.status(201).json({ message: 'User created successfully' });
// });

// // Login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Find user
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: 'User not found' });

//   // Check password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

//   res.status(200).json({ message: 'Login successful' });
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(express.json()); // replaces bodyParser.json()

// ===== MongoDB Connection (Updated — NO deprecated options) =====
mongoose.connect('mongodb://127.0.0.1:27017/authDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// ===== User Schema =====
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// ===== Routes =====

// SIGNUP
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===== Start Server =====
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
