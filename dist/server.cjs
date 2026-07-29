var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.includes(".")) {
      const rootPath = process.env.NODE_ENV === "production" ? import_path.default.join(process.cwd(), "dist") : process.cwd();
      const possibleHtml = import_path.default.join(rootPath, req.path + ".html");
      if (import_fs.default.existsSync(possibleHtml)) {
        req.url = req.path + ".html" + (req.url.includes("?") ? "?" + req.url.split("?")[1] : "");
      }
    }
    next();
  });
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, message, category } = req.body;
    res.json({
      success: true,
      message: `Terima kasih ${name || "Kak"}! Pesan Anda telah diterima. Tim CS GemilangKatunOutbond akan segera menghubungi WhatsApp Anda dalam 5-15 menit.`
    });
  });
  app.post("/api/booking", (req, res) => {
    const { name, phone, packageId, packageName, participants, eventDate } = req.body;
    res.json({
      success: true,
      message: `Pemesanan paket "${packageName || "Outbound"}" untuk ${participants || 1} peserta pada tanggal ${eventDate || "segera"} berhasil dicatat! Customer Support kami akan memverifikasi via WhatsApp.`
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "mpa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      let pagePath = req.path;
      if (pagePath === "/") {
        pagePath = "/index.html";
      } else if (!pagePath.endsWith(".html") && !pagePath.includes(".")) {
        pagePath += ".html";
      }
      const fullPath = import_path.default.join(distPath, pagePath);
      if (import_fs.default.existsSync(fullPath)) {
        res.sendFile(fullPath);
      } else if (pagePath.startsWith("/paket")) {
        res.sendFile(import_path.default.join(distPath, "paket-detail.html"));
      } else if (pagePath.startsWith("/blog")) {
        res.sendFile(import_path.default.join(distPath, "blog-detail.html"));
      } else {
        res.sendFile(import_path.default.join(distPath, "index.html"));
      }
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GemilangKatunOutbond Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
