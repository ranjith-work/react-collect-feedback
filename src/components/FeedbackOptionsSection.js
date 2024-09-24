import React from "react";

const FeedbackOptionsSection = ({ options, onOptionClick }) => {
	return (
		<div className="feedback-options">
			{options.map((option, index) => (
				<div
					key={index}
					className="feedback-option"
					onClick={() => onOptionClick(option)} // Capture option selection
					style={{ cursor: "pointer" }}>
					{option.icon && <span className="option-icon">{option.icon}</span>}
					<span className="option-text">{option.text}</span>
				</div>
			))}
		</div>
	);
};

export default FeedbackOptionsSection;
