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
const contact_nom = [
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
contact_telephone = ["01 01 01 01 01", "02 02 02 02 02", "03 03 03 03 03", "04 04 04 04 04", "05 05 05 05 05", "06 06 06 06 06", "07 07 07 07 07", "08 08 08 08 08", "09 09 09 09 09"];;

Meteor.startup(function () {
if (Contacts.find().count() < 10) {
  for (var i = 0; i < 10; i++) {
    Contacts.insert({
      prenom: Random.choice(contact_nom),
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
if (Sites.find().count() < 5) {
  for (var i = 0; i < 5; i++) {
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
if (Impressions.find().count() < 5) {
  for (var i = 0; i < 5; i++) {
    Impressions.insert({
      gabarit: Random.choice(impression_gabarit),
      marque: Random.choice(impression_marque),
      modele: Random.choice(impression_modele),
      nombretoner: Random.choice(impression_nombretoner)
    });
  }
}
});

/*//TONERS
const toner_constructeur = [
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
toner_fournisseur = [
  nom: F
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
if (Toners.find().count() < 5) {
  for (var i = 0; i < 5; i++) {
    Toners.insert({
      libelle: Random.choice(toner_libelle),
      constructeur: Random.choice(toner_constructeur),
      referenceC: Random.choice(toner_referenceC),
      couleur: Random.choice(toner_couleur)
    });
  }
}
});
*/
//MARQUE
Meteor.startup(function () {
if (Marques.find().count() < 5) {
    Marques.insert({
      nom: "MARQUE A"
    });
    Marques.insert({
      nom: "MARQUE B"
    });
    Marques.insert({
      nom: "MARQUE C"
    });
    Marques.insert({
      nom: "MARQUE D"
    });
    Marques.insert({
      nom: "MARQUE E"
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

//FOURNISSEURS
const fournisseur_nom = [
  "Fournisseur A",
  "Fournisseur B",
  "Vendeur A",
  "Vendeur B"
],
fournisseur_adresse = [
  "10 rue du haut",
  "15 rue du bas",
  "20 rue de gauche",
  "25 rue de droite"
],
fournisseur_codepostal = [
  "11 000",
  "22 130",
  "33 390",
],
fournisseur_ville = [
  "Paris",
  "Lille",
  "Amiens"
],
fournisseur_telephone = ["01 01 01 01 01", "02 02 02 02 02", "03 03 03 03 03", "04 04 04 04 04", "05 05 05 05 05", "06 06 06 06 06", "07 07 07 07 07", "08 08 08 08 08", "09 09 09 09 09"];;

Meteor.startup(function () {
if (Fournisseurs.find().count() < 5) {
  for (var i = 0; i < 5; i++) {
    Fournisseurs.insert({
      nom: Random.choice(fournisseur_nom),
      adresse: Random.choice(fournisseur_adresse),
      codepostal: Random.choice(fournisseur_codepostal),
      ville: Random.choice(fournisseur_ville),
      telephone: Random.choice(fournisseur_telephone),
      website: "www.website.com"
    });
  }
}
});

//TONERS
Meteor.startup(function () {
if (Toners.find().count() < 2) {
    Toners.insert({
      constructeur : "Constructeur A",
      referenceC : "AZE",
      couleur : "black",
      fournisseur : [
        { fournisseurId : "WWW",
          referenceF : "XSZ"},
        { fournisseurId : "YYY",
          referenceF : "CDE"}
        ]
    });
     Toners.insert({
      constructeur : "Constructeur B",
      referenceC : "RTY",
      couleur : "cyan",
      fournisseur : [
        { fournisseurId : "XXX",
          referenceF : "QSD"},
        { fournisseurId : "ZZZ",
          referenceF : "WXC"}
        ]
    });
/*    STOCKS.INSERT({
      TONER : "KHYYQQUFFGVWBFZTA",
      INDEX : ["LIBELLEC", "CONSTRUCTEURF", "ZSX 456", "ROUGE"],
      SEUIL : 0,
      NVAVERTISSEMENT : 1,
      ALERTE : FALSE,
      AVERTISSEMENT : FALSE,
      QUANTITE : 5,
      CONSOMMATEUR : [
        { SITE : "N9J2TU22H9AUBXDYU",
          IMPRESSION : ["BJFVMKE587VCM7HRO"],
          CONTACT : "5ZBKGH5DQZDC2EXYF",
          SERVICE : "TOQ4XS83VMPDEMRNA",
          CONSOMMATION : 0,
          HISTORIQUE : []},
        { SITE : "DN5CHV5JYRZBLFMWB",
          IMPRESSION : ["YAOMDTAMGTBJWVNYY"],
          CONTACT : "WMT6PMJYBSAHMBRQK",
          SERVICE : "COXRBTT9JZP6OWFA8",
          CONSOMMATION : 0,
          HISTORIQUE : []}
          ]
    });*/
  }
});