const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');  

// Connection a MongoDB Atlas.
mongoose.connect('mongodb+srv://XavAdmin:azer7894@cluster0.4z6rm.mongodb.net/ProjetTest?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussi !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Headers pour les cors(Cross Origine Resource Sharing).
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

app.use(bodyParser.json());

// Dossier où enregistrer les images.
app.use('/images', express.static(path.join(__dirname, 'images')));

//Utilisation des routes de l'API.
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;