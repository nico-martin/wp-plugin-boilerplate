<?php

namespace nicomartin\PluginBoilerplate;

class Assets {
  public function run() {
    add_action( 'wp_enqueue_scripts', [ $this, 'add_assets' ] );
    add_action( 'admin_enqueue_scripts', [ $this, 'add_admin_assets' ] );
  }

  public function add_assets() {
    $script_version = PREFIX_get_instance()->version;
    $dir_uri        = trailingslashit( plugin_dir_url( PREFIX_get_instance()->file ) );

    wp_enqueue_style( PREFIX_get_instance()->prefix . '-ui-style', $dir_uri . 'assets/dist/ui.css', [],
      $script_version );
    wp_enqueue_script( PREFIX_get_instance()->prefix . '-ui-script', $dir_uri . 'assets/dist/ui.js', [],
      $script_version, true );
  }

  public function add_admin_assets() {
    $script_version = PREFIX_get_instance()->version;
    $dir_uri        = trailingslashit( plugin_dir_url( PREFIX_get_instance()->file ) );

    wp_enqueue_media();
    wp_enqueue_script( 'react', $dir_uri . 'assets/react.production.min.js', [], '17', true );
    wp_enqueue_script( 'react-dom', $dir_uri . 'assets/react-dom.production.min.js', [], '17', true );

    wp_enqueue_style( PREFIX_get_instance()->prefix . '-admin-style', $dir_uri . 'assets/dist/admin.css', [],
      $script_version );
    wp_enqueue_script( PREFIX_get_instance()->prefix . '-admin-script', $dir_uri . 'assets/dist/admin.js', [
      'react',
      'react-dom',
    ], $script_version, true );

    /**
     * Admin Footer JS
     */

    $defaults = [
      'ajaxUrl'            => admin_url( 'admin-ajax.php' ),
      'homeUrl'            => trailingslashit( get_site_url() ),
      'generalError'       => __( 'An unexpected error occured', 'plugin-boilerplate' ),
      'settings'           => PREFIX_get_instance()->settings->getSettings(),
      'restBase'           => trailingslashit( get_rest_url() ),
      'translationStrings' => apply_filters( 'PREFIX_translation_strings', [] ),
    ];

    $vars = json_encode( apply_filters( 'PREFIX_admin_footer_js', $defaults ) );

    wp_add_inline_script( PREFIX_get_instance()->prefix . '-admin-script', "var PREFIXJsVars = {$vars};", 'before' );
  }
}
