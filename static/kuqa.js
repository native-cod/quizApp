let QUESTIONS = []
let CanSubmit = false

// selected options by the student
response = []
//
submitted_response = []
// sorted selected options by the student using the sortResponses function ' line 293 '
organised_response = []
// main questions div container
question_container = document.getElementById("questions");

// START BUTTON
let start = 0
let initial_div = document.getElementById("cover-div");
let start_button = document.getElementById("start");

let tooltip_text = document.getElementById("tooltip-text");
let quiz_rules_img = document.getElementById("quiz-rules-img");
let sub_body_div = document.getElementById("sub-body");

start_button.addEventListener("click",()=>{
    initial_div.style.opacity = "0.0";
    setTimeout(()=>{
        document.body.removeChild(initial_div);
        sub_body_div.style.filter = "blur(0px)";
        tooltip_text.innerText = "Close"
        slide()

    },400)
})


// This immediately gets executed as soon after the all the ui elements have been rendered " after the DOM TREE HAS BEEN STRUCTURED "
document.addEventListener("DOMContentLoaded",()=>{
   getQuestions()
})
// function to send a get request to the " @app.route('/questions') " which will return an array of QUESTIONS within a json
// Then after that the display questions function will be called
function getQuestions(){
   fetch('http://127.0.0.1:5000/questions')
   .then(res => res.json())
   .then(data => {
            QUESTIONS = data
            displayQuestions()
        })
   .catch(err => console.error(err))
}

// After a successful get request from the " @app.route('/questions') "
// We will then get a skeleton of the question container to structure each questions UI and append to the parent QUESTIONS CONTAINER
// Since the data set is not too large we will loop through the QUESTIONS array one after the other in a nested for loop
// For each question we will run the inner loop the number of options times to display the options
function displayQuestions(){
    const parent = question_container;

    question_tracker = 1;
    id_setter = 0;

    let original_node = document.getElementsByClassName("question-container")[0];
    let cloned_node = original_node.cloneNode(true)

    original_node.remove()

    for(let i = 0; i < QUESTIONS.length; i++){
        let clone = cloned_node.cloneNode(true)

        clone.querySelector(".question-number").innerText = question_tracker;
        clone.querySelector(".question_from_source").innerText = QUESTIONS[question_tracker - 1].question;
        for(let j = 0; j < QUESTIONS[i].options.length; j++){
            clone.querySelectorAll(".question_options_from_source")[j].innerText = QUESTIONS[question_tracker - 1].options[j];
            // assigning unique ids for the span elements for unique identification when clicked
            clone.querySelectorAll(".question_options_from_source")[j].id = String(i)+String(id_setter);
            id_setter += 1;
        }
        question_tracker += 1
        parent.appendChild(clone)
    }
    // This function adds a click event listener to all span elements that hold the options to questions
    eventToSpan()
}

// Since we are not using radios or checkboxes for selection of options
// Each option is a span element with a unique ID when clicked a random selection is made from colors array 0 - 2
// Each selection is a class that has css styles to it which will get added to the span classList
// After style application the selection "inner Text", id of the span, question number and style selected from colors array will be added to the response array
// The structure of the 2d response array is [[question_number, selection, id, color]]
colors = ["selected-option-div-orange","selected-option-div-purple","selected-option-div-blue"]
span_elements = document.getElementsByClassName("question_options_from_source");

// NOTE: the reason for the if's statements "id.length <= 3 and so on" is because if the length is 2 or 3 like "00, 01, 01, 910" the first character is the question number
// but if the id length is 4 like "1869" the first two 18 is the question number

function addSelection(selection, id){
    if(response.length == 0){
         color = colors[Math.floor(Math.random() * 3)]
         question_number = "0"
         if(id.length == 2){
                  document.getElementById(id).classList.add(color)
                  question_number = id[0]
         }
         else if(id.length == 3){
                  document.getElementById(id).classList.add(color)
                  question_number = id[0]
         }else if(id.length == 4){
                  document.getElementById(id).classList.add(color)
                  question_number = id[0]+id[1]
         }else{
                  return
         }
         response[response.length] = [question_number, selection, id, color]
    }else{
        for(let x=0;x<response.length;x++){
            if(id.length <= 3){
                if(response[x][0] == id[0]){
                    present_id = response[x][2];
                    document.getElementById(present_id).classList.remove(response[x][3]);

                    color = colors[Math.floor(Math.random() * 3)]
                    document.getElementById(id).classList.add(color)
                    response[x] = [id[0], selection, id, color]
                    break
                }
                if(response[x][0] != id[0] && x == response.length-1){
                    color = colors[Math.floor(Math.random() * 3)]
                    document.getElementById(id).classList.add(color)
                    response[response.length] = [id[0], selection, id, color]
                }
            }
            else{
                if(response[x][0] == id[0]+id[1]){
                    present_id = response[x][2];
                    document.getElementById(present_id).classList.remove(response[x][3])

                    color = colors[Math.floor(Math.random() * 3)]

                    document.getElementById(id).classList.add(color)
                    response[x] = [id[0]+id[1], selection, id, color]
                }
                if(response[x][0] !=  id[0]+id[1] && x == response.length-1){
                    color = colors[Math.floor(Math.random() * 3)]
                    document.getElementById(id).classList.add(color)
                    response[response.length] = [id[0]+id[1], selection, id, color]
                }
            }
        }
    }
}

// Adding a click listener to all span options
function eventToSpan(){
    for(let i=0;i<span_elements.length;i++){
         span_elements[i].addEventListener("click", ()=>{
            selection = span_elements[i].innerText;
            id = span_elements[i].id;
            // when clicked the inner text and the id will be passed to the addSelection() function
            addSelection(selection, id)
         })
    }
}

let prepare_submission = document.getElementById("prepare-submit");
let submit = document.getElementById("submit");

prepare_submission.addEventListener("click", ()=>{
   buttonClick()
   for(let i = 0 ;i < 20; i++){
       for(let j = 0; j < response.length; j++){
          if(i == Number(response[j][0])){
             break
          }
          if(i != Number(response[j][0]) && j == response.length - 1){
             response[response.length] = [String(i),"un-responded","null","null"]
          }
       }
   }
   if(canSubmit){
           endOfQuiz()
    }
   }
)

function buttonClick(){
    prepare_submission.classList.add("pressed-button");
    setTimeout(()=>{
         prepare_submission.classList.remove("pressed-button");
    },200)
}

submit.addEventListener("click", ()=>{
   submitResponse(organised_response, time_spent)
   }
)


// IMAGE SLIDER BUTTON
isLeft = true;
canSlide=true
image_slider_button = document.getElementById("quiz-rules-img");
blurring_div = document.getElementById("blurring-div");

tooltip = document.getElementById("tooltip");
rules_container = document.getElementById("quiz-rules");
bottom_instructions = document.getElementById("bottom-instructions");
image_slider_button.addEventListener("click", () => {
     slide()
});

// Sliding function
function slide(){
         if(!canSlide){
             return
         }
         // only done once when the open quiz button is clicked we move the instructions container from the left side to display quiz rules
         if(start == 0){
             isLeft = false;
             rules_container.style.left = "0px";
             rules_container.style.opacity = "1.0";
             start = 1;
             blurring_div.style.opacity = "0.0";
         }
         else{
         // only done once after clicking on image button close to start quiz when the student has finished reading the quiz rules
             if(start == 1){
                 tooltip.innerText = "Quiz details!";
                 quiz_rules_img.src="static/images/menu.png";
                 timeFunction();
                 start = 2;
                 bottom_instructions.style.filter = "blur(3px)";
                 blurring_div.style.opacity = "1.0";
                 canSubmit = true
             }
             // move the quiz rules container to left or right when the image button is pressed
             if(isLeft){
                 isLeft = false;
                 rules_container.style.left = "0px";
                 rules_container.style.opacity = "1.0";
                 blurring_div.style.opacity = "0.0";
             }else{
                 isLeft = true;
                 rules_container.style.left = "-55%";
                 rules_container.style.opacity = "0.0";
                 blurring_div.style.opacity = "1.0";
             }
         }
}


image_slider_button.addEventListener("mouseenter", () => {
    if(!canSlide){
         return
     }
     tooltip.style.opacity = "1.0";
});
image_slider_button.addEventListener("mouseleave", () => {
     if(!canSlide){
         return
     }
    tooltip.style.opacity = "0.0";
});

// QUIZ TIMER FUNCTION
minutes = document.getElementById("minutes");
seconds = document.getElementById("seconds");
let timer_interval_id;

time_minutes = 39;
time_seconds = 59;

quiz_time_minutes = 39;
quiz_time_seconds = 59;

time_spent = "00:00";

let date = new Date().toDateString();
document.getElementById("points-text").innerText = date;
function timeFunction(){
    timer_interval_id = setInterval(()=>{
      quiz_time_seconds -= 1;
      if(quiz_time_seconds < 10){
         seconds.innerText = "0"+quiz_time_seconds;
         }
      else{
         seconds.innerText = quiz_time_seconds;
      }

      if(quiz_time_seconds == 0){
         quiz_time_minutes -= 1
         minutes.innerText = quiz_time_minutes;
         if(quiz_time_minutes == 0){
            endOfQuiz();
         }else{
            quiz_time_seconds = 60;
         }
      }
    },1000)
}


// function to be executed when the student presses the " prepare submission "
// stops the timer clearInterval 'line 236', puts a covering and blur on top of the questions 'lines 265, 266'
// Change tooltip opacity, background color to red and text to " End of Quiz "
// Sort responses is called at the end
function endOfQuiz(){
    clearInterval(timer_interval_id);
    canSlide = false;
    document.getElementById("submit-cover").style.display = "block";
    question_container.style.filter = "blur(6px)";
    tooltip.innerText = "End of Quiz";
    tooltip.style.opacity = "1";
    tooltip.style.backgroundColor = "red";
    sortResponses()
    submit.style.right = "11px";
}

// Insertion sort algorithm user selected responses might not be in a sorted order
// sort the users selected answers based on the question number in ascending order
function sortResponses(){
    console.log(" length"+response.length)
    for(let i=1;i<response.length;i++){
       let index = i
       for(let j=i-1;j>=0;j--){
           if(Number(response[index][0]) < Number(response[j][0])){
               temp = response[index]
               response[index] = response[j]
               response[j] = temp
               index -= 1
           }
       }
    }
    for(let r=0;r<response.length;r++){
        organised_response[organised_response.length] = response[r][1];
    }
    time_spent = ""
    if(time_seconds-quiz_time_seconds < 10){
        time_spent = String(time_minutes-quiz_time_minutes)+" : 0"+String(time_seconds-quiz_time_seconds)
    }else{
        time_spent = String(time_minutes-quiz_time_minutes)+" : "+String(time_seconds-quiz_time_seconds)
    }

    // fill un responded questions
}

// Submitting the selected options to the server at route in the main.py File " @app.route('/submit-questions', methods=['POST']) "
// After submission request gets handled the code on line 310 here will redirect you to the " @app.route('/results') " route handler line 340 here.
function submitResponse(responses, time){
    fetch('http://127.0.0.1:5000/submit-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({answers: responses, time: time})
                }
          )
          .then(res => {
          if (!res.ok) throw new Error("Request failed");
              return res.json();
          })
          .then((data) => {
           window.location.href = "/results"; // go to another page
          })
          .catch(err => console.error(err));
}


// custom scroll indicator for questions div currently in working
let scroll_indicator = document.getElementById("scroll-indicator");
let down = document.getElementById("scroll-image-down");
let up = document.getElementById("scroll-image-up");

let previous = 0
let late_prev = 0
setInterval(()=>{
       if(previous == late_prev){
           down.style.opacity = "1.0"
           up.style.opacity = "1.0"
       }
},300)

question_container.addEventListener("scroll", (event) => {
    if(previous < question_container.scrollTop){
        down.style.opacity = "0.5"
        up.style.opacity = "1.0"
        previous = question_container.scrollTop;

        setTimeout(()=>{ late_prev = previous }, 100)
    }
    else{
        up.style.opacity = "0.5"
        down.style.opacity = "1.0"
        previous = question_container.scrollTop;

        setTimeout(()=>{ late_prev = previous }, 100)
    }
});


let blurring = document.getElementById("blurring-div");
let sub_body = document.getElementById("sub-body");
let = header = document.getElementsByClassName("header")[0];

let quiz_rules = document.getElementById("quiz-rules");

let details_head = document.getElementById("details-head");
let details_text = document.getElementsByClassName("p-details-light");

let qns = document.getElementsByClassName("qn");

let qs = document.getElementsByClassName("q");
let question = document.getElementsByClassName("question_from_source");
let q_options_container = document.getElementsByClassName("q-options");
let question_option = document.getElementsByClassName("question_options_from_source");
let th_selector = document.getElementById("theme-selector");
//let bottom_instructions = document.getElementById("bottom-instructions");

up = document.getElementById("scroll-image-up");
down = document.getElementById("scroll-image-down");
is_light=true

theme_button = document.getElementById("modeToggler");
theme_button.addEventListener("click",()=>{
    if(is_light){
        darkMode()
        is_light=false
    }else{
        lightMode()
        is_light=true
    }
})

function lightMode(){
    theme_button.style.border = "0.5px solid white"
    th_selector.style.left = "2px";
    up.src="static/images/up.png";
    down.src="static/images/down.png";

    blurring.classList.remove("blurring-div-dark")
    sub_body.classList.remove("sub-body-dark");
    header.classList.remove("header-dark");

//    question_container.classList.add("questions-light")

    quiz_rules.classList.remove("quiz-rules-dark")

    details_head.classList.add("details-head-dark");
    for(let i=0;i<details_text.length;i++){
        details_text[i].classList.remove("p-details-dark")
    }
    bottom_instructions.classList.remove("bottom-instructions-dark")

    question_container.classList.remove("questions-dark")
    question_container.classList.add("questions-light")


    for(let j=0;j<qns.length;j++){
        qns[j].classList.remove("qn-dark")
        question[j].classList.remove("question_from_source-dark")
        q_options_container[j].classList.remove("q-options-dark")

        qs[j].classList.remove("q-dark")
    }

    for(let r=0;r<question_option.length;r++){
        question_option[r].classList.remove("question_options_from_source-dark")
    }

}
function darkMode(){
    theme_button.style.border = "0.5px solid gray"
    th_selector.style.left = "26.5px"
    up.src="static/images/updark.png";
    down.src="static/images/downdark.png";

    blurring.classList.add("blurring-div-dark")
    sub_body.classList.add("sub-body-dark");
    header.classList.add("header-dark");

    quiz_rules.classList.add("quiz-rules-dark")

    details_head.classList.add("details-head-dark");
    for(let i=0;i<details_text.length;i++){
        details_text[i].classList.add("p-details-dark")
    }
    bottom_instructions.classList.add("bottom-instructions-dark")

    question_container.classList.add("questions-dark")

    for(let j=0;j<qns.length;j++){
        qns[j].classList.add("qn-dark")
        question[j].classList.add("question_from_source-dark")
        q_options_container[j].classList.add("q-options-dark")

        qs[j].classList.add("q-dark")
    }

    for(let r=0;r<question_option.length;r++){
        question_option[r].classList.add("question_options_from_source-dark")
    }
}