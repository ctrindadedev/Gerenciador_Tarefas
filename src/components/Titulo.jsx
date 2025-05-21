import styled from "styled-components";
const StyledTitulo = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;
function Titulo({ texto }) {
  return <StyledTitulo>{texto}</StyledTitulo>;
}
export default Titulo;
