/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

function createCartModel(config) {
	var model = createListModel(config);
	
	model.getTotalPrice = function(){
		var i,			//index
			totalPrice = 0, //accumulator
			item;		//current item
		for(i=0; i<this.items.length; ++i){
			item = this.items[i];
			totalPrice += item.price;
		}
		return totalPrice.toFixed(2);
	} //getTotalPrice definition

	model.toJSON = function(){
		return JSON.stringify(this.items);
	} //toJSON definition

	return model;
} //createCartModel()