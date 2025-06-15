import { createPostPage } from '@multi-site-ai/shared-app'

const SITE_ID = 'tech-news'

const postPageConfig = createPostPage(SITE_ID)

export const generateStaticParams = postPageConfig.generateStaticParams
export const generateMetadata = postPageConfig.generateMetadata
export const revalidate = postPageConfig.revalidate

export default postPageConfig.PostPage