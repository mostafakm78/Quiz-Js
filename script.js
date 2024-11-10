const questions = [
    {
        question : 'پر افتخار ترین تیم اروپایی در دنیا کدومه؟',
        answer : [
            {text : 'رئال مادرید' , correct : true},
            {text : 'بایرن مونیخ' , correct : false},
            {text : 'لیورپول' , correct : false},
            {text : 'میلان' , correct : false},
        ]
    },
    {
        question : 'بیشترین رکورد های فوتبال دست کیه؟',
        answer : [
            {text : 'کریستیانو رونالدو' , correct : true},
            {text : 'مسی' , correct : false},
            {text : 'رونالدینیو' , correct : false},
            {text : 'رونالدو' , correct : false},
        ]
    },
    {
        question : 'پر افتخار ترین تیم ایرانی در آسیا؟',
        answer : [
            {text : 'پیروزی' , correct : false},
            {text : 'پاس' , correct : false},
            {text : 'سپاهان' , correct : false},
            {text : 'استقلال' , correct : true},
        ]
    },
    {
        question : 'بیشترین تعداد قهرمانی یک تیم ملی در جام جهانی؟',
        answer : [
            {text : 'آلمان' , correct : false},
            {text : 'اسپانیا' , correct : false},
            {text : 'برزیل' , correct : true},
            {text : 'ایتالیا' , correct : false},
        ]
    },
    {
        question : 'تنها قهرمانی بدون باخت لیگ خلیج فارس؟',
        answer : [
            {text : 'پیروزی' , correct : false},
            {text : 'سپاهان' , correct : false},
            {text : 'سایپا' , correct : false},
            {text : 'استقلال' , correct : true},
        ]
    },
    {
        question : 'رکورد بیشترین گل زده در یک فصل لیگ قهرمانان؟',
        answer : [
            {text : 'مسی' , correct : false},
            {text : 'لواندوبسکی' , correct : false},
            {text : 'کریستیانو رونالدو' , correct : true},
            {text : 'بنزما' , correct : false},
        ]
    },
]

const questionElement = document.getElementById('qestion')
const answerbtn = document.getElementById('answer-btn')
const nextbtn = document.getElementById('next-btn')

let currnetquestionIndex = 0
let score = 0

function startQuiz() {
    currnetquestionIndex = 0
    score = 0
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currnetquestionIndex]
    let questionNo = currnetquestionIndex + 1
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerbtn.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click' , selectanswer)
    })
}

function resetState() {
    nextbtn.style.display= 'none'
    while(answerbtn.firstChild) {
        answerbtn.removeChild(answerbtn.firstChild)
    }
}

function selectanswer(e) {
    const selectedBTN = e.target
    const isCorrect = selectedBTN.dataset.correct === 'true'
    if (isCorrect) {
        selectedBTN.classList.add('correct')
        score++;
    } else {
        selectedBTN.classList.add('incorrect')
    }
    Array.from(answerbtn.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextbtn.style.display = 'block'
}

function showScore() {
    resetState()
    questionElement.innerHTML = `شما ${score} امتیاز از ${questions.length} امتیاز ممکن بدست آوردید`
    nextbtn.innerHTML = 'بازی دوباره'
    nextbtn.style.display = 'block'
}

function handleNextButton(){
    currnetquestionIndex++
    if (currnetquestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextbtn.addEventListener('click' , () => {
    if (currnetquestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz()
