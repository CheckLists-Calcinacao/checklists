/* Service worker: guarda o app no tablet para funcionar sem internet.
   - Páginas e scripts: tenta a internet primeiro (para pegar atualizações);
     se não tiver rede em 4 s, usa a cópia guardada.
   - Ícones e fotos do croqui: usa a cópia guardada direto. */
const CACHE = 'checklists-v14';
const ARQUIVOS = [
  './', 'index.html', 'checklists.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'croqui-fotos.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function comTempo(p, ms) {
  return new Promise((res, rej) => { const t = setTimeout(() => rej(new Error('timeout')), ms); p.then(v => { clearTimeout(t); res(v); }, err => { clearTimeout(t); rej(err); }); });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const url = new URL(req.url);
  const dinamico = req.mode === 'navigate' || /\.(html|js|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/')
    ;
  const fixo = url.pathname.endsWith('croqui-fotos.js');
  if (dinamico && !fixo) {
    e.respondWith(
      comTempo(fetch(req, {cache: 'no-cache'}), 4000)
        .then(resp => { if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(req, cp)); } return resp; })
        .catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match('index.html')))
    );
  } else {
    e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req).then(resp => {
      if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
      return resp;
    })));
  }
});
