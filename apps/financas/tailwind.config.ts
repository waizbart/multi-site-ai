import type { Config } from 'tailwindcss'
import baseConfig from '@multi-site-ai/ui/tailwind.config'

const config: Config = {
    ...baseConfig,
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/shared-app/src/**/*.{js,ts,jsx,tsx,mdx}',
        '../../packages/shared-app/dist/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [
        ...(baseConfig.plugins || []),
        require('@tailwindcss/typography'),
    ],
}

export default config 