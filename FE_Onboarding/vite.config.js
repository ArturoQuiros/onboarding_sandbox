import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isProduction = mode === "production";

  return {
    plugins: [react()],

    // Alias para imports más limpios
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@api": path.resolve(__dirname, "./src/Api"),
        "@global": path.resolve(__dirname, "./src/Global"),
        "@modules": path.resolve(__dirname, "./src/Modules"),
        "@assets": path.resolve(__dirname, "./src/Global/assets"),
        "@auth": path.resolve(__dirname, "./src/Global/auth"),
        "@context": path.resolve(__dirname, "./src/Global/Context"),
        "@hooks": path.resolve(__dirname, "./src/Global/hooks"),
        "@translations": path.resolve(__dirname, "./src/Global/Translations"),
      },
    },

    // Servidor de desarrollo
    server: {
      port: 5173,
      open: true,
      host: true, // Permite acceso desde red local (testing en móviles)
    },

    // Preview (después de build)
    preview: {
      port: 4173,
      open: true,
    },

    // Configuración de build
    build: {
      outDir: "dist",
      sourcemap: isDevelopment, // Source maps solo en dev
      minify: isProduction ? "esbuild" : false, // esbuild es más rápido que terser
      target: "esnext", // Solo navegadores modernos

      // Eliminación de console en producción
      ...(isProduction && {
        esbuild: {
          drop: ["console", "debugger"],
        },
      }),

      // Rollup options
      rollupOptions: {
        output: {
          // Code splitting por librerías
          manualChunks: isProduction
            ? {
                "react-vendor": ["react", "react-dom"],
                "router-vendor": ["react-router-dom"],
                "axios-vendor": ["axios"],
              }
            : undefined,

          // Nombres de archivos con hash en producción
          entryFileNames: isProduction
            ? "assets/js/[name].[hash].js"
            : "assets/js/[name].js",
          chunkFileNames: isProduction
            ? "assets/js/[name].[hash].js"
            : "assets/js/[name].js",
          assetFileNames: isProduction
            ? "assets/[ext]/[name].[hash].[ext]"
            : "assets/[ext]/[name].[ext]",
        },
      },

      chunkSizeWarningLimit: 1000, // Warning si chunk > 1MB
    },

    // Optimización de dependencias
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "axios"],
    },

    // CSS
    css: {
      modules: {
        localsConvention: "camelCase", // .my-class → styles.myClass
      },
      devSourcemap: isDevelopment,
    },
  };
});
