import React, { useState } from "react";

const UserInfoSection = ({ userInfo, captureUserInfo, onInputChange }) => {
	const [emailError, setEmailError] = useState("");

	const validateEmail = (email) => {
		// Simple email regex for validation
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const handleEmailChange = (e) => {
		const { value } = e.target;
		onInputChange(e);

		// Validate email
		if (!validateEmail(value)) {
			setEmailError("Please enter a valid email.");
		} else {
			setEmailError("");
		}
	};

	return (
		<div className="user-info-section">
			{captureUserInfo.name && (
				<input
					type="text"
					name="name"
					value={userInfo.name}
					onChange={onInputChange}
					placeholder="Your Name"
					className="user-info-input"
				/>
			)}
			{captureUserInfo.email && (
				<div className="email-input-section">
					<input
						type="email"
						name="email"
						value={userInfo.email}
						onChange={handleEmailChange}
						placeholder="Your Email"
						className="user-info-input"
					/>
					{emailError && <div className="error-message">{emailError}</div>}
				</div>
			)}
			{captureUserInfo.contact && (
				<input
					type="tel"
					name="contact"
					value={userInfo.contact}
					onChange={onInputChange}
					placeholder="Your Contact Number"
					className="user-info-input"
				/>
			)}
		</div>
	);
};

export default UserInfoSection;
