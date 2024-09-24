import React from "react";

const ButtonGroup = ({
	showNext,
	showSubmit,
	nextDisabled,
	submitDisabled,
	onNextClick,
	onSubmitClick,
}) => {
	return (
		<div className="button-group">
			{showNext && (
				<button
					onClick={onNextClick}
					className={`button-default ${nextDisabled ? "button-disabled" : ""}`}
					disabled={nextDisabled}>
					Next
				</button>
			)}

			{showSubmit && (
				<button
					onClick={onSubmitClick}
					className="button-default button-default-submit"
					disabled={submitDisabled}>
					Submit
				</button>
			)}
		</div>
	);
};

export default ButtonGroup;
