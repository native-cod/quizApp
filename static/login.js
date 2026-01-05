// ---- FORM ACTION ---- //
form = document.getElementById("form");

student_name = document.getElementById("name");
student_id = document.getElementById("id");
course_code = document.getElementById("code");

submit_button = document.getElementById("submit");
submit_button.addEventListener("click", ()=>{
    buttonPressEffect()
    if(student_name.value.length > 0 && student_id.value.length > 0 && course_code.value.length > 0){

       // check in later if name and id follow the correct university format

       form.submit();
    }
})

function buttonPressEffect(){
    submit_button.classList.add("inset")
    submit_button.classList.remove("raised")
    setTimeout(()=>{
        submit_button.classList.remove("inset")
        submit_button.classList.add("raised")
    },200)
}
