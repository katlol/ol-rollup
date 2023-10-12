import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'main.js',
  output: [
    {file: 'ol-custom.js',
      format: 'iife',
      name: 'ol',
      exports: "named",
      sourcemap: true,
    }
  ],
  plugins: [
    nodeResolve({browser: true}),
    commonjs(),
    terser()
  ],
  onwarn: function(warning, superOnWarn) {
    /*
     * skip certain warnings
     * https://github.com/openlayers/openlayers/issues/10245
     */
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    superOnWarn(warning);
  }
};
