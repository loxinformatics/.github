export default function Mail() {
    return (
        <div>
            <form action="">
                <input type="text" name="name" id="id_name" />
                <input type="email" name="sender_email" id="id_sender_email" />
                <input type="text" name="subject" id="id_subject" />
                <input type="text" name="message" id="id_message" />
                <input type="hidden" name="recipient_email" />
            </form>
        </div>
    )
}