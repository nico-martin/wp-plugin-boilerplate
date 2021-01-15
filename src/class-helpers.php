<?php

namespace nicomartin\PluginBoilerplate;

class Helpers {
	public static function check_auth() {
		return current_user_can( 'administrator' );
	}
}
