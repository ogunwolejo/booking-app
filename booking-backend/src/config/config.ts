import "dotenv/config";
import {logger} from "../utils/logger.js";
import type {AppConfig} from "../types/config.types.js";

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    logger.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
  return value;
};

// Ensure the key in the .env is also in this array
const requiredEnvVars: string[] = ["ALLOW_ORIGINS", "ENV", "PORT"];

const validateEnv = (): AppConfig => {
  const missing: string[] = [];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    missing.forEach((key) => {
      logger.error(`Missing environment variable: ${key}`);
    });
    process.exit(1);
  }

  return {
    allowOrigins: getEnv("ALLOW_ORIGINS"),
    environment: getEnv("ENV"),
    port: Number(getEnv("PORT")),
  };
};

const config = validateEnv();

export default config;
