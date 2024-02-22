import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { FormContext } from "helpers/contexts";
import * as Styled from "./styles";

export default function ProfileGreeting({ mode, warn }) {
  const formData = useContext(FormContext);
  const nickname = formData.getModelValue("attributes[nickname]");

  const { t } = useTranslation();

  return mode === "new" ? (
    <Trans
      i18nKey="forms.signin_overlay.create_success_message"
      components={[
        <Styled.Heading />,
        <Styled.Text />,
        <Styled.Nickname as="h4" />
      ]}
      values={{ name: nickname }}
    />
  ) : (
    <>
      <Styled.Heading>
        <Trans
          i18nKey="forms.signin_overlay.greeting"
          components={[<Styled.Nickname />]}
          values={{ name: nickname }}
        />
      </Styled.Heading>
      {warn && (
        <Styled.NotVerifiedWarning>
          {t("forms.signin_overlay.not_verified_warning")}
        </Styled.NotVerifiedWarning>
      )}
    </>
  );
}

ProfileGreeting.displayName = "Global.SignInUp.EditProfileForm.Greeting";

ProfileGreeting.propTypes = {
  mode: PropTypes.oneOf(["new", "existing"]),
  nickname: PropTypes.string
};
