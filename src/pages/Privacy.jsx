import React from 'react';
import './Privacy.css';

const RIGHTS = [
  'Receive information about your stored personal data',
  'Request correction of incorrect data',
  'Request deletion of your data',
  'Request restriction of processing',
  'Request data portability',
  'Object to the processing',
];

export default function Privacy() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-subtitle">
          How Bevoky Global UG (haftungsbeschränkt) collects, processes, and
          protects personal data when you visit this website.
        </p>
      </header>

      <main className="privacy-body">
        <section className="privacy-clause" data-num="1">
          <h2>Data Protection at a Glance</h2>
          <h3>General Information</h3>
          <p>
            The following information provides a simple overview of what
            happens to your personal data when you visit this website.
            Personal data is any data that can be used to identify you
            personally.
          </p>
        </section>

        <section className="privacy-clause" data-num="2">
          <h2>Responsible Body</h2>
          <p>
            Bevoky Global UG (haftungsbeschränkt)
            <br />
            Ebelshof 63
            <br />
            41063 Mönchengladbach, Germany
            <br />
            Email:{' '}
            <a href="mailto:info@bevokyglobal.com">info@bevokyglobal.com</a>
          </p>
        </section>

        <section className="privacy-clause" data-num="3">
          <h2>Data Collection on This Website</h2>
          <h3>Contact Form</h3>
          <p>
            If you send us inquiries via the contact form, your details from
            the request form, including the contact details you provide,
            will be stored by us for the purpose of processing the request
            and in the event of follow-up questions. We do not pass on this
            data without your consent.
          </p>
          <p>
            The processing of this data is based on Art. 6 para. 1 lit. b
            GDPR, where your request relates to the fulfillment of a
            contract or is necessary for the implementation of
            pre-contractual measures. In all other cases, processing is
            based on our legitimate interest in the effective handling of
            inquiries addressed to us (Art. 6 para. 1 lit. f GDPR).
          </p>
          <span className="privacy-legal-basis">
            Art. 6 (1)(b) &amp; (f) GDPR
          </span>
        </section>

        <section className="privacy-clause" data-num="4">
          <h2>Hosting</h2>
          <p>
            This website is hosted by GoDaddy (c/o Spaces, Gertrudenstraße
            30–36, 50667 Köln, Germany).
          </p>
        </section>

        <section className="privacy-clause" data-num="5">
          <h2>Your Rights</h2>
          <p>You have the right at any time to:</p>
          <div className="privacy-rights-grid">
            {RIGHTS.map((right, i) => (
              <div className="privacy-right-card" key={right}>
                <span className="idx">{i + 1}</span>
                <span className="label">{right}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.25rem' }}>
            You can contact us at any time for these and further questions
            about data protection at:{' '}
            <a href="mailto:info@bevokyglobal.com">info@bevokyglobal.com</a>
          </p>
        </section>

        <section className="privacy-clause" data-num="6">
          <h2>Right of Appeal</h2>
          <p>
            You have the right to lodge a complaint with a data protection
            supervisory authority regarding our processing of your personal
            data.
          </p>
        </section>
      </main>

      <footer className="privacy-footer">
        <span>Bevoky Global UG (haftungsbeschränkt)</span>
        <span>Ebelshof 63, 41063 Mönchengladbach, Germany</span>
      </footer>
    </div>
  );
}