import fs from 'fs-extra';
import { p as public_env } from './shared-server-58a5f352.js';

async function load({ params, route, url, cookies }) {
  let site = JSON.parse(fs.readFileSync(public_env.PUBLIC_KENER_FOLDER + "/site.json", "utf8"));
  let localTz = "GMT";
  const localTzCookie = cookies.get("localTz");
  if (!!localTzCookie) {
    localTz = localTzCookie;
  }
  let showNav = true;
  if (url.pathname.startsWith("/embed")) {
    showNav = false;
  }
  return {
    site,
    localTz,
    showNav
  };
}

var _layout_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-0569b319.js')).default;
const server_id = "src/routes/+layout.server.js";
const imports = ["_app/immutable/nodes/0.a7874ada.js","_app/immutable/chunks/scheduler.86230e0b.js","_app/immutable/chunks/index.ced845ca.js","_app/immutable/chunks/globals.7f7f1b26.js","_app/immutable/chunks/ctx.150f748f.js","_app/immutable/chunks/index.f62c5b43.js","_app/immutable/chunks/index.4f5d9f7d.js"];
const stylesheets = ["_app/immutable/assets/0.94357658.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server as server, server_id, stylesheets };
//# sourceMappingURL=0-abfd1628.js.map
