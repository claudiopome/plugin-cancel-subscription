import React from 'react';

import ValidateKey from "../validate-key";
import ProvideReason from "../provide-reason";
import Success from "../success";

import {CANCEL_SUBSCRIPTION_LOCALIZATION_OBJECT_KEY} from "../../constants";

const {__} = wp.i18n;

class CancelSubscription extends React.Component {

    constructor(props) {
        super(props);

        this.settings = global[CANCEL_SUBSCRIPTION_LOCALIZATION_OBJECT_KEY];
        this.state = {
            step: 1,
            wlKey: '',
            providedReason: 'It was too complicated and unclear to me',
            otherReasonText: '',
            wlKeyValid: true,
            providedReasonValid: true,
            formNotice: ''
        }

        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.prevStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    nextStep() {
        const {step} = this.state;
        this.setState({step: step + 1});
    }

    prevStep() {
        const {step} = this.state;
        this.setState({step: step - 1});
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
        this.handleValidation(name, value);
    }

    handleSubmit() {
        const {subscriptionId, wlKey, subscriberEmail, action, nonce} = global[
            CANCEL_SUBSCRIPTION_LOCALIZATION_OBJECT_KEY
            ];

        const {ajaxUrl} = global["wlSettings"];

        const params = new URLSearchParams();
        params.append("subscription_id", subscriptionId);
        params.append("wl_key", wlKey);
        params.append("subscriber_email", subscriberEmail);
        params.append("provided_reason", this.state.providedReason);
        params.append("details", this.state.otherReasonText);
        params.append("_nonce", nonce)

        fetch(ajaxUrl + "?action=" + action, {
            method: "POST",
            body: params
        })
            .then(response => response.json())
            .then(json => json);
    }

    handleValidation(fieldName, value) {

        let fieldValidationNotice;
        let wlKeyValidationValid = true;
        let providedReasonValidationValid = true;

        switch (fieldName) {

            case 'wlKey':
                wlKeyValidationValid = value !== "" && value === this.settings.wlKey;
                fieldValidationNotice = wlKeyValidationValid ? "" : __("The WordLift key you entered does not match your subscription", "wordlift-theme");

                this.setState({
                    formNotice: fieldValidationNotice,
                    wlKeyValid: wlKeyValidationValid,
                });

                break;

            case 'providedReason':
                providedReasonValidationValid = value !== '';
                fieldValidationNotice = providedReasonValidationValid ? "" : __("You must provide a reason for cancelling your subscription", "wordlift-theme");

                this.setState({
                    formNotice: fieldValidationNotice,
                    providedReasonValid: providedReasonValidationValid
                });

                break;

            default:
                break;
        }

    }


    render() {
        const {close} = this.props;
        const {step} = this.state;
        const {wlKey, providedReason, otherReasonText} = this.state;
        const values = {wlKey, providedReason, otherReasonText}

        switch (step) {
            case 1:
                return (
                    <ValidateKey
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        formNotice={this.state.formNotice}
                        wlKeyValid={this.state.wlKeyValid}
                        close={close}
                        values={values}
                    />
                );
            case 2:
                return (
                    <ProvideReason
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        formNotice={this.state.formNotice}
                        providedReason={providedReason}
                        otherReasonText={otherReasonText}
                        providedReasonValid={this.state.providedReasonValid}
                        handleSubmit={this.handleSubmit}
                        close={close}
                        values={values}
                    />
                );

            case 3:
                return (
                    <Success
                        close={close}
                    />
                );

            default:
                break;
        }

    }
}

export default CancelSubscription;
