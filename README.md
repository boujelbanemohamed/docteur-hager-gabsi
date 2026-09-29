# Site du Dr Hager Gabsi Boujelbane

Site HTML statique en français, arabe et anglais, prêt pour GitHub Pages.

Adresse prévue : <https://boujelbanemohamed.github.io/docteur-hager-gabsi/>.

## Déploiement

Le workflow `.github/workflows/pages.yml` publie automatiquement la branche `main`. Dans les paramètres du dépôt GitHub, sous **Settings → Pages → Build and deployment**, choisir **GitHub Actions**. Le dépôt doit être public pour bénéficier de GitHub Pages sur un compte gratuit.

La page d’accueil en français est `index.html`. Les autres pages sont `publications.html`, `questions.html`, `horaires.html` et `consultations.html`. Les versions arabe et anglaise sont dans `ar/` et `en/`. Aucun serveur ni installation n’est nécessaire.

## Avant publication

Faire confirmer par le cabinet les horaires, les coordonnées, les prestations et les références des publications. L’image d’accueil est une illustration et ne représente pas une photographie de la praticienne. Les boutons de rendez-vous lancent un appel téléphonique.

Les URL canoniques, les balises de langue, le plan du site et les données structurées ciblent l’adresse GitHub Pages ci-dessus. Si le nom du dépôt ou le domaine change, actualiser ces valeurs et `robots.txt`.
