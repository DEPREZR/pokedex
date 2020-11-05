import useGet from ".";
import { get } from "apiHelpers";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("apiHelpers", () => {
  const originalModule = jest.requireActual("apiHelpers");

  return {
    __esModule: true,
    ...originalModule,
    get: jest.fn(),
  };
});

describe("useGet", () => {
  it("correctly build result in case of success", async () => {
    const data = { prop1: "prop1", prop2: "prop2" };
    const response = {
      data,
      hasError: false,
      status: 200,
      error: null,
      json: async () => Promise.resolve(data),
    };

    const expectedResult = { data, error: null, status: 200, loading: false };

    get.mockReturnValueOnce(Promise.resolve(response));

    const { result, waitForNextUpdate } = renderHook(() => useGet());

    await waitForNextUpdate();

    expect(result.current).toEqual(expectedResult);
  });

  it("correctly build result in case of http error", async () => {
    const error = { message: "some error", status: 500 };
    const response = {
      data: null,
      hasError: true,
      status: 500,
      error,
    };

    const expectedResult = { data: null, error, status: 500, loading: false };

    get.mockReturnValueOnce(Promise.resolve(response));

    const { result, waitForNextUpdate } = renderHook(() => useGet());

    await waitForNextUpdate();

    expect(result.current).toEqual(expectedResult);
  });

  it("correctly build result in case of json error", async () => {
    const data = { prop1: "prop1", prop2: "prop2" };
    const response = {
      data,
      hasError: false,
      status: 200,
      error: null,
    };

    const expectedResult = {
      data: null,
      error: new TypeError("response.json is not a function"),
      status: 200,
      loading: false,
    };

    get.mockReturnValueOnce(Promise.resolve(response));

    const { result, waitForNextUpdate } = renderHook(() => useGet());

    await waitForNextUpdate();

    expect(result.current).toEqual(expectedResult);
  });

  it("call get with url parameter", async () => {
    const url = "an/url";
    const data = { prop1: "prop1", prop2: "prop2" };
    const response = {
      data,
      hasError: false,
      status: 200,
      error: null,
      json: async () => Promise.resolve(data),
    };

    get.mockReturnValueOnce(Promise.resolve(response));

    const { waitForNextUpdate } = renderHook(() => useGet(url));

    await waitForNextUpdate();

    expect(get).toHaveBeenCalledWith({ url });
  });
});
