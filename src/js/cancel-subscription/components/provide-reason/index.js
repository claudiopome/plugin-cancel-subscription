import React from "react";
import FormNotice from "../form-notice";

const { __ } = wp.i18n;

class ProvideReason extends React.Component {

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this)
    }

    submitForm(e) {
        e.preventDefault();
        this.props.handleSubmit();
        this.props.nextStep();
    }


    render() {

        const {close, handleChange, formNotice, providedReason, otherReasonText, providedReasonValid} = this.props;

        return(
            <React.Fragment>

                <header>
                    <strong>{__("We're sorry to see you go!", "wordlift-theme")}</strong>
                    <button type="button" className="cancel-subscription-modal__close" onClick={close}>&#10005;</button>
                </header>

                {!providedReason && <FormNotice formNotice={formNotice} />}

                <section className="cancel-subscription-modal__content">

                    <p><strong>{__("If you have time please let us know why you want to cancel your subscription", "wordlift-theme")}</strong></p>

                    <form>
                        <div className="radio">
                            <label>
                                <input
                                    name="providedReason"
                                    type="radio"
                                    value="It was too complicated and unclear to me"
                                    onChange={handleChange}
                                    defaultChecked
                                />
                                {__("It was too complicated and unclear to me", "wordlift-theme")}
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    name="providedReason"
                                    type="radio"
                                    value="There aren't enough features"
                                    onChange={handleChange}
                                />
                                {__("There aren't enough features", "wordlift-theme")}
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    name="providedReason"
                                    type="radio"
                                    value="It costs too much"
                                    onChange={handleChange}
                                />
                                {__("It costs too much", "wordlift-theme")}
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    name="providedReason"
                                    type="radio"
                                    value="I found another tool that I like better"
                                    onChange={handleChange}
                                />
                                {__("I found another tool that I like better", "wordlift-theme")}
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    name="providedReason"
                                    type="radio"
                                    value="I'm not using it right now"
                                    onChange={handleChange}
                                />
                                {__("I'm not using it right now", "wordlift-theme")}
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    name="providedReason"
                                    type="radio"
                                    value="Something didn't work right"
                                    onChange={handleChange}
                                />
                                {__("Something didn't work right", "wordlift-theme")}
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input
                                    name="providedReason"
                                    type="radio"
                                    value="Another reason"
                                    onChange={handleChange}
                                />
                                {__("Another reason", "wordlift-theme")}
                            </label>

                            <div
                                className={providedReason === 'Another reason' ? 'wl-cancel-subscription-textarea visible' : 'wl-cancel-subscription-textarea not-visible'}>
                                <textarea name="otherReasonText" placeholder={__("Write here", "wordlift-theme")}
                                          onChange={handleChange}>{otherReasonText}</textarea>
                                <label>{__("Please tell us the reason so we can improve it.", "wordlift-theme")}</label>
                            </div>

                        </div>
                    </form>

                </section>

                <footer>
                    <button type="button" className="wl-btn wl-btn--red" onClick={close}>
                        {__("Cancel", "wordlift-theme")}
                    </button>

                    <button type="submit" className={providedReasonValid ? "wl-btn wl-btn--outline--red" : "wl-btn wl-btn--blue--disabled" } disabled={providedReasonValid ? "" : "disabled"} onClick={this.submitForm}>
                        {__("Confirm", "wordlift-theme")}
                    </button>
                </footer>

            </React.Fragment>
        )
    }
}

export default ProvideReason;