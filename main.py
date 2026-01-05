from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# update later to be in database instead
QUESTIONS_ANSWERS_ARRAY = [
    {
        "question"     : "What does UML stand for?",
        "options"      : [
            "Unified Modeling Language",
            "Unified Method Language",
            "Universal Modeling Language",
            "Universal Method Language"
        ],
        "correctAnswer": "Unified Modeling Language"
    },
    {
        "question"     : "Which UML diagram focuses on interactions between objects over time?",
        "options"      : [
            "Class Diagram",
            "Use Case Diagram",
            "Sequence Diagram",
            "Activity Diagram"
        ],
        "correctAnswer": "Sequence Diagram"
    },
    {
        "question"     : "In a sequence diagram, what represents an object’s existence over time?",
        "options"      : [
            "Actor",
            "Message",
            "Lifeline",
            "Guard"
        ],
        "correctAnswer": "Lifeline"
    },
    {
        "question"     : "Which file mode opens a text file for reading only and requires the file to exist?",
        "options"      : ["W", "A", "R", "X"],
        "correctAnswer": "R"
    },
    {
        "question"     : "The primary purpose of a sequence diagram is to:",
        "options"      : [
            "Define system data structures",
            "Capture the chronological order of interactions",
            "Describe system deployment",
            "Represent database schemas"
        ],
        "correctAnswer": "Capture the chronological order of interactions"
    },
    {
        "question"     : "Why are sequence diagrams useful during debugging?",
        "options"      : [
            "They show class hierarchies",
            "They identify bottlenecks and message flow errors",
            "They replace source code",
            "They define inheritance relationships"
        ],
        "correctAnswer": "They identify bottlenecks and message flow errors"
    },
    {
        "question"     : "Which statement correctly distinguishes an actor from a lifeline?",
        "options"      : [
            "Actors are external to the system, lifelines are internal objects",
            "Actors are internal, lifelines are external",
            "Actors represent objects, lifelines represent users",
            "Actors and lifelines are identical"
        ],
        "correctAnswer": "Actors are external to the system, lifelines are internal objects"
    },
    {
        "question"     : "Why is composition often preferred over inheritance?",
        "options"      : [
            "It increases tight coupling",
            "It reduces flexibility",
            "It forces code duplication",
            "It improves separation of concerns and flexibility"
        ],
        "correctAnswer": "It improves separation of concerns and flexibility"
    },
    {
        "question"     : "In a university system, a student has an account for fee payment. Which relationship best models this?",
        "options"      : [
            "Composition",
            "Inheritance",
            "Aggregation",
            "Dependency"
        ],
        "correctAnswer": "Composition"
    },
    {
        "question"     : "Which file mode should be used to add new data to the end of an existing text file without deleting old data?",
        "options"      : ["w", "r+", "a", "x"],
        "correctAnswer": "a"
    },
    {
        "question"     : "If a class wants to allow looping directly over its objects using a for loop, it must implement:",
        "options"      : [
            "__next__() only",
            "__iter__() only",
            "Both __iter__() and __next__()",
            "__len__()"
        ],
        "correctAnswer": "Both __iter__() and __next__()"
    },
    {
        "question"     : "Which scenario best justifies the use of a generator instead of storing data in a list?",
        "options"      : [
            "Iterating over a small fixed dataset",
            "Processing an infinite stream of sensor data",
            "Accessing dictionary keys",
            "Sorting numbers"
        ],
        "correctAnswer": "Processing an infinite stream of sensor data"
    },
    {
        "question"     : "A Car class creates its own Engine object internally. What does this imply?",
        "options"      : [
            "Weak ownership",
            "Independent lifecycle",
            "Inheritance hierarchy",
            "Owned (composition) relationship"
        ],
        "correctAnswer": "Owned (composition) relationship"
    },
    {
        "question"     : "Which combination correctly matches file operation with its purpose?",
        "options"      : [
            "tell() → move file pointer",
            "seek() → read entire file",
            "truncate() → shorten file size",
            "flush() → close file"
        ],
        "correctAnswer": "truncate() → shorten file size"
    },
    {
        "question"     : "Why is inheritance discouraged in favor of composition in large systems?",
        "options"      : [
            "Inheritance eliminates code reuse",
            "Inheritance causes tight coupling and reduced flexibility",
            "Composition increases complexity",
            "Composition prevents testing"
        ],
        "correctAnswer": "Inheritance causes tight coupling and reduced flexibility"
    },
    {
        "question"     : "Which file mode combination is most appropriate for logging system events while still allowing reading of previous logs?",
        "options"      : ["w+", "r", "a+", "x"],
        "correctAnswer": "a+"
    },
    {
        "question"     : "Which Python file mode should be used to create a new file but raise an error if the file already exists?",
        "options"      : ["w", "a", "x", "r+"],
        "correctAnswer": "x"
    },
    {
        "question"     : "What makes sequence diagrams particularly suitable for modeling dynamic behavior?",
        "options"      : [
            "They emphasize class attributes",
            "They focus on system deployment",
            "They show the order and timing of message exchanges",
            "They define database relationships"
        ],
        "correctAnswer": "They show the order and timing of message exchanges"
    },
    {
        "question"     : "Which UML element represents external roles such as users or external systems?",
        "options"      : ["Lifelines", "Actors", "Messages", "Activation bars"],
        "correctAnswer": "Actors"
    },
    {
        "question"     : "A tree object supports in-order, pre-order, and post-order traversal without exposing its internal structure. Which OOP concept is primarily being applied?",
        "options"      : [
            "Inheritance",
            "Encapsulation through iterators/generators",
            "Polymorphism",
            "Aggregation"
        ],
        "correctAnswer": "Encapsulation through iterators/generators"
    }
]
QUESTIONS_ARRAY = [
    {
        "question": "What does UML stand for?",
        "options" : [
            "Unified Modeling Language",
            "Unified Method Language",
            "Universal Modeling Language",
            "Universal Method Language"
        ]
    },
    {
        "question": "Which UML diagram focuses on interactions between objects over time?",
        "options" : [
            "Class Diagram",
            "Use Case Diagram",
            "Sequence Diagram",
            "Activity Diagram"
        ]
    },
    {
        "question": "In a sequence diagram, what represents an object’s existence over time?",
        "options" : [
            "Actor",
            "Message",
            "Lifeline",
            "Guard"
        ]
    },
    {
        "question": "Which file mode opens a text file for reading only and requires the file to exist?",
        "options" : ["W", "A", "R", "X"]
    },
    {
        "question": "The primary purpose of a sequence diagram is to:",
        "options" : [
            "Define system data structures",
            "Capture the chronological order of interactions",
            "Describe system deployment",
            "Represent database schemas"
        ]
    },
    {
        "question": "Why are sequence diagrams useful during debugging?",
        "options" : [
            "They show class hierarchies",
            "They identify bottlenecks and message flow errors",
            "They replace source code",
            "They define inheritance relationships"
        ]
    },
    {
        "question": "Which statement correctly distinguishes an actor from a lifeline?",
        "options" : [
            "Actors are external to the system, lifelines are internal objects",
            "Actors are internal, lifelines are external",
            "Actors represent objects, lifelines represent users",
            "Actors and lifelines are identical"
        ]
    },
    {
        "question": "Why is composition often preferred over inheritance?",
        "options" : [
            "It increases tight coupling",
            "It reduces flexibility",
            "It forces code duplication",
            "It improves separation of concerns and flexibility"
        ]
    },
    {
        "question": "In a university system, a student has an account for fee payment. Which relationship best models this?",
        "options" : [
            "Composition",
            "Inheritance",
            "Aggregation",
            "Dependency"
        ]
    },
    {
        "question": "Which file mode should be used to add new data to the end of an existing text file without deleting old data?",
        "options" : ["w", "r+", "a", "x"]
    },
    {
        "question": "If a class wants to allow looping directly over its objects using a for loop, it must implement:",
        "options" : [
            "__next__() only",
            "__iter__() only",
            "Both __iter__() and __next__()",
            "__len__()"
        ]
    },
    {
        "question": "Which scenario best justifies the use of a generator instead of storing data in a list?",
        "options" : [
            "Iterating over a small fixed dataset",
            "Processing an infinite stream of sensor data",
            "Accessing dictionary keys",
            "Sorting numbers"
        ]
    },
    {
        "question": "A Car class creates its own Engine object internally. What does this imply?",
        "options" : [
            "Weak ownership",
            "Independent lifecycle",
            "Inheritance hierarchy",
            "Owned (composition) relationship"
        ]
    },
    {
        "question": "Which combination correctly matches file operation with its purpose?",
        "options" : [
            "tell() → move file pointer",
            "seek() → read entire file",
            "truncate() → shorten file size",
            "flush() → close file"
        ]
    },
    {
        "question": "Why is inheritance discouraged in favor of composition in large systems?",
        "options" : [
            "Inheritance eliminates code reuse",
            "Inheritance causes tight coupling and reduced flexibility",
            "Composition increases complexity",
            "Composition prevents testing"
        ]
    },
    {
        "question": "Which file mode combination is most appropriate for logging system events while still allowing reading of previous logs?",
        "options" : ["w+", "r", "a+", "x"]
    },
    {
        "question": "Which Python file mode should be used to create a new file but raise an error if the file already exists?",
        "options" : ["w", "a", "x", "r+"]
    },
    {
        "question": "What makes sequence diagrams particularly suitable for modeling dynamic behavior?",
        "options" : [
            "They emphasize class attributes",
            "They focus on system deployment",
            "They show the order and timing of message exchanges",
            "They define database relationships"
        ]
    },
    {
        "question": "Which UML element represents external roles such as users or external systems?",
        "options" : ["Lifelines", "Actors", "Messages", "Activation bars"]
    },
    {
        "question": "A tree object supports in-order, pre-order, and post-order traversal without exposing its internal structure. Which OOP concept is primarily being applied?",
        "options" : [
            "Inheritance",
            "Encapsulation through iterators/generators",
            "Polymorphism",
            "Aggregation"
        ]
    }
]

selectedResponses = []
selectedResponsesCopy = []

quiz_name = ""
name = ""
student_id = ""
score = 0
time_spent = ""


# The beginning quiz log in form
@app.route('/')
def login_route():
    return render_template('login.html')


# This is the second "default" version of the quiz app as listed in the login.html form action "/list_version"
@app.route('/kuqa_main', methods=['POST'])
def kuqaRoute():
    global quiz_name, name, student_id

    name = request.form['name']
    student_id = request.form['id']
    quiz_name = request.form['code']

    return render_template('kuqa.html', quiz=quiz_name, name=name, id=student_id)


# get QUESTIONS array
@app.route('/questions')
def questions():
    return jsonify(QUESTIONS_ARRAY)


# handle the incoming students quiz submission
@app.route('/submit-questions', methods=['POST'])
def getAnswers():
    global score, time_spent
    data = request.get_json()
    score = markAnswers(data["answers"])
    time_spent = data["time"]
    return jsonify({"score": score, "preview": selectedResponses})


# quiz results page will automatically get requested after student submission processing is finished
@app.route('/results')
def viewResults():
    return render_template('results.html', score=score, name=name, id=student_id, quiz_name=quiz_name)


# after results page has been rendered a get request is made to this to get the score time spent on quiz and
# an array having list of all right and wrong questions as performed by the student
@app.route('/preview')
def previewResults():
    return jsonify({"score": score, "preview": selectedResponsesCopy, "time": time_spent})


# mark the students quiz comparing the selected options with the correct answers from QUESTIONS_ANSWERS_ARRAY
# if correct score + 1 and append in the selectedResponses array with isCorrect to true
# if wrong just append in the selectedResponses array with isCorrect to false
def markAnswers(answers):
    global selectedResponsesCopy, selectedResponses
    score_count = 0
    for i in range(0, len(answers)):
        if answers[i] == QUESTIONS_ANSWERS_ARRAY[i]["correctAnswer"]:
            score_count += 1
            selectedResponses.append(
                {
                    "question"       : QUESTIONS_ANSWERS_ARRAY[i]["question"],
                    "correct_answer" : QUESTIONS_ANSWERS_ARRAY[i]["correctAnswer"],
                    "selected_answer": answers[i],
                    "is_correct"     : True
                })
        else:
            selectedResponses.append(
                {
                    "question"       : QUESTIONS_ANSWERS_ARRAY[i]["question"],
                    "correct_answer" : QUESTIONS_ANSWERS_ARRAY[i]["correctAnswer"],
                    "selected_answer": answers[i],
                    "is_correct"     : False
                })
    selectedResponsesCopy = selectedResponses
    selectedResponses = []
    return score_count


# this is another version of the kuqa application change the actio route in login.html to land on this"
# @app.route('/main', methods=['POST'])
# def main_route():
#     global quiz_name, name, student_id
#
#     name = request.form['name']
#     student_id = request.form['id']
#     quiz_name = request.form['code']
#
#     return render_template('main.html', name=name, id=student_id, code=quiz_name)


if __name__ == '__main__':
    app.run(debug=True)
