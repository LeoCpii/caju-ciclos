import path from 'path';
import { glob } from 'glob';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import packageJson from './package.json';

const pluginsCSS = [
    image(),
    postcss({
        use: [['sass']],
        preprocessor: (_, id) => new Promise((resolve) => {
            const result = sass.renderSync({ file: id });
            resolve({ code: result.css.toString() });
        }),
        minimize: true,
        sourceMap: true,
        extract: 'styles/index.css',
        extensions: ['.sass', '.css', '.scss'],
        additionalData: '@use "src/styles/main.scss" as *;',
    })
];

const pluginsTS = [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.stories.tsx', 'dist'] }),
    terser()
];

export default [
    {
        input: glob.sync('src/**/index.ts'),
        external: [
            ...Object.keys(packageJson.peerDependencies),
            '@caju/services',
        ],
        output: [
            {
                dir: path.dirname(packageJson.main),
                format: 'esm',
                sourcemap: true,
                preserveModules: true,
                preserveModulesRoot: 'src',
            },
        ],
        plugins: [...pluginsTS, ...pluginsCSS],
    }
];
