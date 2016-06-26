import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stocksCollection.js';
import { Toners } from '../../api/tonersCollection.js';

import './NotificationsStock.html';


Template.NotificationsStock.onCreated(function() {
  this.autorun(() => {
    this.subscribe('stocks');
  });
  this.autorun(() => {
    this.subscribe('toners');
  });
});

Template.NotificationsStock.helpers({
	getToner: function(id) {
        return Toners.findOne({_id: id});
    },
	stockAlerte: ()=> {
		return Stocks.find({alerte:true});  
	},
	totalCountAlerte() {
  		return Stocks.find({alerte:true}).count();
  	},
	stockAvertissement: ()=> {
		return Stocks.find({avertissement: true, alerte:false});  
	},
	totalCountAvertissement() {
  		return Stocks.find({avertissement: true, alerte:false}).count();
  	},
});
