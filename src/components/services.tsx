"use client";

import type { Dict } from "@/i18n";
import { CONTACT_SERVICES } from "@/lib/validation";
import { useContact } from "./contact-provider";
import {
  IconArrowUpRight,
  IconFacebook,
  IconGlobe,
  IconInstagram,
  IconServiceAdmin,
  IconServiceAppointments,
  IconServiceAttention,
  IconServiceFollowUp,
  IconServiceIntegration,
  IconWhatsApp,
} from "./icons";

const CARD_ICONS = [
  IconServiceAttention,
  IconServiceAppointments,
  IconServiceAdmin,
  IconServiceFollowUp,
  IconServiceIntegration,
];

const CHANNEL_ICONS: Record<string, typeof IconWhatsApp> = {
  whatsapp: IconWhatsApp,
  instagram: IconInstagram,
  facebook: IconFacebook,
  web: IconGlobe,
};

/**
 * Seccion "Servicios" de la portada: cinco tarjetas numeradas con el catalogo.
 * Cada tarjeta abre el formulario de contacto con su servicio ya elegido; el
 * valor enviado es el canonico de `CONTACT_SERVICES` (indice a indice), de modo
 * que la base de datos y HubSpot guardan siempre el mismo texto.
 */
export function Services({ dict }: { dict: Dict }) {
  const s = dict.services;
  const { open } = useContact();

  return (
    <section className="wrap section" id="servicios">
      <p className="eyebrow">
        <span className="dot" />
        {s.eyebrow}
      </p>
      <div className="heading">
        <h2>{s.title}</h2>
        <p>{s.lead}</p>
      </div>

      <div className="services">
        {s.items.map((item, i) => {
          const Icon = CARD_ICONS[i] ?? IconServiceAttention;
          const service = CONTACT_SERVICES[i] ?? CONTACT_SERVICES[0];
          return (
            <article
              className="service"
              key={item.num}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="service__top">
                <span className="service__icon">
                  <Icon />
                </span>
                <span className="service__num">
                  <span className="sr-only">{s.numSr}</span>
                  {item.num}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {"channels" in item && item.channels ? (
                <ul className="service__channels">
                  {item.channels.map((channel) => {
                    const ChannelIcon = CHANNEL_ICONS[channel.key] ?? IconGlobe;
                    return (
                      <li key={channel.key}>
                        <ChannelIcon />
                        {channel.label}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
              <button
                type="button"
                className="service__cta"
                onClick={() => open(service)}
              >
                <span>{s.cardCta}</span>
                <IconArrowUpRight />
                <span className="sr-only">: {item.title}</span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
