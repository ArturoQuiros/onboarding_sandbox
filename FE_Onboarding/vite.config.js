import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  const isProduction = mode === "production";

  // Cargar variables de entorno según el modo
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react({
        // Fast Refresh para mejor experiencia de desarrollo
        fastRefresh: true,
        // Habilitar React DevTools en producción (opcional)
        // babel: {
        //   plugins: [
        //     ['@babel/plugin-transform-react-jsx-development', { runtime: 'automatic' }]
        //   ]
        // }
      }),
    ],

    // Alias para imports más limpios
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@modules": path.resolve(__dirname, "./src/Modules"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@context": path.resolve(__dirname, "./src/Global/Context"),
        "@api": path.resolve(__dirname, "./src/Api"),
      },
      // Extensiones que Vite resolverá automáticamente
      extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"],
    },

    // Configuración del servidor de desarrollo
    server: {
      port: 5173,
      host: true, // Exponer en red local (útil para testing en móviles)
      open: true, // Abre el navegador automáticamente
      cors: true,
      strictPort: false, // Si el puerto está ocupado, busca otro disponible

      // Proxy para evitar CORS en desarrollo (opcional)
      // proxy: {
      //   '/api': {
      //     target: env.VITE_ONBOARDING_API,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },

      // Hot Module Replacement (HMR)
      hmr: {
        overlay: true, // Mostrar errores en overlay
      },

      // Configuración de headers (seguridad)
      headers: {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
      },
    },

    // Configuración de preview (después de build)
    preview: {
      port: 4173,
      host: true,
      open: true,
      strictPort: false,
    },

    // Optimizaciones de build
    build: {
      outDir: "dist",
      assetsDir: "assets",

      // Source maps según entorno
      sourcemap: isDevelopment,

      // Minificación según entorno
      minify: isProduction ? "terser" : false,

      // Target de navegadores (ES2015 = IE11+, ESNext = navegadores modernos)
      target: isProduction ? "es2015" : "esnext",

      // CSS code splitting
      cssCodeSplit: true,

      // Reportar tamaño de chunks comprimidos
      reportCompressedSize: isProduction,

      // Terser SOLO en producción
      ...(isProduction && {
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: [
              "console.log",
              "console.info",
              "console.debug",
              "console.warn",
            ],
            passes: 2, // Múltiples pasadas de optimización
          },
          format: {
            comments: false,
          },
          mangle: {
            safari10: true, // Fix para Safari 10
          },
        },
      }),

      // Rollup options
      rollupOptions: {
        output: {
          // Code splitting inteligente
          manualChunks: isProduction
            ? (id) => {
                // Separar node_modules en chunks
                if (id.includes("node_modules")) {
                  // React y React DOM en un chunk
                  if (id.includes("react") || id.includes("react-dom")) {
                    return "react-vendor";
                  }
                  // React Router en otro chunk
                  if (id.includes("react-router")) {
                    return "router-vendor";
                  }
                  // Axios en otro chunk
                  if (id.includes("axios")) {
                    return "axios-vendor";
                  }
                  // Resto de librerías en vendor general
                  return "vendor";
                }
              }
            : undefined,

          // Nombres de archivo según entorno
          entryFileNames: isProduction
            ? "assets/js/[name].[hash].js"
            : "assets/js/[name].js",
          chunkFileNames: isProduction
            ? "assets/js/[name].[hash].js"
            : "assets/js/[name].js",
          assetFileNames: (assetInfo) => {
            // Organizar assets por tipo
            const info = assetInfo.name.split(".");
            const ext = info[info.length - 1];

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name]${
                isProduction ? ".[hash]" : ""
              }.[ext]`;
            }
            if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
              return `assets/fonts/[name]${
                isProduction ? ".[hash]" : ""
              }.[ext]`;
            }
            return `assets/[name]${isProduction ? ".[hash]" : ""}.[ext]`;
          },

          // Optimización de imports dinámicos
          inlineDynamicImports: false,
        },

        // Suprimir warnings específicos
        onwarn(warning, warn) {
          // Ignorar warnings de circular dependencies en node_modules
          if (
            warning.code === "CIRCULAR_DEPENDENCY" &&
            warning.message.includes("node_modules")
          ) {
            return;
          }
          warn(warning);
        },
      },

      // Límite de tamaño de chunk (warning si se excede)
      chunkSizeWarningLimit: 1000, // 1MB

      // Inline de assets pequeños como base64
      assetsInlineLimit: 4096, // 4KB
    },

    // Optimización de dependencias
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "axios"],
      // Excluir dependencias que no deben pre-bundlearse
      exclude: [],
      // Forzar pre-bundling incluso si están en cache
      force: false,
    },

    // Variables de entorno
    envPrefix: "VITE_",

    // Define variables globales
    define: {
      __APP_VERSION__: JSON.stringify(
        process.env.npm_package_version || "1.0.0"
      ),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },

    // CSS
    css: {
      // Módulos CSS
      modules: {
        localsConvention: "camelCase",
        scopeBehaviour: "local",
      },
      // PreProcessors
      preprocessorOptions: {
        // scss: {
        //   additionalData: `@import "@/styles/variables.scss";`,
        // },
      },
      // PostCSS (si necesitas autoprefixer, etc)
      postcss: {},

      // DevSourceMap
      devSourcemap: isDevelopment,
    },

    // JSON
    json: {
      namedExports: true,
      stringify: false,
    },

    // Configuración de logs
    logLevel: isDevelopment ? "info" : "warn",
    clearScreen: true,

    // Configuración de caché
    cacheDir: "node_modules/.vite",
  };
});
