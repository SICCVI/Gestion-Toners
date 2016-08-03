//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const TonersCollection = new Mongo.Collection('toners');

//PERMISSIONS
TonersCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
ReferenceFournisseur = new SimpleSchema({
  toner_fournisseurId: {
    type: String
  },
  toner_fournisseurRef: {
    type: String
  },
});
TonerSchema = new SimpleSchema({
  toner_modele: {
    type: String,
    label: "Modèle",
  },
  toner_constructeurNom: {
    type: String,
    label: "Nom Constructeur",
  },
  toner_constructeurRef: {
    type: String,
    label: "Référence constructeur",
  },
  toner_fournisseur: {
    type: [ReferenceFournisseur],
    label: "Référence fournisseur",
    optional: true,
  },
  toner_couleur: {
    type: String,
    label: "Couleur",
    optional: true,
  },
  toner_note: {
    type: String,
    label: "Note",
    optional: true,
  },
  toner_editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  toner_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  toner_modifiedAt: {
    type: Date,
    label: "Dernière modification le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
});
TonersCollection.attachSchema( TonerSchema );

//INDEX EASY SEARCH
//INDEX POUR LA BIBLIOTHEQUE DE DONNEES
TonersIndex = new EasySearch.Index({
  collection: TonersCollection,
  fields: ['toner_modele', 'toner_constructeurNom', 'toner_constructeurRef', 'toner_couleur', 'toner_fournisseurRef', 'toner_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});
//INDEX POUR LE MODULE D'ASSOCIATION
ModuleTonersIndex = new EasySearch.Index({
  collection: TonersCollection,
  fields: ['toner_modele', 'toner_constructeurNom', 'toner_constructeurRef', 'toner_couleur', 'toner_fournisseurRef', 'toner_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'toners.remove'(tonerId) {
    check(tonerId, String);
    TonersCollection.remove(tonerId);
  },
  //INSERTION
  'toners.insert'(modele, constructeurNom, constructeurRef, couleur) {
    check(modele, String);
    check(constructeurNom, String);
    check(constructeurRef, String);
    check(couleur, String);
    const newID = TonersCollection.insert({
      toner_modele: modele,
      toner_constructeurNom : constructeurNom,
      toner_constructeurRef : constructeurRef,
      toner_couleur : couleur,
    });
    return newID;
  },
  //UPDATE
  'toners.update'(tonerId, updateModele, updateConstructeurNom, updateConstructeurRef, updateCouleur) {
    check(tonerId, String);
    check(updateModele, String);
    check(updateConstructeurNom, String);
    check(updateConstructeurRef, String);
    check(updateCouleur, String);
    const updateDate = new Date();
    TonersCollection.update(tonerId, {
      $set: {
        toner_modele: updateModele,
        toner_constructeurNom: updateConstructeurNom,
        toner_constructeurRef: updateConstructeurRef,
        toner_couleur: updateCouleur,
        toner_modifiedAt: updateDate,
      }
    });
  },
  //AJOUT DE NOTE
  'toners.add-note'(tonerId, updateNote) {
    check(tonerId, String);
    check(updateNote, String);
    TonersCollection.update(tonerId, {
      $set: {
        toner_note: updateNote,
      }
    });
  },
  //AJOUT DE FOURNISSEUR
  'toners.add-fournisseur'(tonerId, fournisseurId, fournisseurRef) {
    check(tonerId, String);
    check(fournisseurId, String);
    check(fournisseurRef, String);
    TonersCollection.update(tonerId, {
      $addToSet: {
        toner_fournisseur : {
          toner_fournisseurId: fournisseurId,
          toner_fournisseurRef: fournisseurRef,
        }
      }
    });
  },
  //SUPPRESSION DE FOURNISSEUR
  'toners.remove-fournisseur'(tonerId, fournisseurId, fournisseurRef) {
    check(tonerId, String);
    check(fournisseurId, String);
    check(fournisseurRef, String);
    TonersCollection.update(tonerId, {
      $pull: {
        fournisseur : {
          fournisseurId: fournisseurId,
          fournisseurRef: fournisseurRef,
        }
      }
    });
  },
  //MODE EDITION
  'toners.toggle-editMode'(tonerId, currentState) {
    check(tonerId, String);
    check(currentState, Boolean);
    TonersCollection.update(tonerId, {
      $set: {
        editMode: !currentState
      }
    });
  }
});
