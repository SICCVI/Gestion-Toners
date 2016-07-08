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

//SITES
Meteor.startup(function () {
if (Sites.find().count() < 3) {
    Sites.insert({
      _id: "SITE01",
      nom: "SITE AAA",
      adresse: "10 rue du haut",
      codepostal: "80111",
      ville: "VILFOU1",
      telephone: "01 01 01 01 01"
    });
    Sites.insert({
      _id: "SITE02",
      nom: "SITE BBB",
      adresse: "10 rue du centre",
      codepostal: "80222",
      ville: "VILFOU2",
      telephone: "02 02 02 02 02"
    });
    Sites.insert({
      _id: "SITE03",
      nom: "SITE CCC",
      adresse: "10 rue du bas",
      codepostal: "80333",
      ville: "VILFOU3",
      telephone: "03 03 03 03 03"
    });
}
});
//IMPRESSIONS
Meteor.startup(function () {
if (Impressions.find().count() < 3) {
    Impressions.insert({
      _id: "IMPR01",
      gabarit: "Imprimante",
      marque: "MARQUE A",
      modele: "EDC 789",
      nombretoner: "4"
    });
    Impressions.insert({
      _id: "IMPR02",
      gabarit: "Imprimante",
      marque: "MARQUE B",
      modele: "ZSX 456",
      nombretoner: "2"
    });
    Impressions.insert({
      _id: "IMPR03",
      gabarit: "Photocopieur",
      marque: "MARQUE C",
      modele: "AQW 123",
      nombretoner: "1"
    });
}
});
//CONTACTS
Meteor.startup(function () {
if (Contacts.find().count() < 3) {
    Contacts.insert({
      _id: "CONT01",
      nom: "PAUL",
      prenom: "Henri",
      telephone: "01 01 01 01 01"
    });
    Contacts.insert({
      _id: "CONT02",
      nom: "PIERRE",
      prenom: "Marie",
      telephone: "02 02 02 02 02"
    });
    Contacts.insert({
      _id: "CONT03",
      nom: "JACQUES",
      prenom: "Nathalie",
      telephone: "03 03 03 03 03"
    });
}
});
//MARQUES
Meteor.startup(function () {
if (Marques.find().count() < 3) {
    Marques.insert({
      _id: "MARQ01",
      nom: "MARQUE A"
    });
    Marques.insert({
      _id: "MARQ02",
      nom: "MARQUE B"
    });
    Marques.insert({
      _id: "MARQ03",
      nom: "MARQUE C"
    });
}
});

//SERVICES
Meteor.startup(function () {
if (Services.find().count() < 3) {
    Services.insert({
      _id: "SERV01",
      nom: "Service A"
    });
    Services.insert({
      _id: "SERV02",
      nom: "Service B"
    });
    Services.insert({
      _id: "SERV03",
      nom: "Service C"
    });
}
});

//FOURNISSEURS
Meteor.startup(function () {
if (Fournisseurs.find().count() < 3) {
    Fournisseurs.insert({
      _id: "FOUR01",
      nom: "FOURNISSEUR AAA",
      adresse: "10 rue du haut",
      codepostal: "80111",
      ville: "VILFOU1",
      telephone: "01 01 01 01 01",
      website: "www.site.com"
    });
    Fournisseurs.insert({
      _id: "FOUR02",
      nom: "FOURNISSEUR BBB",
      adresse: "10 rue du centre",
      codepostal: "80222",
      ville: "VILFOU2",
      telephone: "02 02 02 02 02",
      website: "www.site.com"
    });
    Fournisseurs.insert({
      _id: "FOUR03",
      nom: "FOURNISSEUR CCC",
      adresse: "10 rue du bas",
      codepostal: "80333",
      ville: "VILFOU3",
      telephone: "03 03 03 03 03",
      website: "www.site.com"
    });
}
});

//TONERS
Meteor.startup(function () {
if (Toners.find().count() < 3) {
    Toners.insert({
      _id: "TONE01",
      modele : "MODELE A",
      constructeur : "MARQUE A",
      referenceC : "REF 19865",
      couleur : "Noir",
      fournisseur : [
        { fournisseurId : "FOUR02",
          referenceF : "REF 14598"},
        { fournisseurId : "FOUR03",
          referenceF : "REF 32574"}
        ]
    });
     Toners.insert({
      _id: "TONE02",
      modele : "MODELE B",
      constructeur : "MARQUE B",
      referenceC : "REF 79310",
      couleur : "Jaune",
      fournisseur : [
        { fournisseurId : "FOUR03",
          referenceF : "REF 36984"},
        { fournisseurId : "FOUR01",
          referenceF : "REF 10846"}
        ]
    });
     Toners.insert({
      _id: "TONE03",
      modele : "MODELE C",
      constructeur : "MARQUE C",
      referenceC : "REF 86441",
      couleur : "Cyan",
      fournisseur : [
        { fournisseurId : "FOUR01",
          referenceF : "REF 36984"},
        { fournisseurId : "FOUR02",
          referenceF : "REF 10846"}
        ]
    });
  }
});

//STOCKS
Meteor.startup(function () {
if (Stocks.find().count() < 3) {
    Stocks.insert({
      toner : "TONE01",
      index : ["AAA"],
      seuil : 1,
      nvAvertissement : 3,
      alerte : false,
      avertissement : false,
      quantite : 5,
      consommateur : [
        { consommateurId : "CONSOID01",
          site : "SITE01",
          impression : ["IMPR01", "IMPR02", "IMPR03"],
          contact : "CONT01",
          service : "SERV01",
          consommation : 0,
          historique : []},
        { consommateurId : "CONSOID02",
          site : "SITE02",
          impression : ["IMPR01"],
          contact : "CONT02",
          service : "SERV02",
          consommation : 0,
          historique : []}
          ]
    });
     Stocks.insert({
      toner : "TONE02",
      index : ["AAA"],
      seuil : 2,
      nvAvertissement : 4,
      alerte : false,
      avertissement : true,
      quantite : 3,
      consommateur : [
        { consommateurId : "CONSOID03",
          site : "SITE02",
          impression : ["IMPR03", "IMPR02"],
          contact : "CONT02",
          service : "SERV02",
          consommation : 0,
          historique : []},
        { consommateurId : "CONSOID04",
          site : "SITE03",
          impression : ["IMPR03"],
          contact : "CONT03",
          service : "SERV03",
          consommation : 0,
          historique : []}
          ]
    });
     Stocks.insert({
      toner : "TONE03",
      index : ["AAA"],
      seuil : 3,
      nvAvertissement : 5,
      alerte : true,
      avertissement : true,
      quantite : 2,
      consommateur : [
        { consommateurId : "CONSOID05",
          site : "SITE01",
          impression : ["IMPR01", "IMPR02"],
          contact : "CONT01",
          service : "SERV01",
          consommation : 0,
          historique : []},
        { consommateurId : "CONSOID06",
          site : "SITE02",
          impression : ["IMPR01"],
          contact : "CONT02",
          service : "SERV02",
          consommation : 0,
          historique : []},
        { consommateurId : "CONSOID07",
          site : "SITE03",
          impression : ["IMPR02"],
          contact : "CONT03",
          service : "SERV03",
          consommation : 0,
          historique : []}
          ]
    });
  }
});
