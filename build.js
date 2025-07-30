// build.js
import esbuild from 'esbuild';
import fs from 'fs-extra';
import path from 'path';

const outdir = 'dist';
const publicDir = 'public';

async function build() {
    try {
        // 1. Ensure the output directory is clean
        await fs.emptyDir(outdir);
        console.log(`Cleaned output directory: ${outdir}`);

        // 2. Build the main TSX file
        await esbuild.build({
            entryPoints: ['index.tsx'],
            bundle: true,
            outfile: path.join(outdir, 'bundle.js'),
            jsx: 'automatic',
            define: { "process.env.NODE_ENV": "'production'" },
            sourcemap: true,
            minify: true,
        });
        console.log('JavaScript bundled successfully.');

        // 3. Copy public assets to the output directory
        if (await fs.pathExists(publicDir)) {
            await fs.copy(publicDir, outdir, {
                dereference: true,
                filter: (src) => !src.includes('.DS_Store'), // Optional: ignore system files
            });
            console.log('Public assets copied successfully.');
        } else {
            console.warn(`Public directory not found at ${publicDir}. No assets were copied.`);
        }

        console.log('Build finished successfully!');

    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();
