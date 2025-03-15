

const getstarted=()=>{
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    if(username&&password=="123456"){
        document.getElementById("nav").classList.remove("hidden");
        document.getElementById("banner").classList.add("hidden");
    }
    else if(!username){
        alert("please enter your username");
    }
    else if(password!="123456"){
        alert("please enter a valid password");
    }
}
document.addEventListener("DOMContentLoaded", function () {
  let sections = document.querySelectorAll(".section");

  function showSection(targetId) {
    console.log(targetId);
      sections.forEach(section => section.style.display = "none"); // Hide all sections
      let targetSection = document.getElementById(targetId);
      targetSection.style.display = "block"; // Show only the selected section
      targetSection.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the section
  }

  document.getElementById("faq-btn").addEventListener("click", function () {
      showSection("faq-section");
  });

  document.getElementById("learn-btn").addEventListener("click", function () {
      showSection("learn-section");
  });

  document.getElementById("logout-btn").addEventListener("click", function () {
      showSection("logout-section");
  });
});



const loadBtns=()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
.then(res=>res.json())

.then(data=>displayBtns(data.data));

}
const displayBtns=(buttons)=>{
    const btnContainer=document.getElementById("btn-container");
    for(const btn of buttons){
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
        <button class="btn btn-outline btn-primary gap-2" id="btn-${btn.id}" onclick="loadWords(${btn.level_no})"><img src="./assets/fa-book-open.png" alt=""> Lesson-${btn.level_no}</button>
        
        `;
        btnContainer.append(btnDiv);
        console.log(btn);
    }
}
const loadWords=(id)=>{
    // const url=`https:// openapi.programming-hero.com/api/level/${id}`;
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=>res.json())
    .then(data=>displayWords(data.data));

}
const displayWords=(words)=>{
    const wordsContainer=document.getElementById("words-container");
    wordsContainer.classList.add("bg-gray-200");
    console.log(words.length);
    wordsContainer.innerHTML="";
    if (words.length == 0) {
        wordsContainer.innerHTML = `
        <div
            class="py-20 col-span-full flex flex-col justify-center items-center text-center"
          >
            <img class="w-[120px]" src="./assets/alert-error.png" alt="" />
            <h2 class="text-2xl font-bold">
              Oops!! Sorry, There is no lesson here
            </h2>
          </div>
        `;
        // hideLoader();
        // return;
      }
   
    for(const word of words){
        
        const wordDiv=document.createElement("div");
        wordDiv.innerHTML=`
        <div class="card card-border bg-base-100 w-96">
  <div class="card-body text-center">
    <h2 class="font-bold text-xl">${word.word}</h2>
    <p>meaning/pronounciation</p>
    <p>${word.meaning}/${word.pronunciation}</p>
    <div class=" flex justify-between" >
    <div >
      <button class="btn bg-white" onclick="loadWordDetails(${word.id})"><i class="fa fa-info-circle" aria-hidden="true"></i>
      </button>
    </div>
    <div >
    <button class="btn bg-white" onclick="pronounceWord(${word.id})"><i class="fa-solid fa-volume-high"></i></button>
  </div>
  </div>
  </div>
</div>
        `;
        wordsContainer.append(wordDiv);
    }

}
const loadWordDetails=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res=>res.json())
    .then(data=>showDetails(data.data));
}
const showDetails=(details)=>{
    console.log(details);
    document.getElementById("word_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML=`
  <h2>${details.word} (<button class="btn" onclick="pronounceWord(${details.id})"> <i class="fa-solid fa-microphone"></i></button> ${details.pronunciation
  })</h2>
  <p>meaning</p>
  <p>${details.meaning}</p>
  <p>meaning</p>
  <p>${details.sentence}</p>
  <p>synonyms</p>
  <div id="synonyms-container"></div>
  
  `;
  // Selecting the synonyms container
  const synonymsContainer = document.getElementById("synonyms-container");

  // Checking if synonyms exist
  if (details.synonyms && details.synonyms.length > 0) {
      details.synonyms.forEach(synonym => {
          const synonymElement = document.createElement("span");
          synonymElement.innerText = synonym;
          synonymElement.classList.add("px-2", "py-1", "bg-gray-200", "rounded", "m-1", "inline-block");
          synonymsContainer.appendChild(synonymElement);
      });
  } else {
      synonymsContainer.innerText = "No synonyms available.";
  }
  

}
const pronounceWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
      .then(res => res.json())
      .then(data => {
          const word = data.data.word;
          const pronunciation = data.data.pronunciation;
          console.log(word);
          console.log(pronunciation);

          // If pronunciation exists, use it; otherwise, use the word itself
          const textToPronounce = word ;

          // Using SpeechSynthesis to pronounce the word
          const utterance = new SpeechSynthesisUtterance(textToPronounce);
          speechSynthesis.speak(utterance);
      });
}
loadBtns();