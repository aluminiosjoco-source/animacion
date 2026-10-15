# PATCHES — Integración Tracking Facial (v2.5)

## index.html
- Línea ~247: `EmotionPolicy.js` ANTES de `CallSession.js`.
- Línea ~249: `site/shared-policy.js` tras EmotionPolicy, antes de hosts.
- Líneas ~252–256: orden tracking: Filters → MpLoader → Backends → FaceSelector → TrackingBridge (todos antes de app.js).

## call.html
- Mismo orden (líneas ~126–136): EmotionPolicy → shared-policy → CallSession → Filters/MpLoader/Backends/FaceSelector/TrackingBridge.

## src/tracking/TrackingBridge.js
- Rutas Worker absolutas (`new URL('../..', location.href)` base) para bundle/wasm/model.
- `mode:'attend'` por defecto; `signals` opt-in (`=== true`).
- Epoch/generación en start()/destroy() (sin cámara huérfana).

## site/call.js
- No enlaza tracker con `mate=null`; error visible (toast/badge), no console.warn silencioso.

## site/i18n.js / site/style.css
- Claves track* (es/en); `.track-badge`, `#faceTrackToggle.active` ya referenciados por index.html.
