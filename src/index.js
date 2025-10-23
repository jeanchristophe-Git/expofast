#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const validateNpmName = require('validate-npm-package-name');

const PACKAGE_MANAGERS = {
  npm: {
    install: 'npm install',
    installDev: 'npm install --save-dev',
    create: 'npx create-expo-app',
    global: 'npm install -g'
  },
  pnpm: {
    install: 'pnpm add',
    installDev: 'pnpm add -D',
    create: 'pnpm create expo-app',
    global: 'pnpm add -g'
  },
  yarn: {
    install: 'yarn add',
    installDev: 'yarn add -D',
    create: 'yarn create expo-app',
    global: 'yarn global add'
  }
};

function execCommand(command, cwd = process.cwd(), silent = false) {
  try {
    execSync(command, {
      stdio: silent ? 'pipe' : 'inherit',
      cwd,
      shell: true,
      encoding: 'utf-8'
    });
    return true;
  } catch (error) {
    if (!silent) {
      console.error(chalk.red(`\n❌ Error executing: ${command}`));
    }
    return false;
  }
}

function getLatestVersion(packageName) {
  try {
    const result = execSync(`npm view ${packageName} version`, {
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    return result.trim();
  } catch (error) {
    return 'latest';
  }
}

function detectPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';

  if (userAgent.includes('pnpm')) return 'pnpm';
  if (userAgent.includes('yarn')) return 'yarn';
  return 'npm';
}

async function main() {
  console.log(chalk.cyan.bold('\n╔═══════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║            ⚡ ExpoFast - Lightning Fast Setup ⚡         ║'));
  console.log(chalk.cyan.bold('╚═══════════════════════════════════════════════════════════╝\n'));

  console.log(chalk.gray('Create a modern React Native Expo app with all the tools you need.\n'));

  const detectedPM = detectPackageManager();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-expo-app',
      validate: (input) => {
        const validation = validateNpmName(input);
        if (!validation.validForNewPackages) {
          return validation.errors?.[0] || 'Invalid project name';
        }
        if (fs.existsSync(path.join(process.cwd(), input))) {
          return 'A directory with this name already exists';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager do you want to use?',
      choices: [
        { name: 'pnpm (Fast, efficient, saves disk space)', value: 'pnpm' },
        { name: 'npm (Default, stable, widely used)', value: 'npm' },
        { name: 'yarn (Fast with good caching)', value: 'yarn' }
      ],
      default: detectedPM
    },
    {
      type: 'list',
      name: 'language',
      message: 'TypeScript or JavaScript?',
      choices: [
        { name: 'TypeScript (Recommended - Type safety & better DX)', value: 'typescript' },
        { name: 'JavaScript', value: 'javascript' }
      ],
      default: 'typescript'
    },
    {
      type: 'confirm',
      name: 'useExpoRouter',
      message: 'Use Expo Router for navigation?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useTabs',
      message: 'Include Tabs navigation?',
      default: true,
      when: (answers) => answers.useExpoRouter
    },
    {
      type: 'confirm',
      name: 'useNativeWind',
      message: 'Use NativeWind (Tailwind CSS for React Native)?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useEAS',
      message: 'Configure EAS Build & Submit?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useDevClient',
      message: 'Include Expo Dev Client for custom native code?',
      default: false,
      when: (answers) => answers.useEAS
    }
  ]);

  const { projectName, packageManager, language, useExpoRouter, useTabs, useNativeWind, useEAS, useDevClient } = answers;
  const projectPath = path.join(process.cwd(), projectName);
  const pm = PACKAGE_MANAGERS[packageManager];

  console.log(chalk.cyan('\n📦 Fetching latest package versions...\n'));

  const versions = {
    nativewind: getLatestVersion('nativewind'),
    tailwindcss: getLatestVersion('tailwindcss'),
    reanimated: getLatestVersion('react-native-reanimated'),
    safeArea: getLatestVersion('react-native-safe-area-context')
  };

  console.log(chalk.gray('Latest versions:'));
  console.log(chalk.gray(`  - nativewind: ${versions.nativewind}`));
  console.log(chalk.gray(`  - tailwindcss: ${versions.tailwindcss}`));
  console.log(chalk.gray(`  - react-native-reanimated: ${versions.reanimated}`));
  console.log(chalk.gray(`  - react-native-safe-area-context: ${versions.safeArea}\n`));

  // Step 1: Create Expo App
  let spinner = ora('Creating Expo project...').start();

  const template = (useExpoRouter && useTabs) ? 'tabs@latest' :
                   useExpoRouter ? 'blank@latest' :
                   'blank@latest';

  const createCommand = `${pm.create} ${projectName} --template ${template}`;

  if (!execCommand(createCommand, process.cwd(), true)) {
    spinner.fail('Failed to create Expo project');
    process.exit(1);
  }

  spinner.succeed('Expo project created');

  // Step 2: Install NativeWind if requested
  if (useNativeWind) {
    spinner = ora('Installing NativeWind (Tailwind CSS)...').start();

    const nativewindPackages = `nativewind@${versions.nativewind} react-native-reanimated@${versions.reanimated} react-native-safe-area-context@${versions.safeArea}`;

    if (!execCommand(`${pm.install} ${nativewindPackages}`, projectPath, true)) {
      spinner.warn('NativeWind installation had issues');
    } else {
      spinner.succeed('NativeWind installed');
    }

    spinner = ora('Installing Tailwind CSS...').start();
    if (!execCommand(`${pm.installDev} tailwindcss@${versions.tailwindcss}`, projectPath, true)) {
      spinner.warn('Tailwind CSS installation had issues');
    } else {
      spinner.succeed('Tailwind CSS installed');
    }

    // Configure Tailwind
    spinner = ora('Configuring Tailwind CSS...').start();

    execCommand('npx tailwindcss init', projectPath, true);

    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

    fs.writeFileSync(path.join(projectPath, 'tailwind.config.js'), tailwindConfig);

    const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;`;

    fs.writeFileSync(path.join(projectPath, 'global.css'), globalCss);

    // Update metro.config.js
    const metroConfig = `const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });`;

    fs.writeFileSync(path.join(projectPath, 'metro.config.js'), metroConfig);

    // Update layout to import global.css
    const layoutPath = path.join(projectPath, 'app', '_layout.tsx');
    const layoutPathJs = path.join(projectPath, 'app', '_layout.js');
    const actualLayoutPath = fs.existsSync(layoutPath) ? layoutPath : layoutPathJs;

    if (fs.existsSync(actualLayoutPath)) {
      let layoutContent = fs.readFileSync(actualLayoutPath, 'utf8');
      if (!layoutContent.includes('global.css')) {
        layoutContent = `import '../global.css';\n${layoutContent}`;
        fs.writeFileSync(actualLayoutPath, layoutContent);
      }
    }

    // Add TypeScript types for NativeWind
    if (language === 'typescript') {
      const nativewindTypes = `/// <reference types="nativewind/types" />`;
      fs.writeFileSync(path.join(projectPath, 'nativewind-env.d.ts'), nativewindTypes);

      const tsconfigPath = path.join(projectPath, 'tsconfig.json');
      if (fs.existsSync(tsconfigPath)) {
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
        if (!tsconfig.include) tsconfig.include = [];
        if (!tsconfig.include.includes('nativewind-env.d.ts')) {
          tsconfig.include.push('nativewind-env.d.ts');
        }
        fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      }
    }

    spinner.succeed('Tailwind CSS configured');
  }

  // Step 3: Configure EAS
  if (useEAS) {
    spinner = ora('Configuring EAS Build...').start();

    const easConfig = {
      cli: {
        version: ">= 13.2.0"
      },
      build: {
        development: {
          developmentClient: useDevClient,
          distribution: "internal",
          ios: { resourceClass: "m-medium" },
          android: { buildType: "apk" }
        },
        preview: {
          distribution: "internal",
          ios: { resourceClass: "m-medium" },
          android: { buildType: "apk" }
        },
        production: {
          ios: { resourceClass: "m-medium" },
          android: {}
        }
      },
      submit: {
        production: {}
      }
    };

    fs.writeFileSync(path.join(projectPath, 'eas.json'), JSON.stringify(easConfig, null, 2));

    spinner.succeed('EAS Build configured');
  }

  // Step 4: Update app.json
  spinner = ora('Finalizing configuration...').start();

  const appJsonPath = path.join(projectPath, 'app.json');
  if (fs.existsSync(appJsonPath)) {
    const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

    if (!appJson.expo.plugins) appJson.expo.plugins = [];

    if (useExpoRouter && !appJson.expo.plugins.includes('expo-router')) {
      appJson.expo.plugins.push('expo-router');
    }

    appJson.expo.web = appJson.expo.web || {};
    appJson.expo.web.bundler = 'metro';

    if (!appJson.expo.scheme) {
      appJson.expo.scheme = projectName.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  }

  spinner.succeed('Configuration complete');

  // Create enhanced README
  const readme = generateReadme(answers, versions);
  fs.writeFileSync(path.join(projectPath, 'README.md'), readme);

  // Success message
  console.log(chalk.green.bold('\n✨ Your Expo project is ready!\n'));

  console.log(chalk.cyan('📦 Project includes:'));
  console.log(chalk.gray(`  ✓ ${language === 'typescript' ? 'TypeScript' : 'JavaScript'}`));
  if (useExpoRouter) console.log(chalk.gray(`  ✓ Expo Router${useTabs ? ' with Tabs navigation' : ''}`));
  if (useNativeWind) console.log(chalk.gray('  ✓ NativeWind (Tailwind CSS)'));
  if (useEAS) console.log(chalk.gray('  ✓ EAS Build & Submit'));
  if (useDevClient) console.log(chalk.gray('  ✓ Expo Dev Client'));

  console.log(chalk.yellow('\n🚀 Next steps:\n'));
  console.log(chalk.cyan(`  1. cd ${projectName}`));
  console.log(chalk.cyan(`  2. ${packageManager} ${packageManager === 'npm' ? 'install' : 'install'}`));
  console.log(chalk.cyan(`  3. ${packageManager === 'npm' ? 'npm' : packageManager} start`));

  if (useEAS) {
    console.log(chalk.yellow('\n📱 To build with EAS:\n'));
    console.log(chalk.cyan('  1. eas login'));
    console.log(chalk.cyan('  2. eas build --profile development --platform android'));
  }

  console.log(chalk.gray('\n📖 Check README.md for detailed documentation'));
  console.log(chalk.green('\nHappy coding! 🎉\n'));
}

function generateReadme(answers, versions) {
  const { projectName, packageManager, language, useExpoRouter, useTabs, useNativeWind, useEAS, useDevClient } = answers;

  return `# ${projectName}

React Native Expo project created with **ExpoFast** ⚡ - Always up to date! 🚀

## 📦 Stack

- **Language**: ${language === 'typescript' ? 'TypeScript' : 'JavaScript'}
- **Navigation**: ${useExpoRouter ? `Expo Router${useTabs ? ' with Tabs' : ''}` : 'None'}
- **Styling**: ${useNativeWind ? 'NativeWind (Tailwind CSS)' : 'StyleSheet'}
- **Build**: ${useEAS ? 'EAS Build & Submit' : 'Expo CLI'}
- **Package Manager**: ${packageManager}

## 🚀 Getting Started

### Installation

\`\`\`bash
${packageManager} install
\`\`\`

### Development

\`\`\`bash
# Start development server
${packageManager === 'npm' ? 'npm' : packageManager} start

# Run on iOS
${packageManager === 'npm' ? 'npm run' : packageManager} ios

# Run on Android
${packageManager === 'npm' ? 'npm run' : packageManager} android

# Run on Web
${packageManager === 'npm' ? 'npm run' : packageManager} web
\`\`\`

## 📱 Project Structure

\`\`\`
${projectName}/
├── app/                # Expo Router pages
${useTabs ? '│   ├── (tabs)/         # Tab navigation screens' : ''}
│   └── _layout.${language === 'typescript' ? 'tsx' : 'jsx'}   # Root layout
├── components/         # Reusable components
${useNativeWind ? '├── global.css          # Tailwind styles' : ''}
${useEAS ? '├── eas.json           # EAS Build config' : ''}
└── app.json           # Expo config
\`\`\`

${useNativeWind ? `## 🎨 Styling with NativeWind

This project uses NativeWind v${versions.nativewind} (Tailwind CSS for React Native).

\`\`\`${language === 'typescript' ? 'tsx' : 'jsx'}
import { View, Text } from 'react-native';

export default function Screen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-600">
        Hello NativeWind!
      </Text>
    </View>
  );
}
\`\`\`

### Useful Tailwind Classes

- Layout: \`flex-1\`, \`flex-row\`, \`items-center\`, \`justify-between\`
- Spacing: \`p-4\`, \`m-2\`, \`px-6\`, \`gap-4\`
- Typography: \`text-lg\`, \`font-bold\`, \`text-gray-700\`
- Colors: \`bg-blue-500\`, \`text-white\`, \`border-gray-200\`

[NativeWind Documentation](https://www.nativewind.dev/)
` : ''}

${useEAS ? `## 🏗️ Building with EAS

### Setup

\`\`\`bash
# Install EAS CLI globally
${packageManager === 'npm' ? 'npm install -g' : packageManager === 'pnpm' ? 'pnpm add -g' : 'yarn global add'} eas-cli

# Login to Expo
eas login

# Configure project (if needed)
eas init
\`\`\`

### Build Profiles

\`\`\`bash
# Development build (for testing${useDevClient ? ' with custom native code' : ''})
eas build --profile development --platform android
eas build --profile development --platform ios

# Preview build (internal distribution)
eas build --profile preview --platform android
eas build --profile preview --platform ios

# Production build
eas build --profile production --platform all
\`\`\`

### Submit to Stores

\`\`\`bash
# Submit to Apple App Store
eas submit --platform ios

# Submit to Google Play Store
eas submit --platform android
\`\`\`

### View Builds

\`\`\`bash
# List all builds
eas build:list

# View specific build
eas build:view [build-id]
\`\`\`

[EAS Build Documentation](https://docs.expo.dev/build/introduction/)
` : ''}

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev/)
${useExpoRouter ? '- [Expo Router](https://docs.expo.dev/router/introduction/)' : ''}
${useNativeWind ? '- [NativeWind](https://www.nativewind.dev/)' : ''}
${useEAS ? '- [EAS Build](https://docs.expo.dev/build/introduction/)' : ''}

## 🔧 Useful Commands

\`\`\`bash
# Clear cache
${packageManager === 'npm' ? 'npm' : packageManager} start -- --clear

# Type checking (TypeScript)
${language === 'typescript' ? `${packageManager === 'npm' ? 'npx' : 'pnpm'} tsc --noEmit` : '# Not applicable for JavaScript'}

# Update dependencies
${packageManager} update

${useEAS ? `# Check EAS credentials
eas credentials` : ''}
\`\`\`

## 📦 Installed Versions

${useNativeWind ? `- NativeWind: ${versions.nativewind}
- Tailwind CSS: ${versions.tailwindcss}
- React Native Reanimated: ${versions.reanimated}
- React Native Safe Area Context: ${versions.safeArea}
` : ''}

---

Created with [ExpoFast](https://github.com/yourusername/expofast) ⚡
`;
}

main().catch(error => {
  console.error(chalk.red('\n❌ Error:'), error.message);
  process.exit(1);
});
