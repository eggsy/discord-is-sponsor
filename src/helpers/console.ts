import consola from "consola";

export const log = (message: any) => {
  consola.log(message);
};

export const error = (message: any) => {
  consola.error(message);
};

export const warn = (message: any) => {
  consola.warn(message);
};

export const info = (message: any) => {
  consola.info(message);
};

export const success = (message: any) => {
  consola.success(message);
};

export default {
  log,
  error,
  warn,
  info,
  success,
};
