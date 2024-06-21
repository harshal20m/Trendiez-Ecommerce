import React from "react";
import "./hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_images.jpg";

const Hero = () => {
	return (
		<div className="hero">
			<div className="hero-left">
				<h2>New Arrivals Only</h2>
				<div>
					<div className="hero-hand-icon">
						<p>New</p>
						<img src={hand_icon} alt="" />
					</div>
					<p>Collections</p>
					<p>for Every One </p>
				</div>
				<div className="hero-latest-btn">
					<div>Latest Collections</div>
					<img src={arrow_icon} alt="" />
				</div>
			</div>
			<div className="hero-right">
				<img src={hero_image} alt="" />
			</div>
		</div>
	);
};

export default Hero;
