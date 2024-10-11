import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	title: 'Topology - Documentation',
	tagline: 'Building distributed real-time applications',
	favicon: 'img/favicon.ico',

	// Set the production url of your site here
	url: 'https://docs.topology.gg',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'topology-foundation', // Usually your GitHub org/user name.
	projectName: 'docs-topology', // Usually your repo name.

	onBrokenLinks: 'warn',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
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
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],
	themes: ['@docusaurus/theme-mermaid'],

	themeConfig: {
		// Replace with your project's social card
		image: 'https://avatars.githubusercontent.com/u/157637200',
		navbar: {
			title: 'Topology',
			logo: {
				alt: 'topology_logo',
				src: 'https://avatars.githubusercontent.com/u/157637200',
				href: 'https://topology.gg/',
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
			links: [
				{
					items: [
						{
							html: `<a href="https://topology.gg" target="_blank"><img src="/img/logo_horizontal_dark.png"/></a>`
						}
					]
				},
				{
					title: 'Documentation',
					items: [
						{
							label: 'Get Started',
							href: 'https://docs.topology.gg/get_started',
						},
						{
							label: 'Technical Overview',
							href: 'https://docs.topology.gg/technical_overview',
						},
						{
							label: 'Tutorials',
							href: 'https://docs.topology.gg/tutorials',
						},
						{
							label: 'Topchain',
							href: 'https://docs.topology.gg',
						}
					],
				},
				{
					title: 'Social',
					items: [
						{
							label: 'Website',
							href: 'https://topology.gg',
						},
						{
							label: 'Blog',
							href: 'https://blog.topology.gg',
						},
						{
							label: 'X (Twitter)',
							href: 'https://x.com/topology_gg',
						},
						{
							label: 'Youtube',
							href: 'https://www.youtube.com/@topology_gg',
						}
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Telegram',
							href: 'https://t.me/topologyfrens',
						},
						{
							label: 'Discord',
							href: 'https://discord.gg/8hzsMMhX',
						},
					],
				}
			],
			copyright: `Copyright © ${new Date().getFullYear()} Topology. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
