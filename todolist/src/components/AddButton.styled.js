import styled from "styled-components";

const AddButton = styled.button`
  --pink: #ec4899;
  --purple: #8b5cf6;
  font-size: 1.25rem;
  font-weight: 700;
  background-image: linear-gradient(to right, var(--pink), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  transition: 0.4s;
`;
export { AddButton };
