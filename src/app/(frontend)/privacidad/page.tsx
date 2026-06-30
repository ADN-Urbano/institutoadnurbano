import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = { title: "Política de privacidad · ADN Local" };

export default function PrivacidadPage() {
  return (
    <LegalLayout title="Privacidad" updated="mayo 2026">
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos es <strong>ADN Urbano [razón social]</strong>, NIF
        [—], con domicilio en [dirección] y correo de contacto [email]. Tratamos los datos conforme al
        Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2>2. Qué datos tratamos y con qué finalidad</h2>
      <ul>
        <li>
          <strong>Registro y acceso de alumnos:</strong> email y nombre, para crear tu cuenta, darte
          acceso a los cursos y gestionar tu progreso.
        </li>
        <li>
          <strong>Compra de cursos:</strong> datos de facturación y de pago, gestionados a través de
          nuestro proveedor de pagos (Stripe), para tramitar la compra y emitir factura.
        </li>
        <li>
          <strong>Newsletter y comunicaciones:</strong> email, si te suscribes, para enviarte
          contenidos e información sobre cursos. Puedes darte de baja en cualquier momento.
        </li>
        <li>
          <strong>Captación y webinars:</strong> los datos que nos facilitas al registrarte en un
          webinar, descargar materiales, escribirnos o apuntarte a una lista de espera (email,
          nombre, municipio, situación), para atender tu solicitud y enviarte comunicaciones
          relacionadas. La base es tu consentimiento; puedes retirarlo cuando quieras.
        </li>
        <li>
          <strong>Medición publicitaria:</strong> si aceptas las cookies opcionales, usamos el píxel
          de Meta y el Insight Tag de LinkedIn y podemos enviar a estas plataformas eventos de
          conversión (registro, compra) desde nuestro servidor con tu email cifrado mediante hash,
          con el fin de medir y optimizar nuestras campañas. Puedes consultar las políticas de
          privacidad de Meta y LinkedIn para más información.
        </li>
      </ul>

      <h2>3. Legitimación</h2>
      <p>
        La base legal es la ejecución del contrato (acceso y compra de cursos), el consentimiento (para
        la newsletter) y el interés legítimo en mantener la relación con los usuarios.
      </p>

      <h2>4. Conservación y destinatarios</h2>
      <p>
        Conservamos los datos mientras dure la relación y durante los plazos legales aplicables.
        Utilizamos proveedores que actúan como encargados del tratamiento (alojamiento, pagos, email,
        vídeo) con garantías adecuadas y, cuando proceda, dentro del Espacio Económico Europeo.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a [email]. También puedes reclamar ante la Agencia Española de
        Protección de Datos (aepd.es).
      </p>
    </LegalLayout>
  );
}
