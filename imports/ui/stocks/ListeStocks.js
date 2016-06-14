import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stockCollection.js';
import { Consommations } from '../../api/consommationCollection.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './ListeStocks.html';

import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.ListeStocks.onCreated(function() {
  this.autorun(() => {
    this.subscribe('stocks');
  });
});

Template.ListeStocks.onCreated(function() {
  this.autorun(() => {
    this.subscribe('consommations');
  });
});

Template.ListeStocks.helpers({
	stocks: ()=> {
		return Stocks.find({});
	},
	infoAlerte: () => {
		return Stocks.find({"alerte": true});
	},
	consommations: () => {
		return Consommations.find({}, {sort: {date: -1}})
	},
	getHistorique: function(id) {
        return Consommations.findOne({_id: id});
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
	'click .decrease-quantity': function () {
		Meteor.call('stocks.diminue-quantite', this._id);
		Q = this.quantite - 1;
		S = this.seuil;
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
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
		const parent = Stocks.findOne({_id: objetId});
		const objet = parent.libelle;
		Meteor.call('stocks.diminue-quantite', parent._id);
		Meteor.call('consommations.insert', service, objet, date, function(error, result){
  		var historiqueId = result;
  		Meteor.call('stocks.historique', parent._id, service, historiqueId);
  		});
		Q = parent.quantite - 1;
		S = parent.seuil;
		I = parent._id;
		A = parent.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .check-objet': function () {
		console.log(this);
		console.log(event.target.getAttribute('data-id'));
		//console.log(this.parentNode.className);*/
		//const test = this.parentNode.getAttribute("data-id");
		//console.log(test);
	},
	'click .consommations-remove': function () {
		Meteor.call('consommations.remove', this._id);
		const objetId = event.target.getAttribute('data-id');
		const service = this.service;
		Meteor.call('stocks.remove-historique', objetId, service, this._id);

		Meteor.call('stocks.annule-consommation', objetId, service);
		const parent = Stocks.findOne({_id: objetId});
		Meteor.call('stocks.augmente-quantite', objetId);
		Q = parent.quantite + 1;
		S = parent.seuil;
		I = parent._id;
		A = parent.nvAvertissement;
		checkStock(Q, S, A, I);
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