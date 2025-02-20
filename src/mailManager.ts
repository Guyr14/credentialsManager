const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'guy1415@gmail.com',
        pass: 'hvsb mpyi qzlf zisx'
    }
});

export function sendMail(toEmail: string, message: string) {
        console.log('sending mail...')
        const mailOptions = {
            from: 'guyratz@post.bgu.ac.il',
            to: toEmail,
            subject: 'Notification',
            text: message
        };

        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
}

