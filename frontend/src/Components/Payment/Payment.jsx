import "./Payment.css"; // Import CSS file

import qr_icon from "../Assets/QR.jpg";

const Payment = ({ discount }) => {
	return (
		<div className="payment-container">
			<img src={qr_icon} className="payment-image" alt="QR_Code" />
			<h1 className="payment-heading">{discount}</h1>
			{console.log(discount)}
		</div>
	);
};

export default Payment;
