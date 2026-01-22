let preview_questions = []
let score = 0
let timeSpent = ""

document.addEventListener("DOMContentLoaded",()=>{
    fetch('http://127.0.0.1:5000/preview')
    .then(res => res.json())
    .then(data => {
            preview_questions = data.preview
            score = data.score

            timeSpent = data.time

            setUpScoreCard(score)
            setupPreviewView()

        })
    .catch(err => console.error(err))
})

const question_answered = document.getElementById("questions-answered");
function setUpScoreCard(score_value){
    const score_div = document.getElementById("score-div");

    let score_per = score * 5;
    document.getElementById("score").innerText = String(score_per)+"%";

    const remarks = document.getElementById("quiz-remarks");

    const quiz_time = document.getElementById("time-spent");

    if(score_per >= 0 && score_per <= 50){
        score_div.style.backgroundColor = "#fe0000";
        remarks.innerHTML = "<b> Below Average </b>";
    }else if(score_per > 50  && score_per <= 75){
        score_div.style.backgroundColor = "#ff9900";
        remarks.innerHTML = "<b> Average </b>";
    }else{
        score_div.style.backgroundColor = "#47d203";
        remarks.innerHTML = "<b> Well Done </b>";
    }
    quiz_time.innerText = timeSpent
//    document.getElementById("score-div").innerText = score;

}

let preview = document.getElementById("preview");
let to_clone = document.getElementsByClassName("question")[0];
let question_view = to_clone.cloneNode(true)
to_clone.style.display = "none"

function setupPreviewView(){
    let answered_count = 0
    for(let i=0;i<preview_questions.length;i++){

        let question = preview_questions[i].question;
        let answer = preview_questions[i].correct_answer;
        let selection = preview_questions[i].selected_answer;
        let isCorrect = preview_questions[i].is_correct;

        const clone_question = question_view.cloneNode(true);
        clone_question.querySelector(".question-number").innerText = i+1;
        clone_question.querySelector(".qn").innerText = question;
        clone_question.querySelector(".an").innerHTML = "<b>CORRECT ANSWER</b> "+answer;
        clone_question.querySelector(".slt").innerText = selection;

        if(isCorrect){
           clone_question.querySelector(".highlight-option").style.backgroundColor="#00cb00"
           answered_count += 1
        }else{
            if(selection == "un-responded"){
                clone_question.querySelector(".question-details").style.borderLeft = "8.5px solid rgb(164 153 153)";
                clone_question.querySelector(".highlight-option").style.backgroundColor="rgb(164 153 153)"
            }else{
                clone_question.querySelector(".question-details").style.borderLeft = "8.5px solid #ff0000";
                clone_question.querySelector(".highlight-option").style.backgroundColor="#ff0000"
                answered_count += 1
            }
        }
        preview.appendChild(clone_question)
    }
    question_answered.innerHTML = "<b>"+answered_count+"</b>";
}