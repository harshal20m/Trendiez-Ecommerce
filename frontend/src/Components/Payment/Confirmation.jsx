import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css"; // Import your CSS file for styling

const Confirmation = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	// Extract order details from state
	const orderId = state?.orderId || "N/A"; // Use "N/A" if orderId is not available
	const amount = state?.amount ? `Rs. ${state.amount}` : "N/A"; // Format amount

	const handleGoHome = () => {
		navigate("/"); // Navigate to home or any desired page
	};

	return (
		<div className="confirmation-container">
			<h1>Thank You for Your Order!</h1>
			<p>Your order has been successfully placed.</p>
			<div className="confirmation-details">
				<h2>Order Details</h2>
				<p>
					<strong>Order ID:</strong> {orderId}
				</p>
				<p>
					<strong>Amount:</strong> {amount}
				</p>
			</div>
			<button onClick={handleGoHome} className="home-button">
				Go to Home
			</button>
		</div>
	);
};

export default Confirmation;
