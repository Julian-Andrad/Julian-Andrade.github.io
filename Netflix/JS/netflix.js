


// copy-pastes //

// (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])



// message inside div1


// ================== Var and consts ================//



const Btns = document.querySelectorAll(".email-btn")

const inputs = document.querySelectorAll(".email-input");

const questionBtns = document.querySelectorAll(".faq-section__faq-container__question-container__button")

// Rotate the X and put this into DOM loaded
questionBtns.forEach(function(btn){    

    btn.addEventListener('click', function (e) {
        thisBtnAnswer = e.target.nextElementSibling; // answer box

        // X //
        
        const Xmark = e.target.firstChild.nextElementSibling.nextElementSibling;


        if (!thisBtnAnswer.classList.contains("answer-in")){
        thisBtnAnswer.classList.add("answer-in")
        Xmark.classList.add("plus");
        }
        else if(thisBtnAnswer.classList.contains("answer-in")) {
            thisBtnAnswer.classList.remove("answer-in");
            Xmark.classList.remove("plus");
            thisBtnAnswer.classList.add("answer-out");
            thisBtnAnswer.addEventListener('animationend', () => {
                thisBtnAnswer.classList.remove("answer-out")
            })
        }
        
        
        questionBtns.forEach(function (button) {
            if (button !== e.target) {
                button.nextElementSibling.classList.remove("answer-in");
                button.firstChild.nextElementSibling.nextElementSibling.classList.remove("plus")
                
            }
            
            
            
        
        })


        
        
    })
    
})


let priority = false;


// ================= Functions =====================//
const isRequired = (value) =>  {
    if (value < 5) {
        return false
    }
    else {
        return true
    }
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

    const mustBvalid = (mes) => {
        
        mes.textContent = "Insira um email válido.";
        mes.classList.add("Invalid");

    }

    const mustNempty = (mes) => {
        
        mes.textContent = "O email é obrigatório.";
        mes.classList.add("Invalid");
    }

    const EmailOk = (mes) => {

        mes.textContent = "";
        mes.classList.remove("Invalid");
    }


    const errorCol = (input) => {
        input.style.border = '1px solid rgb(140,140,140)'
        input.style.borderBottom = '2px solid rgb(242,160,14)';
        input.style.paddingBottom = ".8em";
    }

    const validCol = (input) => {
        input.style.border = '1px solid rgb(95,165,63)';
        input.style.paddingBottom = ".85em";
    }
    
    const labelUp = (inputBox) => {
        const emailLabel = inputBox.parentElement.parentElement.previousElementSibling;

        emailLabel.classList.add("email-up");

    }

    const labelDown = (inputBox) => {
        const emailLabel = inputBox.parentElement.parentElement.previousElementSibling;
        emailLabel.classList.remove("email-up");
    }
    /// continuar daqui

    const checkEmail = (e) => {
        // e === input element
        const inputEl = e;
        const span = e.nextElementSibling;
        const chars = e.value.trim();
        const inpLen = e.value.trim().length;
        

        if (isRequired(inpLen) === false) {
            mustNempty(span);
            errorCol(inputEl);
            console.log("empty");
        }
        else if (!isEmailValid(chars)) {
            mustBvalid(span);
            errorCol(inputEl);
            console.log("invalid");
        }
        else {
            EmailOk(span);
            validCol(inputEl);
        }
    }
    
    

////// ================= DOM ================//////




window.addEventListener('DOMContentLoaded', function () {
    inputs.forEach(input => {
        input.addEventListener('blur', function (e) {
            priority = true;
            const thisBlur = e.target
            checkEmail(thisBlur);
            labelDown(thisBlur);
        });
        input.addEventListener('input', function (e) {
            const thisInput = e.target;
            if (priority === true) {
            checkEmail(thisInput)}    
        });
        input.addEventListener('click', function (e) {
            const thisInput = e.target;
            labelUp(thisInput);
        });
        
    }),

    Btns.forEach(function (btn) {
        btn.addEventListener('click', function(e){
            const thisBtnSibling = e.target.previousElementSibling.firstChild.nextElementSibling;
            priority  = true;
            checkEmail(thisBtnSibling);
            labelUp(thisBtnSibling);
            
            
        })
        btn.addEventListener('blur', function(e){
            const thisBtnBlur = e.target.previousElementSibling.firstChild.nextElementSibling;
            labelDown(thisBtnBlur)
            
            
        })
        })


});
