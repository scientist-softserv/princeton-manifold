import React from "react";
import PropTypes from "prop-types";
import IconComposer from "global/components/utility/IconComposer";
import * as Styled from "./styles";

export default function Breadcrumbs({
  breadcrumbs,
  backend = false,
  hideOnDesktop = false
}) {
  const Wrapper = backend ? Styled.BackendOuter : Styled.Outer;
  const Inner = backend ? Styled.BackendInner : Styled.Inner;
  const Icon = backend ? Styled.Icon : IconComposer;

  return (
    <Wrapper aria-label="Breadcrumb" $hideOnDesktop={hideOnDesktop}>
      <Inner>
        {breadcrumbs.length === 1 &&
          breadcrumbs.map(crumb => (
            <Styled.Breadcrumb to={crumb.to} key={crumb.to}>
              <Icon icon="arrowLeft16" size={backend ? "default" : 24} />
              {backend && <Icon icon="arrowLeft32" size="default" $desktop />}
              <Styled.Label>{crumb.label}</Styled.Label>
            </Styled.Breadcrumb>
          ))}
        {breadcrumbs.length > 1 && (
          <>
            <Icon icon="arrowLeft16" size={24} />
            {breadcrumbs.map((crumb, i) => (
              <Styled.Breadcrumb
                to={crumb.to}
                key={crumb.to}
                aria-current={i === breadcrumbs.length - 1 ? "page" : null}
              >
                <Styled.Label>{crumb.label}</Styled.Label>
              </Styled.Breadcrumb>
            ))}
          </>
        )}
      </Inner>
    </Wrapper>
  );
}

Breadcrumbs.displayName = "Global.Atomic.Breadcrumbs";

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.object.isRequired,
  backend: PropTypes.bool,
  hideOnDesktop: PropTypes.bool
};
