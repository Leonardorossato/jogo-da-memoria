let game = {

    lockMode: false,
    FirstCard: null,
    SecondCard: null,

    SetCard: function(id) {
       let card =  this.cards.filter(card => card.id === id)[0];
       
       if(card.flipped || this.lockMode){
           return false;
       } 

       if(!this.FirstCard){
            this.FirstCard = card;
            this.FirstCard.flipped = true;
            return true;
       }else{
            this.SecondCard = card;
            this.SecondCard.flipped = true;
            this.lockMode = true;
            return true;
       }

    },

    CheckMatch: function(){
        if(!this.FirstCard ||!this.SecondCard){
            return false;
        }
        return this.FirstCard.icon === this.SecondCard.icon;
    },

    ClearCrads: function(){
        this.FirstCard = null;
        this.SecondCard = null;
        this.lockMode = false;
    },

    UnflipCards(){
        this.FirstCard.flipped = false;
        this.SecondCard.flipped = false;
        this.ClearCrads;
    },

    CheckGameOver(){
      return this.cards.filter(card => !card.flipped).length == 0;
    },

    languages : ['angular',
        'bootstrap',
        'electronjs',
        'firebase',
        'flutter',
        'html5',
        'mongoDB',
        'node',
        'react',
        'vuejs'
    ],

    cards: null,

    CreateCardsFromTechs: function() {
        this.cards = [];

        this.languages.forEach((language)=>{
            this.cards.push(CreatePairFromTech(language))
        })
        this.card =  this.cards.flatMap(pair=>pair);
        this.ShuffleCards();
        //return this.cards;
    },

    CreatePairFromTech: function(language){
        return [
            {
                id: this.CreateIdLanguage(language),
                icon: language,
                flipped: false,
            },
            {
                id: this.CreateIdLanguage(language),
                icon: language,
                flipped: false,
            }   
        ]
    },

    CreateIdLanguage: function(language){
        return language + parseInt(Math.random() * 1000);
    },

    ShuffleCards: function(cards) {
        let currentIndex = cards.length;
        let ramdonIndex = 0;
    
        while (currentIndex !== 0){
            ramdonIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[ramdonIndex], this.cards[currentIndex]] = [this.cards[currentIndex] , this.cards[ramdonIndex]];
        }
    }

}
