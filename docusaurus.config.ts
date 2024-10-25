import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	title: 'Topology Documentation',
	tagline: 'Building distributed real-time applications',
	favicon: 'img/favicon.ico',

	url: 'https://docs.topology.gg',
	baseUrl: '/',

	organizationName: 'topology-foundation',
	projectName: 'docs-topology',

	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	markdown: {
		mermaid: true
	},

	presets: [
		[
			'classic',
			{
				docs: {
					routeBasePath: '/',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themes: ['@docusaurus/theme-mermaid'],

	themeConfig: {
		image: 'https://avatars.githubusercontent.com/u/157637200',
		navbar: {
			title: 'Topology Documentation',
			logo: {
				alt: 'topology_logo',
				src: 'https://avatars.githubusercontent.com/u/157637200',
				href: '/',
			},
			items: [
				{
					href: 'https://github.com/topology-foundation',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [],
			copyright: `Copyright © ${new Date().getFullYear()} Topology. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
