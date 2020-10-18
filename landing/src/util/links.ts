import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faNpm } from '@fortawesome/free-brands-svg-icons/faNpm';
import { faBook } from '@fortawesome/free-solid-svg-icons/faBook';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons/faLaptopCode';

export interface LinkData {
    title: string;
    description: string;
    url: string;
    color: string;
    icon: any;
}

export const GitHubLink: LinkData = {
    title: 'GitHub',
    description: '',
    url: 'https://github.com/TimboKZ/Chonky',
    color: '#515c67',
    icon: faGithub,
};

export const NpmLink: LinkData = {
    title: 'NPM',
    description: '',
    url: 'https://www.npmjs.com/package/chonky',
    color: '#01a3a4',
    icon: faNpm,
};

export const DiscordLink: LinkData = {
    title: 'Discord',
    description: '',
    url: 'https://discord.gg/4HJaFn9',
    color: '#3e3c62',
    icon: faDiscord,
};

export const Docs1x: LinkData = {
    title: '1.x Docs',
    description: 'Documentation for the current Hooks version of Chonky',
    url: 'https://chonky.io/docs/1.x/',
    color: '#2e86de',
    icon: faBook,
};

export const Storybook1x: LinkData = {
    title: '1.x Storybook',
    description: 'Interactive code examples for the current version of Chonky',
    url: 'https://chonky.io/storybook/1.x/',
    color: '#733eda',
    icon: faLaptopCode,
};

export const Docs0x: LinkData = {
    title: '0.x Docs',
    description: 'Documentation for the legacy, pre-Hooks version of Chonky',
    url: 'https://chonky.io/docs/0.x/',
    color: '#777',
    icon: faBook,
};

export const MostRecentDocs = Docs1x;

export const MostRecentStorybook = Storybook1x;
