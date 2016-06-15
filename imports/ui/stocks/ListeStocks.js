import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stocksCollection.js';
import { Historiques } from '../../api/historiquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';
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
    this.subscribe('historiques');
  });
});

Template.ListeStocks.onCreated(function() {
  this.autorun(() => {
    this.subscribe('toners');
  });
});

Template.ListeStocks.helpers({
	stocks: ()=> {
		return Stocks.find({});
	},
	infoAlerte: () => {
		return Stocks.find({"alerte": true});
	},
	historiques: () => {
		return Historiques.find({}, {sort: {date: -1}})
	},
	getHistorique: function(id) {
        return Historiques.findOne({_id: id});
    },
	getToner: function(id) {
        return Toners.findOne({_id: id});
    },
});

let Q = 0;
let S = 0;
let A = 0;

Template.ListeStocks.events({
	'click .augmente-quantite': function () {
		Meteor.call('stocks.augmente-quantite', this._id);
		Q = this.quantite + 1;
		S = this.seuil;
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
		const objet = this.libelle;
		const date = getDate();
		const sortie = false;
		const auteur = "-";
		Meteor.call('historiques.insert', objet, auteur, date, sortie);
  		
	},
	'click .diminue-quantite': function () {
		Meteor.call('stocks.diminue-quantite', this._id);
		Q = this.quantite - 1;
		S = this.seuil;
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .augmente-seuil': function () {
		Meteor.call('stocks.augmente-seuil', this._id);
		Q = this.quantite;
		S = this.seuil + 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .diminue-seuil': function () {
		Meteor.call('stocks.diminue-seuil', this._id);
		Q = this.quantite;
		S = this.seuil - 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .augmente-avertissement': function () {
		Meteor.call('stocks.augmente-avertissement', this._id);
		Q = this.quantite;
		S = this.seuil + 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .diminue-avertissement': function () {
		Meteor.call('stocks.diminue-avertissement', this._id);
		Q = this.quantite;
		S = this.seuil - 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .consommer': function () {
		const elementId = event.target.getAttribute('data-id');
		const service = this.nom;
		Meteor.call('stocks.consommation', elementId, service);

		const parent = Stocks.findOne({_id: elementId});
		Meteor.call('stocks.diminue-quantite', parent._id);

		const objet = parent.libelle;
		const date = getDate();
		const sortie = true;
		const auteur = service;
		Meteor.call('historiques.insert', objet, auteur, date, sortie, function(error, result){
  		
  		var historiqueId = result;
  		Meteor.call('stocks.add-historique', parent._id, service, historiqueId);
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
		Meteor.call('historiques.remove', this._id);
		const elementId = event.target.getAttribute('data-id');
		const service = this.service;
		Meteor.call('stocks.remove-historique', elementId, service, this._id);

		Meteor.call('stocks.annule-consommation', elementId, service);

		const parent = Stocks.findOne({_id: elementId});
		Meteor.call('stocks.augmente-quantite', elementId);

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