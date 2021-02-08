<?php
defined('DB_NAME')
	or die('-No-');

/**
 * Registers the alerts script
 *
 * @since 1.0.0
 */
function gutextra_alerts_script_register()
{
	if (
		!file_exists(gutextra_dir_path() . 'build/index.js')
		|| !file_exists(gutextra_dir_path() . 'build/style-index.css')
	) {
		return;
	}

	wp_register_script(
		'gutextra-js',
		gutextra_url('build/index.js'),
		[],
		filemtime(gutextra_dir_path() . 'build/index.js'),
		true
	);

	wp_localize_script('gutextra-js', 'flipCard', [
		'defaultImageUrl' => 'https://placekitten.com/320/427'
	]);

	wp_register_style(
		'gutextra-css',
		gutextra_url('build/style-index.css'),
		[],
		filemtime(gutextra_dir_path() . 'build/style-index.css')
	);
}

add_action('init', 'gutextra_alerts_script_register');
add_action('enqueue_block_assets', function () {
	wp_enqueue_script('gutextra-js');
	wp_enqueue_style('gutextra-css');
});
