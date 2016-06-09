import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stockCollection.js';

import './ListeStocks.html';

Template.ListeStocks.onCreated(function() {
  this.autorun(() => {
    this.subscribe('stocks');
  });
});

Template.ListeStocks.helpers({
	stocks: ()=> {
		return Stocks.find({});
	},
	infoAlerte: () => {
		return Stocks.find({"alerte": true});
	},
});

let Q = 0;
let S = 0;

Template.ListeStocks.events({
	'click .increase-quantity': function () {
		Meteor.call('stocks.augmente-quantite', this._id);
		console.log(this.quantite + 1);
		Q = this.quantite + 1;
		S = this.seuil;
		I = this._id;
		checkStock(Q, S, I);
	},
	'click .decrease-quantity': function () {
		Meteor.call('stocks.diminue-quantite', this._id);
		console.log(this.quantite - 1);
		Q = this.quantite - 1;
		S = this.seuil;
		I = this._id;
		checkStock(Q, S, I);
	},
	'click .increase-seuil': function () {
		Meteor.call('stocks.augmente-seuil', this._id);
		console.log(this.seuil + 1);
		Q = this.quantite;
		S = this.seuil + 1
		I = this._id;;
		checkStock(Q, S, I);
	},
	'click .decrease-seuil': function () {
		Meteor.call('stocks.diminue-seuil', this._id);
		console.log(this.seuil);
		Q = this.quantite;
		S = this.seuil - 1
		I = this._id;;
		checkStock(Q, S, I);
	},
});

checkStock = function (quantite, seuil, id) {
	console.log('checkStock fonction appelée');
	if (quantite <= seuil) {
			console.log('if');
			Meteor.call('stocks.alerte', id);
		}
		else {
			console.log('else');
			Meteor.call('stocks.no-alerte', id);
		}
}