import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Contacts } from './contactsCollection.js';
import { Services } from './servicesCollection.js';
import { Sites } from './sitesCollection.js';
import { Marques } from './marquesCollection.js';
import { Fournisseurs } from './fournisseursCollection.js';
import { Toners } from './tonersCollection.js';
import { Impressions } from './impressionsCollection.js';

import { Stocks } from './stocksCollection.js';

if (Meteor.isServer) {
	describe('Vérification des fonctionnalités basiques CRUD dans la bibliothèque de données', () => {
// CONTACTS
		describe('contacts', () => {
			let contactId;
			beforeEach(() => {
				resetDatabase();
				Contacts.remove({});
				contactId = Contacts.insert({
					nom: 'testNom',
					prenom: 'testPrenom',
					telephone: 'testTelephone',
					mobile: 'testMobile',
				});
			});
			it("insertion de l'élément", () => {
				assert.equal(Contacts.find({nom: 'testNom'}).count(), 1);
				assert.equal(Contacts.find({prenom: 'testPrenom'}).count(), 1);
				assert.equal(Contacts.find({telephone: 'testTelephone'}).count(), 1);
				assert.equal(Contacts.find({mobile: 'testMobile'}).count(), 1);
			});
			it("modification de l'élément", () => {
				const nom = 'testUpdateNom';
				const prenom = 'testUpdatePrenom';
				const telephone = 'testUpdateTelephone';
				const mobile = 'testUpdateMobile';
				Meteor.call('contacts.update', contactId, nom, prenom, telephone, mobile);
				assert.equal(Contacts.find({nom: 'testUpdateNom'}).count(), 1);
				assert.equal(Contacts.find({prenom: 'testUpdatePrenom'}).count(), 1);
				assert.equal(Contacts.find({telephone: 'testUpdateTelephone'}).count(), 1);
				assert.equal(Contacts.find({mobile: 'testUpdateMobile'}).count(), 1);
				assert.equal(Contacts.find({nom: 'testNom'}).count(), 0);
				assert.equal(Contacts.find({prenom: 'testPrenom'}).count(), 0);
				assert.equal(Contacts.find({telephone: 'testTelephone'}).count(), 0);
				assert.equal(Contacts.find({mobile: 'testMobile'}).count(), 0);
			});
			it("supression de l'élément", () => {
				fakeContactId = "AAA";
				Meteor.call('contacts.remove', fakeContactId);
				assert.equal(Contacts.find().count(), 1);
				Meteor.call('contacts.remove', contactId);
				assert.equal(Contacts.find().count(), 0);
			});
		});
//SERVICES
		describe('services', () => {
			let serviceId;
			beforeEach(() => {
				resetDatabase();
				Services.remove({});
				serviceId = Services.insert({
					nom: 'testNom',
				});
			});
			it("insertion de l'élément", () => {
				assert.equal(Services.find({nom: 'testNom'}).count(), 1);
			});
			it("modification de l'élément", () => {
				const nom = 'testUpdateNom';
				Meteor.call('services.update', serviceId, nom);
				assert.equal(Services.find({nom: 'testUpdateNom'}).count(), 1);
				assert.equal(Services.find({nom: 'testNom'}).count(), 0);
			});
			it("supression de l'élément", () => {
				fakeServiceId = "AAA";
				Meteor.call('services.remove', fakeServiceId);
				assert.equal(Services.find().count(), 1);
				Meteor.call('services.remove', serviceId);
				assert.equal(Services.find().count(), 0);
			});
		});
//SITES
		describe('sites', () => {
			let siteId;
			beforeEach(() => {
				resetDatabase();
				Sites.remove({});
				siteId = Sites.insert({
					nom: 'testNom',
					adresse: 'testAdresse',
					codepostal: 'testCodepostal',
					ville: 'testVille',
					telephone: 'testTelephone',
				});
			});
			it("insertion de l'élément", () => {
				assert.equal(Sites.find({nom: 'testNom'}).count(), 1);
				assert.equal(Sites.find({adresse: 'testAdresse'}).count(), 1);
				assert.equal(Sites.find({codepostal: 'testCodepostal'}).count(), 1);
				assert.equal(Sites.find({ville: 'testVille'}).count(), 1);
				assert.equal(Sites.find({telephone: 'testTelephone'}).count(), 1);
			});
			it("modification de l'élément", () => {
				const nom = 'testUpdateNom';
				const adresse = 'testUpdateAdresse';
				const codepostal = 'testUpdateCodepostal';
				const ville = 'testUpdateVille';
				const telephone = 'testUpdateTelephone';
				Meteor.call('sites.update', siteId, nom, adresse, codepostal, ville, telephone);
				assert.equal(Sites.find({nom: 'testUpdateNom'}).count(), 1);
				assert.equal(Sites.find({adresse: 'testUpdateAdresse'}).count(), 1);
				assert.equal(Sites.find({codepostal: 'testUpdateCodepostal'}).count(), 1);
				assert.equal(Sites.find({ville: 'testUpdateVille'}).count(), 1);
				assert.equal(Sites.find({telephone: 'testUpdateTelephone'}).count(), 1);
				assert.equal(Sites.find({nom: 'testNom'}).count(), 0);
				assert.equal(Sites.find({adresse: 'testAdresse'}).count(), 0);
				assert.equal(Sites.find({codepostal: 'testCodepostal'}).count(), 0);
				assert.equal(Sites.find({ville: 'testVille'}).count(), 0);
				assert.equal(Sites.find({telephone: 'testTelephone'}).count(), 0);
			});
			it("supression de l'élément", () => {
				fakeSiteId = "AAA";
				Meteor.call('sites.remove', fakeSiteId);
				assert.equal(Sites.find().count(), 1);
				Meteor.call('sites.remove', siteId);
				assert.equal(Sites.find().count(), 0);
			});
		});
//MARQUES
		describe('marques', () => {
			let marqueId;
			beforeEach(() => {
				resetDatabase();
				Marques.remove({});
				marqueId = Marques.insert({
					nom: 'testNom',
				});
			});
			it("insertion de l'élément", () => {
				assert.equal(Marques.find({nom: 'testNom'}).count(), 1);
			});
			it("modification de l'élément", () => {
				const nom = 'testUpdateNom';
				Meteor.call('marques.update', marqueId, nom);
				assert.equal(Marques.find({nom: 'testUpdateNom'}).count(), 1);
				assert.equal(Marques.find({nom: 'testNom'}).count(), 0);
			});
			it("supression de l'élément", () => {
				fakeMarqueId = "AAA";
				Meteor.call('marques.remove', fakeMarqueId);
				assert.equal(Marques.find().count(), 1);
				Meteor.call('marques.remove', marqueId);
				assert.equal(Marques.find().count(), 0);
			});
		});
//IMPRESSIONS
		describe('impressions', () => {
			let impressionId;
			beforeEach(() => {
				resetDatabase();
				Impressions.remove({});
				impressionId = Impressions.insert({
					gabarit: 'Imprimante',
					marque: 'testMarque',
					modele: 'testModele',
					nombretoner: 2,
				});
			});
			it("insertion de l'élément", () => {
				assert.equal(Impressions.find({gabarit: 'Imprimante'}).count(), 1);
				assert.equal(Impressions.find({marque: 'testMarque'}).count(), 1);
				assert.equal(Impressions.find({modele: 'testModele'}).count(), 1);
				assert.equal(Impressions.find({nombretoner: 2}).count(), 1);
			});
			it("modification de l'élément", () => {
				const gabarit = 'Photocopieur';
				const marque = 'testUpdateMarque';
				const modele = 'testUpdateModele';
				const nombretoner = 3;
				Meteor.call('impressions.update', impressionId, gabarit, marque, modele, nombretoner);
				assert.equal(Impressions.find({gabarit: 'Photocopieur'}).count(), 1);
				assert.equal(Impressions.find({marque: 'testUpdateMarque'}).count(), 1);
				assert.equal(Impressions.find({modele: 'testUpdateModele'}).count(), 1);
				assert.equal(Impressions.find({nombretoner: 3}).count(), 1);
				assert.equal(Impressions.find({gabarit: 'Imprimante'}).count(), 0);
				assert.equal(Impressions.find({marque: 'testMarque'}).count(), 0);
				assert.equal(Impressions.find({modele: 'testModele'}).count(), 0);
				assert.equal(Impressions.find({nombretoner: 2}).count(), 0);
			});
			it("supression de l'élément", () => {
				fakeImpressionId = "AAA";
				Meteor.call('impressions.remove', fakeImpressionId);
				assert.equal(Impressions.find().count(), 1);
				Meteor.call('impressions.remove', impressionId);
				assert.equal(Impressions.find().count(), 0);
			});
		});
//TONERS
		describe('toners', () => {
			let tonerId;
			beforeEach(() => {
				resetDatabase();
				Toners.remove({});
				tonerId = Toners.insert({
					modele: 'testModele',
					constructeur: 'testConstrcuteur',
					referenceC: 'testReference',
					couleur: 'testCouleur',
				});
			});
			it("insertion de l'élément", () => {
				assert.equal(Toners.find({modele: 'testModele'}).count(), 1);
				assert.equal(Toners.find({constructeur: 'testConstrcuteur'}).count(), 1);
				assert.equal(Toners.find({referenceC: 'testReference'}).count(), 1);
				assert.equal(Toners.find({couleur: 'testCouleur'}).count(), 1);
			});
			it("modification de l'élément", () => {
				const modele = 'testUpdateModele';
				const constructeur = 'testUpdateConstrcuteur';
				const referenceC ='testUpdateReference';
				const couleur = 'testUpdateCouleur';
				Meteor.call('toners.update', tonerId, modele, constructeur, referenceC, couleur);
				assert.equal(Toners.find({modele: 'testUpdateModele'}).count(), 1);
				assert.equal(Toners.find({constructeur: 'testUpdateConstrcuteur'}).count(), 1);
				assert.equal(Toners.find({referenceC: 'testUpdateReference'}).count(), 1);
				assert.equal(Toners.find({couleur: 'testUpdateCouleur'}).count(), 1);
				assert.equal(Toners.find({modele: 'testModele'}).count(), 0);
				assert.equal(Toners.find({constructeur: 'testConstrcuteur'}).count(), 0);
				assert.equal(Toners.find({referenceC: 'testReference'}).count(), 0);
				assert.equal(Toners.find({couleur: 'testCouleur'}).count(), 0);
			});
			it("supression de l'élément", () => {
				fakeTonerId = "AAA";
				Meteor.call('toners.remove', fakeTonerId);
				assert.equal(Toners.find().count(), 1);
				Meteor.call('toners.remove', tonerId);
				assert.equal(Toners.find().count(), 0);
			});
		});
//FOURNISSEURS
		describe('fournisseurs', () => {
			let fournisseurId;
			beforeEach(() => {
				resetDatabase();
				Fournisseurs.remove({});
				fournisseurId = Fournisseurs.insert({
					nom: 'testNom',
					adresse: 'testAdresse',
					codepostal: 'testCodepostal',
					ville: 'testVille',
					telephone: 'testTelephone',
					website: 'testWebsite',
				});
			});
			it("insertion de l'élément", () => {
				assert.equal(Fournisseurs.find({nom: 'testNom'}).count(), 1);
				assert.equal(Fournisseurs.find({adresse: 'testAdresse'}).count(), 1);
				assert.equal(Fournisseurs.find({codepostal: 'testCodepostal'}).count(), 1);
				assert.equal(Fournisseurs.find({ville: 'testVille'}).count(), 1);
				assert.equal(Fournisseurs.find({telephone: 'testTelephone'}).count(), 1);
				assert.equal(Fournisseurs.find({website: 'testWebsite'}).count(), 1);
			});
			it("modification de l'élément", () => {
				const nom = 'testUpdateNom';
				const adresse = 'testUpdateAdresse';
				const codepostal = 'testUpdateCodepostal';
				const ville = 'testUpdateVille';
				const telephone = 'testUpdateTelephone';
				const website = 'testUpdateWebsite';
				Meteor.call('fournisseurs.update', fournisseurId, nom, adresse, codepostal, ville, telephone, website);
				assert.equal(Fournisseurs.find({nom: 'testUpdateNom'}).count(), 1);
				assert.equal(Fournisseurs.find({adresse: 'testUpdateAdresse'}).count(), 1);
				assert.equal(Fournisseurs.find({codepostal: 'testUpdateCodepostal'}).count(), 1);
				assert.equal(Fournisseurs.find({ville: 'testUpdateVille'}).count(), 1);
				assert.equal(Fournisseurs.find({telephone: 'testUpdateTelephone'}).count(), 1);
				assert.equal(Fournisseurs.find({website: 'testUpdateWebsite'}).count(), 1);
				assert.equal(Fournisseurs.find({nom: 'testNom'}).count(), 0);
				assert.equal(Fournisseurs.find({adresse: 'testAdresse'}).count(), 0);
				assert.equal(Fournisseurs.find({codepostal: 'testCodepostal'}).count(), 0);
				assert.equal(Fournisseurs.find({ville: 'testVille'}).count(), 0);
				assert.equal(Fournisseurs.find({telephone: 'testTelephone'}).count(), 0);
				assert.equal(Fournisseurs.find({website: 'testWebsite'}).count(), 0);
			});
			it("supression de l'élément", () => {
				fakeFournisseurId = "AAA";
				Meteor.call('fournisseurs.remove', fakeFournisseurId);
				assert.equal(Fournisseurs.find().count(), 1);
				Meteor.call('fournisseurs.remove', fournisseurId);
				assert.equal(Fournisseurs.find().count(), 0);
			});
		});
	});
// STOCKS
	describe('Vérification des fonctionnalités basiques CRUD dans la collection Stock', () => {
		describe('stocks', () => {
			let stockId;
			beforeEach(() => {
				resetDatabase();
				Toners.remove({});
				tonerId = Toners.insert({
					modele: 'testModele',
					constructeur: 'testConstrcuteur',
					referenceC: 'testReference',
					couleur: 'testCouleur',
				});
				Sites.remove({});
				siteId = Sites.insert({
					nom: 'testNom',
					adresse: 'testAdresse',
					codepostal: 'testCodepostal',
					ville: 'testVille',
					telephone: 'testTelephone',
				});
				Services.remove({});
				serviceId = Services.insert({
					nom: 'testService',
				});
				Contacts.remove({});
				contactId = Contacts.insert({
					nom: 'testNom',
					prenom: 'testPrenom',
					telephone: 'testTelephone',
					mobile: 'testMobile',
				});
				Impressions.remove({});
				impressionId = Impressions.insert({
					gabarit: 'Imprimante',
					marque: 'testMarque',
					modele: 'testModele',
					nombretoner: 2,
				});
				consommateurId = "testConso";
				Stocks.remove({});
				stockId = Stocks.insert({
					toner : tonerId,
					seuil : 0,
					nvAvertissement : 0,
					alerte : false,
					avertissement : false,
					quantite : 0,
					consommateur : [
						{ consommateurId: consommateurId,
						site : siteId,
						impression : [impressionId],
						contact : contactId,
						service : serviceId,
						consommation : 0,
						historique : []},
						]
						});
			});
			it("insertion de l'élément", () => {
				assert.equal(Stocks.find().count(), 1);
				assert.equal(Stocks.find({'consommateur.consommateurId': "testConso"}).count(), 1);
				assert.equal(Stocks.find({'consommateur.consommateurId': "testConsoBis"}).count(), 0);
			});
			it("ajout d'un site", () => {
  				Meteor.call('stocks.update', stockId, siteId, contactId, serviceId);
  				assert.equal(Stocks.findOne(stockId).consommateur.length, 2);
  			});
			it("supression d'un site", () => {
				Meteor.call('stocks.remove-site', stockId, consommateurId);
				assert.equal(Stocks.findOne(stockId).consommateur.length, 0);
			});
			it("modification du contact", () => {
				assert.equal(Stocks.find({'consommateur.contact': "AAA"}).count(), 0);
				assert.equal(Stocks.find({'consommateur.contact': contactId}).count(), 1);
				const updateContact = 'AAA';
				Meteor.call('stocks.update-contact', stockId, siteId, serviceId, updateContact);
				assert.equal(Stocks.find({'consommateur.contact': "AAA"}).count(), 1);
				assert.equal(Stocks.find({'consommateur.contact': contactId}).count(), 0);
			});
			it("ajout d'un périphérique d'impression", () => {
				assert.equal(Stocks.find({'consommateur.impression': {$size:1}}).count(), 1);
				assert.equal(Stocks.find({'consommateur.impression': {$size:2}}).count(), 0);
				const updateImpression = "AAA";
				Meteor.call('stocks.add-impression', stockId, siteId, serviceId, updateImpression);
				assert.equal(Stocks.find({'consommateur.impression': {$size:1}}).count(), 0);
				assert.equal(Stocks.find({'consommateur.impression': {$size:2}}).count(), 1);
			});
			it("suppression d'un périphérique d'impression", () => {
				assert.equal(Stocks.find({'consommateur.impression': {$size:1}}).count(), 1);
				assert.equal(Stocks.find({'consommateur.impression': {$size:0}}).count(), 0);
				Meteor.call('stocks.remove-impression', stockId, siteId, serviceId, impressionId);
				assert.equal(Stocks.find({'consommateur.impression': {$size:1}}).count(), 0);
				assert.equal(Stocks.find({'consommateur.impression': {$size:0}}).count(), 1);
			});
			it("supression de l'élément", () => {
				fakeStockId = "AAA";
				Meteor.call('stocks.remove', fakeStockId);
				assert.equal(Stocks.find().count(), 1);
				Meteor.call('stocks.remove', stockId);
				assert.equal(Stocks.find().count(), 0);
			});
		});
	});
}
