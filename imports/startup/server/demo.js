import { Impressions } from '../../api/impressionsCollection.js';
import { Marques } from '../../api/marquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

import { Contacts } from '../../api/contactsCollection.js';
import { Sites } from '../../api/sitesCollection.js';
import { Services } from '../../api/servicesCollection.js';

import { Stocks } from '../../api/stocksCollection.js';
import { Historiques } from '../../api/historiquesCollection.js';

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
if (Contacts.find().count() < 10) {
  for (var i = 0; i < 10; i++) {
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
if (Sites.find().count() < 10) {
  for (var i = 0; i < 10; i++) {
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
if (Impressions.find().count() < 10) {
  for (var i = 0; i < 10; i++) {
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
  "ConstructeurA",
  "ConstructeurB",
  "ConstructeurC",
  "ConstructeurD",
  "ConstructeurE",
  "ConstructeurF"
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
if (Toners.find().count() < 10) {
  for (var i = 0; i < 10; i++) {
    Toners.insert({
      libelle: Random.choice(toner_libelle),
      constructeur: Random.choice(toner_constructeur),
      referenceC: Random.choice(toner_referenceC),
      couleur: Random.choice(toner_couleur)
    });
  }
}
});

//MARQUE
Meteor.startup(function () {
if (Marques.find().count() < 5) {
    Marques.insert({
      nom: "Marque A"
    });
    Marques.insert({
      nom: "Marque B"
    });
    Marques.insert({
      nom: "Marque C"
    });
    Marques.insert({
      nom: "Marque D"
    });
    Marques.insert({
      nom: "Marque E"
    });
}
});

//SERVICE
Meteor.startup(function () {
if (Services.find().count() < 5) {
    Services.insert({
      nom: "Service A"
    });
    Services.insert({
      nom: "Service B"
    });
    Services.insert({
      nom: "Service C"
    });
    Services.insert({
      nom: "Service D"
    });
    Services.insert({
      nom: "Service E"
    });
}
});


//STOCK
Meteor.startup(function () {
if (Stocks.find().count() < 3) {
/*    Stocks.insert({
      libelle: "Objet A",
      seuil: 1,
      nvAvertissement: 4,
      quantite: 8,
      alerte: false,
      avertissement: false,
      service: [
        { nom: 'Service AAA',
        consommation: 0, historique: []},
        { nom: 'Service ZZZ',
        consommation: 0, historique: []}
        ]
    });
    Stocks.insert({
      libelle: "Objet B",
      seuil: 2,
      nvAvertissement: 5,
      quantite: 8,
      alerte: false,
      avertissement: false,
      service: [
        { nom: 'Service BBB',
        consommation: 0, historique: []},
        { nom: 'Service YYY',
        consommation: 0, historique: []}
        ]
    });
    Stocks.insert({
      libelle: "Objet C",
      seuil: 3,
      nvAvertissement: 6,
      quantite: 8,
      alerte: false,
      avertissement: false,
      service: [
        { nom: 'Service CCC',
        consommation: 0, historique: []},
        { nom: 'Service XXX',
        consommation: 0, historique: []}
        ]
    });
*/    Stocks.insert({
      toner : "WbQPf3FCwiRMHkGcS",
      index : ["LibelleD", "ConstructeurA", "ZSX 456", "Rouge"],
      seuil : 0,
      nvAvertissement : 1,
      alerte : false,
      avertissement : false,
      quantite : 5,
      consommateur : [
        { site : "MeYSkawCkreFnsYNP",
          impression : ["BjFvmkE587vCM7hRo"],
          contact : "5ZbKGh5DqzDc2exYF",
          service : "ToQ4XS83vmPdEMRna",
          consommation : 0,
          historique : []},
        { site : "DN5Chv5jyrzBLFmwB",
          impression : ["yAoMDTamgTBjWvNYy"],
          contact : "wMt6PmJybsAHmBrqk",
          service : "CoXRbTT9jzP6owfa8",
          consommation : 0,
          historique : []}
          ]
    });
    Stocks.insert({
      toner : "SC3qczJ7hhTYbaBN3",
      index : ["LibelleE", "ConstructeurD", "AQW 123", "Magenta"],
      seuil : 0,
      nvAvertissement : 1,
      alerte : false,
      avertissement : false,
      quantite : 5,
      consommateur : [
        { site : "MeYSkawCkreFnsYNP",
          impression : ["BjFvmkE587vCM7hRo"],
          contact : "5ZbKGh5DqzDc2exYF",
          service : "ToQ4XS83vmPdEMRna",
          consommation : 0,
          historique : []},
        { site : "DN5Chv5jyrzBLFmwB",
          impression : ["yAoMDTamgTBjWvNYy"],
          contact : "wMt6PmJybsAHmBrqk",
          service : "CoXRbTT9jzP6owfa8",
          consommation : 0,
          historique : []}
          ]
    });
    Stocks.insert({
      toner : "KHyYQQuFfGvwbfZTa",
      index : ["LibelleC", "ConstructeurF", "ZSX 456", "Rouge"],
      seuil : 0,
      nvAvertissement : 1,
      alerte : false,
      avertissement : false,
      quantite : 5,
      consommateur : [
        { site : "N9j2tu22H9aubxdYu",
          impression : ["BjFvmkE587vCM7hRo"],
          contact : "5ZbKGh5DqzDc2exYF",
          service : "ToQ4XS83vmPdEMRna",
          consommation : 0,
          historique : []},
        { site : "DN5Chv5jyrzBLFmwB",
          impression : ["yAoMDTamgTBjWvNYy"],
          contact : "wMt6PmJybsAHmBrqk",
          service : "CoXRbTT9jzP6owfa8",
          consommation : 0,
          historique : []}
          ]
    });
}
});