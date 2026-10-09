
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const AGE_GATE_KEY = "bevoky_age_verified";

export default function AgeGate() {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);


    useEffect(() => {
        // Show the modal if this is a fresh page load or refresh.
        sessionStorage.removeItem(AGE_GATE_KEY);

        setIsVisible(true);
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);


    const handleYes = () => {
        sessionStorage.setItem(AGE_GATE_KEY, "true");

        setIsClosing(true);

        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
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
            <div className="age-gate__backdrop" />

            <div className="age-gate__content">
                <div className="age-gate__top-line" />

                <div className="age-gate__logo">
                    <img src="/assets/logo.png" alt="Bevoky Global" />
                </div>

                <div className="age-gate__divider" />

                <p className="age-gate__eyebrow">
                    AGE VERIFICATION
                </p>

                <h1 id="age-gate-title">
                    ARE YOU
                    <span>OVER 18?</span>
                </h1>

                <p className="age-gate__message">
                    Welcome to Bevoky Global.
                    <br />
                    This website contains information about alcoholic beverages.
                </p>

                <p className="age-gate__notice">
                    By entering this website, you confirm that you are
                    18 years old and legally permitted to view content related
                    to alcoholic beverages in your country.
                </p>

                <div className="age-gate__actions">
                    <MagneticButton
                        variant="primary"
                        onClick={handleYes}
                        icon={true}
                        className="age-gate__enter-button"
                    >
                        YES, ENTER
                    </MagneticButton>

                    <MagneticButton
                        variant="primary"
                        onClick={handleNo}
                        icon={true}
                        className="age-gate__enter-button"
                    >
                        NO, EXIT
                    </MagneticButton>
                </div>

                <p className="age-gate__footer">
                    Please enjoy alcoholic beverages responsibly.
                </p>
            </div>
        </div>
    );
}
