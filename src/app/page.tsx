import Image from "next/image";
import { LeadForm } from "./components/LeadForm";

const products = [
  {
    name: "Camperas",
    detail: "Identidad de promo, abrigo y presencia para todo el ano.",
    tag: "Mas pedidas",
  },
  {
    name: "Buzos",
    detail: "Comodos, personalizables y perfectos para uso diario.",
    tag: "Full color",
  },
  {
    name: "Chombas",
    detail: "Una opcion prolija para actos, viajes y presentaciones.",
    tag: "Institucional",
  },
  {
    name: "Gorras",
    detail: "El extra que completa el kit de egresados.",
    tag: "Combo promo",
  },
];

const steps = [
  "Elegis prenda, colores y estilo",
  "Armamos una propuesta visual para tu promo",
  "Confirmas cantidades, talles y detalles",
  "Producimos y enviamos a todo el pais",
];

const instagramPosts = [
  {
    title: "Camperas personalizadas",
    caption: "Combinaciones rojo, azul y blanco para promos con identidad.",
    metric: "Trabajo destacado",
  },
  {
    title: "Buzos de egresados",
    caption: "Diseno, talles y colores listos para presentar al curso.",
    metric: "Promo 2026",
  },
  {
    title: "Kits completos",
    caption: "Campera, buzo, chomba y gorra en una misma linea visual.",
    metric: "Combo ideal",
  },
  {
    title: "Detalles que venden",
    caption: "Nombres, frases, logos y terminaciones para hacerla unica.",
    metric: "A medida",
  },
  {
    title: "Envios nacionales",
    caption: "Una vidriera digital para consultas desde cualquier provincia.",
    metric: "Todo el pais",
  },
  {
    title: "Historias de promos",
    caption: "Contenido pensado para convertir seguidores en presupuestos.",
    metric: "Feed activo",
  },
];

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
const floatingWhatsappMessage = encodeURIComponent(
  "Hola Zummo, quiero consultar por ropa de egresados.",
);
const floatingWhatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${floatingWhatsappMessage}`
  : `https://wa.me/?text=${floatingWhatsappMessage}`;

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__glow hero__glow--red" />
        <div className="hero__glow hero__glow--blue" />

        <nav className="nav" aria-label="Principal">
          <a className="brand" href="#inicio">
            <Image
              src="/zumo-egresados.jpg"
              alt="Logo de Zummo Textil"
              width={58}
              height={58}
              priority
              quality={100}
              unoptimized
            />
            <span>Zummo Textil</span>
          </a>
          <div className="nav__links">
            <a href="#productos">Productos</a>
            <a href="#instagram">Instagram</a>
            <a href="#proceso">Como comprar</a>
            <a href="#contacto">Contacto</a>
          </div>
        </nav>

        <div className="hero__grid" id="inicio">
          <div className="hero__copy">
            <p className="eyebrow">Ropa de egresados con identidad</p>
            <h1>Tu promo no se viste igual que ninguna otra.</h1>
            <p className="hero__lead">
              Camperas, buzos, chombas, gorras y mucho mas, disenado para que
              cada curso tenga una prenda que se sienta propia desde el primer
              dia.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#contacto">
                Pedir presupuesto
              </a>
              <a className="button button--ghost" href="#productos">
                Ver productos
              </a>
            </div>

            <div className="trust-strip" aria-label="Datos de Zummo Textil">
              <span>20 años de trayectoria</span>
              <span>Envios a todo el pais</span>
              <span>Diseno para promos</span>
            </div>
          </div>

          <div className="showcase" aria-label="Vista promocional Zummo">
            <div className="showcase__card showcase__card--main">
              <img
                src="/zumo-egresados.jpg"
                alt="Isotipo Zummo Textil"
              />
              <p>Camperas, buzos, chombas y gorras para egresados.</p>
            </div>
            <div className="showcase__card showcase__card--floating">
              <strong>1174</strong>
              <span>seguidores listos para convertir en consultas</span>
            </div>
            <div className="showcase__ribbon">Promo 2026</div>
          </div>
        </div>
      </section>

      <section className="section stats" aria-label="Credenciales">
        <article>
          <strong>75</strong>
          <span>publicaciones para mostrar trabajos reales</span>
        </article>
        <article>
          <strong>20+</strong>
          <span>años acompanando promociones</span>
        </article>
        <article>
          <strong>AR</strong>
          <span>envios a todo el pais</span>
        </article>
      </section>

      <section className="section split" id="productos">
        <div>
          <p className="eyebrow">Catalogo pensado para vender</p>
          <h2>Todo lo que una promo busca, presentado como experiencia.</h2>
        </div>
        <p>
          La web puede funcionar como vidriera 24/7: muestra opciones, responde
          dudas basicas y lleva a cada curso directo al pedido de presupuesto.
        </p>
      </section>

      <section className="product-grid" aria-label="Productos">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <span>{product.tag}</span>
            <h3>{product.name}</h3>
            <p>{product.detail}</p>
          </article>
        ))}
      </section>

      <section className="section promise">
        <div className="promise__content">
          <p className="eyebrow">Por que esta web convence</p>
          <h2>Menos mensajes sueltos. Mas consultas ordenadas.</h2>
          <p>
            En vez de depender solo de Instagram, Zummo puede tener una pagina
            que explique productos, trayectoria, envios y proximo paso. Ideal
            para padres, alumnos y colegios que necesitan confianza antes de
            consultar.
          </p>
        </div>
        <div className="promise__panel">
          <span>Mensaje directo sugerido</span>
          <p>
            "Hola Zummo, somos una promo y queremos presupuesto para camperas y
            buzos. Somos 42 alumnos."
          </p>
        </div>
      </section>

      <section className="section instagram" id="instagram">
        <div className="instagram__header">
          <div>
            <p className="eyebrow">Instagram conectado</p>
            <h2>Un feed que trabaja como vidriera todos los dias.</h2>
          </div>
          <a
            className="instagram__profile"
            href="https://www.instagram.com/zummoegresados/"
            target="_blank"
            rel="noreferrer"
            aria-label="Ver Instagram de Zummo Egresados"
          >
            <Image
              src="/zumo-egresados.jpg"
              alt="Logo de Zummo Textil"
              width={64}
              height={64}
            />
            <span>
              @zummoegresados
              <small>Ver perfil</small>
            </span>
          </a>
        </div>

        <div className="instagram__layout">
          <article className="instagram__spotlight">
            <span className="instagram__live">Demo automatizable</span>
            <strong>75 publicaciones</strong>
            <p>
              La web puede mostrar los ultimos trabajos de Instagram para que
              padres, alumnos y colegios vean actividad real antes de consultar.
            </p>
            <div>
              <span>1174 seguidores</span>
              <span>308 seguidos</span>
            </div>
          </article>

          <div className="instagram__grid" aria-label="Feed de Instagram demo">
            {instagramPosts.map((post, index) => (
              <article className="insta-card" key={post.title}>
                <div className="insta-card__visual">
                  <Image
                    src="/zumo-egresados.jpg"
                    alt=""
                    width={54}
                    height={54}
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <strong>{post.metric}</strong>
                <h3>{post.title}</h3>
                <p>{post.caption}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process" id="proceso">
        <div className="section__heading">
          <p className="eyebrow">Proceso claro</p>
          <h2>Del primer mensaje al envio, sin vueltas.</h2>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta" id="contacto">
        <div className="cta__copy">
          <p className="eyebrow">Consulta rapida</p>
          <h2>Hagamos que cada visita termine en un contacto.</h2>
          <p>
            El interesado deja su telefono o mail, cuenta su idea y Zummo recibe
            una consulta ordenada para responder con presupuesto, talles y
            opciones de diseno.
          </p>
        </div>
        <LeadForm />
      </section>

      <footer className="footer">
        <div className="footer__brand">
          <a className="brand brand--footer" href="#inicio">
            <Image
              src="/zumo-egresados.jpg"
              alt="Logo de Zummo Textil"
              width={58}
              height={58}
              quality={100}
              unoptimized
            />
            <span>Zummo Textil</span>
          </a>
          <p>
            Ropa de egresados con diseno, trayectoria y atencion personalizada
            para promociones de todo el pais.
          </p>
          <div className="footer__badges">
            <span>20 años de trayectoria</span>
            <span>Envios nacionales</span>
          </div>
        </div>

        <div className="footer__columns">
          <div>
            <h3>Secciones</h3>
            <a href="#productos">Productos</a>
            <a href="#instagram">Instagram</a>
            <a href="#proceso">Como comprar</a>
            <a href="#contacto">Contacto</a>
          </div>

          <div>
            <h3>Productos</h3>
            <span>Camperas</span>
            <span>Buzos</span>
            <span>Chombas</span>
            <span>Gorras</span>
          </div>

          <div>
            <h3>Contacto</h3>
            <a
              href={floatingWhatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/zummoegresados/"
              target="_blank"
              rel="noreferrer"
            >
              @zummoegresados
            </a>
            <span>Consultas por formulario web</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Zummo Textil. Ropa de egresados.</span>
          <span>Demo web comercial preparada para recibir consultas.</span>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={floatingWhatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Consultar por WhatsApp"
      >
        <span className="whatsapp-float__bubble">WhatsApp</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.03 4C9.4 4 4 9.3 4 15.82c0 2.32.7 4.55 2.02 6.48L4.7 28l5.86-1.28a12.2 12.2 0 0 0 5.47 1.3C22.66 28.02 28 22.72 28 16.2 28 9.68 22.66 4 16.03 4Zm0 21.88c-1.72 0-3.4-.45-4.88-1.3l-.35-.2-3.48.76.78-3.35-.23-.36a9.78 9.78 0 0 1-1.68-5.6c0-5.34 4.42-9.69 9.84-9.69 5.43 0 9.84 4.35 9.84 10.06 0 5.34-4.41 9.68-9.84 9.68Zm5.4-7.25c-.3-.15-1.76-.86-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.15-.18.2-.35.22-.65.08-.3-.15-1.25-.45-2.38-1.45a8.8 8.8 0 0 1-1.65-2.02c-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.62-.93-2.22-.25-.58-.5-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.47 1.08 2.89 1.23 3.08.15.2 2.13 3.2 5.16 4.5.72.3 1.28.48 1.72.62.72.23 1.38.2 1.9.12.58-.09 1.76-.71 2-1.4.25-.69.25-1.28.18-1.4-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </a>
    </main>
  );
}
