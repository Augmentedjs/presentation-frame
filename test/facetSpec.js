
describe('Given Augmented Presentation FacetView', () => {
	it('is defined', () => {
		expect(FacetView).to.not.be.undefined;
	});

	describe('Given an instance of FacetView', () => {
		let view;

		beforeEach(() => {
			view = new FacetView();
		});

		afterEach(() => {
			view.remove();
			view = null;
		});

		it('instance is an instance of FacetView', () => {
			expect(view instanceof FacetView).to.be.true;
		});


	});
});
