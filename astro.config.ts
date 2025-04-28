import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import netlify from '@astrojs/netlify';

import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';  // ✅ 新增
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

// ✅ 自定义 slugify，支持中文锚点（URL 编码）
const slugify = (str: string) =>
  encodeURIComponent(str.trim().toLowerCase().replace(/\s+/g, '-'));

// ✅ rehype 层 slugify（和 remark 层一样）
const rehypeSlugify = slugify;

export default defineConfig({
  site: 'https://realfelix.netlify.app',
  output: 'static',
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkSlug,
      [remarkAutolinkHeadings, { behavior: 'append', slugify }],  // ✅ remark 层 slugify
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypeSlug, { slug: rehypeSlugify }],  // ✅ rehype 层 slugify
      [rehypeAutolinkHeadings, { behavior: 'append' }],  // ✅ rehype 层加链接
    ],
  },
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'Spectre',
      openGraph: {
        home: {
          title: 'Spectre',
          description: 'A minimalistic theme for Astro.'
        },
        blog: {
          title: 'Blog',
          description: 'News and guides for Spectre.'
        },
        projects: {
          title: 'Projects'
        }
      },
      giscus: {
        repository: 'stellariumImpl/comment',
        repositoryId: 'R_kgDOIssBOQ',
        category: 'General',
        categoryId: 'DIC_kwDOIssBOc4CTVLD',
        mapping: 'pathname',
        strict: true,
        reactionsEnabled: true,
        emitMetadata: false,
        lang: 'en',
      }
    })
  ],
  // adapter: node({
  //   mode: 'standalone'
  // })
  adapter: netlify()
});
