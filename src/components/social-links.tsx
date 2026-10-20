import { SITE, whatsappHref, whatsappLabel } from "@/lib/site";
import { IconFacebook, IconInstagram, IconWhatsApp } from "./icons";

export type SocialLabels = {
  whatsapp: string;
  instagram: string;
  facebook: string;
  whatsappMessage: string;
};

/** Enlaces a WhatsApp, Instagram y Facebook. `variant` cambia el estilo segun
 *  el fondo: botones redondos en el pie, enlaces en linea sobre la banda CTA. */
export function SocialLinks({
  variant,
  labels,
}: {
  variant: "footer" | "cta";
  labels: SocialLabels;
}) {
  const wa = whatsappHref(labels.whatsappMessage);
  const number = whatsappLabel();

  const items = [
    wa && { key: "whatsapp", href: wa, label: labels.whatsapp, Icon: IconWhatsApp },
    SITE.social.instagram && {
      key: "instagram",
      href: SITE.social.instagram,
      label: labels.instagram,
      Icon: IconInstagram,
    },
    SITE.social.facebook && {
      key: "facebook",
      href: SITE.social.facebook,
      label: labels.facebook,
      Icon: IconFacebook,
    },
  ].filter(Boolean) as { key: string; href: string; label: string; Icon: typeof IconWhatsApp }[];

  if (!items.length) return null;

  if (variant === "cta") {
    return (
      <p className="cta__social">
        {items.map(({ key, href, label, Icon }) => (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            <Icon />
            <span>{key === "whatsapp" && number ? number : label}</span>
          </a>
        ))}
      </p>
    );
  }

  return (
    <>
      <div className="social">
        {items.map(({ key, href, label, Icon }) => (
          <a
            key={key}
            className="social__btn"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
          >
            <Icon />
          </a>
        ))}
      </div>
      {wa && number && (
        <p className="footer__wa">
          <IconWhatsApp />
          {number}
        </p>
      )}
    </>
  );
}
