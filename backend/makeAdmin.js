require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = process.argv[2];
    
    if (!email) {
      console.log('Please provide an email address.');
      console.log('Usage: node makeAdmin.js <user_email>');
      process.exit(1);
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`User with email ${email} not found!`);
      process.exit(1);
    }

    if (user.isAdmin) {
        console.log(`User ${email} is already an admin.`);
        process.exit(0);
    }

    user.isAdmin = true;
    await user.save();
    
    console.log(`Successfully promoted ${email} to Admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

makeAdmin();
