let tests = [
    {
        question: "1. Єдина країна регіону Океанії, що має монархічну форму правління:",
        variants: ["Тувалу", "Тонга", "Науру", "Фіджі"],
        answer: "Тонга",
    },
    {
        question: "2. Транспортне сполучення в Океанії переважно здійснюють такими видами транспорту:",
        variants: ["автомобільним і річковим", "залізничним і автомобільним", "морським і авіаційним", "річковим і морським"],
        answer: "морським і авіаційним",
    },
    {
        question: "3. Майже у всіх країнах Океанії панівною релігією є",
        variants: ["християнство", "буддизм", "синтоизм"],
        answer: "християнство",
    },
    {
        question: "4. На яких островах Океанії США розмістили низку військово-повітряних баз?",
        variants: ["Науру, Тувалу", "Гуам, Уейк", "Кірибаті", "Таїті"],
        answer: "Гуам, Уейк",
    },
    {
        question: "5. За походженням острови Мікронезії преважно:",
        variants: ["материкові і коралові", "вулканічні і коралові", "коралові і материкові", "лише коралові"],
        answer: "вулканічні і коралові",
    },
    {
        question: "6. Корінні жителі Нової Гвінеї - це:",
        variants: ["папуаси", "полінезійці", "меланезійці", "мікронезійці"],
        answer: "папуаси",
    },
    {
        question: "7. В якій частині Світового океану розташована група островів, яка носить назву Океанія?",
        variants: ["центральній та східній частинах Тихого океану", "східній частині Індійського океану", "південній частині Тихого океану"],
        answer: "південній частині Тихого океану",
    },
    {
        question: "8. Які країни, із перерахованих, належать до острівних держав Океанії?",
        variants: ["Самоа", "Маврикій", "Мальдівські острови", "Бахрейн"],
        answer: "Самоа",
    },
    {
        question: "9. Найбільший острів в Океанії:",
        variants: ["Нова Зеландія", "Нова Каледонія", "Тувалу", "Нова Гвінея"],
        answer: "Нова Гвінея",
    },
    {
            question: "10.Укажіть продукцію, яку експортує Океанія:",
            variants: ["кава, кавуни", "кокосові горіхи, масло", "кам'яне вугілля, нікелеві руди", "цукрові буряки, вовна"],
            answer: "кокосові горіхи, масло",
        }

];

class Test {

    constructor() {
        this.question = tests.question;
        this.variants = tests.variants;
        this.form = document.createElement("form");
        document.body.append(this.form);
        this.checkBtn = document.createElement("button");
        this.checkBtn.classList.add("answer")
        this.checkBtn.innerHTML = "Відповісти"
        document.body.append(this.checkBtn);
        this.spanRes = document.createElement("span");
        this.spanRes.classList.add("spanRes")
        this.checkBtn.after(this.spanRes)
    }
    createTests() {
        tests.forEach(test => {
            let divQuestion = document.createElement("div");
            divQuestion.classList.add("question");
            divQuestion.textContent = test.question;
            this.form.append(divQuestion)
            let divVariants = document.createElement("div")
            divVariants.classList.add("variant")
            divQuestion.append(divVariants)
            test.variants.forEach(variant => {
                divVariants.insertAdjacentHTML("beforeEnd", `<input type="radio" required name ="${test.answer}" data-name="${variant}"> ${variant}<br>`)
            })
        })
    }
};
let test = new Test()
test.createTests();

class ChekAnswer {
   
    constructor() {
        this.amswer = tests.answer;
        this.arrAnsw = [];
        this.rightAnsw = [];
        this.result = document.querySelector(".spanRes")
    }
    getAnswer() {
        let inputs = document.querySelectorAll("input");
        for (let input of inputs) {
            if (input.checked) {
                this.arrAnsw.push(input.dataset.name)
                if (input.dataset.name === input.name) {
                    if(this.rightAnsw.includes(input.dataset.name))return
                    if(this.rightAnsw.includes(input.dataset.name))return
                    this.rightAnsw.push(input.dataset.name)
                }
            } console.log(this.arrAnsw, this.rightAnsw)
        } 
    }
    
    checkPassedTest() {
        if (this.arrAnsw.length < 10) {
            this.result.textContent = "Для отримання результату дайте відповідь на всі питання";
            this.result.classList.add("no_passed")
        } else {
            let allQuestion = tests.length
            let rightAnsw = this.rightAnsw.length;
            let rightAnswPersent = (rightAnsw * 100) / allQuestion;
            if (rightAnswPersent < 70) {
                this.result.classList.add("no_passed")
                this.result.textContent = `Ви не здали тест. Вірних відповідей - ${rightAnsw}, що становить ${rightAnswPersent} % `
                this.arrAnsw = []
                this.rightAnsw = []
            }
            else {
                this.result.classList.toggle("no_passed")
                this.result.classList.add("passed")
                this.result.textContent = `Ви здали тест. Вірних відповідей - ${rightAnsw}, що становить ${rightAnswPersent} % `
                this.arrAnsw = []
                this.rightAnsw = []
            }
        }
    }  
}        
    
let chA = new ChekAnswer()
document.querySelector(".answer").addEventListener("click", function () {
    chA.getAnswer();
    chA.checkPassedTest();
})
