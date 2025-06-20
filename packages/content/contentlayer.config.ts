import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'Título do post',
            required: true,
        },
        description: {
            type: 'string',
            description: 'Descrição do post',
            required: true,
        },
        date: {
            type: 'date',
            description: 'Data de publicação',
            required: true,
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
            description: 'Tags do post',
            default: [],
        },
        image: {
            type: 'string',
            description: 'URL da imagem de capa',
            required: false,
        },
        site: {
            type: 'string',
            description: 'ID do site',
            required: true,
        },
        draft: {
            type: 'boolean',
            description: 'Se o post é um rascunho',
            default: false,
        },
        featured: {
            type: 'boolean',
            description: 'Se o post é destaque',
            default: false,
        },
        author: {
            type: 'string',
            description: 'Autor do post',
            required: false,
        },
        slug: {
            type: 'string',
            description: 'Slug do post',
            required: false,
        },
        canonical: {
            type: 'string',
            description: 'URL canônica do post',
            required: false,
        },
        readTime: {
            type: 'string',
            description: 'Tempo de leitura do post',
            required: false,
        },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => {
                const parts = doc._raw.flattenedPath.split('/')
                return parts[parts.length - 1]
            },
        },
        url: {
            type: 'string',
            resolve: (doc) => {
                const parts = doc._raw.flattenedPath.split('/')
                return `/${parts[parts.length - 1]}`
            },
        },
        readingTime: {
            type: 'number',
            resolve: (doc) => {
                const wordsPerMinute = 200
                const words = doc.body.raw.trim().split(/\s+/).length
                return Math.ceil(words / wordsPerMinute)
            },
        },
    },
}))

export default makeSource({
    contentDirPath: './sites',
    documentTypes: [Post],
    disableImportAliasWarning: true,
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    },
                },
            ],
        ],
    },
}) 