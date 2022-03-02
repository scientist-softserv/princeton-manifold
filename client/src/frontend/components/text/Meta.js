import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Date from "./Date";
import Counts from "./Counts";
import { capitalize } from "utils/string";
import * as Styled from "./styles";

export default function TextMeta({
  text,
  datesVisible,
  datePrefix,
  publishedVisible
}) {
  const { t } = useTranslation();

  const showStatus = datesVisible || publishedVisible;

  return (
    <Styled.Meta>
      {showStatus && (
        <Styled.Status>
          {datesVisible && (
            <Date
              date={text.attributes.createdAt}
              datePrefix={datePrefix}
              inline
            />
          )}
          {publishedVisible && (
            <Styled.Published>
              {capitalize(t("dates.published"))}
            </Styled.Published>
          )}
        </Styled.Status>
      )}
      <Counts text={text} />
    </Styled.Meta>
  );
}

TextMeta.displayName = "Text.Meta";

TextMeta.propTypes = {
  text: PropTypes.object.isRequired,
  datesVisible: PropTypes.bool,
  datePrefix: PropTypes.string,
  publishedVisible: PropTypes.bool
};
