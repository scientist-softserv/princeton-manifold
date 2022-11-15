import React, { useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { usersAPI } from "api";
import { currentUserActions } from "actions";
import capitalize from "lodash/capitalize";
import OAuthOptions from "../oauth/OAuthLoginOptions";
import { useFromStore } from "hooks";
import CreateFormFields from "./CreateFormFields";
import Form from "global/components/form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import * as Styled from "./styles";
import * as SharedStyles from "../styles";

export default function CreateUserForm({
  handleViewChange,
  willRedirect,
  redirectToHomeOnSignup
}) {
  const settings = useFromStore("settings", "select");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const installationName = settings?.attributes?.general?.installationName;

  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (formRef.current) formRef.current.focus();
  }, []);

  const OAuthProviderNames = () => {
    if (!settings?.attributes?.oauth) return null;

    const providers = Object.values(settings.attributes.oauth).filter(
      provider => provider.enabled
    );
    if (!providers || !providers.length) return null;
    const names = providers.map(provider => capitalize(provider.name));
    return names;
  };

  const authenticateUser = useCallback(
    (email, password) => {
      dispatch(currentUserActions.login({ email, password }));
    },
    [dispatch]
  );

  const pages = useFromStore("gPages", "select");
  const termsPage = pages?.find(
    p => p.attributes.purpose === "terms_and_conditions"
  );

  const formatAttributes = data => {
    const { attributes } = data;
    emailRef.current = attributes?.email;
    passwordRef.current = attributes?.password;

    return {
      attributes: termsPage
        ? {
            ...attributes,
            termsAndConditionsAcceptedAt: new Date().toISOString()
          }
        : attributes
    };
  };

  const onSuccess = useCallback(() => {
    authenticateUser(emailRef.current, passwordRef.current);

    if (!willRedirect && !redirectToHomeOnSignup)
      handleViewChange("create-update");
    if (redirectToHomeOnSignup && !location?.state?.postLoginRedirect) {
      history.replace(location, {
        postLoginRedirect: "/"
      });
    }
  }, [
    authenticateUser,
    handleViewChange,
    willRedirect,
    redirectToHomeOnSignup,
    history,
    location
  ]);

  return (
    <>
      <SharedStyles.Form
        ref={formRef}
        name="global-create-user"
        create={usersAPI.create}
        formatData={formatAttributes}
        onSuccess={onSuccess}
      >
        <Form.Header
          label={t("forms.signin_overlay.create_account")}
          styleType="primary"
        />
        <CreateFormFields />
        <input
          className="button-secondary"
          type="submit"
          value={t("forms.signin_overlay.create_account")}
        />
      </SharedStyles.Form>
      {settings?.attributes?.oauth && (
        <>
          <Styled.LinksWrapper>
            {t("forms.signin_overlay.oauth_instructions", {
              appName: installationName,
              providers: OAuthProviderNames()
            })}
          </Styled.LinksWrapper>
          <OAuthOptions />
        </>
      )}
      <Styled.LinksWrapper>
        <Styled.ViewLink onClick={event => handleViewChange("login", event)}>
          {t("forms.signin_overlay.have_account")}
        </Styled.ViewLink>
      </Styled.LinksWrapper>
    </>
  );
}

CreateUserForm.displayName = "Global.SignInUp.CreateUserForm";

CreateUserForm.propTypes = {
  handleViewChange: PropTypes.func,
  willRedirect: PropTypes.bool,
  redirectToHomeOnSignup: PropTypes.bool
};
