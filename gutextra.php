<?php

/**
 * Plugin Name: Gutextra
 * Description: A collection of personal Gutenberg blocks that might be useful for you too.
 * Version: 1.1.2
 * Text Domain: gutextra
 * Domain Path: /languages
 * Author: Julien Maury
 *
 * @package gutextra
 */
defined('DB_NAME')
	or die('-No-');

require dirname(__FILE__) . '/lib/common.php';
require dirname(__FILE__) . '/lib/scripts.php';

//todo: compat filter gutextra_allowed_blocks

/**
 * Adds a better experience
 * for users that do not know about npm, webpack and joy
 */
add_action('admin_init', function () {

	if (version_compare($GLOBALS['wp_version'], '4.9.6', '<')) {
		add_action('admin_notices', 'gutextra_wordpress_version_notice');
		return;
	}

	if (!file_exists(dirname(__FILE__) . '/build/index.js')) {
		add_action('admin_notices', 'gutextra_build_files_notice');
		return;
	}
});
