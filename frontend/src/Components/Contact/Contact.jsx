import React, { useState } from "react";
import "./contact.css";

const Contact = () => {
	const [messageSent, setMessageSent] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// Check if all fields are filled in
		if (formData.name && formData.email && formData.message) {
			// Here you can implement your logic to handle the form submission,
			// such as sending the data to a server.
			// For this example, we're simply setting messageSent to true after a brief delay to simulate a response.
			setTimeout(() => {
				setMessageSent(true);
				setFormData({
					name: "",
					email: "",
					message: "",
				});
			}, 1000);
		}
	};

	return (
		<div className="contact-container">
			<h1>Contact Us</h1>
			<p>
				Have questions or need assistance? Feel free to contact us using the information below, or use the
				contact form to send us a message directly.
			</p>
			<div className="contact-info">
				<div>
					<h2>Visit Us</h2>
					<p>JM Road </p>
					<p>Pune ,411005, Maharashtra </p>
				</div>
				<div>
					<h2>Call Us</h2>
					<p>8669119880</p>
				</div>
				<div>
					<h2>Email Us</h2>
					<p>contact@trendiez.com</p>
				</div>
			</div>
			<div className="contact-form">
				<h2>Send Us a Message</h2>
				<form onSubmit={handleFormSubmit}>
					<div>
						<label htmlFor="name">Name:</label>
						<input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
					</div>
					<div>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="message">Message:</label>
						<textarea
							id="message"
							name="message"
							rows="4"
							value={formData.message}
							onChange={handleInputChange}
						></textarea>
					</div>
					<button type="submit" className="hero-btn">
						Send
					</button>
				</form>
				{messageSent && <p className="response">Message sent successfully!</p>}
			</div>
		</div>
	);
};

export default Contact;
