<div align="center">

# ⚡ ExpoFast

**Le CLI ultra-rapide et toujours à jour pour React Native Expo**

[![npm version](https://img.shields.io/npm/v/expofast.svg)](https://www.npmjs.com/package/expofast)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[Installation](#-installation) • [Fonctionnalités](#-fonctionnalités) • [Utilisation](#-utilisation) • [Documentation](#-documentation) • [Contribuer](#-contribuer)

</div>

---

## 🎯 Pourquoi ExpoFast ?

ExpoFast résout un problème majeur : **les CLI existants utilisent des versions obsolètes** et **suppriment des fonctionnalités importantes** (comme la navigation par tabs).

**ExpoFast garantit que vous obtenez toujours les dernières versions** de tous les packages, avec un contrôle total sur votre configuration.

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---------------|-------------|
| 📦 **Toujours à jour** | Récupère automatiquement les dernières versions depuis NPM |
| 🎯 **Interactif** | Configuration guidée étape par étape |
| ⚡ **Rapide** | Support npm, pnpm et yarn |
| 🎨 **NativeWind** | Tailwind CSS pour React Native (optionnel) |
| 🧭 **Expo Router** | Navigation moderne par fichiers |
| 📱 **Tabs inclus** | Navigation par onglets (contrairement à rn.new !) |
| 🚀 **EAS Build** | Configuration cloud build pour iOS/Android |
| 🔧 **Flexible** | TypeScript ou JavaScript, vous choisissez |

## 📦 Installation

Aucune installation nécessaire ! Utilisez directement :

```bash
# Avec npx (recommandé)
npx expofast

# Avec pnpm
pnpm create expofast

# Avec yarn
yarn create expofast
```

## 🚀 Utilisation

Lancez simplement la commande et répondez aux questions :

```bash
npx expofast
```

### Exemple interactif

```
╔═══════════════════════════════════════════════════════════╗
║            ⚡ ExpoFast - Lightning Fast Setup ⚡         ║
╚═══════════════════════════════════════════════════════════╝

? Quel est le nom de votre projet ? mon-app
? Quel gestionnaire de packages ? pnpm
? TypeScript ou JavaScript ? TypeScript
? Utiliser Expo Router ? Oui
? Navigation par Tabs ? Oui
? Utiliser NativeWind (Tailwind) ? Oui
? Configurer EAS Build ? Oui

✨ Projet créé avec succès !
```

### Démarrage du projet

```bash
cd mon-app
pnpm install
pnpm start
```

## 🎨 Exemple avec NativeWind

Si vous activez NativeWind, utilisez Tailwind CSS directement :

```tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-4xl font-bold text-white">
        Bonjour ExpoFast ! 👋
      </Text>
    </View>
  );
}
```

## 🏗️ Structure du projet généré

```
mon-app/
├── app/
│   ├── (tabs)/              # Navigation par tabs
│   │   ├── index.tsx        # Écran d'accueil
│   │   └── explore.tsx      # Écran explorer
│   └── _layout.tsx          # Layout racine
├── components/              # Composants réutilisables
├── global.css              # Styles Tailwind (si NativeWind)
├── eas.json                # Config EAS (si activé)
└── package.json
```

## 🔧 Configuration disponible

ExpoFast vous permet de choisir :

- ✅ **Gestionnaire de packages** : npm, pnpm ou yarn
- ✅ **Langage** : TypeScript ou JavaScript
- ✅ **Expo Router** : Navigation par fichiers
- ✅ **Tabs** : Navigation par onglets
- ✅ **NativeWind** : Tailwind CSS pour React Native
- ✅ **EAS Build** : Build cloud iOS/Android
- ✅ **Dev Client** : Build personnalisé avec modules natifs

## 🚀 Build avec EAS

Si vous activez EAS Build, vous pouvez builder pour iOS/Android :

```bash
# Se connecter
eas login

# Build de développement
eas build --profile development --platform android

# Build de production
eas build --profile production --platform all

# Soumettre aux stores
eas submit --platform ios
```

## 📊 Comparaison

| Fonctionnalité | ExpoFast | Autres CLI |
|---------------|----------|------------|
| Dernières versions | ✅ Toujours | ❌ Versions fixes |
| Navigation Tabs | ✅ Inclus | ❌ Supprimé |
| NativeWind | ✅ Optionnel | ❌ Non |
| Configuration interactive | ✅ Complète | ⚠️ Limitée |
| EAS Build | ✅ Configuré | ⚠️ Manuel |
| Multi package managers | ✅ npm/pnpm/yarn | ⚠️ npm seulement |

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/super-feature`)
3. Committez vos changements (`git commit -m 'feat: ajout super feature'`)
4. Push vers la branche (`git push origin feature/super-feature`)
5. Ouvrez une Pull Request

Voir [CONTRIBUTING.md](CONTRIBUTING.md) pour plus de détails.

## 📝 Idées de contributions

- [ ] Templates prédéfinis (E-commerce, Social, etc.)
- [ ] State management (Zustand, Redux)
- [ ] Authentication (Clerk, Supabase)
- [ ] Firebase/Supabase setup
- [ ] Internationalisation (i18n)
- [ ] ESLint/Prettier config

## 📚 Documentation

- [Guide de publication NPM](GUIDE-PUBLICATION.md)
- [Checklist finale](CHECKLIST-FINALE.md)
- [Comment contribuer](CONTRIBUTING.md)

## 🔗 Ressources

- [Documentation Expo](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [React Native](https://reactnative.dev/)

## 📄 Licence

MIT © [Jean-Christophe](https://github.com/jeanchristophe-Git)

## 🌟 Support

Si vous aimez ExpoFast, donnez une ⭐️ sur [GitHub](https://github.com/jeanchristophe-Git/expofast) !

### Signaler un bug

Ouvrez une [issue](https://github.com/jeanchristophe-Git/expofast/issues) avec :
- Description du problème
- Étapes pour reproduire
- Version de Node/npm
- Système d'exploitation

### Proposer une fonctionnalité

Ouvrez une [issue](https://github.com/jeanchristophe-Git/expofast/issues) avec le label `enhancement`.

---

<div align="center">

**Fait avec ❤️ pour la communauté React Native**

[GitHub](https://github.com/jeanchristophe-Git/expofast) • [NPM](https://www.npmjs.com/package/expofast) • [Issues](https://github.com/jeanchristophe-Git/expofast/issues)

</div>
