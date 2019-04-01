
describe('Given Augmented Presentation Frame View', () => {
	it('is defined', () => {
		expect(Frame).to.not.be.undefined;
	});

	describe('Given an instance of Frame', () => {
		let view;

		beforeEach(() => {
			view = new Frame({"name": "sample", "el": "#sandbox", "body": "hello"});
		});

		afterEach(() => {
			view.remove();
			view = null;
		});

		it('instance is an instance of Frame', () => {
			expect(view instanceof Frame).to.be.true;
		});


	});
});
