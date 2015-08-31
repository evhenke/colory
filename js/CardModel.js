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

// create the cards
function fillCardCollection(cardQuantity) {
	// there are two cards per color
	var tmpCollection = [];
	for (i=1;i<=2*cardQuantity;i++) {
		var cardNumber = (i+i%2)/2; //slightly overdone calculation to have two cards of the same color
		var cardColor = "card"+cardNumber;
		var card = new Card({color: cardColor});
		tmpCollection.push(card);
	}
	allCards.add(_.shuffle(tmpCollection));
	allCards.each(function(card, key) {
        var cardPosition = "p"+key;
        card.set("position", cardPosition);
    });
    
};

fillCardCollection(4);
