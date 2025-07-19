import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API);


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