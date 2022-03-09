import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Generic from "./Generic";
import lh from "helpers/linkHandler";
import FormattedDate from "global/components/FormattedDate";
import withSearchResultHelper from "./searchResultHelper";
import { capitalize } from "utils/string";
import * as Styled from "./styles";

function SearchResultsTypeJournalIssue({ result, highlightedAttribute }) {
  const { t } = useTranslation();

  if (!result) return null;

  const model = result.relationships?.model;
  if (!model) return null;

  const { attributes } = model ?? {};

  const parentJournal = result.relationships?.journal;
  const parentVolume =
    result.relationships?.journalIssue?.relationships?.journalVolume;

  const title = parentVolume
    ? `${capitalize(t("glossary.volume_one"))} ${
        parentVolume.number
      }, ${capitalize(t("glossary.issue_one"))}${highlightedAttribute(
        "number"
      )}`
    : `${capitalize(t("glossary.issue_one"))}${highlightedAttribute("number")}`;

  const { searchableType, searchableId } = result.attributes ?? {};
  const collectable = {
    type: searchableType,
    id: searchableId,
    attributes: { title }
  };
  const creators = model?.relationships?.creators ?? [];

  const resultProps = {
    url: lh.link("frontendProjectDetail", attributes.slug),
    title,
    parent: parentJournal?.attributes?.titlePlaintext || null,
    parentUrl: parentJournal
      ? lh.link("frontendJournalDetail", parentJournal.id)
      : null,
    attribution: creators.map(c => c.attributes.fullName).join(", "),
    description: highlightedAttribute("subtitle"),
    label: t("glossary.issue_one"),
    collectable
  };

  return (
    <Generic
      {...resultProps}
      figure={
        <Styled.Thumbnail
          placeholderAttributes={{ mode: "small" }}
          entity={result.relationships.project}
          width="100%"
          height={null}
        />
      }
      meta={
        <FormattedDate
          prefix={capitalize(t("dates.published"))}
          format="MMMM, yyyy"
          date={attributes.createdAt}
        />
      }
    />
  );
}

SearchResultsTypeJournalIssue.displayName = "Search.Results.Type.JournalIssue";

SearchResultsTypeJournalIssue.propTypes = {
  result: PropTypes.object,
  highlightedAttribute: PropTypes.func.isRequired
};

export default withSearchResultHelper(SearchResultsTypeJournalIssue);
