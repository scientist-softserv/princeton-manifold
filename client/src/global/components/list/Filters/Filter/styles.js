import styled from "@emotion/styled";
import { defaultTransitionProps, filterSelectBase } from "theme/styles/mixins";
import IconComposer from "global/components/utility/IconComposer";

export const borderStyles = `
  border: 1px solid var(--select-border-color);
  border-radius: 6px;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const Select = styled.select`
  ${filterSelectBase}
  width: 100%;
  padding-top: 11px;
  padding-bottom: 12px;
  font-size: 13px;
  ${borderStyles}
  transition: border-color ${defaultTransitionProps};

  &:focus-visible {
    border-color: var(--hover-color);
  }

  option {
    color: var(--color-base-neutral-black);
  }
`;

export const Icon = styled(IconComposer)`
  position: absolute;
  top: 50%;
  right: 12px;
  width: 24px;
  height: 24px;
  color: var(--select-border-color);
  pointer-events: none;
  transform: translateY(-50%);
`;
