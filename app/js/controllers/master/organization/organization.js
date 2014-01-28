define([], function() {
  return ['$scope', '$modalInstance', 'organization', 'OrganizationClassService', 'id',
      function($scope,  $modalInstance, organization, OrganizationClassService, id) {
    $scope.class="";
    $scope.hasClass = false;
    $scope.parentId = 0;
    OrganizationClassService.getClassDescriptors(function(data){
        $scope.classes = data.value;
    });          
        
        //end
    $scope.organization = {};
    $scope.organization.changeInnerLoction = false;
       /*************************interface start**********************************/
    $scope.initial =function(){
        return {
            "id":0,
            "parentId":0,
            "orgStructureId":0,
            "bgId":0,
            "hasChildren":false,
            "isInternal":false,
            "name":"",
            "startdate": "",
            "enddate":"",
            "location":{},
            "classes":[],
            "type":{},
            "sequence":0,
            "children":[]
        };
    };    
    $scope.findLocation = function(keyString){
        return [
            {"id":5,"name":"asdfa"},
            {"id":6,"name":"asdfa"},
            {"id":7,"name":"asdfa"}
        ];
    };
    $scope.getBMUs = function(){
        return [
            {"id":5,"name":"BMU1"},
            {"id":6,"name":"BMU2"},
            {"id":7,"name":"BMU3"}
        ];
    };
    $scope.getCompanies = function(){
        return [
            {"id":5,"name":"Com1"},
            {"id":6,"name":"Com2"},
            {"id":7,"name":"Com3"}
        ];
    };
    $scope.getTypes = function(){
        return [
            {"id":5,"name":"Type1"},
            {"id":6,"name":"Type2"},
            {"id":7,"name":"Type3"}
        ];
    };

    /*************************interface end**********************************/
    if(organization)
    {
        $scope.organization = organization;
        $scope.organization.parentId = id;
        $scope.organization.segments = ['3','4','5'];
    }
    else
    {
        $scope.organization =  $scope.initial();
        $scope.organization.segments = ['3','4','5'];
    }
    $scope.selectClass = function(c)
    {
        $scope.class= c;
        $scope.hasClass = true;
    };
    $scope.cancelAddOrg = function()
    {
        $scope.hasClass = false;
        $scope.organization.id = 0;
        $scope.organization.name="";
    };
    $scope.addSegment = function()
    {
        $scope.organization.segments.push(0);
    };

    $scope.delSegment = function(seg)
    {
        var idx = $scope.organization.segments.indexOf(seg);
       $scope.organization.segments.splice(idx, 1);
    };
    $scope.changeInnerLocation = function()
    {
        $scope.organization.changeInnerLoction =  !$scope.organization.changeInnerLoction;
    };

    $scope.loadDds = function(feature) {
        $scope.dds = {};
        $scope.dds.locations = {
            value: null,
            options: []
        };
        $scope.dds.types = {
            value: null,
            options: []
        };
        DDService.get({
            key: 'organization.Locations'
        }, function(data) {
            if(data.options && data.options.length > 0) {
                $scope.dds.locations.options = data.options;
                if( !! $scope.organization && !! $scope.organization.Locations) {
                    for(var i = 0; i < data.options.length; i++) {
                        if(data.options[i].code == $scope.organization.Location.code) {
                            $scope.dds.locations.value = data.options[i];
                            break;
                        };
                    };
                } else {
                    $scope.dds.locations.value = data.options[0];
                };
            };
        }, function(data) {});
        DDService.get({
            key: 'Organization.Type'
        }, function(data) {
            if(data.options && data.options.length > 0) {
                $scope.dds.types.options = data.options;
                if( !! $scope.organization && !! $scope.organization.type) {
                    for(var i = 0; i < data.options.length; i++) {
                        if(data.options[i].code == $scope.organization.type.code) {
                            $scope.dds.types.value = data.options[i];
                            break;
                        };
                    };
                } else {
                    $scope.dds.types.value = data.options[0];
                };
            };
        }, function(data) {});
    };
    
    $scope.saveOrg = function(dialogForm){
        $modalInstance.close($scope.organization);
    };
      }];
 
    });
