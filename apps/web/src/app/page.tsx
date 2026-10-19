import type { Metadata } from "next";
import { HeroInstall } from "@/components/HeroInstall";
import { StickyInstall } from "@/components/StickyInstall";
import { LandingBidBuilder } from "@/components/LandingBidBuilder";
import { LiveImpressionsCounter } from "@/components/LiveImpressionsCounter";
import { AppShowcase } from "@/components/AppShowcase";
import { ModeShowcase } from "@/components/ModeShowcase";
import { LiveAgentsShowcase } from "@/components/LiveAgentsShowcase";
import { LiveRecording } from "@/components/LiveRecording";
import { Partners } from "@/components/Partners";
import { DocsShowcase } from "@/components/DocsShowcase";
import { AboutUs } from "@/components/AboutUs";
import Link from "next/link";
import { HomeFaq } from "@/components/HomeFaq";
import { JsonLd } from "@/components/JsonLd";
import { FAQ, faqPage } from "@/lib/schema";
import { comparisons, landingPath } from "@/lib/landings";
import { pageMetadata } from "@/lib/seo";
import { SITE, TEAM } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: { absolute: `${SITE.name} - farm four stables on Solana devnet` },
  socialTitle: `${SITE.name} - ${SITE.tagline}`,
  description: SITE.description,
});

export default function Home() {
  return (
    <div className="marketplace-home">
      <JsonLd data={faqPage(FAQ)} />
      <a className="skip-link" href="#marketplace-main">Skip to content</a>
      <section className="marketplace-hero studio-hero" id="earn">
      <div className="marketplace-wrap" id="marketplace-main">
      <div className="studio-hero-top"><div className="marketplace-hero-copy">
      <h1>Farm four stables<br />on one book.</h1>
      <p>nUSDC, nUSDT, nPYUSD, and nUSDe share one reserve on Solana devnet. A swap moves that same book. Eight floors sit around $1.</p>
      <ul className="hero-proof" aria-label="What this farm is">
        <li>Solana devnet</li>
        <li>One book, four coins</li>
        <li>Claim 1,000 nUSDC once</li>
      </ul>
      <HeroInstall source="hero" tour="#how-it-works" />
      <p className="hero-team-note">Have a question before you start? <a href={TEAM.bookingUrl} target="_blank" rel="noopener noreferrer">Talk to the team <span aria-hidden="true">↗</span></a></p>
      </div><LiveImpressionsCounter /></div>
      <AppShowcase />
      <Partners />
      </div>
      </section>

      <section className="first-build marketplace-wrap" id="how-it-works" aria-labelledby="first-build-heading">
        <h2 id="first-build-heading">From a devnet wallet to a fill, in three steps.</h2>
        <ol>
          <li>
            <h3>Point at devnet</h3>
            <p>The book, the floors, and every swap settle on Solana devnet. A mainnet wallet is looking at a different cluster.</p>
          </li>
          <li>
            <h3>Name the two coins</h3>
            <p>Pay one stable and receive another. Both sides read the shared reserve, so size is not stuck in a single pair.</p>
          </li>
          <li>
            <h3>Claim, or buy with SOL</h3>
            <p>Claim 1,000 nUSDC once per wallet. Or pay SOL and mint 100 whole tokens of any book coin. The book itself does not move.</p>
          </li>
        </ol>
      </section>

      <LiveAgentsShowcase />
      <LiveRecording />

      <ModeShowcase />

      <section className="product-story marketplace-wrap" aria-labelledby="product-story-heading">
      <div className="product-story-heading"><p className="marketplace-eyebrow">THE BOOK</p><h2 id="product-story-heading">One reserve.<br /><span>Eight floors.</span></h2><p>Depth is not split across six pair markets. The seed leans toward a dollar, and a broken floor steps aside.</p></div>
      <div className="product-features">
      <article><span className="feature-symbol" aria-hidden="true">✧</span><span className="feature-number">01 / BOOK</span><h3>Four coins.<br />One surface.</h3><p>Paying nUSDC to receive nUSDe reads the same balances as paying nPYUSD to receive nUSDT. The fee is one basis point, kept by the pool.</p><Link href="/docs">Explore the workspace <span aria-hidden="true">↗</span></Link></article>
      <article><span className="feature-symbol" aria-hidden="true">⌘</span><span className="feature-number">02 / FLOORS</span><h3>Most of the seed<br />sits near $1.</h3><p>A tight floor quotes while the peg holds. A wider floor stays if a coin slips further. Full range has no floor, so it does not stop.</p><Link href="/free-ai-code-editor">Meet your new editor <span aria-hidden="true">↗</span></Link></article>
      <article><span className="feature-symbol" aria-hidden="true">↗</span><span className="feature-number">03 / ONCE</span><h3>One claim.<br />Then the book.</h3><p>The first claim mints 1,000 nUSDC to the connected wallet. A second claim for that wallet is refused. After that, you swap or buy with SOL.</p><Link href="/earn-while-you-code">How earnings work <span aria-hidden="true">↗</span></Link></article>
      </div>
      <p className="product-compare">
        Switching from something else? See how {SITE.name} compares with{" "}
        {comparisons().map((page, index, all) => (
          <span key={page.slug}>
            <Link href={landingPath(page)}>{page.comparison?.subject.replace(/ \(formerly .*\)$/, "")}</Link>
            {index < all.length - 2 ? ", " : index === all.length - 2 ? " and " : "."}
          </span>
        ))}
      </p>
      </section>

      <AboutUs />
      <HomeFaq />
      <section className="closing-cta marketplace-wrap"><p className="marketplace-eyebrow">DEVNET</p><h2>The book is open.</h2><HeroInstall source="closing" advertise={false} /><p>Connect a devnet wallet, then pay one stable and receive another.</p></section>

      <section className="marketplace-bid" id="advertise">
      <div className="marketplace-wrap marketplace-bid-grid">
      <header className="marketplace-section-intro">
      <p className="marketplace-eyebrow"><span /> Advertise on {SITE.name}</p>
      <h2>Reach developers<br />while they build.</h2>
      <p>Bid from <strong>$1 per 500 verified impressions</strong>. Live demand sets the price, and a winning campaign can pay less than its maximum bid.</p>
      <dl><div><dt>50%</dt><dd>paid to developers</dd></div><div><dt>$1</dt><dd>minimum block bid</dd></div><div><dt>0</dt><dd>personal code collected</dd></div></dl>
      </header>
      <LandingBidBuilder />
      </div>
      </section>

      <section className="marketplace-principles" aria-label={`How ${SITE.name} works`}>
      <div className="marketplace-wrap"><p><span>01</span><strong>Verified attention</strong><small>Only a real, eligible view can bill.</small></p><p><span>02</span><strong>Second-price auction</strong><small>Win at your maximum; often pay less.</small></p><p><span>03</span><strong>Human review</strong><small>Every creative is checked before delivery.</small></p></div>
      </section>
      <DocsShowcase />
      <StickyInstall />
      </div>
    );
  }
