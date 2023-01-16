class Message {

    constructor(postedTime = null, message = null) {

        this.postedTime = postedTime;
        this.message = message;
    }

    /* GETTERS */
    get_postedTime() { return this.postedTime }
    get_message() {return this.message }

    /* SETTERS */
    set_postedTime(newPostedTime) { this.postedTime = newPostedTime }
    set_message(newMessage) { this.message = newMessage }

}

//Export the class
module.exports = Message;