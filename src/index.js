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

function showBanner() {
  console.log(chalk.cyan(`
  _____                   _____         _   
 | ____|_  ___ __   ___  |  ___|_ _ ___| |_ 
 |  _| \ \/ / '_ \ / _ \ | |_ / _' / __| __|
 | |___ >  <| |_) | (_) ||  _| (_| \__ \ |_ 
 |_____/_/\_\ .__/ \___/ |_|  \__,_|___/\__|
           |_|                               
ok 
`));
  console.log(chalk.yellow.bold('  ⚡ Lightning-fast Expo setup with latest packages\n'));
}

async function main() {
  showBanner();

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
      message: 'Which package manager?',
      choices: [
        { name: 'pnpm', value: 'pnpm' },
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' }
      ],
      default: detectedPM
    },
    {
      type: 'list',
      name: 'language',
      message: 'TypeScript or JavaScript?',
      choices: [
        { name: 'TypeScript', value: 'typescript' },
        { name: 'JavaScript', value: 'javascript' }
      ],
      default: 'typescript'
    },
    {
      type: 'confirm',
      name: 'useExpoRouter',
      message: 'Use Expo Router?',
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
      message: 'Use NativeWind (Tailwind CSS)?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useEAS',
      message: 'Configure EAS Build?',
      default: true
    }
  ]);

  const { projectName, packageManager, language, useExpoRouter, useTabs, useNativeWind, useEAS } = answers;
  const projectPath = path.join(process.cwd(), projectName);
  const pm = PACKAGE_MANAGERS[packageManager];

  console.log(chalk.cyan('\n📦 Fetching latest package versions...\n'));

  const versions = {
    nativewind: getLatestVersion('nativewind'),
    tailwindcss: '3.4.17', // Fixed to v3 for NativeWind compatibility
    reanimated: getLatestVersion('react-native-reanimated'),
    safeArea: getLatestVersion('react-native-safe-area-context')
  };

  console.log(chalk.gray('Latest versions:'));
  console.log(chalk.gray(`  - nativewind: ${versions.nativewind}`));
  console.log(chalk.gray(`  - tailwindcss: ${versions.tailwindcss}`));
  console.log(chalk.gray(`  - react-native-reanimated: ${versions.reanimated}`));
  console.log(chalk.gray(`  - react-native-safe-area-context: ${versions.safeArea}\n`));

  // Step 1: Create Expo App (always use blank template)
  let spinner = ora('Creating Expo project...').start();

  const createCommand = `${pm.create} ${projectName} --template blank`;

  if (!execCommand(createCommand, process.cwd(), true)) {
    spinner.fail('Failed to create Expo project');
    process.exit(1);
  }

  spinner.succeed('Expo project created');

  // Step 1.5: Create tsconfig.json for TypeScript
  if (language === 'typescript') {
    const tsconfigPath = path.join(projectPath, 'tsconfig.json');
    if (!fs.existsSync(tsconfigPath)) {
      const tsconfig = {
        "extends": "expo/tsconfig.base",
        "compilerOptions": {
          "strict": true,
          "paths": {
            "@/*": ["./*"]
          }
        },
        "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
      };
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
    }
  }

  // Step 2: Setup Expo Router if requested
  if (useExpoRouter) {
    spinner = ora('Installing Expo Router...').start();

    const routerPackages = 'expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar';

    if (!execCommand(`${pm.install} ${routerPackages}`, projectPath, true)) {
      spinner.warn('Expo Router installation had issues');
    } else {
      spinner.succeed('Expo Router installed');
    }

    // Create app directory structure
    spinner = ora('Setting up Expo Router structure...').start();

    const appDir = path.join(projectPath, 'app');
    fs.mkdirSync(appDir, { recursive: true });

    if (useTabs) {
      // Create (tabs) directory
      const tabsDir = path.join(appDir, '(tabs)');
      fs.mkdirSync(tabsDir, { recursive: true });

      // Create index.tsx (Home tab)
      const homeScreen = language === 'typescript' ? `import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to ExpoFast! 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
` : `import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to ExpoFast! 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
`;

      fs.writeFileSync(
        path.join(tabsDir, language === 'typescript' ? 'index.tsx' : 'index.js'),
        homeScreen
      );

      // Create explore.tsx (Explore tab)
      const exploreScreen = language === 'typescript' ? `import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
  },
});
` : `import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
  },
});
`;

      fs.writeFileSync(
        path.join(tabsDir, language === 'typescript' ? 'explore.tsx' : 'explore.js'),
        exploreScreen
      );

      // Create _layout with tabs
      const tabsLayout = language === 'typescript' ? `import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}
` : `import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: true,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}
`;

      fs.writeFileSync(
        path.join(tabsDir, language === 'typescript' ? '_layout.tsx' : '_layout.js'),
        tabsLayout
      );
    } else {
      // Just a simple index without tabs
      const indexScreen = language === 'typescript' ? `import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to ExpoFast! 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
` : `import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to ExpoFast! 🚀</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
`;

      fs.writeFileSync(
        path.join(appDir, language === 'typescript' ? 'index.tsx' : 'index.js'),
        indexScreen
      );
    }

    // Create root _layout
    const rootLayout = language === 'typescript' ? `import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
` : `import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack />;
}
`;

    fs.writeFileSync(
      path.join(appDir, language === 'typescript' ? '_layout.tsx' : '_layout.js'),
      rootLayout
    );

    // Delete App.js/App.tsx from blank template
    const appJsPath = path.join(projectPath, 'App.js');
    const appTsxPath = path.join(projectPath, 'App.tsx');
    if (fs.existsSync(appJsPath)) fs.unlinkSync(appJsPath);
    if (fs.existsSync(appTsxPath)) fs.unlinkSync(appTsxPath);

    spinner.succeed('Expo Router structure created');
  }

  // Step 3: Install NativeWind if requested
  if (useNativeWind) {
    spinner = ora('Installing NativeWind...').start();

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

    spinner = ora('Configuring Tailwind CSS...').start();

    execCommand('npx tailwindcss init', projectPath, true);

    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
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

    const metroConfig = `const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });`;

    fs.writeFileSync(path.join(projectPath, 'metro.config.js'), metroConfig);

    // Update babel.config.js for NativeWind
    const babelConfigPath = path.join(projectPath, 'babel.config.js');
    if (fs.existsSync(babelConfigPath)) {
      const babelConfig = `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};`;
      fs.writeFileSync(babelConfigPath, babelConfig);
    }

    if (useExpoRouter) {
      const layoutPath = path.join(projectPath, 'app', language === 'typescript' ? '_layout.tsx' : '_layout.js');
      if (fs.existsSync(layoutPath)) {
        let layoutContent = fs.readFileSync(layoutPath, 'utf8');
        if (!layoutContent.includes('global.css')) {
          layoutContent = `import '../global.css';\n${layoutContent}`;
          fs.writeFileSync(layoutPath, layoutContent);
        }
      }
    }

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

  // Step 4: Configure EAS
  if (useEAS) {
    spinner = ora('Configuring EAS Build...').start();

    const easConfig = {
      cli: {
        version: ">= 13.2.0"
      },
      build: {
        development: {
          developmentClient: true,
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

  // Step 5: Update app.json
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

  // Create README
  const readme = `# ${projectName}

React Native Expo project created with **ExpoFast** ⚡

## Stack

- **Language**: ${language === 'typescript' ? 'TypeScript' : 'JavaScript'}
- **Navigation**: ${useExpoRouter ? `Expo Router${useTabs ? ' with Tabs' : ''}` : 'None'}
- **Styling**: ${useNativeWind ? 'NativeWind (Tailwind CSS)' : 'StyleSheet'}
- **Build**: ${useEAS ? 'EAS Build' : 'Expo CLI'}
- **Package Manager**: ${packageManager}

## Get Started

\`\`\`bash
${packageManager} install
${packageManager === 'npm' ? 'npm' : packageManager} start
\`\`\`

${useNativeWind ? `## Styling with NativeWind

\`\`\`tsx
<View className="flex-1 items-center justify-center">
  <Text className="text-2xl font-bold">Hello!</Text>
</View>
\`\`\`
` : ''}

${useEAS ? `## Build with EAS

\`\`\`bash
eas login
eas build --profile development --platform android
\`\`\`
` : ''}

---

Created with [ExpoFast](https://github.com/jeanchristophe-Git/expofast) ⚡
`;

  fs.writeFileSync(path.join(projectPath, 'README.md'), readme);

  console.log(chalk.green.bold('\n✨ Your Expo project is ready!\n'));

  console.log(chalk.cyan('📦 Project includes:'));
  console.log(chalk.gray(`  ✓ ${language === 'typescript' ? 'TypeScript' : 'JavaScript'}`));
  if (useExpoRouter) console.log(chalk.gray(`  ✓ Expo Router${useTabs ? ' with Tabs' : ''}`));
  if (useNativeWind) console.log(chalk.gray('  ✓ NativeWind (Tailwind CSS)'));
  if (useEAS) console.log(chalk.gray('  ✓ EAS Build'));

  console.log(chalk.yellow('\n🚀 Next steps:\n'));
  console.log(chalk.cyan(`  1. cd ${projectName}`));
  console.log(chalk.cyan(`  2. ${packageManager} install`));
  console.log(chalk.cyan(`  3. ${packageManager === 'npm' ? 'npm' : packageManager} start`));

  if (useEAS) {
    console.log(chalk.yellow('\n📱 To build with EAS:\n'));
    console.log(chalk.cyan('  1. eas login'));
    console.log(chalk.cyan('  2. eas build --profile development --platform android'));
  }

  console.log(chalk.gray('\n📖 Check README.md for detailed documentation'));
  console.log(chalk.green('\nHappy coding! 🎉\n'));
}

main().catch(error => {
  console.error(chalk.red('\n❌ Error:'), error.message);
  process.exit(1);
});
