import './EditFournisseur.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.EditFournisseur.events({
    'submit .update-fournisseur'(event) {
        event.preventDefault();
        const target = event.target;
        const updateNom = target.nom.value;
        const updateAdresse = target.adresse.value;
        const updateCodepostal = target.codepostal.value;
        const updateVille = target.ville.value;
        const updateTelephone = target.telephone.value;
        const updateWebsite = target.website.value;
        const fournisseurId = this._id;
        Meteor.call('fournisseurs.update', fournisseurId, updateNom, updateAdresse, updateCodepostal, updateVille, updateTelephone, updateWebsite);
        document.getElementById('modalClose-'+this._id).click();
    },
});

Template.EditFournisseur.onCreated(function() {
});

Template.EditFournisseur.helpers({
});


