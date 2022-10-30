const express = require('express');
//import { Express } from 'express';
const dotenv = require('dotenv');

//import connectDB from './config/db';
const connectDB = require('./config/db')
const app = express();

const cors = require('cors');
const path = require('path');
//import passport from 'passport';
const passport = require('passport');
//import session from 'express-session';
const session = require('express-session');

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/User');
//const Feedback = require("./models/Feedback");
var bodyParser = require('body-parser');

//dotenv.config({ path: path.resolve(__dirname, './.env') })


dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//connect database
connectDB();
//  user authentication
app.use(session({
  secret: 'health is wealth',
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());



passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes---
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/feedback', require('./routes/feedback'));
// app.use('/api/mailer', require('./routes/mailer'));
// app.use('/api/sendtoken', require('./routes/sendToken'));
// app.use('/api/sentiment', require('./routes/sentiment'));
// app.use('/api/predictSafety', require('./routes/streetmlalgo'));
app.use(express.json({
  extended: false
}));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT ${PORT}`)
});
