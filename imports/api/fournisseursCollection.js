import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Fournisseurs = new Mongo.Collection('fournisseurs');

Fournisseurs.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

FournisseurSchema = new SimpleSchema({
  nom: {
    type: String,
    label: "Nom",
  },
  adresse: {
    type: String,
    label: "Adresse",
  },
  codepostal: {
    type: String,
    label: "Code Postal",
  },
  ville: {
    type: String,
    label: "Ville",
  },
  telephone: {
    type: String,
    label: "Téléphone",
  },
  website: {
    type: String,
    label: "Website",
  },
  note : {
    type: String,
    label: "Note",
    optional: true,
  },
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
});

Fournisseurs.attachSchema( FournisseurSchema );

Meteor.methods({
  'fournisseurs.remove'(fournisseurId) {
    check(fournisseurId, String);
    Fournisseurs.remove(fournisseurId);
  },
  'fournisseurs.insert'(nom, adresse, codepostal, ville, telephone, website) {
    check(nom, String);
    check(adresse, String);
    check(codepostal, String);
    check(ville, String);
    check(telephone, String);
    check(website, String);
    Fournisseurs.insert({
      nom, adresse, codepostal, ville, telephone, website,
    });
  },
  'fournisseurs.alt-insert'(nom, adresse, codepostal, ville, telephone, website) {
    check(nom, String);
    check(adresse, String);
    check(codepostal, String);
    check(ville, String);
    check(telephone, String);
    check(website, String);
    const newElement = Fournisseurs.insert({
      nom, adresse, codepostal, ville, telephone, website,
    });
    return newElement;
  },
  'fournisseurs.update'(fournisseurId, updateNom, updateAdresse, updateCodepostal, updateVille, updateTelephone, updateWebsite) {
    check(fournisseurId, String);
    check(updateNom, String);
    check(updateAdresse, String);
    check(updateCodepostal, String);
    check(updateVille, String);
    check(updateTelephone, String);
    check(updateWebsite, String);
    Fournisseurs.update(fournisseurId, {
    $set: {
      nom: updateNom,
      adresse: updateAdresse,
      codepostal: updateCodepostal,
      ville: updateVille,
      telephone: updateTelephone,
      website: updateWebsite,
    }});
  },
    'fournisseurs.note'(fournisseurId, updateNote) {
    check(fournisseurId, String);
    check(updateNote, String);
    Fournisseurs.update(fournisseurId, {
    $set: {
      note: updateNote,
    }});
  },
  'toggleEditFournisseur'(fournisseurId, currentState) {
    check(fournisseurId, String);
    check(currentState, Boolean);
    Fournisseurs.update(fournisseurId, {
      $set: {
        editMode: !currentState
      }});
  }
});

FournisseursIndex = new EasySearch.Index({
  collection: Fournisseurs,
  fields: ['nom', 'adresse', 'codepostal', 'ville', 'telephone', 'website', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 100}
});
