import { Menu as AntdMenu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const getKeyFromPathname = pathname => pathname.slice(1);

const getHandleClickMenu = navigate => ({ key }) => {
  navigate(`/${key}`);
}

const Menu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <AntdMenu
      mode="horizontal"
      selectedKeys={[getKeyFromPathname(pathname)]}
      style={{ marginBottom: 15, width: 180 }}
      onClick={getHandleClickMenu(navigate)}
    >
      <AntdMenu.Item key="home">Home</AntdMenu.Item>
      <AntdMenu.Item key="pokedex">Pokedex</AntdMenu.Item>
    </AntdMenu>
  );
};
export default Menu;
