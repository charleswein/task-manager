export type NodeEnv = 'development' | 'production';
export interface EnvVariables {
  mode: NodeEnv;
  port: number;
  platform: BuildPlatform;
}

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  source: string;
  public: string;
}

export type BuildMode ='development' | 'production';
export type BuildPlatform = 'desktop' | 'mobile';

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  platform: BuildPlatform;
  analyzerReport?: boolean;
}
