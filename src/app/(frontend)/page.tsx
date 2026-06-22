// La página principal es ahora Formación (home y recursos ocultos de momento).
import FormacionPage, { metadata } from "./formacion/page";

export { metadata };
export const revalidate = 60;
export default FormacionPage;
