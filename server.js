// =============================================================================
// BASE SETUP
// =============================================================================

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// Configuration de l'app
app.use(morgan('dev')); // log des requêtes dans la console

// Configuration de body parser pour récupérer les données POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // définition du port

// =============================================================================
// ROUTES DE L'API
// =============================================================================

var router = express.Router();

// Middleware pour toutes les requêtes
router.use(function(req, res, next) {
    console.log('Une requête est en cours.');
    next();
});

// Route de test de l'API (GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Hourra ! Bienvenue sur notre API !' });   
});

// ----------------------------------------------------
// SIMULATION DE BASE DE DONNÉES (Mock)
// ----------------------------------------------------
// On utilise une simple liste pour stocker les données tant que le serveur tourne
var bears = []; 
var idCounter = 1;

// Routes pour /bears
router.route('/bears')

    // Créer un ours (POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        var bear = {};
        bear.id = idCounter++; // On génère un ID unique
        bear.name = req.body.name;
        
        bears.push(bear); // On ajoute à la liste
        
        res.json({ message: 'Bear created!', bear: bear });
    })

    // Récupérer tous les ours (GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        res.json(bears);
    });

// Routes pour /bears/:bear_id
router.route('/bears/:bear_id')

    // Récupérer un ours par son ID
    .get(function(req, res) {
        // On cherche dans notre liste l'ours qui a le bon ID
        var bear = bears.find(b => b.id == req.params.bear_id);
        
        if (bear) {
            res.json(bear);
        } else {
            res.status(404).json({message: "Bear not found"});
        }
    });

// =============================================================================
// ROUTES GLOBALES (Correction du problème "Cannot GET /")
// =============================================================================

// Route pour la racine du site (http://localhost:8080)
app.get('/', function(req, res) {
    res.send('Bienvenue ! Le serveur Docker fonctionne parfaitement. Testez l\'API sur /api');
});

// Enregistrement des routes de l'API (préfixe /api)
app.use('/api', router);

// =============================================================================
// DÉMARRAGE DU SERVEUR
// =============================================================================
app.listen(port);
console.log('Le serveur tourne sur le port ' + port);
