import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

export const Toners = new Mongo.Collection('toners');

Toners.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});


TonerSchema = new SimpleSchema({
  libelle: {
    type: String,
    label: "Marque",
  },
  constructeur: {
    type: String,
    label: "Marque",
  }
  referenceC: {
    type: String,
    label: "Référence constructeur",
  },
  referenceF: {
    type: [ReferenceFournisseur],
    label: "Référence fournisseur",
  },
  couleur: {
    type: String,
    label: "Couleur",
  },
  quantité: {
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
    optional: true,
    label: "Alerte",
  },
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
});

ReferenceFournisseur = new SimpleSchema({
  reference: {
    type: String
  },
  idfournisseur: {
    type: String
  }
});

Toners.attachSchema( TonerSchema );

Meteor.methods({
  'toners.remove'(tonerId) {
    check(tonerId, String);
    Toners.remove(tonerId);
  },
 'toners.insert'() {
    check(libelle, String);
    check(constructeur, String);
    check(referenceC, String);
    check(referenceF, String);
    check(couleur, String);
    check(quantité, Number);
    check(alerte, Boolean);
    Toners.insert({
      libelle, constructeur, referenceC, referenceF, couleur, quantite, alerte,
    });
  },
});