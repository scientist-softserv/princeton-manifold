import styled from "@emotion/styled";
import { fluidScale } from "theme/styles/mixins";

export const Wrapper = styled.div`
  padding-block-start: var(--container-padding-block-start);
  padding-block-end: var(--container-padding-block-end);
`;

export const IssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  &:first-child {
    padding-block-start: ${fluidScale("0px", "20px")};
  }

  & + & {
    margin-block-start: var(--container-padding-block-end);
  }

  &:last-child {
    padding-block-end: var(--container-padding-block-end);
  }
`;
