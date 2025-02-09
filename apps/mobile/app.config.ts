import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Augmented",
  slug: "augmented",
  scheme: "augmented",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#1F104A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "com.augmentedhq",
    supportsTablet: true,
    config: {
      usesNonExemptEncryption: true,
    },
  },
  android: {
    package: "com.augmentedhq",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  // extra: {
  //   eas: {
  //     projectId: "your-eas-project-id",
  //   },
  // },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    [
      "expo-sqlite",
      {
        enableFTS: true,
        useSQLCipher: true,
      },
    ],
    [
      "expo-secure-store",
      {
        configureAndroidBackup: true,
        faceIDPermission:
          "Allow Augmented to access your Face ID biometric data.",
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/JetBrainsMono-Bold.otf",
          "./assets/fonts/JetBrainsMono-BoldItalic.otf",
          "./assets/fonts/JetBrainsMono-ExtraBold.otf",
          "./assets/fonts/JetBrainsMono-ExtraBoldItalic.otf",
          "./assets/fonts/JetBrainsMono-ExtraLight.otf",
          "./assets/fonts/JetBrainsMono-ExtraLightItalic.otf",
          "./assets/fonts/JetBrainsMono-Light.otf",
          "./assets/fonts/JetBrainsMono-LightItalic.otf",
          "./assets/fonts/JetBrainsMono-Medium.otf",
          "./assets/fonts/JetBrainsMono-MediumItalic.otf",
          "./assets/fonts/JetBrainsMono-SemiBold.otf",
          "./assets/fonts/JetBrainsMono-SemiBoldItalic.otf",
          "./assets/fonts/JetBrainsMono-Thin.otf",
          "./assets/fonts/JetBrainsMono-ThinItalic.otf",
          "./assets/fonts/JetBrainsMono-Regular.otf",
          "./assets/fonts/JetBrainsMono-Italic.otf",
        ],
      },
    ],
  ],
});
