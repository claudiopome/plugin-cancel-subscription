import React from 'react';
import ReactDOM from 'react-dom';

import CancelSubscription from "../cancel-subscription";

class CancelSubscriptionModal extends React.Component {

    constructor(props) {
        super(props);

        this.myRef = React.createRef();
        this.closeModal = this.closeModal.bind(this);

    }

    closeModal() {
        this.myRef.current &&
            ReactDOM.unmountComponentAtNode(this.myRef.current.parentNode);
    }

    render() {
        return(
            <div className="modal" ref={this.myRef}>
                <section className="cancel-subscription-modal">
                    <CancelSubscription close={this.closeModal} />
                </section>
            </div>
        );
    }
}

export default CancelSubscriptionModal;
