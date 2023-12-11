import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.(test|spec|ispec|uspec).ts"],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: ["**/*.(test|spec|ispec|uspec).ts"],
    },
  },
});
