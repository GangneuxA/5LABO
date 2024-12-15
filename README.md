# 5LABO
# Comment démarrer mon application avec Docker Compose

Ce guide vous expliquera comment démarrer votre application en utilisant Docker Compose.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Étapes pour démarrer l'application

1. **Cloner le dépôt**

    Clonez le dépôt de votre application en utilisant la commande suivante :
    ```bash
    git clone https://github.com/GangneuxA/5LABO
    cd 5LABO
    ```


2. **Démarrer les services**

    Utilisez la commande suivante pour démarrer les services définis dans le fichier `docker-compose.yml` :
    ```bash
    docker-compose up
    ```

3. **Accéder à l'application**

    Une fois les services démarrés, vous pouvez accéder à votre application en ouvrant votre navigateur et en naviguant vers `http://localhost` et a l'api avec `http://localhost` .
    Retrouver l'api  `http://localhost/api/` et la documentation de l'api  `http://localhost/api/api-docs`

## Arrêter les services

Pour arrêter les services, utilisez la commande suivante :
```bash
docker-compose down
```

## Creation en IaC

il est possible de créer en IaC l'application voir dans le readme dans le dossier terraform