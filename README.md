# AI-product-description-generator-app

# Application Functionality
This web application utilizes generative AI to generate product descriptions in 4 different languages at the same time out of 30 possible languages for a given product based on a demo video and other data provided by users like benefits of using the product. The application supports both video files from the system(MP4 format) and the YouTube URLs(Public). The videos must have a maximum 2 minutes duration. The application also gives customisation & personalization options like selecting the tone and style from the list or providing a custom sample text to copy its tone and style. The generated descriptions can be copied on clipboard to paste it in some document or can be downloaded as a text file with all the descriptions.

# VIDEO DEMO OF APP
(https://youtu.be/RzQF5iflB1o)

# System Design
![project system design (4)](https://github.com/user-attachments/assets/d8c577b2-34c4-4bd4-8731-29a4f57ad4cb)

# TECH-STACK
  # FRONT-END
  React: It is a javascript library, as I already worked with javascript in previous project, learning and using react was not a difficult task, also the state management feature of react to change the state and 
  updating the user interface based on the current state helped me to develop dynamic,interactive user interface.

  React-Context-Api: Used it to store and access data in different components

  SASS (SCSS): It is a CSS preprocessor, which let me write CSS code in more modular and manageable way. It has a mixin feature, which is like a function where I defined certain styles, now whenever I had to 
  implement those styles for a certain selector, i just called the mixin function with necessary parameters and the styles defined in mixin were automatically added for that selector, this allowed me to 
  implement same style with different values for multiple selectors without writing the same style at every place, hence reducing the number of lines of code and still implementing the required styles
  
  # BACK-END
  Python (Flask): I used flask framework for backend because I had previous experience working with it, also flask framework is easy to use and helps in rapid development.I used it to create a REST API which       handles the request from client to generate descriptions and return the descriptions in response
  
  # DATABASE
  IndexedDB: It is a web/browser storage, i used to store user video file before sending the file to backend. I used it because of its large storage space and it's ability to store video files.

  # LLM Model
  I integrated Gemini model in the backend via its api. The reson for choosing this model is its ability to handle multimodal inputs like video file and text in this app and generating response in multiple         languages. It's free tier usage was ideal for development of the application.

# MY ROLE
I was working as the sole developer on this project, handling tasks like developing frontend and backend apis, implementing request and response cycle, data validation, prompt creation for genAI model and 
handling data storage and state management

# CHALLENGES
Handling the video file or YouTube URL in backend was little difficult as I had to add extra lines of code, google the error and use different library to handle the issues like failing to retrive information about a youtube video from youtube api

# EXTRA FEATURES
1. Integration with google drive or other cloud storage platforms to directly store the descriptions in those storage platforms.
   
# LEARNINGS
I learnt how to handle state using react-context-api and developing REST APIs.
