interface Config {
  baseUrl: string;
}

const checkConfig = (server: string): Config | {} => {
  let config: Config | {} = {};
  switch (server) {
    case "local":
      config = {
        baseUrl: "http://localhost:8000",
      };
      break;
    case "production":
      config = {
        baseUrl: "http://localhost:8000", // Замените на ваш production URL когда будете деплоить
      };
      break;
    default:
      config = {
        baseUrl: "http://localhost:8000",
      };
      break;
  }
  return config;
};

export const selectServer = "local";
export const config = checkConfig(selectServer) as Config;