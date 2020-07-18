describe("Given Augmented Presentation FacetView", () => {
	it("is defined", () => {
		console.debug("view", Facet.FacetView);
		expect(Facet.FacetView).to.not.be.undefined;
	});

	describe("Given an instance of FacetView", () => {
		let view;

		beforeEach(() => {
			view = new Facet.FacetView();
		});

		afterEach(() => {
			view.remove();
			view = null;
		});

		it("instance is an instance of FacetView", () => {
			expect(view instanceof Facet.FacetView).to.be.true;
		});

		it("can add facet data", () => {
			const l = view.addFacet("identifier", "name", [], "check");
			expect(l).to.not.equal(0);
		});
	});
});
