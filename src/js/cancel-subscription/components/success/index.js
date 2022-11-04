import React from "react";

const { __ } = wp.i18n;

class Success extends React.Component {

    render() {

        const {close} = this.props;

        return(
            <React.Fragment>

                <header>
                    <strong>{__("Thanks for your request", "wordlift-theme")}</strong>
                    <button type="button" className="cancel-subscription-modal__close" onClick={close}>&#10005;</button>
                </header>

                <div className="wl-alert wl-alert--success">
                    <p><strong>{__("Success! ", "wordlift-theme")}</strong>{__( "We are processing your cancellation request.", "wordlift-theme")}</p>
                </div>

                <section className="cancel-subscription-modal__content">

                </section>


            </React.Fragment>
        )
    }
}

export default Success;