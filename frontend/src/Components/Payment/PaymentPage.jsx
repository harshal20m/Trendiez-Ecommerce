// import React, { useState } from "react";
// import axios from "axios";

// const PaymentPage = () => {
// 	const [address, setAddress] = useState("");
// 	const [phone, setPhone] = useState("");

// 	const handlePayment = async () => {
// 		try {
// 			const { data } = await axios.post("http://localhost:5000/createOrder", { amount: 1000 }); // amount in the smallest currency unit
// 			const options = {
// 				key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
// 				amount: data.amount,
// 				currency: data.currency,
// 				order_id: data.id,
// 				name: "Your eCommerce",
// 				description: "Test Transaction",
// 				handler: (response) => {
// 					alert(`Payment ID: ${response.razorpay_payment_id}`);
// 					alert(`Order ID: ${response.razorpay_order_id}`);
// 				},
// 				prefill: {
// 					name: "User Name",
// 					email: "user@example.com",
// 					contact: phone,
// 				},
// 			};
// 			const razor = new window.Razorpay(options);
// 			razor.open();
// 		} catch (error) {
// 			console.error("Payment failed:", error);
// 		}
// 	};

// 	const handleCOD = () => {
// 		alert("Order placed with Cash on Delivery");
// 	};

// 	return (
// 		<div className="payment-page">
// 			<h2>Delivery Information</h2>
// 			<input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
// 			<input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
// 			<button onClick={handlePayment}>Continue to Pay</button>
// 			<button onClick={handleCOD}>Cash on Delivery</button>
// 		</div>
// 	);
// };

// export default PaymentPage;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { orderId, amount } = state;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	const initiatePayment = async () => {
		const options = {
			key: "rzp_test_11yKQvEcH7PcFU", // Replace with your Razorpay Key ID
			amount: amount * 100,
			currency: "INR",
			name: "Trendiez",
			description: "Order Payment",
			order_id: orderId,
			handler: async (response) => {
				const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

				try {
					const verifyResponse = await fetch("https://trendiez-ecommerce.onrender.com/verifyPayment", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							order_id: razorpay_order_id,
							payment_id: razorpay_payment_id,
							signature: razorpay_signature,
						}),
					});
					const verification = await verifyResponse.json();

					if (verification.success) {
						alert("Payment successful!");
						navigate("/confirmation");
					} else {
						alert("Payment verification failed!");
					}
				} catch (error) {
					console.error("Error verifying payment:", error);
					alert("Error verifying payment");
				}
			},
			prefill: {
				name,
				email,
				contact: phone,
			},
			notes: {
				address,
			},
			theme: {
				color: "#3399cc",
			},
		};

		const razorpay = new window.Razorpay(options);
		razorpay.open();
	};
	console.log(amount);

	const handleCOD = () => {
		alert("Order placed with Cash on Delivery");
		navigate("/confirmation");
	};

	return (
		<div className="payment-container">
			<h2>Enter Delivery and Contact Details</h2>
			<div className="payment-form-group">
				<label>Name</label>
				<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="payment-form-group">
				<label>Email</label>
				<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>
			<div className="payment-form-group">
				<label>Address</label>
				<input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
			</div>
			<div className="payment-form-group">
				<label>Phone Number</label>
				<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
			</div>
			<div className="payment-button-group">
				<button onClick={initiatePayment}>Continue to Pay</button>
				<button onClick={handleCOD}>Cash on Delivery</button>
			</div>
		</div>
	);
};

export default PaymentPage;
