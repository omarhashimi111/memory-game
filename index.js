

let cardArray = [
    {
        name: "lucy",
        img: "images/lucy.jpg"
    },
    {
        name: "cake",
        img: "images/cake.jpeg"
    },
    {
        name: "airplane",
        img: "images/airplane.jpeg"
    },{
        name: "axe",
        img: "images/axe.jpeg"
    },{
        name: "bike",
        img: "images/bike.jpeg"
    },
    {
        name: "car",
        img: "images/car.jpeg"
    },
    {
        name: "cat",
        img: "images/cat.jpeg"
    },
    {
        name: "fire",
        img: "images/fire.jpeg"
    },
    {
        name: "kid",
        img: "images/kid.jpeg"
    },
    {
        name: "grapes",
        img: "images/grapes.jpeg"
    },
    {
        name: "pizza",
        img: "images/pizza.jpeg"
    },
    {
        name: "tigar",
        img: "images/tigar.jpeg"
    }
]

cardArray = cardArray.concat(cardArray)

const level = document.getElementById("level")
const gridDisplay  = document.querySelector("#grid");
const result = document.querySelector("#result");
const startButton = document.getElementById("start");
const healthDisplay = document.getElementById("health");
const bestScore = document.getElementById("best");
const restartButton = document.getElementById("restart")
let selected = []
let names = []
let cards = []
let selectedLevel = 1
let health = 4;

if(localStorage.getItem("bestScore")){
    bestScore.innerHTML = localStorage.getItem("bestScore");

}else{
    bestScore.innerHTML = 0
}


result.innerHTML = 0
healthDisplay.innerText = health




const handleLevel = (e) => {
    const target = e.currentTarget
    let name = target.getAttribute("id");
    selectedLevel = name;
    selectedLevel == 0? health = 6:
    selectedLevel == 1? health = 4: health = 2;
    healthDisplay.innerText = health
    // active the style
    for(let i =0;i<levels.length;i++){
        if(nodeLevels[i].getAttribute("id") == selectedLevel){
            nodeLevels[i].classList.add("active")
        }else{
            nodeLevels[i].classList.remove("active")
        }
    }
}

const levels = ['easy','normal','hard']



levels.forEach((le,index) => {
        const div = document.createElement("div");
        div.innerText = le
        div.setAttribute("id",index)
        if(selectedLevel == div.getAttribute("id")){
            div.classList.add("active")
        }
        level.appendChild(div)
        div.addEventListener("click",handleLevel)
    })


const nodeLevels = document.querySelectorAll("#level div")



for (let i = 0; i < cardArray.length; i++){
    
    const img = new Image()
    img.setAttribute("src","images/Black_question_mark.png")
    gridDisplay.appendChild(img)
}
const imgs = document.querySelectorAll("#grid img");

function start() {
    const level = document.querySelectorAll("#level div");
    level.forEach(le => le.removeEventListener("click",handleLevel))
    cardArray.sort(() => 0.5 - Math.random())
    
    for (let i = 0; i < imgs.length; i++){
        imgs[i].setAttribute("src",cardArray[i].img)
        gridDisplay.appendChild(imgs[i])
         setTimeout(()=>{
            imgs[i].setAttribute("src","/images/Black_question_mark.png")
            imgs[i].setAttribute("dataId",i)
            imgs[i].addEventListener("click",flip);
            
        },selectedLevel==0? 9000: selectedLevel == 1? 5000: 3000)
    }
    startButton.removeEventListener("click",start)
}


function restart() {
    startButton.addEventListener("click",start)
    const level = document.querySelectorAll("#level div");
    level.forEach(le => le.addEventListener("click",handleLevel))
    selectedLevel == 0? health = 6:
    selectedLevel == 1? health = 4: health = 2;
    healthDisplay.innerText = health
    cards = []
    result.textContent = (cards.length * 10)
    
    for(let i = 0 ; i < imgs.length; i++){
        imgs[i].setAttribute("src","/images/Black_question_mark.png");
        imgs[i].removeEventListener("click",flip)
    }
}
const rest = () => {
    startButton.addEventListener("click",start)
    const level = document.querySelectorAll("#level div");
    level.forEach(le => le.addEventListener("click",handleLevel))
    cards = [];
    selectedLevel == 0? health = 6:
    selectedLevel == 1? health = 4: health = 2;
    healthDisplay.innerText = health
    result.textContent = 0;
    for(let i = 0 ; i < imgs.length; i++){
        imgs[i].setAttribute("src","/images/Black_question_mark.png");
        imgs[i].removeEventListener("click",flip);
    }

}

restartButton.addEventListener("click",rest)


function flip(e){
    const id = this.getAttribute("dataID");
    names.push(cardArray[id].name)
    selected.push(id)
    this.setAttribute("src",cardArray[id].img);
    this.removeEventListener("click",flip)
    let first = names[0];
    let second = names[1];

    if(second){ 
        setTimeout(() => {
            if(first === second){
                
                this.setAttribute("src","images/tick.png");
                imgs[selected[0]].setAttribute("src","images/tick.png")
                this.removeEventListener("click",flip)
                imgs[selected[0]].removeEventListener("click",flip)
                cards.push(names)
                names = []
                selected =[]
                result.textContent = (cards.length * 10);
                if(cards.length == 12){
                    start()
                    return 
                }
                
            }else{
                this.setAttribute("src","images/Black_question_mark.png");
                imgs[selected[0]].setAttribute("src","images/Black_question_mark.png")
                this.addEventListener("click",flip);
                imgs[selected[0]].addEventListener("click",flip)
                names = []
                selected = [];
                health -= 1
                healthDisplay.innerText = health
                if(health == 0){

                    
                    if(localStorage.getItem("bestScore")< (cards.length * 10)){
                        localStorage.setItem("bestScore",cards.length * 10)
                    }
                    bestScore.innerHTML = localStorage.getItem("bestScore")
                    restart()
                }
            }
        }, 500);
    }
}


startButton.addEventListener("click",start)
