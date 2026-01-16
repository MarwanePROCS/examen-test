rojet DevSecOps : Déploiement Automatisé d'une API Node.js sur AWS

Ce projet met en œuvre une chaîne **CI/CD complète et sécurisée** (DevSecOps) pour déployer une application Node.js conteneurisée sur une infrastructure AWS provisionnée par code (IaC).

Stack Technique

* **Application :** Node.js 18 / Express
* **Conteneurisation :** Docker
* **Orchestration CI/CD :** GitHub Actions
* **Sécurité :** Trivy (Scan de vulnérabilités)
* **Infrastructure as Code :** Terraform
* **Cloud Provider :** AWS (Région Europe Stockholm / `eu-north-1`)

Architecture du Pipeline CI/CD

Le pipeline est automatisé via **GitHub Actions** et se décompose en deux phases critiques :

1. Intégration Continue (CI)
Cette étape se déclenche à chaque `push` ou `pull_request` sur les branches principales.
* **Installation :** Mise en place de l'environnement Node.js.
* **Dépendances :** Installation propre via `npm ci`.
* **Tests & Qualité :** Exécution des tests unitaires et vérification du linting pour garantir la qualité du code.

2. Sécurité & Livraison Continue (CD)
Uniquement sur la branche `main` et après succès de la CI :
* **Construction :** Build de l'image Docker.
* **Audit de Sécurité (Trivy) :** Scan de l'image Docker pour détecter les vulnérabilités (CVE) de niveau *CRITICAL* et *HIGH*.
* **Publication :** Si le scan est valide, l'image est poussée sur le **Docker Hub**.



L'infrastructure est entièrement décrite en code (IaC) avec Terraform pour garantir la reproductibilité.

**Ressources déployées :**
* **Instance EC2 :** Type `t3.micro` (adapté à la région Stockholm).
* **OS :** Ubuntu Server 22.04/24.04 LTS (AMI dynamique).
* **Sécurité (Security Group) :**
    * `Port 22` : Accès SSH (Administration).
    * `Port 8080` : Accès HTTP (Application Node.js).

Guide de Démarrage Rapide
Prérequis
* Terraform installé.
* Clé d'accès AWS configurée.
* Une paire de clés SSH (ex: `cle-examen.pem`).

Déploiement de l'Infrastructure
```bash
cd terraform-exam
terraform init
terraform apply -auto-approve
