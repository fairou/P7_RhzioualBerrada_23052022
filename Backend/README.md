# Bienvenu à Groupomania Social Media!

ce projet est un MVP pour la mise en place d'un réseau social pour Groupomania.
le projet est réalisé avec Vue pour la partie Front et Node pour le Back. 

# Backend

Le projet Backend contient les API et il est réalisé avec Node.

## Technologies
La liste des technologies utilisé dans le projet:

----------
- bcrypt pour le hashage du mot de passe,
- jsonwebtoken pour créer un toket
- dotenv pour créer un fichier de configuration .env
- express pour démarrer le serveur
- nodemon pour le redémarrage et rechargement automatique du serveur express 
- multer pour le téléchargement des images
- mongoose pour les opérations liés à la base de données

## Configuration & Installation
pour démarrer le projet, merci de suivre les étapes suivantes.

1.  Lancer  `npm install`  depuis la console
    
    npm install
    
2.  Créer/Configurer une base de donnée sur 'MongoDB Atlas'
3.  Créer un dossier "images" à la racine du projet avec deux sous-dossier: profiles et posts
4.  Créer un fichier ".env" à la racine du projet avec l'exemple de donner ci-dessous:
    ```sh
    DatabaseConnexion = "mongodb+srv://user:password@cluster/DatabaseName?retryWrites=true&w=majority"
    Token = "xxxx_TOKEN_XXXXX"
    ExpireToken = '4h'
    Port = 3000
    Salt = 10
    ```
5. pour lancer le serveur, exécuter la commande:  `nodemon server`
