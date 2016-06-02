import './EditSite.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.EditSite.events({
    'submit .update-site'(event) {
        event.preventDefault();
        const target = event.target;
        const updateNom = target.nom.value;
        const updateAdresse = target.adresse.value;
        const updateCodepostal = target.codepostal.value;
        const updateVille = target.ville.value;
        const updateTelephone = target.telephone.value;
        const siteId = this._id;
        Meteor.call('sites.update', siteId, updateNom, updateAdresse, updateCodepostal, updateVille, updateTelephone);
        document.getElementById('modalClose-'+this._id).click();
    },
});

Template.EditSite.onCreated(function() {
});

Template.EditSite.helpers({
});


