import * as dotenv from 'dotenv'
import { type Configuration } from 'electron-builder'

dotenv.config()

const config = {
    appId: `${process.env.VITE_APPID}`,
    productName: `${process.env.VITE_TITLE}`,
    directories: {
        buildResources: 'build'
    },
    files: [
        '!**/.vscode/*',
        '!src/*',
        '!electron.vite.config.{js,ts,mjs,cjs}',
        '!{.eslintignore,.eslintrc.cjs,eslint.config.js,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
        '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
        '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}'
    ],
    asarUnpack: ['resources/**'],
    win: {
        executableName: `${process.env.VITE_TITLE}`
    },
    nsis: {
        artifactName: '${productName} installer.${ext}',
        shortcutName: '${productName}',
        uninstallDisplayName: '${productName}',
        createDesktopShortcut: false,
        runAfterFinish: true,
        deleteAppDataOnUninstall: true
    },
    mac: {
        target: 'dmg',
        entitlementsInherit: 'build/entitlements.mac.plist',
        extendInfo: [
            {
                NSCameraUsageDescription: "Application requests access to the device's camera."
            },
            {
                NSMicrophoneUsageDescription:
                    "Application requests access to the device's microphone."
            },
            {
                NSDocumentsFolderUsageDescription:
                    "Application requests access to the user's Documents folder."
            },
            {
                NSDownloadsFolderUsageDescription:
                    "Application requests access to the user's Downloads folder."
            }
        ],
        notarize: false
    },
    dmg: {
        artifactName: '${productName}.${ext}'
    },
    linux: {
        target: ['AppImage'],
        maintainer: 'Project One Devs',
        category: 'World of Warcraft'
    },
    appImage: {
        artifactName: '${productName}.${ext}'
    },
    npmRebuild: false
    //   publish: {
    //     provider: "generic",
    //     url: "https://example.com/auto-updates",
    //   },
} satisfies Configuration

export default config
