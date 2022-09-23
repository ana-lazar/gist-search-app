interface HeaderProps {
  text: string;
}

const Header = ({ text }: HeaderProps) => {
  return <div>{text}</div>;
};

export default Header;
