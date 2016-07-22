import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Historiques = new Mongo.Collection('historiques');

Historiques.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

Meteor.methods({
  'historiques.insert-retrait'(date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie) {
    const newElement = Historiques.insert({
      date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie
    });
    return newElement;
  },
  'historiques.insert-entree'(date, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie) {
    Historiques.insert({
      date, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie
    });
  },
  'historiques.insert-commande'(date, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie) {
    Historiques.insert({
      date, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie
    });
  },
  'historiques.remove'(historiqueId) {
    Historiques.remove(historiqueId);
  },
  'historiques.fin-commande'(tonerId) {
    const removeLigne = Historiques.findOne({tonerId: tonerId, categorie: "Commande"});
    if (typeof removeLigne === "undefined") {
    }
    else {
      Historiques.remove(removeLigne._id);
    }
  },
    'historiques.note'(historiqueId, updateNote) {
    check(historiqueId, String);
    check(updateNote, String);
    Historiques.update(historiqueId, {
    $set: {
      note: updateNote,
    }});
  }
});

/*HistoriquesIndex = new EasySearch.Index({
  collection: Historiques,
  fields: ['objet', 'auteur', 'date', 'note'],
  engine: new EasySearch.Minimongo({
    sort: function () {
      return { date: -1 };
    }
  }),
  defaultSearchOptions : {limit: 25}
});*/


/*HistoriquesIndex = new EasySearch.Index({
  collection: Historiques,
  fields: ['date', 'siteNom', 'serviceNom', 'tonerNom', 'categorie'],
  defaultSearchOptions: {
    sortBy: 'commandes'
  },
  engine: new EasySearch.MongoDB({
    sort: function (searchObject, options) {
      const sortBy = options.search.props.sortBy;
      if ('entrees' === sortBy) {
        console.log("AQ");
        return {
          categorie: Entree
        };
      } else if ('retraits' === sortBy) {
        console.log("ZS");
        return {
          categorie: Retrait
        };
      } else if ('commandes' === sortBy) {
        console.log("ED");
        return {
          categorie: Commande
        };
      } else {
        throw new Meteor.Error('Invalid sort by prop passed');
      }
    }
  })
});*/

HistoriquesIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { date: -1 };
    },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      
      categoryFilter = options.search.props.categoryFilter;
      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.categorie = categoryFilter;
      }
      tonerFilter = options.search.props.tonerFilter;
      if (_.isString(tonerFilter) && !_.isEmpty(tonerFilter)) {
        selector.tonerId = tonerFilter;
      }
      siteFilter = options.search.props.siteFilter;
      if (_.isString(siteFilter) && !_.isEmpty(siteFilter)) {
        selector.siteId = siteFilter;
      }
      serviceFilter = options.search.props.serviceFilter;
      if (_.isString(serviceFilter) && !_.isEmpty(serviceFilter)) {
        selector.serviceId = serviceFilter;
      }
      return selector;
    }
  }),
  collection: Historiques,
  fields: ['date', 'siteNom', 'serviceNom', 'tonerNom', 'tonerModele', 'tonerConstructeur', 'tonerReference', 'categorie', 'tonerId', 'siteId', 'serviceId', 'note'],
  defaultSearchOptions: {
    limit: 30
  },
  permission: () => {
    //console.log(Meteor.userId());

    return true;
  }
});