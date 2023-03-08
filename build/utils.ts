import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script as string) as any;
  if (result) {
    const mode = result[1] as string;
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

/**
 * 返回配置文件内容
 */
export function getEnvConfig(match = 'VITE_', confFiles = getConfFiles()) {
  let envConfig: Partial<ViteEnv> = {};
  confFiles.forEach(item => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${item}`, e);
    }
  });
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach(key => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    // if (typeof realName === 'string') {
    // 	process.env[envName] = realName;
    // } else if (typeof realName === 'object') {
    // 	process.env[envName] = JSON.stringify(realName);
    // }
  }
  return ret;
}

/**
 * 设计到npm\pnpm 启动指令：cross-env NODE_ENV=production、cross-env REPORT=true等
 */
export function isReportMode(): boolean {
  return process.env.REPORT === 'true';
}
