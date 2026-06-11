import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = { title: "Condiciones de venta · ADN Local" };

export default function CondicionesPage() {
  return (
    <LegalLayout title="Condiciones de venta" updated="mayo 2026">
      <h2>1. Objeto</h2>
      <p>
        Estas condiciones regulan la contratación de los cursos ofrecidos en adnlocal.es por{" "}
        <strong>ADN Urbano [razón social]</strong>. Al completar una compra aceptas estas condiciones.
      </p>

      <h2>2. Precios y pago</h2>
      <p>
        Los precios se muestran en euros e incluyen los impuestos aplicables (IVA). El pago se realiza
        de forma segura a través de Stripe. Tras la compra recibirás una factura y el acceso al curso
        contratado.
      </p>

      <h2>3. Acceso al curso</h2>
      <p>
        Una vez confirmado el pago, se habilita el acceso a tu área privada con el contenido del curso
        (vídeos, materiales y, en su caso, sesiones en directo). El acceso es personal e
        intransferible.
      </p>

      <h2>4. Derecho de desistimiento</h2>
      <p>
        En contenidos digitales de ejecución inmediata, al iniciar el acceso al curso puedes renunciar
        al derecho de desistimiento conforme a la normativa de consumidores. Los supuestos y plazos se
        detallarán en el proceso de compra.
      </p>

      <h2>5. Cancelaciones y reembolsos</h2>
      <p>
        Las solicitudes de reembolso se atenderán conforme a la legislación vigente y a la política que
        se indique en cada curso. Para cualquier incidencia, escríbenos a [email].
      </p>

      <h2>6. Sesiones en directo</h2>
      <p>
        Las clases en directo se imparten por Microsoft Teams en las fechas indicadas. Si no puedes
        asistir, las sesiones se graban y quedan disponibles en tu área privada.
      </p>
    </LegalLayout>
  );
}
