import React from "react";
import PropTypes from "prop-types";
import { containerWidth } from "theme/styles/variables/layout";
import * as Styled from "./styles";

const imageSize = parseInt(Styled.IMAGE_MAX_HEIGHT, 10);

function getImageWidthAttr(layout) {
  switch (layout) {
    case "full_bleed":
    case "wide_inset":
      return parseInt(containerWidth.inner, 10);
    default:
      return imageSize;
  }
}

function Header({
  title,
  icon,
  IconComponent,
  description,
  image,
  headerLayout,
  headerLink
}) {
  if (!title) return null;

  /* eslint-disable no-nested-ternary */
  const layout =
    !image && !description
      ? "title_only"
      : !image
      ? "title_description"
      : headerLayout;
  /* eslint-disable no-nested-ternary */

  return (
    <Styled.Header $layout={layout}>
      <Styled.TitleAndIcon>
        {IconComponent && <Styled.IconComponent as={IconComponent} />}
        {!IconComponent && icon && <Styled.Icon size={60} icon={icon} />}
        <Styled.TitleLink to={headerLink}>
          <Styled.Title>{title}</Styled.Title>
        </Styled.TitleLink>
      </Styled.TitleAndIcon>
      {description && (
        <Styled.Description dangerouslySetInnerHTML={{ __html: description }} />
      )}
      {image && (
        <Styled.Image
          src={image}
          alt=""
          width={getImageWidthAttr(headerLayout)}
          height={imageSize}
          $layout={headerLayout}
        />
      )}
    </Styled.Header>
  );
}

Header.displayName = "Frontend.Composed.EntityCollection.Header";

export const headerProps = {
  title: PropTypes.string,
  icon: PropTypes.string,
  IconComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  description: PropTypes.string,
  image: PropTypes.string,
  headerLayout: PropTypes.string,
  headerLink: PropTypes.string
};

Header.propTypes = headerProps;

export default Header;
