<?php
defined('DB_NAME')
	or die('-No-');

/**
 * Retrieves the root plugin path.
 *
 * @return string Root path to the drop it plugin.
 *
 * @since 1.0.0
 */
function gutextra_dir_path()
{
	return plugin_dir_path(dirname(__FILE__));
}

/**
 * Retrieves a URL to a file in the drop it plugin.
 *
 * @param  string $path Relative path of the desired file.
 *
 * @return string       Fully qualified URL pointing to the desired file.
 *
 * @since 1.0.0
 */
function gutextra_url($path)
{
	return plugins_url($path, dirname(__FILE__));
}


/**
 * Display a build notice.
 */
function gutextra_build_files_notice()
{
	echo '<div class="error"><p>';
	echo __('Gutextra requires files to be built. Run <code>npm install</code> to install dependencies, <code>npm run build</code> to build the files or <code>npm run dev</code> to build the files and watch for changes. Read the <a href="https://github.com/jmau111/gutextra#contribute">contributing</a> file for more information.', 'gutextra');
	echo '</p></div>';
}

/**
 * Display a version notice and deactivate the Gutenberg plugin.
 */
function gutextra_wordpress_version_notice()
{
	echo '<div class="error"><p>';
	echo __('Gutextra has pretty much the same requirements as Gutenberg so WordPress 4.9.6 or later to function properly. Please upgrade WordPress before activating Gutextra.', 'gutextra');
	echo '</p></div>';

	deactivate_plugins(['gutextra/gutextra.php']);
}
