<?php

namespace nicomartin\PluginBoilerplate;

class Plugin
{

    private static $instance;

    public $name = '';
    public $version = '';
    public $prefix = '';
    public $api_namespace = '';
    public $debug = false;
    public $file;

    public $upload_dir = '';
    public $upload_url = '';

    public $option_key = 'PREFIX_data';

    public $settings;
    public $admin_page;
    public $assets;

    public static function getInstance($file)
    {
        if (! isset(self::$instance) && ! (self::$instance instanceof Plugin)) {
            self::$instance = new Plugin();

            if (get_option(PREFIX_get_instance()->option_key)) {
                $data = get_option(PREFIX_get_instance()->option_key);
            } elseif (function_exists('get_plugin_data')) {
                $data = get_plugin_data($file);
            } else {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
                $data = get_plugin_data($file);
            }

            self::$instance->name    = $data['Name'];
            self::$instance->version = $data['Version'];

            self::$instance->prefix        = 'PREFIX';
            self::$instance->api_namespace = 'PREFIX/v1';
            self::$instance->debug         = true;
            self::$instance->file          = $file;

            self::$instance->run();
        }

        return self::$instance;
    }

    /**
     * Execution function which is called after the class has been initialized.
     * This contains hook and filter assignments, etc.
     */
    private function run()
    {
        add_action('plugins_loaded', [$this, 'loadPluginTextdomain']);
        add_action('admin_init', [$this, 'updatePluginData']);
        register_deactivation_hook(PREFIX_get_instance()->file, [$this, 'deactivate']);
        register_activation_hook(PREFIX_get_instance()->file, [$this, 'activate']);

        add_filter('PREFIX_translation_strings', [$this, 'pluginStrings']);
    }

    /**
     * Load translation files from the indicated directory.
     */
    public function loadPluginTextdomain()
    {
        load_plugin_textdomain('PREFIX', false, dirname(plugin_basename(PREFIX_get_instance()->file)) . '/languages');
    }

    /**
     * Update Plugin Data
     */
    public function updatePluginData()
    {

        $db_data   = get_option(PREFIX_get_instance()->option_key);
        $file_data = get_plugin_data(PREFIX_get_instance()->file);

        if ( ! $db_data || version_compare($file_data['Version'], $db_data['Version'], '>')) {

            PREFIX_get_instance()->name    = $file_data['Name'];
            PREFIX_get_instance()->version = $file_data['Version'];

            update_option(PREFIX_get_instance()->option_key, $file_data);

            if ( ! $db_data) {
                do_action('PREFIX_on_first_activate');
            } else {
                do_action('PREFIX_on_update', $db_data['Version'], $file_data['Version']);
            }
        }
    }

    public function activate()
    {
        do_action('PREFIX_on_activate');
    }

    public function deactivate()
    {
        do_action('PREFIX_on_deactivate');
        delete_option(PREFIX_get_instance()->option_key);
    }

    public function pluginStrings($strings)
    {
        $strings['plugin.name'] = PREFIX_get_instance()->name;

        return $strings;
    }
}
