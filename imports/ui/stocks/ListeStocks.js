import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stocksCollection.js';
import { Historiques } from '../../api/historiquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';
import { Impressions } from '../../api/impressionsCollection.js';
import { Sites } from '../../api/sitesCollection.js';
import { Contacts } from '../../api/contactsCollection.js';
import { Services } from '../../api/servicesCollection.js';
import { ReactiveVar } from 'meteor/reactive-var';

import { EasySearch } from 'meteor/easy:search';

import './ListeStocks.html';

import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.ListeStocks.onCreated(function() {
  this.autorun(() => {
    this.subscribe('stocks');
  });
  this.autorun(() => {
    this.subscribe('historiques');
  });
  this.autorun(() => {
    this.subscribe('toners');
  });
  this.autorun(() => {
    this.subscribe('impressions');
  });
  this.autorun(() => {
    this.subscribe('sites');
  });
  this.autorun(() => {
    this.subscribe('contacts');
  });
  this.autorun(() => {
    this.subscribe('services');
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
    getImpression: function(id) {
        return Impressions.findOne({_id: id});
    },
    getSite: function(id) {
        return Sites.findOne({_id: id});
    },
    getContact: function(id) {
        return Contacts.findOne({_id: id});
    },
    getService: function(id) {
        return Services.findOne({_id: id});
    },
    stocksIndex: function () {
	    return StocksIndex;   
	},
	resultsCount: function () {
      return StocksIndex.getComponentDict().get('count');
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
		const toner = Toners.findOne({_id: this.toner});
		const objet = toner.constructeur + " " + toner.referenceC;
		const date = getDate();
		const sortie = false;
		const entree = true;
		const commande = false;
		const auteur = "-";
		const objetId = null;
		const note = null;
		Meteor.call('historiques.insert', objet, auteur, date, sortie, entree, commande, note, objetId);
		Meteor.call('historiques.remove-ligne', this.toner);
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
		const site = this.site;
		const service = this.service;
		Meteor.call('stocks.consommation', elementId, site, service);

		const parent = Stocks.findOne({_id: elementId});
		Meteor.call('stocks.diminue-quantite', parent._id);

		const toner = Toners.findOne({_id: parent.toner});
		const objet = toner.constructeur + " " + toner.referenceC;
		const date = getDate();
		const sortie = true;
		const entree = false;
		const commande = false;
		const auteur = Sites.findOne({_id: site}).nom + " / " + Services.findOne({_id: service}).nom;
		const objetId = null;
		const note = null;
		Meteor.call('historiques.insert', objet, auteur, date, sortie, entree, commande, note, objetId, function(error, result){
  		
  		var historiqueId = result;
  		Meteor.call('stocks.add-historique', parent._id, site, service, historiqueId);
  		});

		Q = parent.quantite - 1;
		S = parent.seuil;
		I = parent._id;
		A = parent.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .consommations-remove': function () {
		Meteor.call('historiques.remove', this._id);
		const elementId = event.target.getAttribute('data-id');
		const site = this.site;
		const service = this.service;
		Meteor.call('stocks.remove-historique', elementId, site, service, this._id);

		Meteor.call('stocks.annule-consommation', elementId, site, service);

		const parent = Stocks.findOne({_id: elementId});
		Meteor.call('stocks.augmente-quantite', elementId);

		Q = parent.quantite + 1;
		S = parent.seuil;
		I = parent._id;
		A = parent.nvAvertissement;
		checkStock(Q, S, A, I);
	},
	'click .commander': function () {
		const toner = Toners.findOne({_id: this.toner});
		const objet = toner.constructeur + " " + toner.referenceC;
		const date = getDate();
		const sortie = false;
		const entree = false;
		const commande = true;
		const auteur = "-";
		const objetId = this.toner;
		const note = null;
		Meteor.call('historiques.insert', objet, auteur, date, sortie, entree, commande, note, objetId);	
	},
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