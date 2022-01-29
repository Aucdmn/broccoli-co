export default {
  post: jest.fn(() => Promise.resolve({ data: {} })),
  CancelToken: {
    source() {
      return {
        token: "BABY YODA",
        cancel() {}
      };
    }
  }
};
