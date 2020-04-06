import { caches } from "@/utils/cache.utils";

describe("testing cache", () => {
  it("should cache results after first call", () => {
    class Foo {
      i = 0;
      @caches()
      method() {
        return ++this.i;
      }
    }
    const bar = new Foo();
    expect(bar.method()).toBe(1);
    expect(bar.method()).toBe(1);
  });
});
