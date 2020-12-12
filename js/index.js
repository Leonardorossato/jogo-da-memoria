const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";


StartGame();

function StartGame(){
    InitializeCards(game.CreatePairFromTech());
}

function InitializeCards(cards){
    let GameBoard = document.createElement('GameBoard');
    GameBoard.innerHTML = '';
    cards.forEach((card)=>{
        let CardElement = document.createElement("div");
        CardElement.id = card.id;
        CardElement.classList.add(CARD);
        CardElement.dataset.icon = card.icon;

        CreateCardContent(card,CardElement);
        CardElement.addEventListener('click', flipCard);
        GameBoard.appendChild(CardElement);
    })
}

function CreateCardContent(card, CardElement){
    CreateCardFace(FRONT, card, CardElement)
    CreateCardFace(BACK, card, CardElement)
}

function CreateCardFace(face, card, element){
    let CardElementFace = document.createElement("div");
    CardElementFace.classList.add(face);

    if(face === FRONT){
        let IconElement = document.createElement("img");
        IconElement.classList.add(ICON);
        IconElement.src = "/assets/img/" + card.icon + ".png";
        CardElementFace.appendChild(IconElement);
    }else{
        CardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(CardElementFace);

}

function flipCard(){
    if(game.SetCard(this.is)){
        this.classList.add("flip"); 
        if(game.SecondCard){
            if(game.CheckMatch()){
                game.ClearMatch();
                if(game.CheckGameOver()){
                    let GameOverlayer = document.createElement("GameOver");
                    GameOverlayer.style.display ='flex';
                }
            }else{
                setTimeout(()=>{
                    let FirstCardView = document.getElementById(game.FirstCard.id);
                    let SecondCardView = document.getElementById(game.SecondCard.id);
        
                    FirstCardView.classList.remove('flip');
                    SecondCardView.classList.remove('flip');
                    game.UnflipCards();
                }, 1000)
            }
        }
    }
    
}

function restart(){
    game.ClearCrads();
    StartGame();
    let GameOverlayer = document.createElement("GameOver");
    GameOverlayer.style.display ='none';
    
}