const { Doctor, Admin, Nurse, Pharmacist } = require("../models");
const nodemailer = require("nodemailer");
const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nithinambati9@gmail.com",
    pass: "nshv cokv qdpw pdzi",
  },
});

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getOtp = async (req, res) => {
  const { userId } = req.query;

  try {
    let user;
    if (userId.startsWith("A")) user = await Admin.findOne({ userId });
    else if (userId.startsWith("D")) user = await Doctor.findOne({ userId });
    else if (userId.startsWith("N")) user = await Nurse.findOne({ userId });
    else if (userId.startsWith("P"))
      user = await Pharmacist.findOne({ userId });

    if (!user || !user.email) {
      return res.status(404).json("User not found or email not available");
    }

    const otp = generateOtp();
    otpStore.set(user.email, otp);

    const mailOptions = {
      from: "nithinambati9@gmail.com",
      to: user.email,
      subject: "RGUKT Health Center password reset",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json("OTP sent successfully");
  } catch (error) {
    res.status(500).json("Error sending OTP");
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (storedOtp === otp) {
    otpStore.delete(email);
    res.status(200).json("OTP Verified..");
  } else {
    res.status(400).json("Invalid OTP");
  }
};

module.exports = {
  getOtp,
  verifyOtp,
};
