<?php

/**
 * @link              https://profiles.wordpress.org/marifamir/
 * @since             1.0.0
 * @package           wp_widget_cloner
 *
 * @wordpress-plugin
 * Plugin Name:       WP Widget Cloner
 * Plugin URI:        https://github.com/arifamir/wp-widget-cloner
 * Description:        WP Widget cloner makes a copy of the widget that you can then drag and drop to another sidebar.
 * Version:           1.0.0
 * Author:            Muhammad Arif Amir
 * Author URI:        https://profiles.wordpress.org/marifamir/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-widget-cloner
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-wp-widget-cloner.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_wp_widget_cloner() {

	$plugin = new WP_Widget_Cloner();
	$plugin->run();

}

run_wp_widget_cloner();
