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

var colors = ['#8BD1C9', '#26B99A', '#FCCF1B', '#823F98', '#3A65B0', '#F99D1C', '#F04F25', '#7BC361', '#0DB1DB', '#B04098', '#1B8670', '#EB778F', '#939598', '#B92645', '#58595B', '#5D4199'];
shuffle(colors);

var smallArray = colors.slice(0, 8);


// create the cards
function fillCardCollection(cardQuantity) {
	// there are two cards per color
	var tmpCollection = [];
	for (i=1;i<=2*cardQuantity;i++) {
		var cardNumber = (i+i%2)/2; //slightly overdone calculation to have two cards of the same color
		var cardColor = smallArray[cardNumber];
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
