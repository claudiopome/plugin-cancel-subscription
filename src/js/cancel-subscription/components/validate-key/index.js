import React from "react";

import FormNotice from "../form-notice";

const { __ } = wp.i18n;

class ValidateKey extends React.Component {

    constructor(props) {
        super(props);

        this.continue = this.continue.bind(this)
    }

    continue(e) {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {

        const { close, handleChange, formNotice, wlKeyValid } = this.props;

        return(
            <React.Fragment>

                <header>
                    <strong>{__("WordLift key is required to cancel your subscription", "wordlift-theme")}</strong>
                    <button type="button" className="cancel-subscription-modal__close" onClick={close}>&#10005;</button>
                </header>

                {!wlKeyValid && <FormNotice formNotice={formNotice} />}

                <section className="cancel-subscription-modal__content">
                    <p><strong className="cancel-subscription-modal__notice">{__("You are going to cancel you subscription. This action cannot be undone.", "wordlift-theme")}</strong></p>
                    <p>{__("Please type your WordLift key or use the Cancel button to close this modal", "wordlift-theme")}</p>

                    <div className="wl-textfield">
                        <input type="text" name="wlKey" placeholder={__("Write here", "wordlift-theme")} onChange={handleChange} />
                    </div>
                </section>

                <footer>
                    <button type="button" className="wl-btn wl-btn--red" onClick={close}>
                        {__("Cancel", "wordlift-theme")}
                    </button>

                    <button className={wlKeyValid ? "wl-btn wl-btn--outline--red" : "wl-btn wl-btn--blue--disabled" } disabled={wlKeyValid ? "" : "disabled"} onClick={this.continue}>
                        {__("Confirm", "wordlift-theme")}
                    </button>
                </footer>

            </React.Fragment>
        )
    }
}

export default ValidateKey;