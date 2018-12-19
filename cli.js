#!/usr/bin/env node
const params = require("commander");
const testElasticsearch = require("./index");

// index, champ, liste de mots à chercher

/******************* CLI PARAMETRES & HELP *******************/
params
.version("1.0.0")
  /* ELASTICSEARCH
    l'url Elasticsearch sur lequel les données seront envoyées
  */
  .option('-e, --elasticsearch <host url>', `
  Url d’Elasticsearch, voir les paramètres d'authentification
  Défaut “localhost:9200”
  `)
  /* INDEX
    Elasticsearch gère plusieurs index
  */
  .option('-i, --index <index name>',`
  Index d’Elasticsearch où les données seront envoyées.
  Défaut aucun.
  Example “monindex”
  Obligatoire.
  `)
  /* FIELD
  */
  .option('-f, --field <field name>',`
  Champ d’Elasticsearch dans lequel rechercher.
  Défaut aucun.
  Example “value”
  Obligatoire.
  `)
  /* Terms
    Liste de mots à rechercher
  */
  .option('-t, --terms <terms list>',`
  Liste de mots avec lesquels requêter.
  Défaut liste par défaut.
  Example "car, chicken farm, victory day, mixedwords"
  Obligatoire.
  `)
  /* File
    Fichier dans lequel écrire
  */
  .option('-F, --file <file source path>',`
  chemin et nom de fichier à écrire
  Défaut aucun.
  Example "./my_file".
  `)
  .parse(process.argv);

  testElasticsearch(
    params.elasticsearch,
    params.index,
    params.field,
    params.terms,
    params.file,
  )
  .then(result => console.log(result))
  .catch(error => console.error(error) || process.exit(-1));
