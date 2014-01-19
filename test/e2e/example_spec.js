describe('angularjs homepage', function() {
 var ptor= protractor.getInstance();

  beforeEach(function() {
    ptor.driver.get('http://localhost:8000/#/supplier/create'); // Just use the plain old webdriver here, it won't complain if Angular isn't loaded yet.
  });

  it('list, no filter', function() {
    console.log(ptor);
    // var selectOption = ptor.findElement(ptor.By.input("selectOption"));
  });
});
