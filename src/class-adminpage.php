<?php

namespace nicomartin\PluginBoilerplate;

class AdminPage {
  public $capability = '';
  public $settings_parent = '';
  public $menu_title = '';

  public function __construct() {
    $this->capability      = 'administrator';
    $this->settings_parent = PREFIX_get_instance()->prefix . '-settings';
    $this->menu_title      = PREFIX_get_instance()->name;
  }

  public function run() {
    add_action( 'admin_menu', [ $this, 'menu' ] );
  }

  public function menu() {
    add_menu_page( PREFIX_get_instance()->name, $this->menu_title, $this->capability, $this->settings_parent,
      function () {
        ?>
        <div id="PREFIX-app"></div>
        <?php
      }, 'dashicons-admin-settings', 100 );
  }
}
