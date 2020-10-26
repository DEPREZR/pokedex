import { Menu as AntdMenu } from "antd";
import { useLocation, useHistory } from "react-router-dom";

const getKeyFromPathname = pathname => pathname.slice(1);

const getHandleClickMenu = history => ({ key }) => {
  history.push(`/${key}`);
}

const Menu = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <AntdMenu
      mode="horizontal"
      selectedKeys={[getKeyFromPathname(pathname)]}
      style={{ marginBottom: 15, width: 180 }}
      onClick={getHandleClickMenu(history)}
    >
      <AntdMenu.Item key="home">Home</AntdMenu.Item>
      <AntdMenu.Item key="pokedex">Pokedex</AntdMenu.Item>
    </AntdMenu>
  );
};
export default Menu;
