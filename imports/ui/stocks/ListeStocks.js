import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stocksCollection.js';


import { EasySearch } from 'meteor/easy:search';

import './ListeStocks.html';
import './ElementStock.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.ListeStocks.onCreated(function() {
  this.autorun(() => {
    this.subscribe('stocks');
  });
  this.showStockOk = new ReactiveVar(true);
  this.showStockAlerte = new ReactiveVar(true);
  this.showStockAvertissement = new ReactiveVar(true);
});

Template.ListeStocks.helpers({
	stocks: ()=> {
		return Stocks.find({});
	},
    stocksIndex: function () {
	    return StocksIndex;   
	},
	resultsCount: function () {
      return StocksIndex.getComponentDict().get('count');
    },
	showStockOk: function() {
		return Template.instance().showStockOk.get();
	},
	showStockAlerte: function() {
		return Template.instance().showStockAlerte.get();
	},
	showStockAvertissement: function() {
		return Template.instance().showStockAvertissement.get();
	},
});

Template.ListeStocks.events({
	'click .show-stock-ok': function(event, template) {
		template.showStockOk.set(!template.showStockOk.get());
	},
	'click .show-stock-alerte': function(event, template) {
		template.showStockAlerte.set(!template.showStockAlerte.get());
	},
	'click .show-stock-avertissement': function(event, template) {
		template.showStockAvertissement.set(!template.showStockAvertissement.get());
	},
});
