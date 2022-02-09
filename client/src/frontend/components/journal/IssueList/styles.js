import styled from "@emotion/styled";
import { fluidScale } from "theme/styles/mixins";
import Box from "global/components/atomic/Box";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-block-end: ${fluidScale("40px", "20px")};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

export const LinkWrapper = styled(Box)`
  > div {
    background-color: var(--color-base-neutral-white);
    padding: 0;
  }
`;
