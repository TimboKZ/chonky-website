import chonkyPackage from 'chonky/package.json';

export default {
    title: `Chonky v${chonkyPackage.version}`,
    base: '/docs/1.x/',
    src: 'src/',
    dest: 'dist/',
    public: 'static/',
    typescript: true,
    menu: ['Introduction', 'Installation & usage', 'Immutability', 'File Browser demo'],
};
