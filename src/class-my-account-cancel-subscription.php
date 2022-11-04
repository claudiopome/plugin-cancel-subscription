<?php

/**
 * This file contains the core plugin functions.
 *
 * @package My_Account_Cancel_Subscription
 *
 * @since 1.0.0
 */

namespace My_Account_Cancel_Subscription;

/**
 * Define the Core class.
 *
 * The Core class instance will hook the functions to WordPress actions and filters.
 *
 * @since 1.0.0
 *
 * @package My_Account_Cancel_Subscription
 */

class My_Account_Cancel_Subscription {

    const STYLE_HANDLE = 'plugin-cancel-subscription-css-handle';

    const SCRIPT_HANDLE = 'plugin-cancel-subscription-js-handle';

    const ACTION = 'plugin_cancel_subscription_feedback';

    /**
     * Core_Admin_Settings constructor.
     */
    public function __construct() {

        // Bail out if WooCommerce is not installed.
        if ( ! function_exists( 'WC' ) ) {
            return;
        }

        add_filter( 'woocommerce_order_details_after_customer_details', array( $this, 'render' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts_and_styles' ) );
        add_action( 'wp_ajax_' . self::ACTION, array( $this, 'wl_cancel_subscription_feedback' ) );
    }

    public function render() {
        wc_get_template( plugin_dir_path( __FILE__ ) . 'partials/danger-zone.php' );
    }

    public function enqueue_scripts_and_styles() {

        // Bail out if the user is not logged in.
        if ( ! is_wc_endpoint_url( 'view-subscription' ) ) {
            return;
        }

        wp_enqueue_script( self::SCRIPT_HANDLE,
            get_stylesheet_directory_uri() . '/dist/my-account-cancel-subscription.js',
            array( 'wp-polyfill', 'wp-i18n' ),
            '',
            true );

        wp_localize_script( self::SCRIPT_HANDLE,
            '_myAccountCancelSubscription',
            $this->get_localization_settings()
        );

        wp_enqueue_style( self::STYLE_HANDLE,
            plugin_dir_path( __FILE__ ) . 'style.css',
            array()
        );
    }


    public function get_localization_settings() {

        $subscription    = wcs_get_subscription( get_query_var( 'view-subscription' ) );
        $subscription_id = $subscription->get_id();

        return array(
            'subscriptionId'  => $subscription_id,
            'wlKey'           => get_post_meta( $subscription_id, \Wordlift_Store_Subscriptions_Service::WORDLIFT_KEY_META_NAME, true ),
            'subscriberEmail' => $subscription->get_billing_email(),
            'action'          => self::ACTION,
            'nonce'           => wp_create_nonce( self::ACTION ),
        );

    }

    public function wl_cancel_subscription_feedback() {

        // Check nonce or die.
        check_ajax_referer( self::ACTION, '_nonce' );

        // Prepare data.
        $subscription_id        = filter_input( INPUT_POST, 'subscription_id', FILTER_SANITIZE_NUMBER_INT );
        $wl_key                 = filter_input( INPUT_POST, 'wl_key', FILTER_SANITIZE_STRING );
        $subscriber_email       = filter_input( INPUT_POST, 'subscriber_email', FILTER_SANITIZE_EMAIL );
        $reason_to_cancel       = filter_input( INPUT_POST, 'provided_reason', FILTER_SANITIZE_STRING );
        $another_reason_details = ! empty( $_POST["details"] ) ? filter_input( INPUT_POST, 'details', FILTER_SANITIZE_STRING ) : '';

        // Prepare email.
        $to      = 'claudiopome@gmail.com';
        $subject = sprintf( __( 'Subscription cancellation request for subscription #%d', 'my-account-cancel-subscription' ), $subscription_id );

        $message = __( 'We received a cancellation request for subscription #', 'my-account-cancel-subscription' ) . $subscription_id . '<br>' . __( 'Related WordLift key: ', 'my-account-cancel-subscription' ) . $wl_key . '<br>'
            . __( 'Subscriber email: ', 'my-account-cancel-subscription' ) . $subscriber_email . '<br>' . __( 'Reason for cancellation request: ', 'my-account-cancel-subscription' ) . $reason_to_cancel . '<br>'
            . __( 'The customer provided some more details: ', 'my-account-cancel-subscription' ) . $another_reason_details;


        $headers = array( 'Content-Type: text/html; charset=UTF-8' );

        wp_mail( $to, $subject, $message, $headers );

        wp_die();
    }
}
