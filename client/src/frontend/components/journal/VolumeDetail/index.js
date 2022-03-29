import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import EntityGroup from "global/components/composed/EntityGroup";
import ThumbnailGrid from "global/components/composed/ThumbnailGrid";
import EntityThumbnail from "global/components/atomic/EntityThumbnail";
import ContentBlockList from "frontend/components/content-block-list/List";
import { capitalize } from "utils/string";
import * as Styled from "./styles";

function VolumeDetail({ journal, volume }) {
  const { t } = useTranslation();

  if (!journal || !volume) return null;

  const journalTitle = journal.attributes?.title;
  const volumeTitle = `${capitalize(t("glossary.volume_one"))} ${
    volume.attributes?.number
  }`;
  const issues = volume.relationships?.journalIssues ?? [];

  return (
    <Styled.Wrapper>
      <EntityGroup title={`${journalTitle}: ${volumeTitle}`}>
        {!!issues.length &&
          issues.map(issue => (
            <Styled.IssueWrapper key={issue.id}>
              <ThumbnailGrid minColumns={4} minItemWidth="210px">
                {({ stack }) => (
                  <EntityThumbnail
                    entity={issue}
                    stack={stack}
                    key={issue.id}
                    parentView
                  />
                )}
              </ThumbnailGrid>
              <ContentBlockList
                entity={issue}
                nested
                hideHeader={["textsBlocks"]}
                hideLastBottomBorder
              />
            </Styled.IssueWrapper>
          ))}
        placeholderText={t("placeholders.volume_no_issues")}
      </EntityGroup>
    </Styled.Wrapper>
  );
}

VolumeDetail.displayName = "Journal.VolumeDetail";

VolumeDetail.propTypes = {
  journal: PropTypes.object.isRequired,
  volume: PropTypes.object.isRequired
};

export default VolumeDetail;
