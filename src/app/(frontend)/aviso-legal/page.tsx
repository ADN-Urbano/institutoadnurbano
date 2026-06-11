import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = { title: "Aviso legal · ADN Local" };

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso legal" updated="mayo 2026">
      <h2>1. Identificación del titular</h2>
      <p>
        En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio
        Electrónico (LSSI‑CE), se informa de que el titular de este sitio web es{" "}
        <strong>ADN Urbano [razón social completa]</strong>, con NIF/CIF [—], domicilio en [dirección]
        y correo de contacto [email]. El sitio opera bajo el dominio <strong>adnlocal.es</strong>.
      </p>

      <h2>2. Objeto</h2>
      <p>
        ADN Local es un centro de recursos y formación para la transformación urbana y la política
        local. A través del sitio se ofrecen contenidos editoriales y cursos de formación, algunos de
        ellos de pago.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de este
        aviso legal. El usuario se compromete a hacer un uso adecuado de los contenidos y a no
        emplearlos para actividades ilícitas o que perjudiquen los derechos de terceros.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio (textos, vídeos, materiales descargables, marca, logotipos y
        diseño) son titularidad de ADN Urbano o de terceros que han autorizado su uso, y están
        protegidos por la normativa de propiedad intelectual e industrial. Queda prohibida su
        reproducción, distribución o transformación sin autorización expresa.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        ADN Urbano no se responsabiliza del mal uso que terceros hagan de la información publicada, ni
        de los daños derivados de interrupciones del servicio ajenas a su control. Los enlaces a sitios
        externos no implican respaldo de sus contenidos.
      </p>

      <h2>6. Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para la resolución de controversias las
        partes se someten a los juzgados y tribunales que correspondan conforme a la normativa vigente.
      </p>
    </LegalLayout>
  );
}
