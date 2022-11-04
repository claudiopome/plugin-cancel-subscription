<?php

/**
 * Plugin Name:     My Account Cancel Subscription
 * Plugin URI:
 * Description:     This plugin lets the subscriber send an email through WooCommerce My Account page, to ask for subscription cancellation.
 * Author:          Claudio Salatino <claudio@wordlift.io>
 * Author URI:
 * Text Domain:     my-account-cancel-subscription
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         My_Account_Cancel_Subscription
 */

use My_Account_Cancel_Subscription\My_Account_Cancel_Subscription;


/**
 * Register our autoload routine.
 *
 * @since 1.0.0
 */
spl_autoload_register( function ( $class_name ) {

    // Bail out if these are not our src.
    if ( 0 !== strpos( $class_name, 'My_Account_Cancel_Subscription\\' ) ) {
        return false;
    }

    $class_name_lc = strtolower( str_replace( '_', '-', $class_name ) );

    preg_match( '|^(?:(.*)\\\\)?(.+?)$|', $class_name_lc, $matches );

    $path = 'src/' . str_replace( array( 'my-account-cancel-subscription', '\\' ), array(
            '',
            DIRECTORY_SEPARATOR
        ), $matches[1] );

    $file = 'class-' . $matches[2] . '.php';

    $full_path = plugin_dir_path( __FILE__ ) . $path . DIRECTORY_SEPARATOR . $file;

    if ( ! file_exists( $full_path ) ) {
	    echo sprintf( esc_html__( 'Class %1$s not found at %2$s.', 'my-account-cancel-subscription' ), $class_name, $full_path );

	    return false;
    }

	require_once $full_path;

	return true;
} );


add_action( 'plugins_loaded',
	function () {

		$is_wcs_installed = class_exists( 'WC_Subscriptions' );

		if ( ! $is_wcs_installed ) {
			add_action( 'admin_notices',
				function () {
					?>
					<div class="notice notice-error is-dismissible">
						<p><?php esc_html_e( 'This plugin requires WooCommerce Subscriptions to be installed', 'my-account-cancel-subscription' ); ?></p>
					</div>
					<?php

				} );

			return;

		}
		new My_Account_Cancel_Subscription();
	} );




