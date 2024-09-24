# React Collect Feedback Widget
React-Collect-Feedback is a highly customizable feedback widget component built with React. It allows easy collection of user feedback through ratings, emojis, or text inputs. The widget can be integrated into any React application, providing seamless feedback collection that can be adapted to fit your needs.

## Features
- Multiple templates for collecting feedback (rating, product review, score).
- Emoji-based feedback.
- Customizable rating system (e.g., 5 stars).
- Text-based feedback collection.
- User information collection (name, email, contact).
- Easy configuration of feedback options and display.
- Customizable widget position and auto-close functionality.

## Installation
- You can install the widget from npm by running:
```npm install react-collect-feedback```
- Usage
To start using the react-collect-feedback widget in your project, import it and use it within your components.

```
import React from 'react';
import FeedbackWidget from 'react-collect-feedback';

function App() {
  const handleFeedbackSubmit = (data) => {
    console.log("Feedback submitted:", data);
  };

  const feedbackWidgetProps = {
    template: "rating",
    promptText: "How did we do?",
    showThumb: false,
    position: "bottom-right",
    onSubmitFeedback: handleFeedbackSubmit,
    feedbackTitle: "Tell us what you think",
    closeAfter: 5000,
    options: [
      { title: "What kind of feedback do you have?" },
      { icon: "👍", text: "I like something" },
      { icon: "👎", text: "I don't like something" },
      { icon: "💡", text: "I have an idea" }
    ],
    captureUserInfo: { name: true, email: true, contact: true },
    ratings: [
      { value: "Speed of website", mandatory: true },
      { value: "Content quality", mandatory: true },
      { value: "Ease of navigation", mandatory: false }
    ],
    score: [
      { title: "How satisfied are you?", number: 5 },
      { title: "How likely are you to recommend us?", number: 10 }
    ]
  };

  return (
    <div>
      <FeedbackWidget {...feedbackWidgetProps} />
    </div>
  );
}

export default App;
```

## Props Configuration
- ```template```: Choose a template for feedback collection. Options include
- - ```product```: For collecting product-related feedback.
- - ```page```: General page feedback.
- - ```rating```: Star ratings for specific feedback categories.
- - ```score```: Score-based feedback, e.g., 1 to 5 or 1 to 10.
- ```promptText```: Text prompt for initiating the feedback collection (default is "How did we do?").
- ```showThumb```: Show thumbs up/down for quick reactions. Default is false.
- ```position```: Position of the feedback widget on the screen. Available positions:
- - ```bottom-right```
- - ```bottom-left```
- - ```top-right```
- - ```top-left```
- ```onSubmitFeedback```: Callback function that will receive the collected feedback data when the user submits it.
- ```feedbackTitle```: Title text that appears at the top of the feedback popup (e.g., "Tell us what you think").
- ```closeAfter```: Time in milliseconds after which the widget will close automatically after submission. Default is 5000.
- ```options```: Array of objects defining feedback options (icons, text) for quick user feedback.
- ```captureUserInfo```: Boolean values for capturing user information (name, email, contact).
- ```ratings```: Array of objects for rating different aspects (value, mandatory status). Example:

```
[
  { "value": "Speed of website", "mandatory": true },
  { "value": "Content quality", "mandatory": true }
]
score: Array of objects for collecting score-based feedback. Example:

json
Copy code
[
  { "title": "How satisfied are you?", "number": 5 },
  { "title": "How likely are you to recommend us?", "number": 10 }
]
```

## Contributing
If you want to contribute to this project, feel free to submit pull requests or open issues for suggestions and bug reports.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
