import { Impressions } from '../../api/impressionsCollection.js';
import { Marques } from '../../api/marquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';
import { Contacts } from '../../api/contactsCollection.js';
import { Sites } from '../../api/sitesCollection.js';
import { Items } from '../../api/testCollection.js';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
//
//PUBLICATIONS
//
Meteor.startup(() => {
	Meteor.publish('impressions', function (){
		return Impressions.find({});
	});
/*
	Meteor.publish('detailImpression', function (id){
	check(id, String);
		return Impressions.find({_id: id});
	});*/

	Meteor.publish('marques', function (){
		return Marques.find({});
	});

/*	Meteor.publish('detailMarque', function (id){
	check(id, String);
		return Marques.find({_id: id});
	});*/

	Meteor.publish('toners', function (){
		return Toners.find({});
	});
/*
	Meteor.publish('detailToner', function (id){
	check(id, String);
		return Toners.find({_id: id});
	});
*/
	Meteor.publish('contacts', function (){
		return Contacts.find({});
	});
/*
	Meteor.publish('detailContact', function (id){
	check(id, String);
		return Contacts.find({_id: id});
	});*/

	Meteor.publish('sites', function (){
		return Sites.find({});
	});

/*	Meteor.publish('detailSite', function (id){
	check(id, String);
		return Sites.find({_id: id});
	});*/
  Meteor.publish('items', function (){
    return Items.find({});
  });
});

//
//ALIMENTATION DE DONNEES AU DEMARRAGE
//

//CONTACTS
const contact_prenom = [
  "Pierre",
  "Paul",
  "Jacques",
  "Guillaume",
  "Bertrand",
  "Thomas",
  "Marie",
  "Sophie",
  "Nathalie",
  "Lisa",
  "Karen",
  "Elise",
  "Thierry",
  "François",
  "Hélène"
],
contact_nom = [
  "Noir",
  "Blanc",
  "Rouge",
  "Bleu",
  "Vert",
  "Violet",
  "Jaune",
  "Rose",
  "Gris",
  "Cyan",
  "Marron",
  "Magenta",
  "Orange",
],
contact_telephone = ["01 01 01 01 01", "02 02 02 02 02", "03 03 03 03 03", "04 04 04 04 04", "05 05 05 05 05", "06 06 06 06 06", "07 07 07 07 07", "08 08 08 08 08", "09 09 09 09 09"];;

Meteor.startup(function () {
if (Contacts.find().count() < 20) {
  for (var i = 0; i < 20; i++) {
    Contacts.insert({
      prenom: Random.choice(contact_prenom),
      nom: Random.choice(contact_nom),
      telephone: Random.choice(contact_telephone)
    });
  }
}
});

//SITES
const site_nom = [
  "Site A",
  "Site B",
  "Cybersite",
  "Etablissement A",
  "Etablissement B"
],
site_adresse = [
  "10 rue du haut",
  "15 rue du bas",
  "20 rue de gauche",
  "25 rue de droite"
],
site_codepostal = [
  "80 000",
  "80 130",
  "80 390",
  "80 100",
  "80 200"
],
site_ville = [
  "Friville-Escarbotin",
  "Fressenneville",
  "Feucquières-en-vimeu",
  "Tully",
  "Béthencourt-sur-mer"
],
site_telephone = ["01 01 01 01 01", "02 02 02 02 02", "03 03 03 03 03", "04 04 04 04 04", "05 05 05 05 05", "06 06 06 06 06", "07 07 07 07 07", "08 08 08 08 08", "09 09 09 09 09"];;

Meteor.startup(function () {
if (Sites.find().count() < 20) {
  for (var i = 0; i < 20; i++) {
    Sites.insert({
      nom: Random.choice(site_nom),
      adresse: Random.choice(site_adresse),
      codepostal: Random.choice(site_codepostal),
      ville: Random.choice(site_ville),
      telephone: Random.choice(site_telephone)
    });
  }
}
});

//IMPRESSIONS
const impression_gabarit = [
  "Imprimante",
  "Photocopieur"
],
impression_marque = [
  "CANON",
  "EPSON",
  "BROTHER",
  "HP",
  "KONICA",
  "SAMSUNG"
],
impression_modele = [
  "AQW 123",
  "ZSX 456",
  "EDC 789",
  "RFV 234",
  "TGB 567",
  "YHN 891",
  "PLO 345",
  "JUY 678",
  "GTR 912",
  "DEZ 000"
],
impression_nombretoner = [
  "1",
  "2",
  "3",
  "4",
  "5"
];;

Meteor.startup(function () {
if (Impressions.find().count() < 20) {
  for (var i = 0; i < 20; i++) {
    Impressions.insert({
      gabarit: Random.choice(impression_gabarit),
      marque: Random.choice(impression_marque),
      modele: Random.choice(impression_modele),
      nombretoner: Random.choice(impression_nombretoner)
    });
  }
}
});

//TONERS
const toner_libelle = [
  "LibelleA",
  "LibelleB",
  "LibelleC",
  "LibelleD",
  "LibelleE",
  "LibelleF"
],
toner_constructeur = [
  "ConstrcuteurA",
  "ConstrcuteurB",
  "ConstrcuteurC",
  "ConstrcuteurD",
  "ConstrcuteurE",
  "ConstrcuteurF"
],
toner_referenceC = [
  "AQW 123",
  "ZSX 456",
  "EDC 789",
  "RFV 234",
  "TGB 567",
  "YHN 891",
  "PLO 345",
  "JUY 678",
  "GTR 912",
  "DEZ 000"
],
toner_couleur = [
  "Noir",
  "Rouge",
  "Bleu",
  "Jaune",
  "Cyan",
  "Magenta"
];;

Meteor.startup(function () {
if (Toners.find().count() < 20) {
  for (var i = 0; i < 20; i++) {
    Toners.insert({
      libelle: Random.choice(toner_libelle),
      constructeur: Random.choice(toner_constructeur),
      referenceC: Random.choice(toner_referenceC),
      couleur: Random.choice(toner_couleur)
    });
  }
}
});