// Components
export { default as NavBar } from './components/NavBar'
export { ThemeProvider } from './components/ThemeProvider'
export { createRootLayout, createLayoutMetadata } from './components/RootLayout'

// Legal Pages
export {
    PrivacyPolicyPage,
    TermsOfServicePage,
    CookiePolicyPage,
    AboutPage,
    ContactPage
} from './components/LegalPages'

// Pages
export { createHomePage } from './pages/HomePage'
export { createPostPage } from './pages/PostPage'

// Lib
export * from './lib/posts'

// Types
export type { Post } from './lib/posts'
