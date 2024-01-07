declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GITHUB_AUTH_TOKEN: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
        }
    }
}
declare module '*.module.scss' {
    const content: { [className: string]: string };
    export = content;
}
declare module '*.module.css' {
    const content: { [className: string]: string };
    export = content;
}
