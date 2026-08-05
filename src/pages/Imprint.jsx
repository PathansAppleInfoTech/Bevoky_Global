import React from 'react';
import './Imprint.css';

export default function Imprint() {
    return (
        <div className="imprint-page">
            <header className="imprint-header">
                <h1 className="imprint-title">Imprint</h1>
                <p className="imprint-subtitle">
                    Information disclosed pursuant to Section 5 of the German
                    Telemedia Act (Telemediengesetz).
                </p>

                <div className="imprint-meta">
                    <div>
                        Company
                        <strong>Bevoky Global UG (haftungsbeschränkt)</strong>
                    </div>
                    <div>
                        Managing Director
                        <strong>Johnny Jose</strong>
                    </div>
                    <div>
                        Contact
                        <strong>info@bevokyglobal.com</strong>
                    </div>
                </div>
            </header>

            <main className="imprint-body">
                <section className="imprint-clause" data-num="1">
                    <h2>Company &amp; Registered Address</h2>
                    <p>
                        Bevoky Global UG (haftungsbeschränkt)
                        <br />
                        Ebelshof 63
                        <br />
                        41063 Mönchengladbach, Germany
                    </p>
                </section>

                <section className="imprint-clause" data-num="2">
                    <h2>Represented By</h2>
                    <p>Managing Director: Johnny Jose</p>
                </section>

                <section className="imprint-clause" data-num="3">
                    <h2>Contact</h2>
                    <p>
                        Email:{' '}
                        <a href="mailto:info@bevokyglobal.com">info@bevokyglobal.com</a>
                    </p>
                </section>

                <section className="imprint-clause" data-num="4">
                    <h2>Register Entry</h2>
                    <dl className="imprint-registry">
                        <dt>Register Court</dt>
                        <dd>District Court Mönchengladbach</dd>
                        <dt>Registration Number</dt>
                        <dd>HRB 24099</dd>
                    </dl>
                </section>

                <section className="imprint-clause" data-num="5">
                    <h2>VAT Identification</h2>
                    <dl className="imprint-registry">
                        <dt>VAT ID (§ 27a UStG)</dt>
                        <dd className="pending">Yet to be received</dd>
                    </dl>
                </section>

                <section className="imprint-clause" data-num="6">
                    <h2>Supervisory Authority</h2>
                    <dl className="imprint-registry">
                        <dt>Competent Authority</dt>
                        <dd className="pending">Yet to be received</dd>
                    </dl>
                </section>

                <section className="imprint-clause" data-num="7">
                    <h2>Excise Tax Numbers</h2>
                    <dl className="imprint-registry">
                        <dt>VSt Warehouse Holder No.</dt>
                        <dd className="pending">Yet to be received</dd>
                        <dt>VAT Warehouse No.</dt>
                        <dd className="pending">Yet to be received</dd>
                    </dl>
                </section>

                <section className="imprint-clause" data-num="8">
                    <h2>EORI Number</h2>
                    <dl className="imprint-registry">
                        <dt>EORI Number</dt>
                        <dd className="pending">Yet to be received</dd>
                    </dl>
                </section>
            </main>

            <footer className="imprint-footer">
                <span>Bevoky Global UG (haftungsbeschränkt)</span>
                <span>Ebelshof 63, 41063 Mönchengladbach, Germany</span>
            </footer>
        </div>
    );
}