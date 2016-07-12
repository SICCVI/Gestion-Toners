import './NewContact.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';

Template.NewContact.events({
    'submit .new-contact'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
        const prenom = target.prenom.value;
        const telephone = target.telephone.value;
        const mobile = target.mobile.value;
        Meteor.call('contacts.insert', nom, prenom, telephone, mobile);
        target.nom.value = "";
        target.prenom.value = "";
        target.telephone.value = "";
        target.mobile.value = "";
        target.nom.focus();
        $("#closeModalNew").click();
    },
});

Template.NewContact.onCreated(function() {
});

Template.NewContact.helpers({
});

