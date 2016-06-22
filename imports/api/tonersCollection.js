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
  fournisseurId: {
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
/*
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
 'toners.insert'(constructeur, referenceC, fournisseur, couleur) {
    check(constructeur, String);
    check(referenceC, String);
    check(fournisseur, []);
    check(couleur, String);
    Toners.insert({
      constructeur, referenceC, fournisseur, couleur,
    });
  },
  'toners.alt-insert'(constructeur, referenceC, fournisseur, couleur) {
    check(constructeur, String);
    check(referenceC, String);
    check(fournisseur, []);
    check(couleur, String);
    const newElement = Toners.insert({
      constructeur, referenceC, fournisseur, couleur,
    });
    return newElement;
  },
  'toners.update'(tonerId, updateConstructeur, updateReferenceC, updateFournisseur, updateCouleur) {
    check(tonerId, String);
    check(updateConstructeur, String);
    check(updateReferenceC, String);
    check(updateFournisseur, []);
    check(updateCouleur, String);
    Toners.update(tonerId, {
    $set: {
      constructeur: updateConstructeur,
      referenceC: updateReferenceC,
      referenceF: updateFournisseur,
      couleur: updateCouleur,
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