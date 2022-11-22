import React, { useCallback } from "react";
import PropTypes from "prop-types";
import FormContainer from "global/containers/form";
import Form from "global/components/form";
import { useTranslation } from "react-i18next";
import lh from "helpers/linkHandler";
import { sectionsAPI } from "api";
import { useHistory } from "react-router-dom";

export default function AddEditSectionForm({ section = {}, textId }) {
  const { t } = useTranslation();
  const history = useHistory();

  const createSection = () => {};
  const editSection = (id, model) => {
    return sectionsAPI.update(textId, id, model);
  };

  const onSuccess = useCallback(() => {
    history.push(lh.link("backendTextSections", textId));
  }, [history, textId]);

  return (
    <FormContainer.Form
      model={section}
      name="be-text-section-update"
      className="form-secondary"
      onSuccess={onSuccess}
      create={createSection}
      update={editSection}
    >
      <Form.TextInput
        focusOnMount
        label={t("backend.forms.text_section.section_name")}
        placeholder={t("backend.forms.text_section.section_name")}
        name="attributes[name]"
      />
      <Form.CodeArea
        label={t("backend.forms.text_section.content_label")}
        instructions={t("backend.forms.text_section.content_instructions")}
        height="600px"
        mode="html"
        name="attributes[body]"
      />
      <Form.DrawerButtons
        showCancel
        cancelUrl={lh.link("backendTextSections", textId)}
        submitLabel="backend.forms.text_section.save_button_label"
      />
    </FormContainer.Form>
  );
}

AddEditSectionForm.displayName = "Text.Sections.AddEditForm";

AddEditSectionForm.propTypes = {
  textId: PropTypes.string.isRequired,
  section: PropTypes.object
};
