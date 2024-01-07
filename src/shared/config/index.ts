/**
 * Модуль инициализации env-переменных
 * @remark Если не найдено значение хоть одной переменной,
 * Приложение сразу выбросит ошибку, при инициализации модуля
 * @module
 */

/**
 * Получение env-переменной
 * @throwable
 */
const getEnvVar = (key: string) => {
    if (process.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }
    return process.env[key] || "";
};

export const GOOGLE_MAP_API_KEY = getEnvVar("REACT_APP_GOOGLE_MAP_API_KEY");
export const GOOGLE_MAP_ID = getEnvVar("REACT_APP_GOOGLE_MAP_ID");

/** Режим запуска программы */
export const NODE_ENV = getEnvVar("NODE_ENV");
/** Режим разработки */
export const isDevEnv = NODE_ENV === "development";
/** Режим продакшена */
export const isProdEnv = NODE_ENV === "production";

export const BASE_URL_API = "https://meetups-dev-6vuzexfx2q-lm.a.run.app/api/v1/"
export const LOGIN_URL = "login/"
export const REGISTRATION_URL = "signup/"
export const LOGOUT_URL = "logout/"
