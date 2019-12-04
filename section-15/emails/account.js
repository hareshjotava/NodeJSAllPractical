const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'haresh.jotava@synoverge.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'haresh.jotava@synoverge.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}