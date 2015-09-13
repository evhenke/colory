$(function() {
	var errors = 0;
	var started = false;

	var BoardView = Backbone.View.extend({

		initialize: function() {
			this.listenTo(this.collection,'add', this.render);
		},

		events: {
			'click': 'checkBoardStatus',
		},

		checkBoardStatus: function(){
			//var cardsOnBoard = this.collection.where({shown: true, found: false});
			//console.log(flippedCards.length);
			if (!started) {
				Interval = setInterval(startTimer, 100);
				started = true;
			}
		},

		render: function(){
		    // Assume our model exposes the items we will
		    // display in our list
		    var cards = this.collection.models;

		    // Loop through each of our items using the Underscore
		    // _.each iterator
		    _.each(cards, function(card){

		      // Create a new instance of the ItemView, passing 
		      // it a specific model item
		      var cardView = new CardView({ model: card });
		      // The itemView's DOM element is appended after it
		      // has been rendered. Here, the 'return this' is helpful
		      // as the itemView renders its model. Later, we ask for 
		      // its output ("el")
		      this.$el.append( cardView.render() );
		  }, this);
		}
	});

  	// The card view
  	var CardView = Backbone.View.extend({
	  	template:'',

        attributes : function () {
          return {
            class : "slot",
            id : this.model.get( 'position' )
          };
        },
        
	  	initialize: function() {
	  		this.template = _.template($("#card-template").html());
	  		this.model.bind('change', _.bind(this.render, this));
	  	},

		  // with an events hash containing DOM events
		  // specific to an item:
		  events: {
		  	'click .closed': 'showCard',
		    //'click .shown': 'flip',
		    'dblclick': 'flipped',
		    'keypress .flipped': 'updateOnEnter',
		    'click .destroy': 'clear',
		    'blur .flipped': 'close'
		},

		showCard: function() {
			var flippedCards = this.model.collection.where({shown: true, found: false});
			
			switch (flippedCards.length) {
				case 0 : 			
					var color = this.model.get("color");
					$('#o1').attr( "class", color.replace("card", "color"));
					this.flip();
					break;
				case 1 : 
					// change colors of O in the title
					var color = this.model.get("color");
					$('#o2').attr( "class", color.replace("card", "color"));
					this.flip();
					break;
				default : 
					this.returnAllCards(flippedCards);
					var color = this.model.get("color");
					$('#o1').attr( "class", color.replace("card", "color"));
					this.flip();
					

			}
		},

		returnAllCards: function(cards) {
			cards.forEach(function(model, index) {
				model.set({shown:false});
			});
		},

		flip:  function(){
			this.model.set({shown:!this.model.get("shown")});
			this.$el.append("<embed src='audio/clack.mp3' hidden='true' autostart='true' loop='false' />");
			this.checkPair();
		},

		checkPair: function() {
		  	var flippedCards = this.model.collection.where({shown: true, found: false});
		  	if (flippedCards.length == 2) {
		  		if (flippedCards[0].get("color") ==
		  			flippedCards[1].get("color")) {
		  			setTimeout(function(){flippedCards[0].set({shown:false,found:true})}, 500);
		  			setTimeout(function(){flippedCards[1].set({shown:false,found:true})}, 500);
		  			//flippedCards[1].set({shown:false,found:true});
		  			//this.$el.append("<embed src='audio/pling.mp3' hidden='true' autostart='true' loop='false' />");
		  			$("#pling").get(0).play();

		  			if (this.model.collection.where({found: false}).length === 2) {
                        // The game is finished
		  				clearInterval(Interval);
		  				$("#board").css("display","none");
		  				$("#stats").css("display","none");
		  				$("#gameover").css("display","block");
		  				score = this.computeScore();
		  				$("#score").html(score);
		  				// change colors of PlayAgain button in GameOver
		  				var color = this.model.get("color");
            			$('button').attr("class", color.replace("color"));
            			$('.socialmedia').attr( "class", color.replace("card", "color"));
		  				
		  				$("#twitter").attr("href", "https://twitter.com/home?status=I completed Colory in " + score + " http://evhenke.github.io/colory/")
		  			}
		  		}
		  		else { 
		  			errors++;
		  			$("#errors").html(errors);
		  		}
			}
		},

        computeScore: function() {
            //var maxScore = 5000;
            //var timeMalus = parseInt($("#seconds").html()) * 100 + parseInt($("#tens").html())
            //var errorMalus = 0 + errors * 5
            //return maxScore - timeMalus - errorMalus;
            
            var time = "" + $("#seconds").html() + '"' + $("#tens").html()
            return time;
        },

		render: function() {
			var tpl = this.template(this.model.attributes);
			this.$el.html(tpl);
			return this.$el;
		}

	});

	var gameStarted = false;

	var boardView = new BoardView({
		collection:allCards,
		el : $('#board')
	});

	boardView.render();

	if(window.location.hash) {
    	$('#board').css('display','block');
    	$('#stats').css('display','inline');
		$('#start').css('display','none');
	} else {
		$('#start').css('display','block');
        $('#stats').css('display','none');
    	$('#board').css('display','none');
	}


	// T I M E R
	var seconds = 00; 
	var hundreds = 00; 
	var appendTens = document.getElementById("tens");
	var appendSeconds = document.getElementById("seconds");
	var Interval ;

	function startTimer () {
		hundreds++; 

		if(hundreds < 9){
			appendTens.innerHTML = hundreds;
		}

		if (hundreds > 9){
			seconds++;
			appendSeconds.innerHTML = "0" + seconds;
			hundreds = 0;
			appendTens.innerHTML = "0";
		}

		if (seconds > 9){
			appendSeconds.innerHTML = seconds;
		}

	}

});


