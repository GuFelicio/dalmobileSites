/// <reference types="@cloudflare/workers-types" />
/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

/**
 * As páginas internas que saíram na v5 (06/10/2026), quando os dois sites
 * passaram a ser só a home. Cada endereço antigo responde 301 para a seção da
 * home que tem o mesmo assunto: o Google transfere a relevância e quem tinha o
 * link (no WhatsApp, num cartão, num favorito) cai no lugar certo, e não num
 * 404. O código dessas páginas está na tag v4-multipagina.
 *
 *   /ambientes e /ambientes/*  → /#projetos
 *   /projetos e /projetos/*    → /#projetos  (rota sem link desde a v1)
 *   /a-dalmobile               → /#a-dalmobile
 *   /arquitetos                → /#arquitetos
 *   /a-loja                    → /#a-loja
 */
const REDIRECIONAMENTOS: [RegExp, string][] = [
  [/^\/(ambientes|projetos)(\/.*)?$/, "/#projetos"],
  [/^\/a-dalmobile\/?$/, "/#a-dalmobile"],
  [/^\/arquitetos\/?$/, "/#arquitetos"],
  [/^\/a-loja\/?$/, "/#a-loja"],
];

interface Env {
  ASSETS: Fetcher;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    for (const [rota, destino] of REDIRECIONAMENTOS) {
      if (rota.test(url.pathname)) return Response.redirect(new URL(destino, url).toString(), 301);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
