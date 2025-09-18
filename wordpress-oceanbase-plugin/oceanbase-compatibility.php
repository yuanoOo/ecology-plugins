<?php
/*
 * Plugin Name:       OceanBase Compatibility
 * Plugin URI:        https://github.com/oceanbase/ecology-plugins/tree/main/wordpress-oceanbase-plugin
 * Description:       Intercepts and modifies specific SQL DELETE queries targeting wp_options and wp_sitemeta.
 * Version:           1.0.1
 * Requires at least: 6.1
 * Requires PHP:      7.2
 * Author:            sc-source
 * Author URI:        https://github.com/sc-source
 * License:           Apache License Version 2.0
 * License URI:       http://www.apache.org/licenses/LICENSE-2.0
 * Text Domain:       oceanbase-compatibility
 */
if (!defined('ABSPATH')) {
    exit;
}

class OceanBase_Delete_Expired_Transients {
    public function __construct() {
        add_filter('query', array($this, 'modify_delete_expired_transients'));
    }
        private function build_delete_query($original_query, $results) {
        global $wpdb;

        $ids_to_delete = [];
        foreach ($results as $row) {
            $ids_to_delete[] = intval($row['a_id']);
            $ids_to_delete[] = intval($row['b_id']);
        }

        if (!empty($ids_to_delete)) {
            $placeholders = implode(',', array_fill(0, count($ids_to_delete), '%d'));
            $table = (strpos($original_query, $wpdb->options) !== false) ? $wpdb->options : $wpdb->sitemeta;
            $column = (strpos($original_query, $wpdb->options) !== false) ? "option_id" : "meta_id";
            return $wpdb->prepare(
                "DELETE FROM $table WHERE $column IN ($placeholders)",
                $ids_to_delete
            );
        }

        return '';
    }

    public function modify_delete_expired_transients($query) {
        global $wpdb;

        $regex_options = '/^DELETE\s+\w+,\s+\w+\s+FROM\s+' . preg_quote($wpdb->options, '/') . '\s+(\w+),\s+' . preg_quote($wpdb->options, '/') . '\s+(\w+)\s+WHERE\s+' .
                '.*?a\.option_name\s+LIKE\s+\'(.+?)\'.*?' .
                '.*?AND\s+a\.option_name\s+NOT\s+LIKE\s+\'(.+?)\'.*?' .
                '.*?AND\s+b\.option_value\s*<\s*(\d+)\s*$/is';

        $regex_sitemeta = '';
        if (is_string($wpdb->sitemeta)) {
            $regex_sitemeta = '/^DELETE\s+\w+,\s+\w+\s+FROM\s+' . preg_quote($wpdb->sitemeta, '/') . '\s+(\w+),\s+' . preg_quote($wpdb->sitemeta, '/') . '\s+(\w+)\s+WHERE\s+' .
                '.*?a\.meta_key\s+LIKE\s+\'(.+?)\'.*?' .
                '.*?AND\s+a\.meta_key\s+NOT\s+LIKE\s+\'(.+?)\'.*?' .
                '.*?AND\s+b\.meta_value\s*<\s*(\d+)\s*$/is';
        }

        if ($regex_sitemeta && preg_match($regex_sitemeta, $query, $matches)) {
            if (!isset($matches[3], $matches[4], $matches[5])) {
                return $query;
            }
            $like_pattern = stripslashes($matches[3]); 
            $not_like_pattern = stripslashes($matches[4]);
            $timeout_value = intval($matches[5]);
 
            $clean_pattern = str_replace('\\', '', $like_pattern);
             if (strpos($clean_pattern, needle: '_site_transient_') !== false) {
    
                $prepared_query = $wpdb->prepare(
                    "SELECT a.meta_id AS a_id, b.meta_id AS b_id
                        FROM {$wpdb->sitemeta} a, {$wpdb->sitemeta} b
                        WHERE a.meta_key LIKE %s
                        AND a.meta_key NOT LIKE %s
                        AND b.meta_key = CONCAT('_site_transient_timeout_', SUBSTRING(a.meta_key, 17))
                        AND b.meta_value < %d",
                    $like_pattern, $not_like_pattern, $timeout_value
                );
            }else{
                return $query;
            }
            $results = $wpdb->get_results($prepared_query, ARRAY_A);
            return $this->build_delete_query($query, $results);
        } 


        if (preg_match($regex_options, $query, $matches)) {

            if (!isset($matches[3], $matches[4], $matches[5])) {
                return $query;
            }
            $like_pattern = stripslashes($matches[3]); 
            $not_like_pattern = stripslashes($matches[4]);
            $timeout_value = intval($matches[5]);

            $clean_pattern = str_replace('\\', '', $like_pattern);
             if (strpos($clean_pattern, needle: '_site_transient_') !== false) {

                    $prepared_query = $wpdb->prepare(
                        "SELECT a.option_id AS a_id, b.option_id AS b_id
                        FROM {$wpdb->options} a, {$wpdb->options} b
                        WHERE a.option_name LIKE %s
                        AND a.option_name NOT LIKE %s
                        AND b.option_name = CONCAT('_site_transient_timeout_', SUBSTRING(a.option_name, 17))
                        AND b.option_value < %d",
                        $like_pattern, $not_like_pattern, $timeout_value
                    );
            }elseif (strpos($clean_pattern, needle: '_transient_') !== false) {

                    $prepared_query = $wpdb->prepare(
                        "SELECT a.option_id AS a_id, b.option_id AS b_id
                        FROM {$wpdb->options} a, {$wpdb->options} b
                        WHERE a.option_name LIKE %s
                        AND a.option_name NOT LIKE %s
                        AND b.option_name = CONCAT('_transient_timeout_', SUBSTRING(a.option_name, 12))
                        AND b.option_value < %d",
                        $like_pattern, $not_like_pattern, $timeout_value
                    );
            } else {
                return $query;
            }

            $results = $wpdb->get_results($prepared_query, ARRAY_A);
            return $this->build_delete_query($query, $results);
        } 
        return $query;
        
    }
}

// Initialize the plugin
new OceanBase_Delete_Expired_Transients();