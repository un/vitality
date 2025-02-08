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
          "./assets/fonts/GeistMono-Black.otf",
          "./assets/fonts/GeistMono-Bold.otf",
          "./assets/fonts/GeistMono-Light.otf",
          "./assets/fonts/GeistMono-Medium.otf",
          "./assets/fonts/GeistMono-Regular.otf",
          "./assets/fonts/GeistMono-SemiBold.otf",
          "./assets/fonts/GeistMono-Thin.otf",
          "./assets/fonts/GeistMono-UltraBlack.otf",
          "./assets/fonts/GeistMono-UltraLight.otf",
        ],
      },
    ],
  ],
});
