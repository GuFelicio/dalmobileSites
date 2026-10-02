/// <reference types="@cloudflare/workers-types" />
/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

import { AMBIENTES } from "../lib/ambientes.ts";
import { ambientesDaUnidade } from "../lib/ambientes-da-unidade.ts";

/**
 * Ambientes da lista oficial (lib/ambientes.ts) que ESTA unidade não publica —
 * hoje, o banheiro em Caraguatatuba, que ficou sem foto na copy v3. O endereço
 * deles redireciona com 301 para o hub, em vez de dar 404: o Google e quem
 * tinha o link vão para a página certa. Calculado dos dados, não escrito à
 * mão: quando o ambiente voltar a ter foto, o redirecionamento some sozinho.
 */
const AMBIENTES_FORA_DO_SITE = new Set(
  AMBIENTES.map((a) => a.slug).filter((slug) => !ambientesDaUnidade().some((a) => a.slug === slug)),
);

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

    const ambiente = url.pathname.match(/^\/ambientes\/([^/]+)\/?$/);
    if (ambiente && AMBIENTES_FORA_DO_SITE.has(ambiente[1])) {
      return Response.redirect(new URL("/ambientes", url).toString(), 301);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
