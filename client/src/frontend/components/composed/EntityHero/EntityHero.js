import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useFrontendModeContext } from "hooks";
import * as Styled from "./styles";

export default function EntityHero({
  TitleComponent,
  TopLeftComponent,
  TopRightComponent,
  BottomLeftComponent,
  BottomRightComponent,
  ImageComponent,
  lightMode = false,
  theme = "project"
}) {
  const resizeId = useRef(null);
  const rightColRef = useRef();
  const titleRef = useRef();
  const { isStandalone } = useFrontendModeContext();

  const addStandaloneMargin = () => {
    if (!rightColRef.current || !titleRef.current) return;
    const height = titleRef.current.offsetHeight;
    rightColRef.current.style.marginTop = `${height}px`;
  };

  useEffect(() => {
    const handleResize = () => {
      if (resizeId.current) {
        window.cancelAnimationFrame(resizeId);
      }
      resizeId.current = window.requestAnimationFrame(() => {
        addStandaloneMargin();
      });
    };

    if (isStandalone) {
      window.addEventListener("resize", handleResize);
      return window.removeEventListener("resize", handleResize);
    }
  }, [isStandalone]);

  /* eslint-disable no-nested-ternary */
  const WrapperComponent =
    theme === "journal"
      ? Styled.JournalWrapper
      : theme === "issue"
      ? Styled.IssueWrapper
      : Styled.Wrapper;
  /* eslint-enable no-nested-ternary */

  return (
    <WrapperComponent $lightMode={lightMode} $standalone={isStandalone}>
      <Styled.Inner>
        <Styled.TopLeft>
          <div ref={titleRef}>{TitleComponent({ isStandalone })}</div>
          {TopLeftComponent}
        </Styled.TopLeft>
        <Styled.BottomLeft>{BottomLeftComponent}</Styled.BottomLeft>
        <Styled.TopRight ref={rightColRef}>{TopRightComponent}</Styled.TopRight>
        <Styled.BottomRight>
          {BottomRightComponent && BottomRightComponent}
        </Styled.BottomRight>
      </Styled.Inner>
      {ImageComponent && ImageComponent}
    </WrapperComponent>
  );
}

EntityHero.displayName = "Frontend.Composed.EntityHero";

EntityHero.propTypes = {
  TitleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  TopLeftComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  TopRightComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  BottomLeftComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.bool
  ]),
  BottomRightComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.node
  ]),
  ImageComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.bool
  ]),
  lightMode: PropTypes.bool,
  theme: PropTypes.oneOf(["project", "journal"])
};
