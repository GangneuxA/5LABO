# Documentation de l'API Node.js avec Express

## Installation

Pour installer et configurer cette API, suivez les étapes ci-dessous :


1. **Cloner le dépôt** :
    ```bash
    git clone https://github.com/GangneuxA/5LABO
    cd 5LABO/back
    ```

2. **Installer les dépendances** :
    ```bash
    npm install
    ```

3. **Configurer les variables d'environnement** :
    Créez un fichier `.env` à la racine du projet et ajoutez les variables nécessaires.
    Exemple de fichier `.env` :
    ```
    MONGODB_URI=<VOTRE-URI-BDD>
    JWT_Token=<VOTRE-TOKEN>
    ```

4. **Démarrer le serveur** :
    ```bash
    npm start
    ```

## Accès à la documentation Swagger

Une fois le serveur démarré, vous pouvez accéder à la documentation Swagger de l'API en naviguant vers l'URL suivante dans votre navigateur : http://<VOTRE-IP>:3010/api-docs
