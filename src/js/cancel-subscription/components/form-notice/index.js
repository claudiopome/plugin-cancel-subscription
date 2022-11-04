import React from "react";

const { __ } = wp.i18n;

const FormNotice = ({formNotice}) => {

    return (
        <div className="wl-alert wl-alert--danger">
            <p><strong>Error!</strong> {formNotice}</p>
        </div>
    )


}

export default FormNotice;
