import {buildWebpack} from "./config/build/buildWebpack";
import path from "path";
import {EnvVariables} from "./config/build/types";

export default (env: EnvVariables) => {
    return buildWebpack({
        port: env.port,
        paths: {
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            html: path.resolve(__dirname, 'public', 'index.html'),
            output: path.resolve(__dirname, 'build'),
            source: path.resolve(__dirname, 'src'),
            public: path.resolve(__dirname, 'public'),
        },
        mode: env.mode,
        analyzerReport: true,
        platform: env.platform ?? 'desktop',
    });
}
