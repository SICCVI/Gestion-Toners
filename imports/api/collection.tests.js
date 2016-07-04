import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';

import { Contacts } from './contactsCollection.js';

/*if (Meteor.isServer) {
	describe('Contacts', () => {
		describe('methods', () => {
			let contactId;
			beforeEach(() => {
				resetDatabase();
				Contacts.remove({});
				contactId = Contacts.insert({
					nom: 'test nom',
					prenom: 'test prenom',
					telephone: 'test telephone',
				});
			});
			it('can delete owned insert', () => {
				const deleteContact = Meteor.server.method_handlers['contacts.remove'];
				deleteContact.apply([contactId]);
				assert.equal(Contacts.find().count(), 0);
			});
		});
	});
}*/

if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
      it('can delete owned task', () => {
      });
    });
  });
}