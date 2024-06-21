import React from "react";
import "./Company.css";

const Company = () => {
	return (
		<div className="company-container">
			<h1>Our Company</h1>
			<p>
				At RENTCAR.IN, we pride ourselves on providing top-quality rental vehicles and excellent customer
				service. With years of experience in the industry, we have built a reputation for reliability and
				professionalism.
			</p>
			<h2>Our Mission</h2>
			<p>
				Our mission is to make transportation easy and convenient for our customers. We aim to offer a wide
				range of vehicles to suit every need and budget, whether it's for a business trip, family vacation, or
				weekend getaway.
			</p>
			<h2>Our Values</h2>
			<ul>
				<li>
					Customer Satisfaction: We prioritize the needs and satisfaction of our customers above all else.
				</li>
				<li>
					Quality Vehicles: We maintain a fleet of well-maintained vehicles to ensure a comfortable and safe
					driving experience.
				</li>
				<li>
					Transparency: We believe in transparent pricing and policies, providing our customers with all the
					information they need to make informed decisions.
				</li>
				<li>
					Community Engagement: We are committed to giving back to the communities we serve through various
					initiatives and partnerships.
				</li>
			</ul>
		</div>
	);
};

export default Company;
