# 🚀 Guide Final de Publication - ExpoFast

## ✅ Statut : Prêt à publier !

Votre CLI **ExpoFast** est 100% prêt à être publié sur NPM !

## 📋 Checklist avant publication

- ✅ Nom `expofast` disponible sur NPM
- ✅ Dépendances correctement configurées
- ✅ Script de build fonctionne
- ✅ Test global réussi (`npm link`)
- ✅ README complet en français
- ✅ Licence MIT incluse

## 🎯 Publication en 5 étapes

### 1️⃣ Personnaliser package.json

Ouvrez `package.json` et modifiez :

\`\`\`json
{
  "author": "Votre Nom <votre@email.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/VOTRE-NOM-UTILISATEUR/expofast.git"
  },
  "bugs": {
    "url": "https://github.com/VOTRE-NOM-UTILISATEUR/expofast/issues"
  }
}
\`\`\`

### 2️⃣ Se connecter à NPM

\`\`\`bash
npm login
\`\`\`

Entrez :
- Nom d'utilisateur
- Mot de passe
- Email
- Code 2FA (si activé)

💡 Pas de compte ? Créez-en un sur https://www.npmjs.com/signup

### 3️⃣ Build final

\`\`\`bash
cd expofast
pnpm build
\`\`\`

Vérifiez que `dist/index.js` existe.

### 4️⃣ Publier !

\`\`\`bash
npm publish --access public
\`\`\`

Vous devriez voir :
\`\`\`
+ expofast@1.0.0
\`\`\`

### 5️⃣ Tester

Attendez 1-2 minutes, puis :

\`\`\`bash
npx expofast
\`\`\`

🎉 **Félicitations !** Votre CLI est maintenant disponible publiquement !

## 🌍 Utilisation publique

Une fois publié, n'importe qui peut l'utiliser :

\`\`\`bash
# Avec npx
npx expofast

# Avec pnpm
pnpm create expofast

# Avec yarn
yarn create expofast
\`\`\`

## 🔄 Publier une mise à jour

### Quand vous modifiez le code :

\`\`\`bash
# 1. Faire vos modifications dans src/index.js
# 2. Tester
pnpm dev

# 3. Incrémenter la version
npm version patch    # 1.0.0 -> 1.0.1 (corrections de bugs)
npm version minor    # 1.0.0 -> 1.1.0 (nouvelles fonctionnalités)
npm version major    # 1.0.0 -> 2.0.0 (changements majeurs)

# 4. Build
pnpm build

# 5. Republier
npm publish
\`\`\`

## 📊 Statistiques

Après publication, suivez vos stats :

- **Page NPM** : https://www.npmjs.com/package/expofast
- **Téléchargements** : https://npm-stat.com/charts.html?package=expofast
- **Taille du bundle** : https://bundlephobia.com/package/expofast

## 🎨 Promouvoir votre CLI

### Sur les réseaux sociaux :

**Twitter/X :**
\`\`\`
🚀 Je viens de lancer ExpoFast ! ⚡

Un CLI qui crée des projets React Native Expo avec :
✅ Toujours les dernières versions
✅ TypeScript + NativeWind + Expo Router
✅ Navigation par Tabs (contrairement à rn.new !)
✅ Configuration EAS Build

Essayez : npx expofast

#ReactNative #Expo #OpenSource
\`\`\`

**Reddit :**
- r/reactnative
- r/expo
- r/javascript

**Dev.to :**
Écrivez un article : "J'ai créé ExpoFast - un CLI pour React Native Expo"

**Discord :**
- React Native Community
- Expo Discord

## 🔧 Commandes utiles

\`\`\`bash
# Voir les infos de votre package
npm view expofast

# Voir toutes vos versions publiées
npm view expofast versions

# Dépublier (attention, seulement dans les 24h !)
npm unpublish expofast@1.0.0

# Voir les téléchargements
npm view expofast downloads
\`\`\`

## 📁 Structure finale

\`\`\`
expofast/
├── dist/
│   └── index.js           ✅ Généré par build
├── src/
│   └── index.js           ✅ Code source
├── node_modules/          ✅ Dépendances installées
├── package.json           ✅ Config NPM
├── pnpm-lock.yaml        ✅ Fichier de verrouillage
├── build.js               ✅ Script de build
├── README.md              ✅ Documentation en français
├── LICENSE                ✅ Licence MIT
├── GUIDE-PUBLICATION.md   ✅ Ce guide
├── .gitignore             ✅ Git ignore
└── .npmignore             ✅ NPM ignore
\`\`\`

## ⚠️ Bonnes pratiques

### Avant chaque publication :

1. **Tester localement**
   \`\`\`bash
   pnpm dev
   \`\`\`

2. **Vérifier les fichiers qui seront publiés**
   \`\`\`bash
   npm pack --dry-run
   \`\`\`

3. **Build**
   \`\`\`bash
   pnpm build
   \`\`\`

4. **Publier**
   \`\`\`bash
   npm publish --access public
   \`\`\`

### Versioning (Versionnage sémantique) :

- **Patch** (1.0.0 → 1.0.1) : Corrections de bugs uniquement
- **Minor** (1.0.0 → 1.1.0) : Nouvelles fonctionnalités (compatible)
- **Major** (1.0.0 → 2.0.0) : Changements incompatibles

## 🎯 Objectifs post-publication

1. ⭐ Obtenir des étoiles sur GitHub
2. 📝 Écrire un article de blog
3. 🎥 Faire une vidéo démo
4. 🐛 Répondre aux issues GitHub
5. 🚀 Ajouter de nouvelles fonctionnalités basées sur les retours

## 🆘 Support

Si vous avez des problèmes :

1. **NPM n'accepte pas votre package ?**
   - Vérifiez que le nom est libre : `npm view expofast`
   - Vérifiez que vous êtes connecté : `npm whoami`

2. **La commande ne marche pas après publication ?**
   - Attendez 1-2 minutes (propagation NPM)
   - Essayez : `npx expofast@latest`

3. **Erreur de permission ?**
   - Vérifiez : `npm access public expofast`

## 🎉 Prochaines étapes

Après publication :

1. **Créer un repo GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Version initiale - ExpoFast v1.0.0"
   git remote add origin https://github.com/VOTRE-NOM-UTILISATEUR/expofast.git
   git push -u origin main
   \`\`\`

2. **Ajouter des badges NPM au README**
   \`\`\`markdown
   [![version npm](https://badge.fury.io/js/expofast.svg)](https://www.npmjs.com/package/expofast)
   [![téléchargements npm](https://img.shields.io/npm/dm/expofast.svg)](https://www.npmjs.com/package/expofast)
   \`\`\`

3. **Créer une release GitHub**
   - Allez sur GitHub > Releases > New Release
   - Tag : v1.0.0
   - Titre : ExpoFast v1.0.0 - Version Initiale
   - Description : Fonctionnalités de la v1.0.0

---

**Vous êtes prêt à publier ! 🚀**

Tapez simplement : `npm publish --access public`
