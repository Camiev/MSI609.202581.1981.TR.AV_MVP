/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly REACT_APP_API_URL?: string
  readonly REACT_APP_FIREBASE_PROJECT_ID?: string
  readonly REACT_APP_FIREBASE_EMULATOR_HOST?: string
  readonly DEV?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly DEV: boolean
}


