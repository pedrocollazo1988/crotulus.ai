import type { Dict } from "@/i18n";
import { ContactButton } from "./contact-provider";
import {
  IconArrowDown,
  IconArrowUpRight,
  IconBuild,
  IconChat,
  IconFlow,
  IconGrowth,
  IconHeart,
  IconLaunch,
  IconLink,
  IconScan,
  IconShield,
  IconSpark,
  IconTarget,
} from "./icons";

/* ------------------------------------------------------------------ hero */

export function Hero({ dict }: { dict: Dict }) {
  const h = dict.hero;
  return (
    <section className="wrap hero reveal" id="inicio">
      <div>
        <p className="eyebrow">
          <span className="dot" />
          {h.eyebrow}
        </p>
        <h1>
          {h.titleLine1} {h.titleLine2} <span className="accent">{h.titleAccent}</span>
        </h1>
        <p className="hero__lead">{h.lead}</p>
        <div className="hero__actions">
          <ContactButton>
            {h.ctaPrimary} <IconArrowUpRight />
          </ContactButton>
          <a className="button button--secondary" href="#como">
            {h.ctaSecondary} <IconArrowDown />
          </a>
        </div>
        <p className="hero__micro">
          <IconSpark />
          {h.micro}
        </p>
        <div className="hero__chips">
          <span>
            <IconChat /> {h.chipAttention}
          </span>
          <span>
            <IconGrowth /> {h.chipSales}
          </span>
          <span>
            <IconFlow /> {h.chipOps}
          </span>
        </div>
      </div>

      <div className="visual" role="img" aria-label={dict.a11y.heroVisual}>
        <span className="visual__grid" aria-hidden="true" />
        <span className="orbit" aria-hidden="true" />
        <span className="orbit orbit--outer" aria-hidden="true" />
        <span className="data-particle particle-a" aria-hidden="true" />
        <span className="data-particle particle-b" aria-hidden="true" />

        <div className="core">
          <strong>{h.coreValue}</strong>
          <span>{h.coreLabel}</span>
        </div>

        <div className="floating f1">
          <span className="badgeicon">
            <IconChat />
          </span>
          <span>
            <b>{h.float1Title}</b>
            <small>{h.float1Sub}</small>
          </span>
        </div>
        <div className="floating f2">
          <span className="badgeicon">
            <IconTarget />
          </span>
          <span>
            <b>{h.float2Title}</b>
            <small>{h.float2Sub}</small>
          </span>
        </div>
        <div className="floating f3">
          <span className="badgeicon">
            <IconSpark />
          </span>
          <span>
            <b>{h.float3Title}</b>
            <small>{h.float3Sub}</small>
          </span>
        </div>

        <span className="visual__caption">{h.caption}</span>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- franja */

export function Strip({ dict }: { dict: Dict }) {
  const s = dict.strip;
  return (
    <div className="strip">
      <div className="wrap">
        <strong>{s.title}</strong>
        <span>
          <i>↻</i>
          {s.time}
        </span>
        <span>
          <i>◎</i>
          {s.opportunity}
        </span>
        <span>
          <i>⇄</i>
          {s.connect}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- problemas */

const PROBLEM_ICONS = [IconScan, IconGrowth, IconFlow];
const PROBLEM_ART = ["art-1", "art-2", "art-3"];

export function Problems({ dict }: { dict: Dict }) {
  const p = dict.problems;
  return (
    <section className="wrap section" id="retos">
      <p className="eyebrow">
        <span className="dot" />
        {p.eyebrow}
      </p>
      <div className="heading">
        <h2 dangerouslySetInnerHTML={{ __html: p.title }} />
        <p>{p.lead}</p>
      </div>

      <div className="problems">
        {p.items.map((item, i) => {
          const Icon = PROBLEM_ICONS[i] ?? IconScan;
          return (
            <article className="problem" key={item.num}>
              <div className={`feature-illustration ${PROBLEM_ART[i]}`} aria-hidden="true">
                <span className="icon-tile">
                  <Icon />
                </span>
                <span className="art-line line-a" />
                <span className="art-line line-b" />
                <span className="art-node" />
                <span className="art-check">✓</span>
              </div>
              <span className="num">{item.num}</span>
              <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
