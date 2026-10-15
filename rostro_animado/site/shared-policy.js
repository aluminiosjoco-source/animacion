// rostro_animado/site/shared-policy.js
/* ============================================================
 * shared-policy.js — ÚNICA instancia de MM_EmotionPolicy por página.
 *
 * Motivo (hallazgo v2.4): CallSession.create() y TrackingBridge.create(),
 * si no reciben opts.policy, construyen cada uno su propia política. Con
 * dos instancias el arbitraje D13 (owner()/setOwner()) queda roto por
 * diseño: cada módulo cree mandar y ninguno ve al otro. Este módulo crea
 * la política compartida ANTES que app.js/call.js y la expone como
 * window.MM_SHARED_POLICY; los hosts deben inyectarla SIEMPRE.
 *
 * Carga: después de src/media/EmotionPolicy.js, antes de site/app.js.
 * Sin dependencias de red/DOM; fallo aislado (no rompe la página).
 * ============================================================ */
(function (global) {
  'use strict';

  try {
    if (!global.MM_EmotionPolicy) {
      console.error('[shared-policy] MM_EmotionPolicy no está cargado; ' +
        'los módulos crearán políticas independientes (arbitraje D13 degradado).');
      return;
    }
    if (global.MM_SHARED_POLICY) return;   /* idempotente ante dobles includes */

    global.MM_SHARED_POLICY = global.MM_EmotionPolicy.create({
      exists: function (id) {
        /* Validación D16/R7 contra el catálogo real del motor, si existe. */
        var cfg = global.MoodMates && global.MoodMates.config;
        if (!cfg || typeof cfg.getRaw !== 'function') return true;
        return !!cfg.getRaw(id);
      }
    });
  } catch (e) {
    console.error('[shared-policy] fallo inesperado:', e);
  }
})(typeof window !== 'undefined' ? window : globalThis);
