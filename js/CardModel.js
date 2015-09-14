var Card = Backbone.Model.extend({
  // Default card attribute values
  defaults: {
    color: '',
    shown: false,
    found: false,
    position: ''
  }
});


// Create a collection using our cards
var CardCollection = Backbone.Collection.extend({
  model: Card
});

var allCards = new CardCollection([]);
//card1a, card1b, card2a, card2b, card3a, card3b, card4a, card4b]);


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
}

var colors = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12", "card13", "card14", "card15"];
shuffle(colors);


// create the cards
function fillCardCollection(cardQuantity) {
	// there are two cards per color
	var tmpCollection = [];
	for (i=1;i<=2*cardQuantity;i++) {
		var cardNumber = (i+i%2)/2; //slightly overdone calculation to have two cards of the same color
		var cardColor = colors[cardNumber];
		var card = new Card({color: cardColor});
		tmpCollection.push(card);
	}
	allCards.add(_.shuffle(tmpCollection));
	allCards.each(function(card, key) {
        var cardPosition = "p"+key;
        card.set("position", cardPosition);
    });
    
};

fillCardCollection(9);
