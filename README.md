# UE26-Framework Web
## Environnement de développement
Pour activer le mode développement, il est nécessaire de modifier le fichier ```.env``` situé à la racine du projet. Assurez-vous que la première ligne, ```VITE_BASE_API=https://localhost:7048```, soit active (non commentée), tandis que la seconde ligne doit rester commentée.

## Environnement de production
Pour activer le mode production, il faut se rendre également dans le fichier ```.env``` situé à la racine du projet. À présent, vérifiez que la première ligne est commentée, alors que la seconde ligne, contenant VITE_BASE_API=https://porthos-intra.cg.helmo.be/q210054, doit être non commentée et de ce fait, active.

## Cypress

1. Avant de lancer les tests, il est important que les dépendances soient bien installées. Si ce n'est pas le cas, merci d'utiliser la commande ```npm install``` ou ```yarn```
2. **IMPORTANT !!!** Pour démarrer le projet localement, utilisez les commandes suivantes : ```npm run dev``` ou ```yarn run dev```. Alternativement, vous pouvez vous rendre à la racine du projet, dans le fichier ```package.json```, et cliquer sur le bouton ```run``` à côté de chaque commande listée dans la section "scripts". Ceci permet d'exécuter les différentes commandes dans vos modes choisis, directement depuis votre IDE favori. De plus, il est possible que ces modes soient directement disponibles dans les options de lancement de votre IDE.
3. Lancer la commande ```npx cypress open``` ou ```yarn run cypress open```. Une fenêtre *Cypress* devrait apparaître.
4. Sélectionner l'onglet ```E2E Testing```.
5. Choisir un des navigateurs proposés.
6. Dans l'onglet **Specs**, vous retrouverez l'ensemble des tests dans un dossier ```cypress\e2e```.
7. Après avoir sélectionné un test, vous serez redirigé vers la vue où il se lancera automatiquement. Vous avez la possibilité de relancer le test à volonté en cliquant sur l'icône de redémarrage, située en haut à droite du menu de gauche.

## Routage (Statégie par Fragment ou API History)
Notre projet est conçu pour supporter deux stratégies de routage web : le routage par fragment et l'utilisation de l'API History. Il est important de noter que certains serveurs ne prennent pas en charge l'API History en raison de leur configuration spécifique. Dans de tels cas, le routage par fragment devient une solution de rechange viable. Cela a été le cas pour le serveur Panoramix, qui fonctionne sous Nginx. Sur ce serveur, il est impossible d'utiliser un fichier .htaccess pour rediriger systématiquement les requêtes vers le fichier index.html. En conséquence, lors du déploiement en production, nous avons dû opter pour la stratégie de routage par fragment, bien que l'API History fonctionne parfaitement en mode développement.

Pour basculer entre ces deux stratégies de routage, vous devez aller dans le fichier "src/route/routes.tsx" et vous rendre à la ligne 120. Si vous préférez utiliser la stratégie de routage par fragment, utilisez le constructeur createHashRouter. Pour l'API History, choisissez createBrowserRouter. C'est aussi simple que ça.




## Auteurs
Un projet réalisé par Varmix (```q210054```) et Zkyz (```q210208```)
