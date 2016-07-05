import { Template } from 'meteor/templating';
import { Stocks } from '../../api/stocksCollection.js';
import { Historiques } from '../../api/historiquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';
import { Fournisseurs } from '../../api/fournisseursCollection.js';
import { Impressions } from '../../api/impressionsCollection.js';
import { Sites } from '../../api/sitesCollection.js';
import { Contacts } from '../../api/contactsCollection.js';
import { Services } from '../../api/servicesCollection.js';
import { ReactiveVar } from 'meteor/reactive-var';

import { EasySearch } from 'meteor/easy:search';

import './ElementStock.html';

import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.ElementStock.onCreated(function() {
  this.autorun(() => {
    this.subscribe('stocks');
  });
  this.autorun(() => {
    this.subscribe('toners');
  });
  this.autorun(() => {
    this.subscribe('fournisseurs');
  });
  this.autorun(() => {
    this.subscribe('historiques');
  });
  this.showFournisseurs = new ReactiveVar(false);
});

Template.ElementStock.helpers({
	stocks: ()=> {
		return Stocks.find({});
	},
	infoAlerte: () => {
		return Stocks.find({"alerte": true});
	},
	getToner: function(id) {
        return Toners.findOne({_id: id});
    },
	getFournisseur: function(id) {
        return Fournisseurs.findOne({_id: id});
    },
	showFournisseurs: function() {
	  return Template.instance().showFournisseurs.get();
	},
});

let Q = 0;
let S = 0;
let A = 0;

Template.ElementStock.events({
	'click .augmente-quantite': function () {
		Meteor.call('stocks.augmente-quantite', this._id);
		Q = this.quantite + 1;
		S = this.seuil;
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
		const toner = Toners.findOne({_id: this.toner});
		const date = getDate();
		const tonerNom = "Modèle : " + toner.modele + " / Constructeur : " + toner.constructeur + " / " + toner.referenceC;
		const tonerId = toner._id;
		const categorie = "Entrée";
		Meteor.call('historiques.insert-entree', date, tonerId, tonerNom, categorie);
		Meteor.call('historiques.fin-commande', tonerId);
	},
	'click .diminue-quantite': function () {
		if (this.quantite > 0) {
		Meteor.call('stocks.diminue-quantite', this._id);
		Q = this.quantite - 1;
		S = this.seuil;
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	}
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
		if (this.seuil > 0) {
		Meteor.call('stocks.diminue-seuil', this._id);
		Q = this.quantite;
		S = this.seuil - 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	}
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
		if (this.nvAvertissement > 0) {
		Meteor.call('stocks.diminue-avertissement', this._id);
		Q = this.quantite;
		S = this.seuil - 1
		I = this._id;
		A = this.nvAvertissement;
		checkStock(Q, S, A, I);
	}
	},
	'click .consommer': function () {
		const elementId = event.target.getAttribute('data-id');
		const site = this.site;
		const service = this.service;
		Meteor.call('stocks.consommation', elementId, site, service);

		const parent = Stocks.findOne({_id: elementId});
		Meteor.call('stocks.diminue-quantite', parent._id);

		const toner = Toners.findOne({_id: parent.toner});
		const tonerNom = "Modèle : " + toner.modele + " / Constructeur : " + toner.constructeur + " / " + toner.referenceC;
		const tonerId = toner._id;
		const date = getDate();
		const siteId = site;
		const siteNom = Sites.findOne({_id: siteId}).nom;
		const serviceId = service;
		const serviceNom = Services.findOne({_id: serviceId}).nom;
		const categorie = "Retrait";
		Meteor.call('historiques.insert-retrait', date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerNom, categorie, function(error, result){
	  		const historiqueId = result;
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
		const site = this.siteId;
		const service = this.serviceId;
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
		const tonerNom = "Modèle : " + toner.modele + " / Constructeur : " + toner.constructeur + " / " + toner.referenceC;
		const tonerId = toner._id;
		const date = getDate();
		const categorie = "Commande";
		Meteor.call('historiques.insert-commande', date, tonerId, tonerNom, categorie);	
	},
	'click .supprimer': function() {
		Meteor.call('stocks.remove', this._id);
	},
	'click .show-fournisseurs': function(event, template) {
	template.showFournisseurs.set(!template.showFournisseurs.get());
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
	let min = today.getMinutes();
	let h = today.getHours();
	let dd = today.getDate();
	let mm = today.getMonth()+1;
	let yyyy = today.getFullYear();
	if(min<10) {
	    min='0'+min
	} 
	if(h<10) {
	    h='0'+h
	} 
	if(dd<10) {
	    dd='0'+dd
	} 
	if(mm<10) {
	    mm='0'+mm
	} 
	const date = dd+'/'+mm+'/'+yyyy+' ('+h+':'+min+')';
	console.log(date);
	return date;
}

Template.ElementConsommateur.onCreated(function() {
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
  this.autorun(() => {
    this.subscribe('historiques');
  });
  this.showImpressions = new ReactiveVar(false);
  this.showContacts = new ReactiveVar(false);
});

Template.ElementConsommateur.helpers({
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
    historiques: () => {
		return Historiques.find({}, {sort: {date: -1}})
	},
	getHistorique: function(id) {
        return Historiques.findOne({_id: id});
    },
	showImpressions: function() {
	  return Template.instance().showImpressions.get();
	},
	showContacts: function() {
	  return Template.instance().showContacts.get();
	},
});

Template.ElementConsommateur.events({
	'click .show-impressions': function(event, template) {
	template.showImpressions.set(!template.showImpressions.get());
	},
	'click .show-contacts': function(event, template) {
	template.showContacts.set(!template.showContacts.get());
	},
});