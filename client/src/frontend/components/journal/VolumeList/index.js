import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import EntityGroup from "global/components/composed/EntityGroup";
import lh from "helpers/linkHandler";
import { capitalize } from "utils/string";
import * as Styled from "./styles";

function JournalVolumeList({ volumes, journal }) {
  const { t } = useTranslation();

  if (!volumes || !journal) return null;

  return (
    <Styled.Wrapper>
      {volumes.map(volume => (
        <EntityGroup
          key={volume.id}
          title={`${capitalize(t("glossary.volume_one"))} ${
            volume.attributes.number
          }`}
          to={lh.link(
            "frontendVolumeDetail",
            journal.attributes.slug,
            volume.attributes.slug
          )}
          entities={volume.relationships.journalIssues}
          parentView
          placeholderText={t("placeholders.volume_no_issues")}
        />
      ))}
    </Styled.Wrapper>
  );
}

JournalVolumeList.displayName = "Journal.VolumeList";

JournalVolumeList.propTypes = {
  journal: PropTypes.object,
  volumes: PropTypes.array
};

export default JournalVolumeList;
