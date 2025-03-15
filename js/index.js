

const getstarted=()=>{
    const username=document.getElementById("username").value;
    const password=document.getElementById("password").value;
    if (!username) {
      alert('Please enter your name');
      return;
  }

  if (password !== '123456') {
      alert('Invalid password');
      return;
  }
  Swal.fire({
    title: 'Login Successful!',
    text: 'Welcome, ' + username + '!',
    icon: 'success',
    confirmButtonText: 'OK'
}).then(() => {
    // Hide the banner and show the content
    document.getElementById("nav").classList.remove("hidden");
    document.getElementById("banner").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("logout-section").classList.add("hidden");

});
}
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("words-container").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("words-container").classList.remove("hidden");
};
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  let sections = document.querySelectorAll(".section");

  function showSection(targetId) {
    console.log(targetId);
      // sections.forEach(section => section.style.display = "none"); // Hide all sections
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
    document.getElementById("nav").classList.add("hidden");
    document.getElementById("banner").classList.remove("hidden");
    document.getElementById("main").classList.add("hidden");
    document.getElementById("logout-section").classList.remove("hidden");
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
        <button class="btn btn-outline btn-primary gap-2" id="btn-${btn.level_no}" onclick="loadWords(${btn.level_no})"><img src="./assets/fa-book-open.png" alt=""> Lesson-${btn.level_no}</button>
        
        `;
        btnContainer.append(btnDiv);
        console.log(btn);
    }
}
const loadWords=(id)=>{
    // const url=`https:// openapi.programming-hero.com/api/level/${id}`;
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res=>res.json())
    .then(data=>{
     
      removeActiveClass();
      //no active class

      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");


      displayWords(data.data);
    });

}
const displayWords=(words)=>{
    const wordsContainer=document.getElementById("words-container");
    // wordsContainer.classList.add("bg-gray-200");
    console.log(words.length);
    wordsContainer.innerHTML="";
    if (words.length == 0) {
        wordsContainer.innerHTML = `
        <div class="col-span-full flex justify-center items-center text-center flex-col gap-4">
        <img src="./assets/alert-error.png" alt="">
        <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-semibold text-3xl">নেক্সট Lesson এ যান</h2>
    </div>
        `;
         hideLoader();
         return;
      }
   
    for(const word of words){
      const meaning = (!word.meaning || word.meaning === "null") ? "অর্থ নেই" : word.meaning; 
        const wordDiv=document.createElement("div");
        wordDiv.innerHTML=`
        <div class="card card-border bg-base-100 w-96">
  <div class="card-body text-center">
    <h2 class="font-bold text-xl">${word.word}</h2>
    <p>meaning/pronounciation</p>
    <p class="font-bold">${meaning}/${word.pronunciation}</p>
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
        console.log(word);
    }
    hideLoader();

}
const loadWordDetails=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then(res=>res.json())
    .then(data=>showDetails(data.data));
}
const showDetails=(details)=>{
    console.log(details);
    document.getElementById("word_details").showModal();
    const meaning = (!details.meaning || details.meaning === "null") ? "অর্থ নেই" : details.meaning;
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML=`
  <h2 class="text-xl font-bold">${details.word} (<button class="btn" onclick="pronounceWord(${details.id})"> <i class="fa-solid fa-microphone"></i></button> : ${details.pronunciation
  })</h2>
  <p class="font-bold">meaning</p>
  <p>${meaning}</p>
  <p class="font-bold">Example</p>
  <p>${details.sentence}</p>
  <p class="font-bold text-sm">সমার্থক শব্দগুলো
  </p>
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
      synonymsContainer.innerText = "";
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