import React, { useState } from "react";
import UserInfoSection from "./UserInfoSection";
import FeedbackOptionsSection from "./FeedbackOptionsSection";
import usePositionStyles from "./usePositionStyles";
import ButtonGroup from "./ButtonGroup";

const FeedbackPopup = (props) => {
	const popupStyles = usePositionStyles(props.position);

	const [feedbackText, setFeedbackText] = useState("");
	const [showTextarea, setShowTextarea] = useState(false);
	const [showUserInfo, setShowUserInfo] = useState(false);
	const [selectedEmoji, setSelectedEmoji] = useState(null);
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectedRatings, setSelectedRatings] = useState({});
	const [selectedScores, setSelectedScores] = useState({});
	const [currentScoreIndex, setCurrentScoreIndex] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		contact: "",
	});

	const handleScoreClick = (scoreKey, value) => {
		setSelectedScores((prevScores) => ({
			...prevScores,
			[scoreKey]: value,
		}));
	};

	const handleNextScoreClick = () => {
		const currentScoreTitle = props.score[currentScoreIndex].title;

		if (!selectedScores[currentScoreTitle]) {
			alert("Please select a score before proceeding.");
			return;
		}

		if (currentScoreIndex < props.score.length - 1) {
			setCurrentScoreIndex(currentScoreIndex + 1);
		} else {
			setShowTextarea(true);
		}
	};

	const handleSubmit = () => {
		const feedbackData = {
			emoji: selectedEmoji,
			feedback: feedbackText,
			option: selectedOption,
			ratings: selectedRatings,
			userInfo,
			scores: selectedScores,
		};

		props.onSubmit(feedbackData);

		setSubmitted(true);

		setSelectedEmoji(null);
		setFeedbackText("");
		setSelectedOption(null);
		setSelectedRatings({});
		setSelectedScores({});
		setCurrentScoreIndex(0);
		setUserInfo({
			name: "",
			email: "",
			contact: "",
		});

		setTimeout(() => {
			props.onClose();
		}, props.closeAfter || 5000);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserInfo((prevInfo) => ({
			...prevInfo,
			[name]: value,
		}));
	};

	const handleNextClick = () => {
		if (!showTextarea) {
			setShowTextarea(true);
		} else if (shouldCaptureUserInfo() && !showUserInfo) {
			setShowUserInfo(true);
		} else {
			handleSubmit();
		}
	};

	const allMandatoryRatingsSelected = () => {
		return props.ratings.every(
			(rating) => !rating.mandatory || selectedRatings[rating.value]
		);
	};

	const shouldCaptureUserInfo = () => {
		const { name, email, contact } = props.captureUserInfo;
		return name || email || contact;
	};

	const isUserInfoFilled = () => {
		if (props.captureUserInfo) {
			const { name, email, contact } = userInfo;
			return (
				(props.captureUserInfo.name ? name.trim() : true) &&
				(props.captureUserInfo.email ? email.trim() : true) &&
				(props.captureUserInfo.contact ? contact.trim() : true)
			);
		}
		return true;
	};

	const handleEmojiClick = (emoji) => {
		setSelectedEmoji(emoji);
		setShowTextarea(true);
	};

	const handleRatingClick = (ratingKey, value) => {
		setSelectedRatings((prevRatings) => ({
			...prevRatings,
			[ratingKey]: value,
		}));
	};

	const handleOptionClick = (option) => {
		setSelectedOption(option);
		setShowTextarea(true);
	};

	return (
		<div style={popupStyles} className="feedback-popup">
			{!submitted ? (
				<>
					<div className="feedback-header">
						<div className="feedback-title">{props.feedbackTitle}</div>
						<button className="close-button" onClick={props.onClose}>
							&times;
						</button>
					</div>

					{!showUserInfo && (
						<>
							{/* Score Template Handling */}
							{props.template === "score" && !showTextarea && (
								<div className="feedback-scores">
									<div className="score-item feedback-body">
										<div className="score-title">
											{props.score[currentScoreIndex].title}
										</div>
										<div className="score-numbers">
											{[
												...Array(
													Math.min(props.score[currentScoreIndex].number, 10)
												),
											].map((_, index) => (
												<span
													key={index + 1}
													className={`circle-number ${
														selectedScores[
															props.score[currentScoreIndex].title
														] ===
														index + 1
															? "selected"
															: ""
													}`}
													onClick={() =>
														handleScoreClick(
															props.score[currentScoreIndex].title,
															index + 1
														)
													}>
													{index + 1}
												</span>
											))}
										</div>
									</div>
									<ButtonGroup
										showNext={true}
										nextDisabled={
											!selectedScores[props.score[currentScoreIndex].title]
										}
										onNextClick={handleNextScoreClick}
									/>
								</div>
							)}

							{/* Display emojis or options */}
							{props.template === "page" && (
								<div className="feedback-body">
									<div className="feedback-emojis">
										{props.emojis.map((emoji, index) => (
											<div
												key={index}
												className={`feedback-emoji ${
													selectedEmoji
														? selectedEmoji.label === emoji.label
															? "selected"
															: "not-selected"
														: ""
												}`}
												onClick={() => handleEmojiClick(emoji)}
												style={{ cursor: "pointer" }}>
												<span className="emoji-icon">{emoji.icon}</span>
												<span className="emoji-label">{emoji.label}</span>
											</div>
										))}
									</div>
								</div>
							)}

							{/* Show options for product template */}
							{props.template === "product" &&
								props.options &&
								props.options.length > 0 && (
									<div className="feedback-body">
										<FeedbackOptionsSection
											options={props.options}
											onOptionClick={handleOptionClick}
											selectedOption={selectedOption}
										/>
									</div>
								)}

							{/* Show ratings for the "rating" template */}
							{props.template === "rating" && !showTextarea && (
								<div className="feedback-ratings">
									<div className="feedback-body">
										{props.ratings.map((rating) => (
											<div key={rating.value} className="rating-item">
												<div className="rating-label">
													{rating.value}
													{rating.mandatory && " *"}{" "}
													{/* Indicate mandatory ratings */}
												</div>
												<div className="rating-stars">
													{[1, 2, 3, 4, 5].map((star) => (
														<span
															key={star}
															onClick={() =>
																handleRatingClick(rating.value, star)
															}
															style={{
																cursor: "pointer",
																color:
																	selectedRatings[rating.value] >= star
																		? "#FFD700"
																		: "gray",
															}}>
															★
														</span>
													))}
												</div>
											</div>
										))}
									</div>

									<ButtonGroup
										showNext={true}
										nextDisabled={!allMandatoryRatingsSelected()}
										onNextClick={handleNextClick}
									/>
								</div>
							)}

							{/* Feedback textarea */}
							{showTextarea && !showUserInfo && (
								<>
									<div className="feedback-body">
										<textarea
											className="feedback-text-container"
											value={feedbackText}
											onChange={(e) => setFeedbackText(e.target.value)}
											placeholder="Enter your feedback here"
											rows="4"
										/>
									</div>
									<ButtonGroup
										showNext={shouldCaptureUserInfo()}
										showSubmit={!shouldCaptureUserInfo()}
										nextDisabled={feedbackText.trim() === ""}
										onNextClick={handleNextClick}
										onSubmitClick={handleSubmit}
									/>
								</>
							)}
						</>
					)}

					{/* User Info Section */}
					{showUserInfo && (
						<>
							<div className="feedback-body">
								<UserInfoSection
									userInfo={userInfo}
									captureUserInfo={props.captureUserInfo}
									onInputChange={handleInputChange}
								/>
							</div>
							<ButtonGroup
								showSubmit={true}
								submitDisabled={!isUserInfoFilled()}
								onSubmitClick={handleSubmit}
							/>
						</>
					)}
				</>
			) : (
				<div className="feedback-success-message">
					<h3>Thank you for your feedback!</h3>
					<p>Your feedback has been successfully submitted.</p>
					<button className="close-button" onClick={props.onClose}>
						&times;
					</button>
				</div>
			)}
		</div>
	);
};

export default FeedbackPopup;
