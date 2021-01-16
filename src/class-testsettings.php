<?php

namespace nicomartin\PluginBoilerplate;

class TestSettings {

	public function __construct() {
	}

	public function run() {
		add_filter( 'PREFIX_register_settings', [ $this, 'register_settings' ] );
	}

	public function register_settings( $settings ) {
		$settings['myString'] = [
			'default'  => 'default value',
			'validate' => null,
		];

    $settings['myStringArea'] = [
      'default'  => '',
      'validate' => null,
    ];

		$settings['mySelectValue'] = [
			'default'  => '',
			'validate' => null,
		];

		$settings['myCheckox'] = [
			'default'  => true,
			'validate' => null,
		];

		$settings['myRadio'] = [
			'default'  => '',
			'validate' => null,
		];

		$settings['myImages'] = [
			'default'  => '',
			'validate' => null,
		];

		return $settings;
	}
}
