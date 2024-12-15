# Configuration du Projet avec Terraform

Ce projet utilise des conteneurs Docker pour les services MongoDB, backend, frontend et Nginx. L'infrastructure est gérée à l'aide de Terraform.

## Prérequis

- Docker
- Terraform

## Instructions de Configuration

1. **Clonez le dépôt :**

   ```sh
   git clone <repository-url>
   cd 5LABO
   ```

2. **Accédez au répertoire Terraform :**

   ```sh
   cd terraform
   ```

3. **Initialisez Terraform :**

   ```sh
   terraform init
   ```

4. **Appliquez la configuration Terraform :**

   ```sh
   terraform apply
   ```

   Tapez `yes` lorsque vous êtes invité à confirmer les modifications.

5. **Vérifiez la configuration :**

   - MongoDB devrait fonctionner sur le port `27017`.
   - Le backend devrait fonctionner sur le port `3010`.
   - Le frontend devrait fonctionner sur le port `3000`.
   - Nginx devrait fonctionner sur les ports `80` et `443`.

## Nettoyage

Pour détruire l'infrastructure créée par Terraform, exécutez :

```sh
terraform destroy
```

Tapez `yes` lorsque vous êtes invité à confirmer la destruction.

## Remarques

- Assurez-vous que Docker est en cours d'exécution avant d'exécuter les commandes Terraform.
- Mettez à jour le fichier `variables.tf` si vous devez modifier des valeurs par défaut.