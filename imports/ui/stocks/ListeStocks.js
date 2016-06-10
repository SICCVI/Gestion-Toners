import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stockCollection.js';
import { ReactiveVar } from 'meteor/reactive-var';

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
let A = 0;

Template.ListeStocks.events({
	'click .increase-quantity': function () {
		Meteor.call('stocks.augmente-quantite', this._id);
		Q = this.quantite + 1;
		S = this.seuil;
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	/*'click .decrease-quantity': function () {
		console.log('b');
		Meteor.call('stocks.diminue-quantite', this._id);
		Q = this.quantite - 1;
		S = this.seuil;
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},*/
	'click .increase-seuil': function () {
		Meteor.call('stocks.augmente-seuil', this._id);
		Q = this.quantite;
		S = this.seuil + 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .decrease-seuil': function () {
		Meteor.call('stocks.diminue-seuil', this._id);
		Q = this.quantite;
		S = this.seuil - 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .increase-avertissement': function () {
		Meteor.call('stocks.augmente-avertissement', this._id);
		Q = this.quantite;
		S = this.seuil + 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .decrease-avertissement': function () {
		Meteor.call('stocks.diminue-avertissement', this._id);
		Q = this.quantite;
		S = this.seuil - 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .consommer': function () {
		const objetId = event.target.getAttribute('data-id');
		const service = this.nom;
		Meteor.call('stocks.consommation', objetId, service);
		const date = getDate();
		Meteor.call('stocks.historique', objetId, service, date);
		const parent = Stocks.findOne({_id: objetId});
		Meteor.call('stocks.diminue-quantite', parent._id);
		Q = parent.quantite - 1;
		S = parent.seuil;
		I = parent._id;
		A = parent.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .check-objet': function () {
		console.log(this);
	}
});

checkStock = function (quantite, seuil, avertissement, id) {
	if (quantite <= avertissement) {
		Meteor.call('stocks.avertissement', id);
		if (quantite <= seuil) {
				Meteor.call('stocks.alerte', id);
		}
		else {
				Meteor.call('stocks.no-alerte', id);
		}
	}
	else {
		Meteor.call('stocks.no-avertissement', id);
	}
}

getDate = function () {
	const today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1;
	let yyyy = today.getFullYear();
	if(dd<10) {
	    dd='0'+dd
	} 
	if(mm<10) {
	    mm='0'+mm
	} 
	const date = dd+'/'+mm+'/'+yyyy;
	return date;
}