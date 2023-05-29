import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #33537d ;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Stay in touch with our newest releases by subscribing to the weekly newsletter</Container>;
};

export default Announcement;
