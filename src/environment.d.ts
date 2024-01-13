declare module '*.module.scss' {
    const content: { [className: string]: string };
    export = content;
}
declare module '*.module.css' {
    const content: { [className: string]: string };
    export = content;
}
