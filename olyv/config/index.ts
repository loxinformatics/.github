type Protocol = "http" | "https";

// Extract environment variables with fallback defaults
const env = {
  debug: process.env.DEBUG || "true",
  djangoProtocol: (process.env.DJANGO_PROTOCOL || "http") as Protocol,
  djangoHost: (process.env.DJANGO_HOST || "localhost").replace(/\/+$/, ""),
  djangoPort: process.env.DJANGO_PORT || "8000", // Default Django port
  nextProtocol: (process.env.NEXT_PROTOCOL || "http") as Protocol,
  nextHost: (process.env.NEXT_HOST || "localhost").replace(/\/+$/, ""),
  nextPort: process.env.NEXT_PORT || "3000", // Default Next.js port
  homeUrl: process.env.HOME_URL || "/",
  loginUrl: process.env.LOGIN_URL || "/auth/login",
  loginRedirect: process.env.LOGIN_REDIRECT,
  logoutUrl: process.env.LOGOUT_URL || "/auth/logout",
  logoutRedirect: process.env.LOGOUT_REDIRECT,
};

const olyvConfig = {
  debug: env.debug,

  django: {
    protocol: env.djangoProtocol,
    host: env.djangoHost,
    port: env.djangoPort,
    get url() {
      return `${this.protocol}://${this.host}${
        this.port ? ":" + this.port : ""
      }`;
    },
  },

  next: {
    protocol: env.nextProtocol,
    host: env.nextHost,
    port: env.nextPort,
    get url() {
      return `${this.protocol}://${this.host}${
        this.port ? ":" + this.port : ""
      }`;
    },
  },

  endpoints: {
    home: env.homeUrl,
    login: env.loginUrl,
    get loginRedirect() {
      return env.loginRedirect || this.home;
    },
    logout: env.logoutUrl,
    get logoutRedirect() {
      return env.logoutRedirect || this.login;
    },
  },

  imagesRemotePatterns: [
    {
      protocol: env.djangoProtocol,
      hostname: env.djangoHost,
      port: env.djangoPort || undefined,
      pathname: "/**",
    },
  ] as const,

  serverActionsAllowedOrigins: [
    env.nextHost,
    `localhost${env.nextPort ? ":" + env.nextPort : ""}`,
    `127.0.0.1${env.nextPort ? ":" + env.nextPort : ""}`,
  ].filter(Boolean) as string[],
} as const;

export default olyvConfig;
