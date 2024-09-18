import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";


export const sendEmail= async({email,emailType,userId}:any)=>{
    try {
        const hashedToken=await bcryptjs.hash(userId.toString(),10)
        if(emailType==="verifyEmail"){
          const updatedUser=await User.findByIdAndUpdate(userId,{
            $set: {
              verifyToken:hashedToken, 
              verifyTokenExpiry:Date.now()+3600000},
          }
          )
        }else if(emailType==="forgotPassword"){
          await User.findByIdAndUpdate(userId,{
            $set:{
              forgotPasswordToken:hashedToken,
              forgotPasswordExpiry:Date.now()+3600000
            }
          }
          )
        }
        const transporter = nodemailer.createTransport({
          host: 'sandbox.smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'f4d88560cc593d',
            pass: '127c0844fdab5c',
          },
        });



        const mailOptions = {
          from: "as9582194841@gmail.com",
          to: email,
          subject: emailType === "forgotPassword" ? "Forgot Password" : "Verify Your Email",
          html: emailType === "forgotPassword" ? `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #4CAF50;">Reset Your Password</h2>
              <p>Hello,</p>
              <p>We received a request to reset your password. Please click the link below to reset your password:</p>
              <a href="${process.env.DOMAIN}/forgotPassword?token=${hashedToken}" 
                 style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                 Reset Password
              </a>
              <p>If you did not request a password reset, please ignore this email.</p>
              <p>Thank you!</p>
              <p>Your App Team</p>
            </div>
          ` : `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #4CAF50;">Verify Your Email</h2>
              <p>Hello,</p>
              <p>Thank you for signing up. Please verify your email by clicking the button below:</p>
              <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}" 
                 style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                 Verify Email
              </a>
              <p>If you did not sign up for this account, please ignore this email.</p>
              <p>Thank you!</p>
              <p>Your App Team</p>
            </div>
          `,
        };
        

          const mailResponse=await transporter.sendMail(mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}