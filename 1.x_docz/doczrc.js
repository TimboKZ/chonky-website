import chonkyPackage from 'chonky/package.json';

export default {
    title: `Chonky v${chonkyPackage.version} Docs`,
    base: '/docs/1.x/',
    src: 'src/',
    dest: 'build/',
    public: 'static/',
    typescript: true,
    menu: [
        'Introduction',
        'Installation & usage',
        'Immutability',
        'File Browser demo',
        {
            name: 'Chonky Storybook (ext)',
            route: 'https://chonky.io/storybook/1.x/',
        },
    ],
};
