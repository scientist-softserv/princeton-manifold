import styled from "@emotion/styled";
import { respond } from "theme/styles/mixins";

export const Section = styled.div`
  --FieldGroup-column-gap: 40px;
  --FieldGroup-row-gap: 35px;

  & + & {
    margin-top: 45px;

    ${respond(`margin-top: 52px;`, 60)}
  }

  > * + * {
    margin-block-start: 32px;
  }
`;

export const BaseGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: var(--FieldGroup-column-gap);
  row-gap: var(--FieldGroup-row-gap);

  > * {
    flex-grow: 1;
    flex-basis: var(--FieldGroup-child-flex-basis, 100%);
  }
`;

export const SecondaryGroup = styled(BaseGroup)`
  --FieldGroup-row-gap: 25px;
`;
