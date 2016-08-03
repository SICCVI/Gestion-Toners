//IMPORT
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

//IMPORT DES COLLECTIONS
import { ContactsCollection } from './collection_Contacts.js';
import { ServicesCollection } from './collection_Services.js';
import { SitesCollection } from './collection_Sites.js';
import { MarquesCollection } from './collection_Marques.js';
import { FournisseursCollection } from './collection_Fournisseurs.js';
import { TonersCollection } from './collection_Toners.js';
import { ImpressionsCollection } from './collection_Impressions.js';
import { StocksCollection } from './collection_Stocks.js';

//TEST
if (Meteor.isServer) {
	describe('Vérification des fonctionnalités basiques CRUD dans la bibliothèque de données', () => {
	// COLLECTION CONTACTS
	describe('contacts', () => {
		let contactId;
		beforeEach(() => {
			resetDatabase();
			ContactsCollection.remove({});
			contactId = ContactsCollection.insert({
				contact_nom: 'testNom',
				contact_prenom: 'testPrenom',
				contact_telephone: 'testTelephone',
				contact_mobile: 'testMobile',
			});
		});
		it("insertion de l'élément", () => {
			assert.equal(ContactsCollection.find({contact_nom: 'testNom'}).count(), 1);
			assert.equal(ContactsCollection.find({contact_prenom: 'testPrenom'}).count(), 1);
			assert.equal(ContactsCollection.find({contact_telephone: 'testTelephone'}).count(), 1);
			assert.equal(ContactsCollection.find({contact_mobile: 'testMobile'}).count(), 1);
		});
		it("modification de l'élément", () => {
			const nom = 'testUpdateNom';
			const prenom = 'testUpdatePrenom';
			const telephone = 'testUpdateTelephone';
			const mobile = 'testUpdateMobile';
			Meteor.call('contacts.update', contactId, nom, prenom, telephone, mobile);
			assert.equal(ContactsCollection.find({contact_nom: 'testUpdateNom'}).count(), 1);
			assert.equal(ContactsCollection.find({contact_prenom: 'testUpdatePrenom'}).count(), 1);
			assert.equal(ContactsCollection.find({contact_telephone: 'testUpdateTelephone'}).count(), 1);
			assert.equal(ContactsCollection.find({contact_mobile: 'testUpdateMobile'}).count(), 1);
			assert.equal(ContactsCollection.find({contact_nom: 'testNom'}).count(), 0);
			assert.equal(ContactsCollection.find({contact_prenom: 'testPrenom'}).count(), 0);
			assert.equal(ContactsCollection.find({contact_telephone: 'testTelephone'}).count(), 0);
			assert.equal(ContactsCollection.find({contact_mobile: 'testMobile'}).count(), 0);
		});
		it("supression de l'élément", () => {
			fakeContactId = "AAA";
			Meteor.call('contacts.remove', fakeContactId);
			assert.equal(ContactsCollection.find().count(), 1);
			Meteor.call('contacts.remove', contactId);
			assert.equal(ContactsCollection.find().count(), 0);
		});
	});
	//COLLECTION SERVICES
	describe('services', () => {
		let serviceId;
		beforeEach(() => {
			resetDatabase();
			ServicesCollection.remove({});
			serviceId = ServicesCollection.insert({
				service_nom: 'testNom',
			});
		});
		it("insertion de l'élément", () => {
			assert.equal(ServicesCollection.find({service_nom: 'testNom'}).count(), 1);
		});
		it("modification de l'élément", () => {
			const nom = 'testUpdateNom';
			Meteor.call('services.update', serviceId, nom);
			assert.equal(ServicesCollection.find({service_nom: 'testUpdateNom'}).count(), 1);
			assert.equal(ServicesCollection.find({service_nom: 'testNom'}).count(), 0);
		});
		it("supression de l'élément", () => {
			fakeServiceId = "AAA";
			Meteor.call('services.remove', fakeServiceId);
			assert.equal(ServicesCollection.find().count(), 1);
			Meteor.call('services.remove', serviceId);
			assert.equal(ServicesCollection.find().count(), 0);
		});
	});
	//COLLECTION SITES
	describe('sites', () => {
		let siteId;
		beforeEach(() => {
			resetDatabase();
			SitesCollection.remove({});
			siteId = SitesCollection.insert({
				site_nom: 'testNom',
				site_adresse: 'testAdresse',
				site_codepostal: 'testCodepostal',
				site_ville: 'testVille',
				site_telephone: 'testTelephone',
			});
		});
		it("insertion de l'élément", () => {
			assert.equal(SitesCollection.find({site_nom: 'testNom'}).count(), 1);
			assert.equal(SitesCollection.find({site_adresse: 'testAdresse'}).count(), 1);
			assert.equal(SitesCollection.find({site_codepostal: 'testCodepostal'}).count(), 1);
			assert.equal(SitesCollection.find({site_ville: 'testVille'}).count(), 1);
			assert.equal(SitesCollection.find({site_telephone: 'testTelephone'}).count(), 1);
		});
		it("modification de l'élément", () => {
			const nom = 'testUpdateNom';
			const adresse = 'testUpdateAdresse';
			const codepostal = 'testUpdateCodepostal';
			const ville = 'testUpdateVille';
			const telephone = 'testUpdateTelephone';
			Meteor.call('sites.update', siteId, nom, adresse, codepostal, ville, telephone);
			assert.equal(SitesCollection.find({site_nom: 'testUpdateNom'}).count(), 1);
			assert.equal(SitesCollection.find({site_adresse: 'testUpdateAdresse'}).count(), 1);
			assert.equal(SitesCollection.find({site_codepostal: 'testUpdateCodepostal'}).count(), 1);
			assert.equal(SitesCollection.find({site_ville: 'testUpdateVille'}).count(), 1);
			assert.equal(SitesCollection.find({site_telephone: 'testUpdateTelephone'}).count(), 1);
			assert.equal(SitesCollection.find({site_nom: 'testNom'}).count(), 0);
			assert.equal(SitesCollection.find({site_adresse: 'testAdresse'}).count(), 0);
			assert.equal(SitesCollection.find({site_codepostal: 'testCodepostal'}).count(), 0);
			assert.equal(SitesCollection.find({site_ville: 'testVille'}).count(), 0);
			assert.equal(SitesCollection.find({site_telephone: 'testTelephone'}).count(), 0);
		});
		it("supression de l'élément", () => {
			fakeSiteId = "AAA";
			Meteor.call('sites.remove', fakeSiteId);
			assert.equal(SitesCollection.find().count(), 1);
			Meteor.call('sites.remove', siteId);
			assert.equal(SitesCollection.find().count(), 0);
		});
	});
	//COLLECTION MARQUES
	describe('marques', () => {
		let marqueId;
		beforeEach(() => {
			resetDatabase();
			MarquesCollection.remove({});
			marqueId = MarquesCollection.insert({
				marque_nom: 'testNom',
			});
		});
		it("insertion de l'élément", () => {
			assert.equal(MarquesCollection.find({marque_nom: 'testNom'}).count(), 1);
		});
		it("modification de l'élément", () => {
			const nom = 'testUpdateNom';
			Meteor.call('marques.update', marqueId, nom);
			assert.equal(MarquesCollection.find({marque_nom: 'testUpdateNom'}).count(), 1);
			assert.equal(MarquesCollection.find({marque_nom: 'testNom'}).count(), 0);
		});
		it("supression de l'élément", () => {
			fakeMarqueId = "AAA";
			Meteor.call('marques.remove', fakeMarqueId);
			assert.equal(MarquesCollection.find().count(), 1);
			Meteor.call('marques.remove', marqueId);
			assert.equal(MarquesCollection.find().count(), 0);
		});
	});
	//COLLECTION IMPRESSIONS
	describe('impressions', () => {
		let impressionId;
		beforeEach(() => {
			resetDatabase();
			ImpressionsCollection.remove({});
			impressionId = ImpressionsCollection.insert({
				impression_gabarit: 'Imprimante',
				impression_marque: 'testMarque',
				impression_modele: 'testModele',
				impression_nombretoner: 2,
			});
		});
		it("insertion de l'élément", () => {
			assert.equal(ImpressionsCollection.find({impression_gabarit: 'Imprimante'}).count(), 1);
			assert.equal(ImpressionsCollection.find({impression_marque: 'testMarque'}).count(), 1);
			assert.equal(ImpressionsCollection.find({impression_modele: 'testModele'}).count(), 1);
			assert.equal(ImpressionsCollection.find({impression_nombretoner: 2}).count(), 1);
		});
		it("modification de l'élément", () => {
			const gabarit = 'Photocopieur';
			const marque = 'testUpdateMarque';
			const modele = 'testUpdateModele';
			const nombretoner = 3;
			Meteor.call('impressions.update', impressionId, gabarit, marque, modele, nombretoner);
			assert.equal(ImpressionsCollection.find({impression_gabarit: 'Photocopieur'}).count(), 1);
			assert.equal(ImpressionsCollection.find({impression_marque: 'testUpdateMarque'}).count(), 1);
			assert.equal(ImpressionsCollection.find({impression_modele: 'testUpdateModele'}).count(), 1);
			assert.equal(ImpressionsCollection.find({impression_nombretoner: 3}).count(), 1);
			assert.equal(ImpressionsCollection.find({impression_gabarit: 'Imprimante'}).count(), 0);
			assert.equal(ImpressionsCollection.find({impression_marque: 'testMarque'}).count(), 0);
			assert.equal(ImpressionsCollection.find({impression_modele: 'testModele'}).count(), 0);
			assert.equal(ImpressionsCollection.find({impression_nombretoner: 2}).count(), 0);
		});
		it("supression de l'élément", () => {
			fakeImpressionId = "AAA";
			Meteor.call('impressions.remove', fakeImpressionId);
			assert.equal(ImpressionsCollection.find().count(), 1);
			Meteor.call('impressions.remove', impressionId);
			assert.equal(ImpressionsCollection.find().count(), 0);
		});
	});
	//COLLECTION TONERS
	describe('toners', () => {
		let tonerId;
		beforeEach(() => {
			resetDatabase();
			TonersCollection.remove({});
			tonerId = TonersCollection.insert({
				toner_modele: 'testModele',
				toner_constructeurNom: 'testConstructeur',
				toner_constructeurRef: 'testReference',
				toner_couleur: 'testCouleur',
			});
		});
		it("insertion de l'élément", () => {
			assert.equal(TonersCollection.find({toner_modele: 'testModele'}).count(), 1);
			assert.equal(TonersCollection.find({toner_constructeurNom: 'testConstructeur'}).count(), 1);
			assert.equal(TonersCollection.find({toner_constructeurRef: 'testReference'}).count(), 1);
			assert.equal(TonersCollection.find({toner_couleur: 'testCouleur'}).count(), 1);
		});
		it("modification de l'élément", () => {
			const modele = 'testUpdateModele';
			const constructeurNom = 'testUpdateConstrcuteur';
			const constructeurRef ='testUpdateReference';
			const couleur = 'testUpdateCouleur';
			Meteor.call('toners.update', tonerId, modele, constructeurNom, constructeurRef, couleur);
			assert.equal(TonersCollection.find({toner_modele: 'testUpdateModele'}).count(), 1);
			assert.equal(TonersCollection.find({toner_constructeurNom: 'testUpdateConstructeur'}).count(), 1);
			assert.equal(TonersCollection.find({toner_constructeurRef: 'testUpdateReference'}).count(), 1);
			assert.equal(TonersCollection.find({toner_couleur: 'testUpdateCouleur'}).count(), 1);
			assert.equal(TonersCollection.find({toner_modele: 'testModele'}).count(), 0);
			assert.equal(TonersCollection.find({toner_constructeurNom: 'testConstrcuteur'}).count(), 0);
			assert.equal(TonersCollection.find({toner_constructeurRef: 'testReference'}).count(), 0);
			assert.equal(TonersCollection.find({toner_couleur: 'testCouleur'}).count(), 0);
		});
		it("supression de l'élément", () => {
			fakeTonerId = "AAA";
			Meteor.call('toners.remove', fakeTonerId);
			assert.equal(TonersCollection.find().count(), 1);
			Meteor.call('toners.remove', tonerId);
			assert.equal(TonersCollection.find().count(), 0);
		});
	});
	//COLLECTION FOURNISSEURS
	describe('fournisseurs', () => {
		let fournisseurId;
		beforeEach(() => {
			resetDatabase();
			FournisseursCollection.remove({});
			fournisseurId = FournisseursCollection.insert({
				fournisseur_nom: 'testNom',
				fournisseur_adresse: 'testAdresse',
				fournisseur_codepostal: 'testCodepostal',
				fournisseur_ville: 'testVille',
				fournisseur_telephone: 'testTelephone',
				fournisseur_website: 'testWebsite',
			});
		});
		it("insertion de l'élément", () => {
			assert.equal(FournisseursCollection.find({fournisseur_nom: 'testNom'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_adresse: 'testAdresse'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_codepostal: 'testCodepostal'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_ville: 'testVille'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_telephone: 'testTelephone'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_website: 'testWebsite'}).count(), 1);
		});
		it("modification de l'élément", () => {
			const nom = 'testUpdateNom';
			const adresse = 'testUpdateAdresse';
			const codepostal = 'testUpdateCodepostal';
			const ville = 'testUpdateVille';
			const telephone = 'testUpdateTelephone';
			const website = 'testUpdateWebsite';
			Meteor.call('fournisseurs.update', fournisseurId, nom, adresse, codepostal, ville, telephone, website);
			assert.equal(FournisseursCollection.find({fournisseur_nom: 'testUpdateNom'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_adresse: 'testUpdateAdresse'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_codepostal: 'testUpdateCodepostal'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_ville: 'testUpdateVille'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_telephone: 'testUpdateTelephone'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_website: 'testUpdateWebsite'}).count(), 1);
			assert.equal(FournisseursCollection.find({fournisseur_nom: 'testNom'}).count(), 0);
			assert.equal(FournisseursCollection.find({fournisseur_adresse: 'testAdresse'}).count(), 0);
			assert.equal(FournisseursCollection.find({fournisseur_codepostal: 'testCodepostal'}).count(), 0);
			assert.equal(FournisseursCollection.find({fournisseur_ville: 'testVille'}).count(), 0);
			assert.equal(FournisseursCollection.find({fournisseur_telephone: 'testTelephone'}).count(), 0);
			assert.equal(FournisseursCollection.find({fournisseur_website: 'testWebsite'}).count(), 0);
		});
		it("supression de l'élément", () => {
			fakeFournisseurId = "AAA";
			Meteor.call('fournisseurs.remove', fakeFournisseurId);
			assert.equal(FournisseursCollection.find().count(), 1);
			Meteor.call('fournisseurs.remove', fournisseurId);
			assert.equal(FournisseursCollection.find().count(), 0);
		});
	});
});
	//COLLECTION STOCKS
	describe('Vérification des fonctionnalités basiques CRUD dans la collection Stock', () => {
		describe('stocks', () => {
			let stockId;
			beforeEach(() => {
				resetDatabase();
				TonersCollection.remove({});
				tonerId = TonersCollection.insert({
					toner_modele: 'testModele',
					toner_constructeurNom: 'testConstructeur',
					toner_constructeurRef: 'testReference',
					toner_couleur: 'testCouleur',
				});
				SitesCollection.remove({});
				siteId = SitesCollection.insert({
					site_nom: 'testNom',
					site_adresse: 'testAdresse',
					site_codepostal: 'testCodepostal',
					site_ville: 'testVille',
					site_telephone: 'testTelephone',
				});
				ServicesCollection.remove({});
				serviceId = ServicesCollection.insert({
					service_nom: 'testService',
				});
				ContactsCollection.remove({});
				contactId = ContactsCollection.insert({
					contact_nom: 'testNom',
					contact_prenom: 'testPrenom',
					contact_telephone: 'testTelephone',
					contact_mobile: 'testMobile',
				});
				ImpressionsCollection.remove({});
				impressionId = ImpressionsCollection.insert({
					impression_gabarit: 'Imprimante',
					impression_marque: 'testMarque',
					impression_modele: 'testModele',
					impression_nombretoner: 2,
				});
				consommateur_id = "testConso";
				StocksCollection.remove({});
				stockId = StocksCollection.insert({
					stock_toner : tonerId,
					stock_seuil : 0,
					stock_nvAvertissement : 0,
					stock_alerte : false,
					stock_avertissement : false,
					stock_quantite : 0,
					stock_consommateur : [
					{ consommateur_id: consommateur_id,
						consommateur_site : siteId,
						consommateur_impression : [impressionId],
						consommateur_contact : contactId,
						consommateur_service : serviceId,
						consommateur_consommation : 0,
						consommateur_historique : []},
						]
					});
			});
			it("insertion de l'élément", () => {
				assert.equal(StocksCollection.find().count(), 1);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_id': "testConso"}).count(), 1);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_id': "testConsoBis"}).count(), 0);
			});
			it("ajout d'un site", () => {
				Meteor.call('stocks.update', stockId, siteId, contactId, serviceId);
				assert.equal(StocksCollection.findOne(stockId).consommateur.length, 2);
			});
			it("supression d'un site", () => {
				Meteor.call('stocks.remove-site', stockId, consommateur_id);
				assert.equal(StocksCollection.findOne(stockId).consommateur.length, 0);
			});
			it("modification du contact", () => {
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_contact': "AAA"}).count(), 0);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_contact': contactId}).count(), 1);
				const updateContact = 'AAA';
				Meteor.call('stocks.update-contact', stockId, siteId, serviceId, updateContact);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_contact': "AAA"}).count(), 1);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_contact': contactId}).count(), 0);
			});
			it("ajout d'un périphérique d'impression", () => {
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:1}}).count(), 1);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:2}}).count(), 0);
				const updateImpression = "AAA";
				Meteor.call('stocks.add-impression', stockId, siteId, serviceId, updateImpression);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:1}}).count(), 0);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:2}}).count(), 1);
			});
			it("suppression d'un périphérique d'impression", () => {
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:1}}).count(), 1);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:0}}).count(), 0);
				Meteor.call('stocks.remove-impression', stockId, siteId, serviceId, impressionId);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:1}}).count(), 0);
				assert.equal(StocksCollection.find({'stock_consommateur.consommateur_impression': {$size:0}}).count(), 1);
			});
			it("supression de l'élément", () => {
				fakeStockId = "AAA";
				Meteor.call('stocks.remove', fakeStockId);
				assert.equal(StocksCollection.find().count(), 1);
				Meteor.call('stocks.remove', stockId);
				assert.equal(StocksCollection.find().count(), 0);
			});
		});
	});
}
