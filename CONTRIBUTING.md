# 🤝 Contribuer à ExpoFast

Merci de vouloir contribuer à ExpoFast ! ⚡

## 🌟 Comment contribuer

### 1. Fork le projet

Cliquez sur le bouton "Fork" en haut à droite de la page GitHub.

### 2. Clonez votre fork

```bash
git clone https://github.com/VOTRE-NOM-UTILISATEUR/expofast.git
cd expofast
```

### 3. Installez les dépendances

```bash
pnpm install
```

### 4. Créez une branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

Ou pour un bug fix :

```bash
git checkout -b fix/correction-du-bug
```

### 5. Faites vos modifications

Modifiez le code dans `src/index.js`.

### 6. Testez vos modifications

```bash
# Tester localement
pnpm dev

# Build
pnpm build
```

### 7. Commit vos changements

```bash
git add .
git commit -m "feat: description de la nouvelle fonctionnalité"
```

Ou pour un bug fix :

```bash
git commit -m "fix: description de la correction"
```

### 8. Push vers votre fork

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

### 9. Créez une Pull Request

1. Allez sur votre fork sur GitHub
2. Cliquez sur "Pull Request"
3. Remplissez la description
4. Soumettez la PR

## 📝 Conventions de commit

Utilisez les préfixes suivants :

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation uniquement
- `style:` - Formatage, point-virgules manquants, etc.
- `refactor:` - Refactorisation du code
- `test:` - Ajout de tests
- `chore:` - Maintenance

Exemples :
```
feat: ajouter support pour Zustand
fix: corriger l'installation de NativeWind
docs: mettre à jour le README
```

## 🎯 Idées de contributions

### Fonctionnalités souhaitées :

- [ ] Ajouter templates prédéfinis (E-commerce, Social, etc.)
- [ ] Support pour state management (Zustand, Redux Toolkit)
- [ ] Intégration Firebase/Supabase
- [ ] Support pour React Navigation classique
- [ ] Configuration ESLint/Prettier
- [ ] Support pour i18n (internationalisation)
- [ ] Génération automatique de screens
- [ ] Tests unitaires pour le CLI

### Améliorations :

- [ ] Optimiser la vitesse d'installation
- [ ] Améliorer les messages d'erreur
- [ ] Ajouter plus d'exemples dans la doc
- [ ] Traductions (Anglais, etc.)
- [ ] Mode verbose pour debug

## 🐛 Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/jeanchristophe-Git/expofast/issues)
2. Créez une nouvelle issue avec :
   - Description claire du bug
   - Étapes pour le reproduire
   - Comportement attendu vs réel
   - Version de Node, npm/pnpm/yarn
   - Système d'exploitation

## 💡 Proposer une fonctionnalité

1. Vérifiez que la fonctionnalité n'est pas déjà proposée
2. Créez une issue "Feature Request" avec :
   - Description de la fonctionnalité
   - Cas d'utilisation
   - Exemples de code si possible

## 🧪 Tests

Avant de soumettre une PR, assurez-vous que :

- [ ] Le code build sans erreur (`pnpm build`)
- [ ] Le CLI fonctionne localement (`pnpm dev`)
- [ ] Vous avez testé les nouveaux changements
- [ ] Le README est à jour si nécessaire

## 📚 Structure du projet

```
expofast/
├── src/
│   └── index.js          # Code principal du CLI
├── dist/                 # Généré par build (ne pas commit)
├── build.js             # Script de build
├── package.json         # Config NPM
├── README.md            # Documentation
├── CONTRIBUTING.md      # Ce fichier
└── GUIDE-PUBLICATION.md # Guide de publication
```

## ✅ Checklist PR

Avant de soumettre votre Pull Request :

- [ ] J'ai testé mes changements localement
- [ ] Mon code suit les conventions du projet
- [ ] J'ai mis à jour la documentation si nécessaire
- [ ] J'ai ajouté des commentaires dans le code si nécessaire
- [ ] Mes commits suivent les conventions

## 🌍 Code de conduite

- Soyez respectueux
- Soyez constructif dans les critiques
- Aidez les autres développeurs
- Partagez vos connaissances

## 📞 Questions ?

Si vous avez des questions :

- Ouvrez une [Discussion](https://github.com/jeanchristophe-Git/expofast/discussions)
- Ouvrez une [Issue](https://github.com/jeanchristophe-Git/expofast/issues)

## 🙏 Merci !

Merci de contribuer à ExpoFast et d'aider la communauté React Native ! ⚡

---

**Happy coding! 🚀**
