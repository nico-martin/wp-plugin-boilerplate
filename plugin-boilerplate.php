<?php

namespace nicomartin\PluginBoilerplate;

/*
Plugin Name: PluginBoilerplate
Description: A Plugin Boilerplate by Nico Martin
Author: Nico Martin
Author URI: https://nicomartin.ch
Version: 1.0.0
Text Domain: plugin-boilerplate
Domain Path: /languages
 */

global $wp_version;
if ( version_compare( $wp_version, '4.7', '<' ) || version_compare( PHP_VERSION, '7.2.1', '<' ) ) {
	add_action( 'admin_notices', function () {
		echo '<div class="error"><p>';
		// translators: Dependency warning
		echo sprintf( __( '“%1$s” requires PHP %2$s (or newer) and WordPress %3$s (or newer) to function properly. Your site is using PHP %4$s and WordPress %5$s. Please upgrade. The plugin has been automatically deactivated.', 'pwp' ), 'PluginBoilerplate', '5.3', '4.7', PHP_VERSION, $GLOBALS['wp_version'] );
		echo '</p></div>';
		if ( isset( $_GET['activate'] ) ) {
			unset( $_GET['activate'] );
		}
	} );

	add_action( 'admin_init', function () {
		deactivate_plugins( plugin_basename( __FILE__ ) );
	} );

	return;
} else {

	require_once 'src/class-helpers.php';

	require_once 'src/class-plugin.php';
	function PREFIX_get_instance(): Plugin {
		return Plugin::get_instance( __FILE__ );
	}

	PREFIX_get_instance();

	require_once 'api/class-settings.php';
	PREFIX_get_instance()->settings = new Settings();
	PREFIX_get_instance()->settings->run();

	require_once 'src/class-adminpage.php';
	PREFIX_get_instance()->admin_page = new AdminPage();
	PREFIX_get_instance()->admin_page->run();

	require_once 'src/class-assets.php';
	PREFIX_get_instance()->assets = new Assets();
	PREFIX_get_instance()->assets->run();

	require_once 'src/class-testsettings.php';
	PREFIX_get_instance()->testsettings = new TestSettings();
	PREFIX_get_instance()->testsettings->run();

} // End if().
