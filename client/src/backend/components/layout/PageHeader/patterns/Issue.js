import React from "react";
import Journal from "./Journal";
import ChildSelector from "../utility/ChildSelector";
import { useLocation } from "react-router-dom";
import Utility from "../utility";
import { getTextLinks } from "../utility/helpers";
import * as Styled from "./styles";

export default function IssueHeader({
  titleHtml,
  titleString,
  subtitle,
  parentTitleHtml,
  parentTitleString,
  parentSubtitle,
  parentId,
  actions,
  note,
  texts,
  parent,
  issues,
  hasSecondaryNav
}) {
  const { pathname } = useLocation();
  const textLinks = getTextLinks({ texts, parentId, pathname, parent });

  return (
    <>
      {!parent && (
        <Journal
          titleString={parentTitleString}
          titleHtml={parentTitleHtml}
          subtitle={parentSubtitle}
          issues={issues}
          id={parentId}
          parent
        />
      )}
      <Styled.Row $padStart>
        {!parent && (
          <>
            <Styled.ChildLink icon="tocLink16" />
            <Styled.ProjectIcon
              mode="small"
              color="outlined"
              borderless
              ariaLabel={false}
            />
          </>
        )}
        <Styled.TitleWrapper>
          <Styled.Title {...titleHtml}>{titleString}</Styled.Title>
          {subtitle && <Styled.Subtitle>{subtitle}</Styled.Subtitle>}
        </Styled.TitleWrapper>
        {textLinks && <ChildSelector links={textLinks} entity="article" />}
      </Styled.Row>
      {!parent && (
        <Utility
          actions={actions}
          links={textLinks}
          entityType="journalIssue"
          childType="article"
          hasSecondaryNav={hasSecondaryNav}
          note={note}
        />
      )}
    </>
  );
}
