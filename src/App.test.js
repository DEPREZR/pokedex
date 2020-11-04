import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  it("render correctly", () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
