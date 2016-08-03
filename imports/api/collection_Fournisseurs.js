//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const FournisseursCollection = new Mongo.Collection('fournisseurs');

//PERMISSIONS
FournisseursCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
FournisseurSchema = new SimpleSchema({
  fournisseur_nom: {
    type: String,
    label: "Nom",
  },
  fournisseur_adresse: {
    type: String,
    label: "Adresse",
    optional: true,
  },
  fournisseur_codepostal: {
    type: String,
    label: "Code Postal",
    optional: true,
  },
  fournisseur_ville: {
    type: String,
    label: "Ville",
    optional: true,
  },
  fournisseur_telephone: {
    type: String,
    label: "Téléphone",
    optional: true,
  },
  fournisseur_website: {
    type: String,
    label: "Website",
    optional: true,
  },
  fournisseur_note : {
    type: String,
    label: "Note",
    optional: true,
  },
  fournisseur_editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  fournisseur_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  fournisseur_modifiedAt: {
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
FournisseursCollection.attachSchema( FournisseurSchema );

//INDEX EASY SEARCH
//INDEX POUR LA BIBLIOTHEQUE DE DONNEES
FournisseursIndex = new EasySearch.Index({
  collection: FournisseursCollection,
  fields: ['fournisseur_nom', 'fournisseur_adresse', 'fournisseur_codepostal', 'fournisseur_ville', 'fournisseur_telephone', 'fournisseur_website', 'fournisseur_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'fournisseurs.remove'(fournisseurId) {
    check(fournisseurId, String);
    FournisseursCollection.remove(fournisseurId);
  },
  //INSERTION
  'fournisseurs.insert'(nom, adresse, codepostal, ville, telephone, website) {
    check(nom, String);
    check(adresse, String);
    check(codepostal, String);
    check(ville, String);
    check(telephone, String);
    check(website, String);
    const newID = FournisseursCollection.insert({
      nom, adresse, codepostal, ville, telephone, website,
    });
    return newID;
  },
  //UPDATE
  'fournisseurs.update'(fournisseurId, updateNom, updateAdresse, updateCodepostal, updateVille, updateTelephone, updateWebsite) {
    check(fournisseurId, String);
    check(updateNom, String);
    check(updateAdresse, String);
    check(updateCodepostal, String);
    check(updateVille, String);
    check(updateTelephone, String);
    check(updateWebsite, String);
    const updateDate = new Date();
    FournisseursCollection.update(fournisseurId, {
      $set: {
        fournisseur_nom: updateNom,
        fournisseur_adresse: updateAdresse,
        fournisseur_codepostal: updateCodepostal,
        fournisseur_ville: updateVille,
        fournisseur_telephone: updateTelephone,
        fournisseur_website: updateWebsite,
        fournisseur_modifiedAt: updateDate,
      }
    });
  },
  //AJOUT DE NOTE
  'fournisseurs.add-note'(fournisseurId, updateNote) {
    check(fournisseurId, String);
    check(updateNote, String);
    FournisseursCollection.update(fournisseurId, {
      $set: {
        fournisseur_note: updateNote,
      }
    });
  },
  //MODE EDITION
  'fournisseurs.toggle-editMode'(fournisseurId, currentState) {
    check(fournisseurId, String);
    check(currentState, Boolean);
    FournisseursCollection.update(fournisseurId, {
      $set: {
        fournisseur_editMode: !currentState
      }
    });
  }
});
