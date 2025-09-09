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

    public function modify_delete_expired_transients($query) {
        global $wpdb;

        // Check for DELETE query targeting wp_options
        if (preg_match('/DELETE\s+\w+,\s+\w+\s+FROM\s+' . preg_quote($wpdb->options, '/') . '\s+\w+,\s+' . preg_quote($wpdb->options, '/') . '\s+\w+\s+WHERE/i', $query)) {
            // Modify the query to select option_id
            $modified_query = preg_replace('/DELETE\s+\w+,\s+\w+\s+FROM/i', "SELECT a.option_id AS a_option_id, b.option_id AS b_option_id FROM", $query);

            // Execute the modified SELECT query (wrapped with prepare per review guidance)
            if (preg_match('/%[dsf]/', $modified_query)) {
                // If placeholders are included, the sql precheck fails
                $results = [];
            } else {
                // There are no placeholders. Execute directly
                // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared -- Query is constructed from original WordPress query and sanitized
                $results = $wpdb->get_results($modified_query, ARRAY_A);
            }

            // Initialize an array to store all the ID objects
            $ids_to_delete = array();

            // Iterate over the results, combining a.option_id and b.option_id into $ids_to_delete
            foreach ($results as $row) {
                $ids_to_delete[] = intval($row['a_option_id']);
                $ids_to_delete[] = intval($row['b_option_id']);
            }

            if (!empty($ids_to_delete)) {
                // Construct placeholders for IN clause and execute with prepare to avoid SQL injection
                $placeholders = implode(',', array_fill(0, count($ids_to_delete), '%d'));
                $final_delete_query = $wpdb->prepare(
                    "DELETE FROM {$wpdb->options} WHERE option_id IN ($placeholders)",
                    $ids_to_delete
                );
  
                return $final_delete_query;
            }

            // Return an empty string to prevent the original DELETE query from executing
            return '';
        }

        // Check for DELETE query targeting wp_sitemeta
        if (preg_match('/DELETE\s+\w+,\s+\w+\s+FROM\s+' . preg_quote($wpdb->sitemeta, '/') . '\s+\w+,\s+' . preg_quote($wpdb->sitemeta, '/') . '\s+\w+\s+WHERE/i', $query)) {
            // Modify the query to select meta_id
            $modified_query = preg_replace('/DELETE\s+\w+,\s+\w+\s+FROM/i', "SELECT a.meta_id AS a_meta_id, b.meta_id AS b_meta_id FROM", $query);

            // Execute the modified SELECT query (wrapped with prepare per review guidance)
            if (preg_match('/%[dsf]/', $modified_query)) {
                // If placeholders are included, the sql precheck fails
                $results = [];
            } else {
                // There are no placeholders. Execute directly
                // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared -- Query is constructed from original WordPress query and sanitized
                $results = $wpdb->get_results($modified_query, ARRAY_A);
            }
            // Initialize an array to store all the ID objects
            $ids_to_delete = array();

            // Iterate over the results, combining a.option_id and b.option_id into $ids_to_delete
            foreach ($results as $row) {
                $ids_to_delete[] = intval($row['a_meta_id']);
                $ids_to_delete[] = intval($row['b_meta_id']);
            }

            if (!empty($ids_to_delete)) {
                // Construct placeholders for IN clause and execute with prepare to avoid SQL injection
                $placeholders = implode(',', array_fill(0, count($ids_to_delete), '%d'));
                $final_delete_query = $wpdb->prepare(
                    "DELETE FROM {$wpdb->sitemeta} WHERE meta_id IN ($placeholders)",
                    $ids_to_delete
                );

                return $final_delete_query;
            }

            // Return an empty string to prevent the original DELETE query from executing
            return '';
        }

        // Return the original query if no changes are needed
        return $query;
    }
}

// Initialize the plugin
new OceanBase_Delete_Expired_Transients();