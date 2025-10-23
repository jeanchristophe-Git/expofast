# ⚡ ExpoFast

**Le CLI ultra-rapide et toujours à jour pour créer des projets React Native Expo.**

Contrairement aux autres CLI, ExpoFast **installe toujours les dernières versions** de tous les packages et vous donne un contrôle total sur la configuration de votre projet grâce à une expérience interactive.

## ✨ Fonctionnalités

- 🎯 **Configuration interactive** - Répondez à quelques questions et obtenez exactement ce dont vous avez besoin
- 📦 **Toujours à jour** - Récupère et installe les dernières versions des packages
- 🔧 **Contrôle total** - Choisissez TypeScript/JavaScript, NativeWind, Expo Router, Tabs, EAS
- ⚡ **Rapide** - Supporte npm, pnpm et yarn
- 📱 **Prêt pour la production** - Inclut la configuration EAS Build & Submit
- 🎨 **Tailwind CSS** - Intégration optionnelle de NativeWind
- 🧭 **Navigation moderne** - Expo Router avec support des Tabs

## 🚀 Démarrage Rapide

### Avec npx (recommandé)

\`\`\`bash
npx expofast
\`\`\`

### Avec pnpm

\`\`\`bash
pnpm create expofast
\`\`\`

### Avec yarn

\`\`\`bash
yarn create expofast
\`\`\`

## 🎯 Ce que vous obtenez

Le CLI vous posera quelques questions et configurera votre projet avec :

1. **Nom du projet** - Le nom de votre application
2. **Gestionnaire de packages** - npm, pnpm ou yarn
3. **Langage** - TypeScript ou JavaScript
4. **Expo Router** - Routing moderne basé sur les fichiers
5. **Navigation par Tabs** - Navigation par onglets en bas (si Expo Router activé)
6. **NativeWind** - Tailwind CSS pour React Native
7. **EAS Build** - Builds cloud pour iOS et Android
8. **Dev Client** - Build de développement personnalisé pour les modules natifs

## 📦 Exemple d'utilisation

\`\`\`bash
$ npx expofast

╔═══════════════════════════════════════════════════════════╗
║            ⚡ ExpoFast - Lightning Fast Setup ⚡         ║
╚═══════════════════════════════════════════════════════════╝

? Quel est le nom de votre projet ? my-awesome-app
? Quel gestionnaire de packages voulez-vous utiliser ? pnpm
? TypeScript ou JavaScript ? TypeScript
? Utiliser Expo Router pour la navigation ? Oui
? Inclure la navigation par Tabs ? Oui
? Utiliser NativeWind (Tailwind CSS pour React Native) ? Oui
? Configurer EAS Build & Submit ? Oui
? Inclure Expo Dev Client pour le code natif personnalisé ? Non

📦 Récupération des dernières versions des packages...
✓ Projet Expo créé
✓ NativeWind installé
✓ Tailwind CSS installé
✓ Tailwind CSS configuré
✓ EAS Build configuré
✓ Configuration terminée

✨ Votre projet Expo est prêt !

📦 Le projet inclut :
  ✓ TypeScript
  ✓ Expo Router avec navigation par Tabs
  ✓ NativeWind (Tailwind CSS)
  ✓ EAS Build & Submit

🚀 Prochaines étapes :

  1. cd my-awesome-app
  2. pnpm install
  3. pnpm start
\`\`\`

## 🎨 Exemple avec NativeWind

Si vous choisissez NativeWind, vous pouvez utiliser les classes Tailwind CSS directement :

\`\`\`tsx
import { View, Text } from 'react-native';

export default function Screen() {
  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <Text className="text-4xl font-bold text-white mb-4">
        Bonjour le monde !
      </Text>
      <Text className="text-lg text-white/80">
        Créé avec ExpoFast ⚡
      </Text>
    </View>
  );
}
\`\`\`

## 🏗️ EAS Build

Si vous activez EAS, vous obtenez un fichier \`eas.json\` préconfiguré avec trois profils :

- **development** - Pour tester avec les outils de dev
- **preview** - Pour la distribution interne
- **production** - Pour les stores d'applications

\`\`\`bash
# Se connecter à Expo
eas login

# Build pour Android
eas build --profile development --platform android

# Build pour iOS
eas build --profile development --platform ios

# Build pour la production
eas build --profile production --platform all

# Soumettre aux stores
eas submit --platform ios
eas submit --platform android
\`\`\`

## 📱 Structure du projet

\`\`\`
mon-app/
├── app/
│   ├── (tabs)/           # Écrans de navigation par tabs
│   │   ├── index.tsx     # Tab Accueil
│   │   └── explore.tsx   # Tab Explorer
│   └── _layout.tsx       # Layout racine
├── components/           # Composants réutilisables
├── global.css           # Styles Tailwind (si NativeWind)
├── eas.json            # Configuration EAS (si activé)
├── app.json            # Configuration Expo
└── package.json
\`\`\`

## 🔧 Pourquoi ExpoFast ?

### Le problème avec les autres CLI

Beaucoup d'outils de setup React Native :
- ❌ Utilisent des versions obsolètes des packages
- ❌ Suppriment des fonctionnalités importantes (comme la navigation par tabs)
- ❌ Ne vous donnent pas le contrôle sur la configuration
- ❌ Ont des dépendances dépréciées

### Notre solution

ExpoFast :
- ✅ **Récupère toujours les dernières versions** depuis npm
- ✅ **Vous donne le contrôle total** avec des questions interactives
- ✅ **Conserve les fonctionnalités importantes** comme la navigation par tabs
- ✅ **Vous montre quelles versions** sont installées
- ✅ **Fonctionne avec npm, pnpm et yarn**

## 📦 Publier votre propre version

Vous voulez personnaliser ce CLI ? Voici comment :

### 1. Cloner et modifier

\`\`\`bash
git clone https://github.com/yourusername/expofast.git
cd expofast
pnpm install
\`\`\`

### 2. Tester localement

\`\`\`bash
# Tester le CLI
pnpm dev

# Ou le lier globalement
pnpm link --global
expofast
\`\`\`

### 3. Mettre à jour package.json

\`\`\`json
{
  "name": "votre-cli-expo-personnalise",
  "version": "1.0.0",
  "author": "Votre Nom",
  "repository": {
    "type": "git",
    "url": "https://github.com/votreusername/votre-cli-expo-personnalise.git"
  }
}
\`\`\`

### 4. Publier sur NPM

\`\`\`bash
# Se connecter à npm
npm login

# Construire le package
pnpm build

# Publier
npm publish
\`\`\`

### 5. Utiliser votre CLI publié

\`\`\`bash
npx votre-cli-expo-personnalise
\`\`\`

## 🔄 Garder les packages à jour

Le CLI récupère automatiquement les dernières versions lorsque vous l'exécutez. Pour mettre à jour le CLI lui-même :

\`\`\`bash
npm update -g expofast
# ou
pnpm update -g expofast
# ou
yarn global upgrade expofast
\`\`\`

## 🛠️ Développement

### Structure du projet

\`\`\`
expofast/
├── src/
│   └── index.js         # Code principal du CLI
├── dist/                # Sortie compilée
├── build.js            # Script de build
├── package.json
└── README.md
\`\`\`

### Build

\`\`\`bash
pnpm build
\`\`\`

### Test

\`\`\`bash
pnpm dev
\`\`\`

## 📝 Options de configuration

Le CLI supporte ces options interactives :

| Option | Valeurs | Par défaut | Description |
|--------|---------|-----------|-------------|
| Nom du projet | string | my-expo-app | Le nom de votre app |
| Gestionnaire de packages | npm, pnpm, yarn | auto-détecté | Quel gestionnaire utiliser |
| Langage | TypeScript, JavaScript | TypeScript | Langage du projet |
| Expo Router | Oui, Non | Oui | Routing basé sur les fichiers |
| Navigation Tabs | Oui, Non | Oui | Navigation par onglets en bas |
| NativeWind | Oui, Non | Oui | Intégration Tailwind CSS |
| EAS Build | Oui, Non | Oui | Configuration build cloud |
| Dev Client | Oui, Non | Non | Build de développement personnalisé |

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le dépôt
2. Créer une branche de fonctionnalité
3. Faire vos modifications
4. Soumettre une pull request

## 📄 Licence

Licence MIT - voir le fichier LICENSE pour les détails

## 🌟 Crédits

Créé parce que [rn.new](https://rn.new) a supprimé la navigation par tabs et d'autres fonctionnalités importantes.

## 📚 Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [React Native](https://reactnative.dev/)

---

**Fait avec ❤️ pour la communauté React Native**

Des questions ? Ouvrez une issue sur [GitHub](https://github.com/yourusername/expofast/issues)
