"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

/**
 * Carga Meta Pixel + LinkedIn Insight Tag SOLO con consentimiento:
 * `localStorage.adn_cookie_consent === "accepted"`. Reacciona al evento
 * `adn-consent` que emite el CookieBanner al Aceptar (sin recargar). Usamos
 * `useSyncExternalStore` para leer el consentimiento (valor externo, solo en
 * cliente) sin setState en efecto y sin desajustes de hidratación.
 *
 * Degradación suave: sin `NEXT_PUBLIC_META_PIXEL_ID` no carga Meta; sin
 * `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` no carga LinkedIn. El motor funciona con
 * placeholders; el cliente añade los IDs después.
 */

const CONSENT_KEY = "adn_cookie_consent";

function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener("adn-consent", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("adn-consent", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export default function PixelLoader() {
  // En SSR devolvemos false (sin consentimiento) para no cargar nada en servidor.
  const consent = useSyncExternalStore(subscribeConsent, hasConsent, () => false);

  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const linkedinPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  if (!consent) return null;

  return (
    <>
      {metaPixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {linkedinPartnerId && (
        <>
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`_linkedin_partner_id = "${linkedinPartnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${linkedinPartnerId}&fmt=gif`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
