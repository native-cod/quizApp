**Application description**

This is a simple quiz application modelled for performing a quick 20 questions brain storming for university students, it is a web application that has been created by using the technologies explained below.

**Back end**
The main brains of the application has been created by leveraging on python’s flask module for processes such as route handling, serving front end template views and grade calculation after quiz submission.

**Components in the main.py file “Route handlers"**
**Get requests**

“/”
  This is the initial route of the application, it serves the login page of the quiz app for students to fill in details such as their names, student id’s and the quiz code. At this point everything is static and updates will come later on.
  Later updates - after student fills in the form, their details will validated reg ex and if student is active under the university administration then quiz code will be validated to see if the student takes that course in the term there after the quiz_name global variable in the main.py file will be set to the quiz code.

“/questions”
  This route of the application will be called after landing on the ‘/kuqa_main' route from the “/” login route to get all of the questions under the quiz_name set from the database which have to uploaded by the teacher from their portal, the result from the database will be delivered as an array of questions to be rendered on the UI at “/kuqa_main”. But currently the questions will served statically from the hardcoded “ QUESTIONS_ARRAY “.

“/results”
  This route is set to display the quiz results with all of the associated student information the score they got and a preview list of how they did on the quiz with the correct and wrong questions marked int green and red colours respectively. The preview data will be fetched from the “/preview” route from the backend.

“/preview”
  This route is to serve the questions performance preview array “selectedResponses” to the “/results” route after it has been hit.

**Post requests**
“/kuqa_main”
  This is the core route of the application it’s purpose to return the application template to render the quiz app itself along with the students information 

“/submit_questions”
  This route is called in the “/kuqa_main” route to submit student’s quiz response in the back end, this part will call the “markAnswers” method to mark the student’s quiz submission.


ROUTE FLOW.

'/' login page -> kuqa main page '/kuqa_main' -> results page '/results' { " final route"} 
                              |                            |  
                        '/questions'                   '/preview'


Later Updates:
  The questions and the question answers data are hardcoded as global variables in the main.py file later to be updated into a database
  The grade calculation too is to be later modularised in the back end for a cleaner organisation



**Front end**
For the application’s presentation part “User interface” it has been created by using three technologies that is HTML for structure of page CSS for styling and Javascript to add dynamic to the pages handling different processes such as reg ex validation after clicking submit and so forth.

**Components in the front End**
**Login Page**
  This part has three parts Login html, login css, login js the html and css are for structuring the login page and setting styles for the UI, in the login.js the only one core functionality which will be updated later is to reg ex validate the filled information from the form before submission if it is to the format of the university. 

**mainQuiz Page**
  Kuqa html and kuqa css the same from the login page explanation, the kuqa.js does a lot of processes as following below.
  1. Get questions to be displayed on the page by this code “ fetch(‘http://127.0.0.1:5000/questions') ‘/questions’ route ”
  2. Display the question on the main questions div by using a pre structured question div 
  3. Manage question option selection in a custom way and preparing the options selected for submission
  4. Submitting the option results via this line “fetch(‘http://127.0.0.1:5000/submit-questions') ‘/submit-questions’’ route ” 
  5. Theme selection light and dark mode options.

**Results Page**
  This is the last landing page of the site the results html and results css are the same story as from the above pages explanation, the results.js file manages processess such as the main one being to pull preview results from the backend by "fetch('http://127.0.0.1:5000/preview')" hitting this route "/preview" and after that displaying them in the preview container using the same logic in displaying questions having a main container and a pre structured sub container view making copies with different data and lastly displaying the score and other quiz associated information.


More to be added later on.
