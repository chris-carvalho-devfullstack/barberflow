import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // O compat.extends traduz as regras legacy do Next para o Flat Config
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Seus ignores globais
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".open-next/**", // <-- Recomendo muito ignorar a pasta do OpenNext também!
    ],
  },
];

export default eslintConfig;
