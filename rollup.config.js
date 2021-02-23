import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import url from "@rollup/plugin-url";
import postcss from "rollup-plugin-postcss";
import external from "rollup-plugin-peer-deps-external";
import svgr from "@svgr/rollup";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: false,
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: false,
        },
    ],
    plugins: [
        external(),
        postcss({
            modules: true,
        }),
        url(),
        svgr(),
        resolve(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
            useTsconfigDeclarationDir: true,
        }),
        commonjs(),
        terser()
    ],
};
