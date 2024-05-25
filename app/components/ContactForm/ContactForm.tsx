import '@/app/components/ContactForm/ContactForm.css'

function ContactForm() {
    return (
        <form action="http://127.0.0.1:8000/mail/contact-us/" method="post" role="form"
            className="contactform" noValidate>
            <div className="mt-2">
                <div className="loading text-center d-none">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className="alert alert-danger text-center d-none"></div>
                <div className="alert alert-success text-center d-none"></div>
            </div>
            <div className="row">
                <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="id_name"
                        placeholder="Your Name" required />
                    <div className="invalid-feedback name-feeback">Enter your name.</div>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" id="id_email"
                        placeholder="Your Email" required />
                    <div className="invalid-feedback email-feedback">Enter a valid email address.</div>
                </div>
            </div>
            <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="id_subject"
                    placeholder="Subject" required />
                <div className="invalid-feedback subject-feedback">Enter a subject.</div>
            </div>
            <div className="form-group mt-3">
                <textarea className="form-control" name="message" id="id_message"
                    placeholder="Message" required></textarea>
                <div className="invalid-feedback message-feedback">Enter a message.</div>
            </div>
            <div><input type="text" name="recipient_email" id="id_recipient_email" hidden /></div>
            <div className="text-center"><button type="submit">Send Message</button></div>
        </form>
    )
}

export default ContactForm