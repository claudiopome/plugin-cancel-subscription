import React from "react";
import ReactDOM from "react-dom";

import CancelSubscriptionModal from "./components/cancel-subscription-modal";

CancelSubscriptionModal.mount = function(el) {
    ReactDOM.render( <CancelSubscriptionModal/>, el );
}


const mountModal = function() {
    CancelSubscriptionModal.mount(document.querySelector(".cancel-subscription__modal-container"));
}

window.addEventListener("load", function() {
    const mountModalBtn = document.getElementById("cancel-subscription-box__button");

    if ( null === mountModalBtn ) return;

    mountModalBtn.addEventListener("click", mountModal);
});


