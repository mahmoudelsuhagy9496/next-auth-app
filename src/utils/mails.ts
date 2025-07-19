import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API);

// send Verification Token
export const sendVerificationToken=async (email:string,token:string)=>{
const link=`${process.env.DOMAIN}/verify?token=${token}`

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'Hello World',
  html: `
  
  <div>
  <a href="${link}">
  Click here to verify your email
  </a>
  </div>
  `
});
}



// send Reset Password Token
export const sendResetPasswordToken=async (email:string,token:string)=>{
const link=`${process.env.DOMAIN}/reset-password?token=${token}`

await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: email,
  subject: 'Reset your password',
  html: `
  
  <div>
  <a href="${link}">
  Click here to reset your password
  </a>
  </div>
  `
});
}