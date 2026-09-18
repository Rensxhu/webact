import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.nuxt/**', '**/.output/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        // Nuxt 3 auto-imports these composables/macros; declare them here so
        // eslint doesn't flag them as undefined outside of a Nuxt build.
        useRoute: 'readonly',
        useRouter: 'readonly',
        useRuntimeConfig: 'readonly',
        useHead: 'readonly',
        useNuxtApp: 'readonly',
        defineNuxtConfig: 'readonly',
        defineNuxtPlugin: 'readonly',
        navigateTo: 'readonly',
        definePageMeta: 'readonly',
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    rules: {
      // Nuxt's file-based routing requires page filenames like index.vue,
      // destinations.vue, etc.
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['**/__tests__/*'],
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting,
])
