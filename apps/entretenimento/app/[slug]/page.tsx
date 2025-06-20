import { createPostPage } from '@multi-site-ai/shared-app'

const SITE_ID = 'entretenimento'

const postPageConfig = createPostPage(SITE_ID)

export const generateStaticParams = postPageConfig.generateStaticParams

export const revalidate = postPageConfig.revalidate

export default postPageConfig.PostPage 