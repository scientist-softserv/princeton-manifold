import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Generic from "./Generic";
import lh from "helpers/linkHandler";
import FormattedDate from "global/components/FormattedDate";
import EntityThumbnail from "global/components/entity-thumbnail";
import withSearchResultHelper from "./searchResultHelper";
import { capitalize } from "utils/string";

function SearchResultsTypeJournal({ result, highlightedAttribute }) {
  const { t } = useTranslation();

  if (!result) return null;

  const model = result.relationships?.model;
  const { attributes } = model ?? {};

  const { searchableType, searchableId, titlePlaintext } =
    result.attributes ?? {};
  const collectable = {
    type: searchableType,
    id: searchableId,
    attributes: { title: titlePlaintext }
  };
  const creators = model?.relationships?.creators ?? [];

  const resultProps = {
    url: lh.link("frontendProjectDetail", attributes.slug),
    title: highlightedAttribute("title"),
    attribution: creators.map(c => c.attributes.fullName).join(", "),
    description: highlightedAttribute("description"),
    label: t("glossary.journal_one"),
    collectable
  };

  return (
    <Generic
      {...resultProps}
      figure={
        <EntityThumbnail.Project
          placeholderAttributes={{ mode: "small" }}
          entity={model}
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

SearchResultsTypeJournal.displayName = "Search.Results.Type.Journal";

SearchResultsTypeJournal.propTypes = {
  result: PropTypes.object,
  highlightedAttribute: PropTypes.func.isRequired
};

export default withSearchResultHelper(SearchResultsTypeJournal);