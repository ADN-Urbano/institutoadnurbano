import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = { title: "Política de cookies · ADN Local" };

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookies" updated="mayo 2026">
      <h2>1. Qué son las cookies</h2>
      <p>
        Una cookie es un pequeño archivo que se almacena en tu dispositivo al visitar una web y permite
        recordar información sobre tu navegación.
      </p>

      <h2>2. Cookies que utilizamos</h2>
      <ul>
        <li>
          <strong>Técnicas (necesarias):</strong> imprescindibles para el funcionamiento del sitio,
          como mantener tu sesión iniciada o recordar tu preferencia de consentimiento. No requieren
          consentimiento.
        </li>
        <li>
          <strong>Analíticas (opcionales):</strong> nos ayudan a entender de forma agregada cómo se usa
          el sitio para mejorarlo. Solo se activan si las aceptas.
        </li>
        <li>
          <strong>Publicitarias / de medición (opcionales):</strong> usamos el píxel de Meta (Facebook
          e Instagram) y el Insight Tag de LinkedIn para medir la eficacia de nuestras campañas y
          mostrar contenidos relevantes. Estas tecnologías de terceros <strong>solo se cargan si
          aceptas</strong> las cookies opcionales. Además, podemos enviar a estas plataformas eventos
          de conversión desde nuestro servidor (Conversions API) con tu email cifrado (hash), para
          medir registros y compras.
        </li>
      </ul>

      <h2>3. Gestión del consentimiento</h2>
      <p>
        Al entrar en el sitio te mostramos un aviso para que aceptes o rechaces las cookies opcionales.
        Puedes cambiar tu decisión en cualquier momento borrando las cookies desde la configuración de
        tu navegador.
      </p>

      <h2>4. Cookies de terceros</h2>
      <p>
        Algunos servicios que integramos (pasarela de pago, reproductor de vídeo) pueden instalar sus
        propias cookies al utilizarlos. Te recomendamos consultar sus respectivas políticas.
      </p>
    </LegalLayout>
  );
}
