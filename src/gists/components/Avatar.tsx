import styled from "styled-components";

const StyledAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: 0 5px 0 5px;
`;

interface AvatarProps {
  url: string;
}

const Avatar = ({ url }: AvatarProps) => {
  return <StyledAvatar src={url} alt="" />;
};

export default Avatar;
