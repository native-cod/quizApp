function initialQuestions(){
        for(let i=0;i<4;i++){
            document.getElementsByClassName("question_from_source")[i].innerText = QUESTIONS_ARRAY[question_counter_from_array].question;
            for(let j=0;j<4;j++){
                document.getElementsByClassName("question_options_from_source")[options_counter].innerText = QUESTIONS_ARRAY[question_counter_from_array].options[j];
                document.getElementsByClassName("check-box")[options_counter].value = QUESTIONS_ARRAY[question_counter_from_array].options[j];
                options_counter += 1;
            }
            question_counter_from_array += 1;
        }
        options_counter = 0
}

document.addEventListener('DOMContentLoaded', () => {
     getQuestions()
     setTimeout(()=>{
        initialQuestions()
        submit_responses.disabled = true
     },1000)
});

function getQuestions(){
    fetch('http://127.0.0.1:5000/questions')
      .then(response => response.json())
      .then(data => {
        QUESTIONS_ARRAY = data
        console.log(data)
        })
      .catch(err => console.error(err));
}

// ---- QUIZ INITIALISATION SEQUENCE ---- //
let start=1
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
        confirm.disabled = true
        slide(canSlide)
    },400)
})
// ---- END OF QUIZ INITIALISATION SEQUENCE ---- //




// ---- QUIZ RULES SLIDER AND VISIBILITY CONTROL ---- //
isLeft = true;
canSlide=true
start=0
image_slider_button = document.getElementById("quiz-rules-img");
tooltip = document.getElementById("tooltip");
rules_container = document.getElementById("quiz-rules");
bottom_instructions = document.getElementById("bottom-instructions");
image_slider_button.addEventListener("click", () => {
     slide(canSlide)
});
// sliding function
function slide(can_slide){
     if(!can_slide){
         tooltip.innerText = "End of quiz";
         tooltip.style.backgroundColor = "rgb(215, 1, 1)";
         return
     }
     if(start == 0){
         isLeft = false;
         tooltip.innerText = "Close";
         rules_container.style.left = "0px";
         rules_container.style.opacity = "1.0";
         start = 1;
     }
     else{
         if(start == 1){
         tooltip.innerText = "Quiz details!";
         quiz_rules_img.src="static/images/menu.png";
         time();
         start = 2;
         confirm.disabled = false;
         bottom_instructions.style.filter = "blur(3px)";
         }
         if(isLeft){
             isLeft = false;
             rules_container.style.left = "0px";
             rules_container.style.opacity = "1.0";
         }else{
             isLeft = true;
             rules_container.style.left = "-50%";
             rules_container.style.opacity = "0.0";
         }
     }
}

// control visibility of tooltip quiz-details
image_slider_button.addEventListener("mouseenter", () => {
    if(!canSlide){
         return
     }else{
         tooltip.style.opacity = "1.0";
     }
});
image_slider_button.addEventListener("mouseleave", () => {
     if(!canSlide){
         return
     }
    tooltip.style.opacity = "0.0";
});
// ---- ENF OF QUIZ RULES SLIDER AND VISIBILITY CONTROL ---- //




// ---- QUIZ TIME TAG ---- //
minutes = document.getElementById("minutes");
seconds = document.getElementById("seconds");
let timer_interval_id;

time_minutes = 39;
time_seconds = 59;

quiz_time_minutes = 39;
quiz_time_seconds = 59;

time_spent = "00:00"

function time(){
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
// ---- END OF DATE TAG ON WEB PAGE ---- //



// ---- QUESTIONS SECTION ---- //
question_count = 4;
options_counter = 0
question_counter_from_array = 0
current = 0;
answers = [];

questions_container = document.getElementById("questions");
confirm = document.getElementById("confirm");

confirm.addEventListener("click", () => {
        if(!resetCheckBoxes()){
            return
        }
        buttonPressEffect(confirm)
        if (current_questions == 20){
              endOfQuiz();
              return
        }
        questions_container.style.borderLeft = "15px solid rgba(0, 95, 154, 0.1)";
        confirm.disabled = true;
        fadeEffect("0.0");
        setTimeout(()=>{
            confirm.disabled = false;
        },2000)

});

// button press effect
function buttonPressEffect(button){
        button.classList.remove("raised");
        button.classList.add("inset");
        setTimeout(()=>{
        button.classList.remove("inset");
        button.classList.add("raised");
        },200)
}
// fade out old questions and then fade in new ones
function fadeEffect(fadeValue){
    visibility(fadeValue);
    setTimeout(()=>{
        visibility("1.0");
    },500)
}
// setup initial question with options and radio values

// updating visibility by changing opacity value from 1.0-0.0 or 0.0-1.0 and fade-in-out of questions_container left border and updating questions
function visibility(value){
   if(value == "1.0"){
        updateQuestionNumbers();
        questions_container.style.borderLeft = "15px solid rgba(0, 95, 154, 0.885)";
        setTimeout(()=>{
              q_count = question_counter_from_array - 4;
              for(let j=0;j<4;j++){
                  for(let i=0;i<4;i++){
                        document.getElementsByClassName("question_options_from_source")[options_counter].innerText = QUESTIONS_ARRAY[q_count].options[i];
                        document.getElementsByClassName("check-box")[options_counter].value = QUESTIONS_ARRAY[q_count].options[i]
                        options_counter += 1;
                  }
                  q_count += 1;
              }
              options_counter = 0;
        },1000)
   }

   interval_id = setInterval(()=>{
        document.getElementsByClassName("qt")[current].style.opacity = value;
        if(value=="1.0"){
              question_count += 1;
              document.getElementsByClassName("question-number")[current].innerText = question_count;
              document.getElementsByClassName("question_from_source")[current].innerText = QUESTIONS_ARRAY[question_counter_from_array].question;
              question_counter_from_array += 1;
        }
        current += 1;
        if (current == 4){
            current = 0;
            clearInterval(interval_id);
        }
   },100)
}

radios = []
function resetCheckBoxes(){
   canMove = false
   length = document.getElementsByClassName("check-box").length;
   for(let i=0;i<length;i++){
       if(document.getElementsByClassName("check-box")[i].checked){
          radios[radios.length] = i;
       }
   }
   if (radios.length == 4){
        for(let i=0;i<radios.length;i++){
           document.getElementsByClassName("check-box")[radios[i]].checked = false
           answers[answers.length] = document.getElementsByClassName("check-box")[radios[i]].value;
        }
        canMove = true
   }else{
        canMove = false
   }
   radios = []
   return canMove
}

current_questions = 4
question_number_container = document.getElementById("divider");

// animate span text element "question number" [move down while fading out from screen] and remove then create an updated question count
function updateQuestionNumbers(){
    question_number = document.getElementById("question-number-tracker");
    question_number.style.transform = "translate(0, 25px)";
    question_number.style.opacity = "0.0";
    setTimeout(()=>{
         question_number_container.removeChild(question_number);
         createQuestionNumber();
    },200)
}

// creating the updated question count i.e 10 / 20
function createQuestionNumber(){
  question_text = document.createElement("span");
  question_text.id = "question-number-tracker";
  current_questions += 4;

  question_text.innerText = current_questions;
  setTimeout(()=>{question_number_container.appendChild(question_text);
  },200)
}
// ---- END OF QUESTIONS SECTION ---- //

function endOfQuiz(){
    clearInterval(timer_interval_id);
    confirm.disabled = true;
    canSlide = false;
    submit_responses.disabled = false;
    submit_responses.style.opacity = "1.0"

    tooltip.innerText = "End of quiz";
    tooltip.style.backgroundColor = "rgb(215, 1, 1)";
    tooltip.style.opacity = "1.0";
    time_spent = String(time_minutes-quiz_time_minutes)+" : "+String(time_seconds-quiz_time_seconds)
    console.log(answers)
}


submit_responses = document.getElementById("submit");
submit_responses.addEventListener("click", ()=>{
      buttonPressEffect(submit_responses)
      answers_copy = answers
      answers = []
      fetch('http://127.0.0.1:5000/submit-questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({answers: answers_copy, time: time_spent})
            }
      )
      .then(res => {
      if (!res.ok) throw new Error("Request failed");
          return res.json();
      })
      .then((data) => {
//       console.log(data)
       window.location.href = "/results"; // go to another page
      })
      .catch(err => console.error(err));
})