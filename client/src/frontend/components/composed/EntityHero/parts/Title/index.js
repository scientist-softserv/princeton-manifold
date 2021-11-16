import React from "react";
import PropTypes from "prop-types";
import Collecting from "frontend/components/collecting";
import * as Styled from "./styles";

export default function HeroTitle({ entity, standalone = false }) {
  const title = entity.attributes.titleFormatted;
  const subtitle = entity.attributes.subtitleFormatted;
  return (
    <Styled.Wrapper $standalone={standalone}>
      {title && (
        <Styled.TitleWrapper>
          <Styled.Title
            dangerouslySetInnerHTML={{ __html: title }}
            $standalone={standalone}
          />
          <Styled.Toggle>
            <Collecting.Toggle collectable={entity} />
          </Styled.Toggle>
        </Styled.TitleWrapper>
      )}
      {subtitle && (
        <Styled.Subtitle dangerouslySetInnerHTML={{ __html: subtitle }} />
      )}
    </Styled.Wrapper>
  );
}

HeroTitle.propTypes = {
  entity: PropTypes.object.isRequired,
  standalone: PropTypes.bool
};
