import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const AGE_GATE_KEY = "bevoky_age_verified";

export default function AgeGate() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const ageVerified = localStorage.getItem(AGE_GATE_KEY);

        if (ageVerified !== "true") {
            setIsVisible(true);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleYes = () => {
        localStorage.setItem(AGE_GATE_KEY, "true");

        setIsClosing(true);

        setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "";
        }, 500);
    };

    const handleNo = () => {
        window.location.href = "https://www.google.com/";
    };

    if (!isVisible) return null;

    return (
        <div
            className={`age-gate ${isClosing ? "age-gate--closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-gate-title"
        >
            {/* Background */}
            <div className="age-gate__backdrop" />

            {/* Main Card */}
            <div className="age-gate__content">

                {/* Decorative top gold line */}
                <div className="age-gate__top-line" />

                {/* Logo */}
                <div className="age-gate__logo">
                    <img
                        src="/assets/logo.png"
                        alt="Bevoky Global"
                    />
                </div>

                {/* Divider */}
                <div className="age-gate__divider" />

                {/* Eyebrow */}
                <p className="age-gate__eyebrow">
                    AGE VERIFICATION
                </p>

                {/* Heading */}
                <h1 id="age-gate-title">
                    ARE YOU
                    <span>OVER 18?</span>
                </h1>

                {/* Main Message */}
                <p className="age-gate__message">
                    Welcome to Bevoky Global.
                    <br />
                    This website contains information about alcoholic beverages.
                </p>

                {/* Understanding / Legal Message */}
                <p className="age-gate__notice">
                    By entering this website, you confirm that you are
                    18 years old and legally permitted to view content related
                    to alcoholic beverages in your country.
                </p>

                {/* Actions */}
                <div className="age-gate__actions">

                    {/* Primary CTA - Existing Magnetic Button */}
                    <MagneticButton
                        variant="primary"
                        onClick={handleYes}
                        icon={true}
                        className="age-gate__enter-button"
                    >
                        YES, ENTER
                    </MagneticButton>

                    {/* Secondary CTA */}
                    <MagneticButton
                        variant="primary"
                        onClick={handleNo}
                        icon={true}
                        className="age-gate__enter-button"
                    >
                        NO, EXIT
                    </MagneticButton>
                    
                    {/* <button
                        type="button"
                        className="age-gate__exit-button"
                        onClick={handleNo}
                    >
                        NO, EXIT
                    </button> */}

                </div>

                {/* Responsible Drinking */}
                <p className="age-gate__footer">
                    Please enjoy alcoholic beverages responsibly.
                </p>

            </div>
        </div>
    );
}
