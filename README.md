# AI-product-description-generator-app

[VIDEO DEMO OF APP](https://youtu.be/QdmRjLoZjG4)

# Application Functionality
This web application utilizes generative AI to generate product descriptions in 4 different languages at the same time out of 30 possible languages for a given product based on product's images,features and benefits provided by user as input

# TECH-STACK
  # FRONT-END
  React: It is a javascript library, as I already worked with javascript in previous project, learning and using react was not a difficult task, also the state management feature of react to change the state and 
  updating the user interface based on the current state helped me to develop dynamic,interactive user interface.

  SASS (SCSS): It is a CSS preprocessor, which let me write CSS code in more modular and manageable way. It has a mixin feature, which is like a function where I defined certain styles, now whenever I had to 
  implement those styles for a certain selector, i just called the mixin function with necessary parameters and the styles defined in mixin were automatically added for that selector, this allowed me to 
  implement same style with different values for multiple selectors without writing the same style at every place, hence reducing the number of lines of code
  
  # BACK-END
  Python (Flask): I used flask framework for backend because I had previous experience working with it, also flask framework is easy to use and helps in rapid development.
  
  # DATABASE
  IndexedDB: It is a web/browser storage, i used to store user data before sending all that data to backend. I used it because of its large storage space and it's ability to store other formats of data apart 
  from textual data like storing image files in it.

# MY ROLE
I was working as the sole developer on this project, handling tasks like developing frontend and backend, implementing request and response cycle, data validation, prompt creation for genAI model and 
handling indexedDB

# CHALLENGES
Developing the most effective promt for genAI model so it generates responses according to requirements and even decline to generate response if data is not correct. I mitigated this response by repeatedly modifying the prompt, adding or modifying the necessary details each time

# EXTRA FEATURES
1. Permanent database can be added so that each user can perform CRUD operations on generated responses.
2. A copy response feature can be added on user interface to copy response onto the clipboard.

# LEARNINGS
I learnt how to implement request and response cycle and prompt creation.
