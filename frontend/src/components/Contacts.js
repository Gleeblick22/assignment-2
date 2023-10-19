function Contact(props){
    return (
        <div>
            <h5 class="{props.id}">{props.name}</h5>
            <ul>
                <li><input type="text" name="name" placeholder="Name"/></li>
                <li><input type="tel" name="phone_number" placeholder="Phone Number"/></li>
            </ul>
        </div>
    );
}

export default Contact;