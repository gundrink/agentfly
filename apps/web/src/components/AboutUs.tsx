import Link from "next/link";
import styles from "./aboutUs.module.css";

export function AboutUs() {
  return (
    <section className={`marketplace-wrap ${styles.section}`} id="about" aria-labelledby="about-heading">
      <div className={styles.story}>
        <p className="marketplace-eyebrow">ABOUT US</p>
        <h2 id="about-heading">More freedom to create.<br />A fairer way to build.</h2>
        <p className={styles.lead}>We believe every developer deserves the tools to bring an idea to life—and a share in the value their attention creates.</p>
        <p>Agentfly brings an AI workspace, a code editor, terminals, and Git together in one free app. An occasional sponsored card funds the editor, and 50% of eligible ad revenue is credited to the developer.</p>
        <p>Our goal is simple: help more people be creative, build something of their own, and earn while they do it. We’re building Agentfly in the open, with developers at the centre of every decision.</p>
        <div className={styles.actions}>
          <Link href="/earn-while-you-code">How your share works <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
