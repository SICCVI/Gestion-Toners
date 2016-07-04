import './NewSite.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';

Template.NewSite.events({
    'submit .new-site'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
        const adresse = target.adresse.value;
        const codepostal = target.codepostal.value;
        const ville = target.ville.value;
        const telephone = target.telephone.value;
        Meteor.call('sites.insert', nom, adresse, codepostal, ville, telephone);
        target.nom.value = "";
        target.adresse.value = "";
        target.codepostal.value = "";
        target.ville.value = "";
        target.telephone.value = "";
        target.nom.focus();
        $("#closeModalNew").click();
    },
});

Template.NewSite.onCreated(function() {
});

Template.NewSite.helpers({
});

