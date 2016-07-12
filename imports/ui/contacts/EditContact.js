import './EditContact.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.EditContact.events({
    'submit .update-contact'(event) {
        event.preventDefault();
        const target = event.target;
        const updateNom = target.nom.value;
        const updatePrenom = target.prenom.value;
        const updateTelephone = target.telephone.value;
        const updateMobile = target.mobile.value;
        const contactId = this._id;
        Meteor.call('contacts.update', contactId, updateNom, updatePrenom, updateTelephone, updateMobile);
        document.getElementById('modalClose-'+this._id).click();
    },
});

Template.EditContact.onCreated(function() {
});

Template.EditContact.helpers({
});


