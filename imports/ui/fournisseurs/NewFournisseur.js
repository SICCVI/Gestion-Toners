import './NewFournisseur.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';

Template.NewFournisseur.events({
    'submit .new-fournisseur'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
        const adresse = target.adresse.value;
        const codepostal = target.codepostal.value;
        const ville = target.ville.value;
        const telephone = target.telephone.value;
        const website = target.website.value;
        Meteor.call('fournisseurs.insert', nom, adresse, codepostal, ville, telephone, website);
        target.nom.value = "";
        target.adresse.value = "";
        target.codepostal.value = "";
        target.ville.value = "";
        target.telephone.value = "";
        target.website.value = "";
        target.nom.focus();
    },
});

Template.NewFournisseur.onCreated(function() {
});

Template.NewFournisseur.helpers({
});

