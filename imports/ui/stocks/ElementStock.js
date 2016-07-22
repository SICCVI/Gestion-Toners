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
		const tonerModele = toner.modele;
		const tonerConstructeur = toner.constructeur;
		const tonerReference = toner.referenceC;
		const tonerId = toner._id;
		const categorie = "Entrée";
		Meteor.call('historiques.insert-entree', date, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie);
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
		const tonerModele = toner.modele;
		const tonerConstructeur = toner.constructeur;
		const tonerReference = toner.referenceC;
		const tonerId = toner._id;
		const date = getDate();
		const siteId = site;
		const siteNom = Sites.findOne({_id: siteId}).nom;
		const serviceId = service;
		const serviceNom = Services.findOne({_id: serviceId}).nom;
		const categorie = "Retrait";
		Meteor.call('historiques.insert-retrait', date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie, function(error, result){
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
		const tonerModele = toner.modele;
		const tonerConstructeur = toner.constructeur;
		const tonerReference = toner.referenceC;
		const tonerId = toner._id;
		const date = getDate();
		const categorie = "Commande";
		Meteor.call('historiques.insert-commande', date, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie);	
	},
	'click .supprimer': function() {
		Meteor.call('stocks.remove', this._id);
	},
	'click .show-fournisseurs': function(event, template) {
	template.showFournisseurs.set(!template.showFournisseurs.get());
	},
	'click .remove-site': function () {
		const stock = event.target.getAttribute('data-id');
		const consommateur = event.target.getAttribute('data-consommateurId');
/*		console.log("CONSOMMATEUR ID : " +consommateur);
		console.log("STOCK ID : " +stock);
		let objetStock = Stocks.findOne(id=stock);
		console.log("OBJET STOCK : " + objetStock);
		let objetConsommateur = objetStock.consommateur
		console.log("OBJET CONSO : " + objetConsommateur);
		for (const key of Object.keys(objetConsommateur)) {
		    const values = objetConsommateur[key];
		    console.log(values);
		    let indexOfConsommateur = objetConsommateur.indexOf(values);
		    console.log("ID DU CONSOMMATEUR POUR CET OBJET : "+values.consommateurId);
		    if (values.consommateurId === consommateur) {
		    	console.log("PRESENT DANS L'INDEX " +indexOfConsommateur);
		    }
		    else {
		    	console.log("ABSENT DANS L'INDEX " +indexOfConsommateur);
		    }  
		}*/
		Meteor.call('stocks.remove-site', stock, consommateur);
	},
	'click .remove-impression': function () {
		const stock = event.target.getAttribute('data-id');
		const site = event.target.getAttribute('data-site')
		const service = event.target.getAttribute('data-service')
		const impression = this._id;
		Meteor.call('stocks.remove-impression', stock, site, service, impression);
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


Template.ModalAddImpression.onCreated(function() {
  this.autorun(() => {
    this.subscribe('impressions');
  });
});

Template.ModalAddImpression.helpers({
	impressions: ()=> {
		return Impressions.find({});
	},
	totalCount() {
  		return Impressions.find({ _id: {$ne: true }}).count();
  	},
  impressionsIndex: function () {
	    return ModuleImpressionsIndex;   
	},
	resultsCount: function () {
      return ModuleImpressionsIndex.getComponentDict().get('count');
    },
});

Template.ModalAddImpression.events({
    'click .table-donnees .row-donnees':function(evt){
    	const stock = evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');
		const site = evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-site');
		const service = evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-service');
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
        const NomTable = "TableChoixImpression"+"-"+stock+"-"+site+"-"+service;
        const table = document.getElementById(NomTable);
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = this.marque;
        cell2.innerHTML = this.modele;
        cell3.innerHTML = "<label hidden>"+ this._id +"</label>";
        }
    },
    'click .add-impression': function(evt){
    	const stock = evt.target.getAttribute('data-id');
		const site = evt.target.getAttribute('data-site');
		const service = evt.target.getAttribute('data-service');
		const NomTable = "TableChoixImpression"+"-"+stock+"-"+site+"-"+service;
	    const oTable = document.getElementById(NomTable);
	    const rowLength = oTable.rows.length;
	    let cell1;
	    let cell2;  
	    let cell3;   
	    for (let i = 0; i < rowLength; i++) { 
	       const oCells = oTable.rows.item(i).cells;
	       const cellLength = oCells.length;
	       for(let  j = 0; j < cellLength; j++) {
	              cell1 = oCells.item(0).innerHTML;
	              cell2 = oCells.item(1).innerHTML;
	              cell3 = oCells.item(2).textContent;
	        }
	      let impressionIndex = cell1 + " " + cell2;
	      let impressionId = cell3;
	      Meteor.call('stocks.add-impression', stock, site, service, impressionId);
	      const index = impressionIndex;
	      Meteor.call('stocks.update-index', stock, index);
	  	}
	},
	  'click .delete-selection-impression'(evt) {
        event.preventDefault();
        const stock = evt.target.parentNode.parentNode.getAttribute('data-id');
		const site = evt.target.parentNode.parentNode.getAttribute('data-site');
		const service = evt.target.parentNode.parentNode.getAttribute('data-service');
		const NomTable = "TableChoixImpression"+"-"+stock+"-"+site+"-"+service;
        document.getElementById(NomTable).deleteRow(0);
	},
});

Template.ModalAddContact.onCreated(function() {
  this.autorun(() => {
    this.subscribe('contacts');
  });
});

Template.ModalAddContact.helpers({
	contacts: ()=> {
		return Contacts.find({});
	},
	totalCount() {
  		return Contacts.find({ _id: {$ne: true }}).count();
  	},
  contactsIndex: function () {
	    return ModuleContactsIndex;   
	},
	resultsCount: function () {
      return ModuleContactsIndex.getComponentDict().get('count');
    },
});

Template.ModalAddContact.events({
    'click .table-donnees .row-donnees':function(evt){
    	const stock = evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-id');
		const site = evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-site');
		const service = evt.target.parentNode.parentNode.parentNode.parentNode.getAttribute('data-service');
        const NomInput = "ChoixContact"+"-"+stock+"-"+site+"-"+service;
        const NomInputId = "ChoixContactId"+"-"+stock+"-"+site+"-"+service;
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
          document.getElementById(NomInput).value= this.nom + " " + this.prenom + " ( " + this.telephone + " )";
          document.getElementById(NomInputId).value= this._id;
        }
        else {
          $(evt.currentTarget).removeClass('highlight');
          document.getElementById(NomInput).value= "";
          document.getElementById(NomInputId).value= "";
        }
    },
    'click .update-contact': function(evt){
    	const stock = evt.target.getAttribute('data-id');
    	const site = evt.target.getAttribute('data-site');
		const service = evt.target.getAttribute('data-service');
        const NomInputId = "ChoixContactId"+"-"+stock+"-"+site+"-"+service;
        const contact = document.getElementById(NomInputId).value;
    	Meteor.call('stocks.update-contact', stock, site, service, contact);
	}
});