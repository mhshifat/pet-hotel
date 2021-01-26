import styled from "styled-components";
import { theme } from ".";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  & > svg {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  & > div {
    padding: 0.1rem 0.1rem 0.1rem 1rem;
    border-radius: 9999px;
    border: 1px solid ${({ theme }) => theme.color.lightWhite};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    & > span {
      display: inline-block;
      margin-right: 1rem;
      font-size: 12px;
      color: ${({ theme }) => theme.color.primary};
      font-weight: 500;
      text-transform: capitalize;
    }

    & > svg {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      width: 3rem;
      height: 3rem;
      background: ${theme.color.white};
      border-radius: 50%;
      border: 2px solid ${theme.color.lightWhite};
      cursor: pointer;
      overflow: hidden;
      padding: 0.5rem;
    }

    & > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      width: 3rem;
      height: 3rem;
      background: ${theme.color.primary + "1f"};
      border-radius: 50%;
      border: 2px solid ${theme.color.lightWhite};
      cursor: pointer;
      overflow: hidden;
    }
  }
`;
