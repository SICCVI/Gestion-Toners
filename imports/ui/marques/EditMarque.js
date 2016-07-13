import './EditMarque.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.EditMarque.events({
    'submit .update-marque'(event) {
        event.preventDefault();
        const target = event.target;
        const updateNom = target.nom.value;
        const marque = updateNom.toUpperCase();
        const marqueId = this._id;
        Meteor.call('marques.update', marqueId, marque);
        document.getElementById('modalClose-'+this._id).click();
    },
});

Template.EditMarque.onCreated(function() {
});

Template.EditMarque.helpers({
});


