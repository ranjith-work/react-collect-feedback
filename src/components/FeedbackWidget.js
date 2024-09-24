import React, { useState } from "react";
import FeedbackPopup from "./FeedbackPopup";

const FeedbackWidget = (props) => {
	const [selectedThumb, setSelectedThumb] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);

	const emojis = [
		{ label: "Impressed", icon: "🤩" },
		{ label: "Like", icon: "☺️" },
		{ label: "Neutral", icon: "😐" },
		{ label: "Dislike", icon: "☹️" },
		{ label: "Angry", icon: "😠" },
	];

	const handleThumbClick = (thumb) => {
		setSelectedThumb(thumb);
		setIsPopupOpen(true);
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setIsPopupOpen(true);
	};

	const handleClosePopup = () => {
		setIsPopupOpen(false);
	};

	const handleSubmit = (feedbackData) => {
		const data = {
			thumb: selectedThumb,
			option: feedbackData.option,
			feedback: feedbackData.feedback,
			userInfo: feedbackData.userInfo,
			emoji: feedbackData.emoji,
			rating: feedbackData.ratings,
			scores: feedbackData.scores,
		};
		props.onSubmitFeedback(data);

		setSelectedThumb(null);
	};

	return (
		<div className="feedback-widget">
			<div className="feedback-main-controls">
				<span onClick={() => setIsPopupOpen(true)}>{props.promptText}</span>
				{props.showThumb && (
					<>
						<span
							aria-label="Thumbs Up"
							onClick={() => handleThumbClick("up")}
							style={{ cursor: "pointer" }}>
							👍
						</span>
						<span
							aria-label="Thumbs Down"
							onClick={() => handleThumbClick("down")}
							style={{ cursor: "pointer" }}>
							👎
						</span>
					</>
				)}
			</div>

			{isPopupOpen && (
				<FeedbackPopup
					{...props}
					thumb={selectedThumb}
					onClose={handleClosePopup}
					onSubmit={handleSubmit}
					onOptionClick={handleOptionClick}
					emojis={emojis}
				/>
			)}
		</div>
	);
};

export default FeedbackWidget;
