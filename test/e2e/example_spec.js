describe('angularjs homepage', function() {
  var ptor = protractor.getInstance();
  var targetUrl = 'http://localhost:8080/web/app/index.html#/supplier/create';

  beforeEach(function() {
    ptor.ignoreSynchronization = true;
    ptor.get(targetUrl); // Just use the plain old webdriver here, it won't complain if Angular isn't loaded yet.
  });

  it('first e2e test', function() {
    ptor.driver.getCurrentUrl().then(function(url) {
      console.log(url);
      expect(url).toEqual(targetUrl);
    });
    ptor.driver.getTitle().then(function(title) {
      console.log(title);
      expect(title).not.toBe(null);
    });
  });
});