/* controller.js
    Controller for Shopping Cart page
*/

$(function(){

	var formatLabels = {
	    dvd: 'DVD',
	    bluray: 'Blu-Ray'
	};

	var cartModel = createCartModel();
	var cartView = createCartView({
		model: cartModel,
		template: $('.cart-item-template'),
		container: $('.cart-items-container'),
		totalPrice: $('.total-price')
	});
	var cartJSON = localStorage.getItem('cart');
	if (cartJSON && cartJSON.length > 0) {
    	cartModel.setItems(JSON.parse(cartJSON));
	}


	var moviesModel = createMoviesModel({
	    url: 'https://courses.washington.edu/info343/ajax/movies/'
	});

	var moviesView = createMoviesView({
	    model: moviesModel,
	    template: $('.movie-template'),
	    container: $('.movies-container')
	});

	//refresh to get movies from server
	moviesModel.refresh();
          
    moviesView.on('addToCart', function(data){
    	var movie = moviesModel.getItem(data.movieID);
    	if(!movie){
    		throw 'Invalid movie ID "' + data.movieID + '"!';
    	}
    	cartModel.addItem({
    		id: movie.id,
    		title: movie.title,
    		format: data.format,
    		formatLabel: formatLabels[data.format],
    		price: movie.prices[data.format]
    	});
    });      

    $('.place-order').click(function(){
    	$.ajax({
    		url: 'https://courses.washington.edu/info343/ajax/movies/orders/',
		    type: 'POST',
		    data: cartModel.toJSON(),
		    contentType: 'application/json',
		    success: function(responseData) {
		        $('.message').html(responseData.message);
		        $('.message').fadeIn(1000);
		        cartModel.setItems([]);
		    },
		    error: function(jqXHR, status, errorThrown) {
		        //error with post--alert user
		        alert(errorThrown || status);
		    }
		});
    });

    cartModel.on('change', function(){
    	localStorage.setItem('cart', cartModel.toJSON());
	});

}); //doc ready()

