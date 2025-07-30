import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import cors from 'cors';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

app.use(bodyParser.json());

// Ajoute une route POST pour sauvegarder une recette
app.post('/api/recettes', (req, res) => {
  const newRecipe = req.body;
  const recettesPath = path.resolve('menus.json');

  fs.readFile(recettesPath, 'utf8', (err, data) => {
    let recettes: any[] = [];

    if (err) {
      if (err.code === 'ENOENT') {
        recettes = [];
      } else {
        res.status(500).json({ message: 'Erreur de lecture du fichier' });
        return; // ⬅️ Corrige l'erreur ici
      }
    } else {
      try {
        recettes = JSON.parse(data);
      } catch (parseError) {
        res.status(500).json({ message: 'Erreur de parsing JSON' });
        return; // ⬅️ Corrige aussi ici
      }
    }

    recettes.push(newRecipe);

    fs.writeFile(recettesPath, JSON.stringify(recettes, null, 2), (writeErr) => {
      if (writeErr) {
        res.status(500).json({ message: 'Erreur d\'écriture du fichier' });
        return; // ⬅️ Et ici
      }

      res.status(201).json({
        message: 'Recette ajoutée avec succès',
        recette: newRecipe
      });
    });

    return; // ⬅️ Et celui-là est important pour *finir proprement* la callback
  });

  return; // ⬅️ Celui-ci termine la fonction app.post (même si souvent pas obligatoire, il peut aider ici)
});


//GETTER

// ➕ Route GET pour lire les recettes depuis le fichier JSON
app.get('/api/recettes', (req, res) => {
  const recettesPath = path.resolve('menus.json');

  fs.readFile(recettesPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Erreur de lecture du fichier' });
      return;
    }

    try {
      const recettes = JSON.parse(data);
      res.status(200).json(recettes);
    } catch (parseError) {
      res.status(500).json({ message: 'Erreur de parsing JSON' });
    }
  });
});


//DELETE








/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
