import type { Dict } from "@/i18n";
import { SITE } from "@/lib/site";
import { ContactButton } from "./contact-provider";
import { SocialLinks } from "./social-links";
import { IconArrowUpRight, IconBuild, IconFlow, IconLaunch, IconMail, IconScan } from "./icons";

const STEP_ICONS = [IconScan, IconBuild, IconLaunch];
const WORKFLOW_ICONS = [IconMail, IconFlow, IconLaunch];

/* ---------------------------------------------------------------- proceso */

export function Process({ dict }: { dict: Dict }) {
  const p = dict.process;
  return (
    <section className="wrap section" id="como">
      <p className="eyebrow">
        <span className="dot" />
        {p.eyebrow}
      </p>
      <div className="heading">
        <h2 dangerouslySetInnerHTML={{ __html: p.title }} />
      </div>

      <div className="process">
        {p.steps.map((step, i) => {
          const Icon = STEP_ICONS[i] ?? IconScan;
          return (
            <article className="step" key={step.num}>
              <div className="step-icon">
                <Icon />
              </div>
              <span className="num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          );
        })}
      </div>

      <div className="workflow">
        <div className="workflow__head">
          <strong>{p.workflowHeading}</strong>
          <span className="workflow__label">{p.workflowLabel}</span>
        </div>
        <div className="workflow__track" role="img" aria-label={p.workflowAria}>
          {p.workflow.map((node, i) => {
            const Icon = WORKFLOW_ICONS[i] ?? IconMail;
            return (
              <div key={node.title} style={{ display: "contents" }}>
                <div className="workflow__item">
                  <span className={`workflow__icon${i === 1 ? " blue" : ""}`}>
                    <Icon />
                  </span>
                  <span>
                    <strong>{node.title}</strong>
                    <small>{node.sub}</small>
                  </span>
                </div>
                {i < p.workflow.length - 1 && (
                  <span className="workflow__link" aria-hidden="true">
                    <i />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="fit">
        <p>
          <strong>{p.fitTitle}</strong>
          <span>{p.fitSub}</span>
        </p>
        <ContactButton className="button button--sm">
          {p.fitCta} <IconArrowUpRight />
        </ContactButton>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- faq */

export function Faq({ dict }: { dict: Dict }) {
  const f = dict.faq;
  return (
    <section className="wrap section" id="preguntas">
      <div className="faq-layout">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            {f.eyebrow}
          </p>
          <h2 dangerouslySetInnerHTML={{ __html: f.title }} />
          <p className="section__lead">{f.lead}</p>
        </div>
        <div className="faq">
          {f.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- cta */

export function CtaBand({ dict }: { dict: Dict }) {
  return (
    <section className="wrap" id="contacto" style={{ paddingBottom: 96 }}>
      <div className="cta">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            {dict.cta.eyebrow}
          </p>
          <h2 dangerouslySetInnerHTML={{ __html: dict.cta.title }} />
          <p>
            {dict.cta.text} <strong>{SITE.email}</strong>
          </p>
          <SocialLinks
            variant="cta"
            labels={{
              whatsapp: dict.social.whatsapp,
              instagram: dict.social.instagram,
              facebook: dict.social.facebook,
              whatsappMessage: dict.social.message,
            }}
          />
        </div>
        <ContactButton>
          {dict.cta.button} <IconArrowUpRight />
        </ContactButton>
      </div>
    </section>
  );
}
