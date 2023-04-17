import styled from "@emotion/styled";
import { buttonUnstyled } from "theme/styles/mixins";

export const RemoveButton = styled.button`
  ${buttonUnstyled}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  right: 5px;
  color: var(--color);
  background: var(--background-color);
  border-radius: 4px;
  border: 1px solid;

  &:hover {
    color: var(--error-color);
  }
`;

export const Image = styled.img`
  border: 1px solid;
`;

export const ImageWrapper = styled.div`
  display: inline-block;
  width: max-content;
  max-width: 100%;
  position: relative;

  &.responsive-iframe {
    display: block;
    width: 100%;
  }
`;

export const VoidWrapper = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
`;

export const Void = styled.iframe`
  border: 1px solid var(--error-color);
  border-radius: 4px;
  width: 100%;
`;
