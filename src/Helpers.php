<?php

namespace nicomartin\PluginBoilerplate;

class Helpers
{
    public static function checkAuth()
    {
        return current_user_can('administrator');
    }
}
