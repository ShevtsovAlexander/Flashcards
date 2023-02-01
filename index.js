const showCard = document.querySelector('#show_card_box')
const deleteCards = document.querySelector('#delete_cards')
const createCard = document.querySelector('#create_card')
const saveCard = document.querySelector('#save_card')
const closeCard = document.querySelector('#close_card_box')
const flashcards = document.querySelector('#flashcards')

var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
console.log(contentArray)
saveCard.addEventListener('click', () => {
    addFlashCard()
})

deleteCards.addEventListener('click', () => {
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];

})

showCard.addEventListener('click', () => {
    createCard.style.display = "block";
})

closeCard.addEventListener('click', () => {
    createCard.style.display = "none";
})

function flashCardMaker(text, delThisIndex) {
    const flashCard = document.createElement('div')
    flashCard.className = 'flashcard';

    const question = document.createElement('h2')
    const answer = document.createElement('h2')
    const del = document.createElement('i')

    
    question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
    question.textContent = text.my_question;

    answer.setAttribute("style", "text-align:center; display:none; color:red");
    answer.textContent = text.my_answer;

    del.className = 'fas fa-minus'
    del.addEventListener("click", () => {
        contentArray.splice(delThisIndex, 1);
        localStorage.setItem('items', JSON.stringify(contentArray))
        window.location.reload()
    })
   
    flashCard.append(question, answer, del);

    flashCard.addEventListener('click', () => {
        if (answer.style.display == "none") {
            answer.style.display = "block";
        } else {
            answer.style.display = "none";
        }
    })
    flashcards.append(flashCard)
}
contentArray.forEach(flashCardMaker);

addFlashCard = ()=>{
    const question = document.querySelector("#question");
    const answer = document.querySelector("#answer");

    let flashcard_info = {
        'my_question': question.value,
        'my_answer': answer.value
    }

    contentArray.push(flashcard_info);
    
    localStorage.setItem('items', JSON.stringify(contentArray));
    flashCardMaker(contentArray[contentArray.length - 1], contentArray.length - 1)
    question.value = "";
    answer.value = "";
}