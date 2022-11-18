SELECT text_id, jsonb_agg(jsonb_build_object('label', name, 'id', id, 'source_path', source_identifier) ORDER BY position ASC NULLS LAST) AS auto_generated_toc FROM text_sections GROUP BY text_id;
