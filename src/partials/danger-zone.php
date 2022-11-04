<?php
/**
 * Partial to render the UI in WooCommerce My account page.
 *
 * @package My_Account_Cancel_Subscription
 *
 * @since 1.0.0
 */
?>
<section class="danger-zone">
    <h2 class="woocommerce-column__title"><?php _e( 'Danger Zone', 'my-account-cancel-subscription'); ?></h2>

<section class="cancel-subscription-box">

    <header class="cancel-subscription-box__copy">
        <h6><?php esc_html_e( 'Cancel subscription', 'my-account-cancel-subscription' ); ?></h6>
        <p><?php esc_html_e( 'Once you cancel your subscription it cant be undone', 'my-account-cancel-subscription' ); ?></p>
    </header>

    <aside>
        <button class="wl-btn wl-btn--red wl-btn--full" id="cancel-subscription-box__button">
            <?php esc_html_e( 'Cancel subscription', 'my-account-cancel-subscription' ); ?></button>
    </aside>

</section>
<div class="cancel-subscription__modal-container"></div>
</section>
