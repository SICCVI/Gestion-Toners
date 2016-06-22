import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Toners = new Mongo.Collection('toners');

Toners.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});


ReferenceFournisseur = new SimpleSchema({
  reference: {
    type: String
  },
  idfournisseur: {
    type: String
  }
});

TonerSchema = new SimpleSchema({
  constructeur: {
    type: String,
    label: "Constructeur",
  },
  referenceC: {
    type: String,
    label: "Référence constructeur",
  },
/*  referenceF: {
    type: [ReferenceFournisseur],
    label: "Référence fournisseur",
    optionnal: true,
  },*/
  couleur: {
    type: String,
    label: "Couleur",
  },
/*  quantité: {
    type: Number,
    label: "Quantité",
  },
  seuil: {
    type: Number,
    label: "Seuil",
  },
  alerte: {
    type: Boolean,
    defaultValue: false,
    label: "Alerte",
  },
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },*/
});

Toners.attachSchema( TonerSchema );

Meteor.methods({
  'toners.remove'(tonerId) {
    check(tonerId, String);
    Toners.remove(tonerId);
  },
 'toners.insert'() {
    check(constructeur, String);
    check(referenceC, String);
    check(referenceF, []);
    check(couleur, String);
    check(quantite, Number);
    check(seuil, Number);
    check(alerte, Boolean);
    Toners.insert({
      constructeur, referenceC, referenceF, couleur, quantite, seuil, alerte,
    });
  },
  'toners.update'(tonerId, updateConstructeur, updateReferenceC, updateReferenceF, updateCouleur, updateQuantite, updateSeuil, updateAlerte) {
    check(tonerId, String);
    check(updateConstructeur, String);
    check(updateReferenceC, String);
    check(updateReferenceF, []);
    check(updateCouleur, String);
    check(updateQuantite, Number);
    check(updateSeuil, Number);
    check(updateAlerte, Boolean);
    Toners.update(tonerId, {
    $set: {
      constructeur: updateConstructeur,
      referenceC: updateReferenceC,
      referenceF: updateReferenceF,
      couleur: updateCouleur,
      quantite: updateQuantite,
      seuil: updateSeuil,
      alerte: updateAlerte
    }});
  },
  'toggleEditToner'(tonerId, currentState) {
    check(tonerId, String);
    check(currentState, Boolean);
    Toners.update(tonerId, {
      $set: {
        editMode: !currentState
      }});
  },
});

TonersIndex = new EasySearch.Index({
  collection: Toners,
  fields: ['constructeur', 'referenceC', 'couleur', 'referenceF', 'fournisseur'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});


ModuleTonersIndex = new EasySearch.Index({
  collection: Toners,
  fields: ['constructeur', 'referenceC', 'couleur', 'referenceF', 'fournisseur'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});